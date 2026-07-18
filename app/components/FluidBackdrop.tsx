"use client";

import { useEffect, useRef } from "react";

type FluidBackdropProps = {
  className?: string;
  scope?: "parent" | "window";
};

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_texture_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_active;
  varying vec2 v_uv;

  vec2 cover_uv(vec2 uv) {
    float screen_aspect = u_resolution.x / u_resolution.y;
    float texture_aspect = u_texture_resolution.x / u_texture_resolution.y;
    vec2 scale = vec2(1.0);

    if (screen_aspect > texture_aspect) {
      scale.y = texture_aspect / screen_aspect;
    } else {
      scale.x = screen_aspect / texture_aspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 delta = (uv - u_pointer) * aspect;
    float distance_to_pointer = length(delta);
    float influence = exp(-distance_to_pointer * 5.8) * u_active;
    vec2 direction = distance_to_pointer > 0.001 ? normalize(delta) : vec2(0.0);

    float ripple = sin(distance_to_pointer * 38.0 - u_time * 2.25) * 0.0062 * influence;
    float breathing = sin(u_time * 0.9) * 0.0028 * influence;
    vec2 swirl = vec2(-direction.y, direction.x) * (ripple + breathing);

    uv += vec2(swirl.x / aspect.x, swirl.y);
    uv += vec2(sin(u_time * 0.11), cos(u_time * 0.09)) * 0.0012;

    vec4 color = texture2D(u_texture, cover_uv(uv));
    float halo = exp(-distance_to_pointer * 7.0) * u_active * (0.035 + 0.018 * sin(u_time * 1.15));
    color.rgb += vec3(0.25, 0.01, 0.005) * halo;
    gl_FragColor = color;
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function FluidBackdrop({ className = "", scope = "parent" }: FluidBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });

    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const textureResolutionLocation = gl.getUniformLocation(program, "u_texture_resolution");
    const pointerLocation = gl.getUniformLocation(program, "u_pointer");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const activeLocation = gl.getUniformLocation(program, "u_active");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const pointer = { x: 0.5, y: 0.5 };
    const targetPointer = { x: 0.5, y: 0.5 };
    const lastClient = { x: 0, y: 0, known: false };
    let active = 0;
    let targetActive = 0;
    let textureReady = false;
    let frame = 0;
    let width = 1;
    let height = 1;
    let imageWidth = 2048;
    let imageHeight = 1152;

    const setActiveTarget = (value: number) => {
      targetActive = value;
      root.dataset.active = value > 0 ? "true" : "false";
    };
    setActiveTarget(0);

    const resize = () => {
      const rect = root.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.round(rect.width * density));
      height = Math.max(1, Math.round(rect.height * density));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const updateFromClient = (clientX: number, clientY: number) => {
      const rect = scope === "window"
        ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
        : root.parentElement?.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;
      const inside = clientX >= rect.left
        && clientX <= rect.left + rect.width
        && clientY >= rect.top
        && clientY <= rect.top + rect.height;
      if (!inside) {
        setActiveTarget(0);
        return;
      }
      targetPointer.x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      targetPointer.y = 1 - Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
      setActiveTarget(1);
    };

    const updatePointer = (event: PointerEvent) => {
      lastClient.x = event.clientX;
      lastClient.y = event.clientY;
      lastClient.known = true;
      updateFromClient(event.clientX, event.clientY);
    };
    const updateMouse = (event: MouseEvent) => {
      lastClient.x = event.clientX;
      lastClient.y = event.clientY;
      lastClient.known = true;
      updateFromClient(event.clientX, event.clientY);
    };

    const syncPointerBounds = () => {
      if (lastClient.known) updateFromClient(lastClient.x, lastClient.y);
    };
    const deactivate = () => setActiveTarget(0);
    const handleWindowOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) deactivate();
    };

    if (!reduceMotion && !coarsePointer) {
      window.addEventListener("pointerenter", updatePointer);
      window.addEventListener("pointermove", updatePointer);
      window.addEventListener("mousemove", updateMouse);
      window.addEventListener("pointerleave", deactivate);
      window.addEventListener("mouseleave", deactivate);
      window.addEventListener("pointerout", handleWindowOut);
      window.addEventListener("scroll", syncPointerBounds, { passive: true });
      window.addEventListener("blur", deactivate);
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      imageWidth = image.naturalWidth;
      imageHeight = image.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      textureReady = true;
      resize();
    };
    image.src = "/fluid-background.png";

    const startedAt = performance.now();
    const render = (now: number) => {
      resize();
      pointer.x += (targetPointer.x - pointer.x) * 0.075;
      pointer.y += (targetPointer.y - pointer.y) * 0.075;
      active += (targetActive - active) * 0.055;

      if (textureReady) {
        gl.uniform2f(resolutionLocation, width, height);
        gl.uniform2f(textureResolutionLocation, imageWidth, imageHeight);
        gl.uniform2f(pointerLocation, pointer.x, pointer.y);
        gl.uniform1f(timeLocation, (now - startedAt) / 1000);
        gl.uniform1f(activeLocation, reduceMotion || coarsePointer ? 0 : active);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      frame = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointerenter", updatePointer);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("pointerleave", deactivate);
      window.removeEventListener("mouseleave", deactivate);
      window.removeEventListener("pointerout", handleWindowOut);
      window.removeEventListener("scroll", syncPointerBounds);
      window.removeEventListener("blur", deactivate);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [scope]);

  return (
    <div className={`fluid-surface ${className}`} ref={rootRef} aria-hidden="true">
      <img className="fluid-surface__fallback" src="/fluid-background.png" alt="" />
      <canvas ref={canvasRef} />
    </div>
  );
}
