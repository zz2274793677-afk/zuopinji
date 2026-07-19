import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer, request as httpRequest } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startProdServer } from "./node_modules/vinext/dist/server/prod-server.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(root, "dist", "client");
const publicPort = Number.parseInt(process.env.PORT ?? "3000", 10);

const mimeTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function resolveClientFile(url = "/") {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return null;
  }

  const candidate = path.resolve(clientDir, `.${pathname.replaceAll("\\", "/")}`);
  const relative = path.relative(clientDir, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;
  if (!existsSync(candidate)) return null;

  const stats = statSync(candidate);
  return stats.isFile() ? { path: candidate, size: stats.size } : null;
}

function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader ?? "");
  if (!match || (!match[1] && !match[2])) return null;

  let start;
  let end;

  if (!match[1]) {
    const suffixLength = Number.parseInt(match[2], 10);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) return null;
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    start = Number.parseInt(match[1], 10);
    end = match[2] ? Number.parseInt(match[2], 10) : size - 1;
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= size || end < start) {
    return null;
  }

  return { start, end: Math.min(end, size - 1) };
}

function serveStatic(req, res, file) {
  const extension = path.extname(file.path).toLowerCase();
  const rangeHeader = req.headers.range;
  const range = rangeHeader ? parseRange(rangeHeader, file.size) : null;

  if (rangeHeader && !range) {
    res.writeHead(416, {
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes */${file.size}`,
    });
    res.end();
    return;
  }

  const cacheControl = req.url?.startsWith("/assets/")
    ? "public, max-age=31536000, immutable"
    : "public, max-age=3600";
  const headers = {
    "Accept-Ranges": "bytes",
    "Cache-Control": cacheControl,
    "Content-Type": mimeTypes.get(extension) ?? "application/octet-stream",
  };

  if (range) {
    const length = range.end - range.start + 1;
    res.writeHead(206, {
      ...headers,
      "Content-Length": length,
      "Content-Range": `bytes ${range.start}-${range.end}/${file.size}`,
    });
    if (req.method === "HEAD") return res.end();
    createReadStream(file.path, range).pipe(res);
    return;
  }

  res.writeHead(200, { ...headers, "Content-Length": file.size });
  if (req.method === "HEAD") return res.end();
  createReadStream(file.path).pipe(res);
}

const vinext = await startProdServer({
  host: "127.0.0.1",
  outDir: path.join(root, "dist"),
  port: 0,
  purpose: "internal",
});

const server = createServer((req, res) => {
  if (req.method === "GET" || req.method === "HEAD") {
    const file = resolveClientFile(req.url);
    if (file) return serveStatic(req, res, file);
  }

  const upstream = httpRequest(
    {
      headers: req.headers,
      host: "127.0.0.1",
      method: req.method,
      path: req.url,
      port: vinext.port,
    },
    (upstreamResponse) => {
      res.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
      upstreamResponse.pipe(res);
    },
  );

  upstream.on("error", (error) => {
    console.error("[portfolio] Upstream request failed:", error);
    if (!res.headersSent) res.writeHead(502);
    res.end("Bad Gateway");
  });

  req.pipe(upstream);
});

server.listen(publicPort, "0.0.0.0", () => {
  console.log(`[portfolio] Public server listening on http://0.0.0.0:${publicPort}`);
});
