import { mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

const root = resolve(import.meta.dirname, "..");
const desktopWorks = "C:/Users/赵明啸/Desktop/作品集";

const projects = [
  {
    slug: "xunwei-dezhou",
    source: `${desktopWorks}/毕业设计试镜/毕设计前期试镜.mp4`,
    output: "full.mp4",
    start: "00:00:03",
    videoBitrate: "1200k",
    maxrate: "1500k",
    audioBitrate: "64k",
    height: 720,
  },
  {
    slug: "rebirth",
    source: `${desktopWorks}/重生逆袭/第一集.重生归来.mp4`,
    output: "episode-01.mp4",
    start: "00:00:05",
    videoBitrate: "900k",
    maxrate: "1100k",
    audioBitrate: "64k",
    height: 720,
    additional: [
      {
        source: `${desktopWorks}/重生逆袭/第二集.改写命运.mp4`,
        output: "episode-02.mp4",
        videoBitrate: "900k",
        maxrate: "1100k",
        audioBitrate: "64k",
        height: 720,
      },
    ],
  },
  {
    slug: "dorm-300",
    source: `${desktopWorks}/宿舍三百/赵明啸 2组 宿舍300块 .mp4`,
    output: "full.mp4",
    start: "00:00:22",
    videoBitrate: "330k",
    maxrate: "430k",
    audioBitrate: "48k",
    height: 540,
  },
  {
    slug: "three-minutes",
    source: `${desktopWorks}/假如给我三分钟/假如给我三分钟.mp4`,
    output: "full.mp4",
    start: "00:00:10",
    videoBitrate: "650k",
    maxrate: "800k",
    audioBitrate: "64k",
    height: 720,
  },
  {
    slug: "dormitory-name",
    source: `${desktopWorks}/宿舍的名义/宿舍的名义.mp4`,
    output: "full.mp4",
    start: "00:00:15",
    videoBitrate: "450k",
    maxrate: "560k",
    audioBitrate: "48k",
    height: 540,
  },
];

const gallery = [
  `${desktopWorks}/重生逆袭/过程文件/图片/女主.png`,
  `${desktopWorks}/重生逆袭/过程文件/图片/男主.png`,
  `${desktopWorks}/重生逆袭/过程文件/图片/女主穿校服.png`,
  `${desktopWorks}/重生逆袭/过程文件/图片/男主穿校服.png`,
  `${desktopWorks}/重生逆袭/过程文件/场景素材/婚礼.png`,
  `${desktopWorks}/重生逆袭/过程文件/场景素材/宿舍.png`,
];

function mediaPath(slug, file) {
  return resolve(root, "public", "media", slug, file);
}

function isComplete(file) {
  try {
    return statSync(file).size > 1024;
  } catch {
    return false;
  }
}

function run(label, args, output) {
  if (isComplete(output)) {
    console.log(`SKIP ${label}`);
    return;
  }
  mkdirSync(dirname(output), { recursive: true });
  console.log(`START ${label}`);
  const result = spawnSync(ffmpegPath, ["-hide_banner", "-loglevel", "warning", "-y", ...args, output], {
    stdio: "inherit",
  });
  if (result.status !== 0 || !isComplete(output)) {
    throw new Error(`${label} failed with exit code ${result.status ?? "unknown"}`);
  }
  console.log(`DONE ${label} ${(statSync(output).size / 1024 / 1024).toFixed(1)} MB`);
}

function fullArgs(item) {
  return [
    "-i", item.source,
    "-map_metadata", "-1",
    "-vf", `scale=-2:${item.height}:force_original_aspect_ratio=decrease`,
    "-c:v", "libx264",
    "-preset", "medium",
    "-b:v", item.videoBitrate,
    "-maxrate", item.maxrate,
    "-bufsize", item.maxrate.replace("k", "k"),
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", item.audioBitrate,
    "-ac", "2",
    "-movflags", "+faststart",
  ];
}

for (const project of projects) {
  const poster = mediaPath(project.slug, "poster.jpg");
  run(`${project.slug} poster`, [
    "-ss", project.start,
    "-i", project.source,
    "-frames:v", "1",
    "-vf", "scale=1600:-2:force_original_aspect_ratio=decrease",
    "-q:v", "3",
  ], poster);

  const preview = mediaPath(project.slug, "preview.mp4");
  run(`${project.slug} preview`, [
    "-ss", project.start,
    "-t", "8",
    "-i", project.source,
    "-an",
    "-vf", "scale=-2:720:force_original_aspect_ratio=decrease,fps=24",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "29",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
  ], preview);

  const allVideos = [project, ...(project.additional ?? [])];
  for (const video of allVideos) {
    run(`${project.slug} ${video.output}`, fullArgs(video), mediaPath(project.slug, video.output));
  }
}

gallery.forEach((source, index) => {
  const output = mediaPath("rebirth", `process-${String(index + 1).padStart(2, "0")}.webp`);
  run(`rebirth process ${index + 1}`, [
    "-i", source,
    "-frames:v", "1",
    "-vf", "scale=1400:-2:force_original_aspect_ratio=decrease",
    "-c:v", "libwebp",
    "-q:v", "72",
  ], output);
});

console.log("All web media is ready.");
