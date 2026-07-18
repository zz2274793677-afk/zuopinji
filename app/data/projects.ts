export type ProjectVideo = {
  label: string;
  src: string;
  duration: string;
};

export type PortfolioProject = {
  slug: string;
  index: string;
  title: string;
  enTitle: string;
  category: string;
  year: string;
  duration: string;
  role: string;
  summary: string;
  statement: string;
  background: string;
  preview: string;
  poster: string;
  accent: string;
  tools: string[];
  responsibilities: string[];
  process: string[];
  results: string[];
  videos: ProjectVideo[];
  gallery?: string[];
};

export const projects: PortfolioProject[] = [
  {
    slug: "xunwei-dezhou",
    index: "01",
    title: "《寻味德州》",
    enTitle: "TASTE OF DEZHOU",
    category: "AIGC 微电影 · 毕业设计",
    year: "2026",
    duration: "试镜样片 00:33",
    role: "独立创作 / 全流程制作",
    summary: "围绕毕业设计搭建从脚本、分镜、人物场景到动态镜头与后期的完整 AIGC 影像工作流。",
    statement: "A LOCAL STORY, BUILT FRAME BY FRAME.",
    background: "《寻味德州》是正在推进中的 AIGC 微电影毕业设计。目前已完成前期试镜样片，用于验证人物与场景的一致性、镜头语言以及整套生成流程。后续成片会持续补充到这一案例中。",
    preview: "/media/xunwei-dezhou/preview.mp4",
    poster: "/media/xunwei-dezhou/poster.jpg",
    accent: "#ff3828",
    tools: ["DeepSeek", "ChatGPT", "GPT Image 2.0", "Codex", "即梦", "剪映 / PR"],
    responsibilities: ["选题策划与内容方向", "脚本、分镜与镜头统筹", "人物和场景视觉素材生成", "动态镜头生成与筛选", "后期剪辑与一致性校正"],
    process: ["建立人物与场景参考库", "拆分脚本并形成镜头清单", "生成关键帧并验证角色一致性", "用首尾帧和提示词控制动态镜头", "完成样片剪辑并持续迭代"],
    results: ["完成 33 秒前期试镜样片", "建立可继续扩展的毕业设计制作流程", "验证多工具协作下的 AIGC 影像生产方式"],
    videos: [{ label: "前期试镜样片", src: "/media/xunwei-dezhou/full.mp4", duration: "00:33" }],
  },
  {
    slug: "rebirth",
    index: "02",
    title: "《重生逆袭》",
    enTitle: "REBIRTH / REVERSAL",
    category: "AIGC 微短剧",
    year: "2026",
    duration: "两集共 02:43",
    role: "独立创作",
    summary: "从剧本到人物素材库，再到动态镜头和成片，独立完成两集连续叙事的 AIGC 微短剧。",
    statement: "CONSISTENCY TURNS GENERATION INTO STORYTELLING.",
    background: "项目以连续剧形式测试 AIGC 叙事能力。重点不只是生成单个好看的镜头，而是让人物、场景、情绪和节奏在两集内容中保持连贯。",
    preview: "/media/rebirth/preview.mp4",
    poster: "/media/rebirth/poster.jpg",
    accent: "#ff3828",
    tools: ["DeepSeek", "Vidu", "剪映电脑版", "提示词工作流"],
    responsibilities: ["两集剧本与分镜设计", "人物和场景素材库搭建", "AI 镜头生成与多轮筛选", "字幕、音效与节奏编排", "两集成片整合输出"],
    process: ["先完成角色定妆与场景基准", "按照分镜拆解镜头生成任务", "保留多轮生成结果并筛选可用片段", "修正人物外观和空间连续性", "完成字幕、音效和最终剪辑"],
    results: ["独立完成两集 AIGC 微短剧", "总时长约 2 分 43 秒", "形成包含剧本、分镜、素材库和废片筛选的完整过程档案"],
    videos: [
      { label: "第一集 · 重生归来", src: "/media/rebirth/episode-01.mp4", duration: "01:27" },
      { label: "第二集 · 改写命运", src: "/media/rebirth/episode-02.mp4", duration: "01:16" },
    ],
    gallery: [
      "/media/rebirth/process-01.webp",
      "/media/rebirth/process-02.webp",
      "/media/rebirth/process-03.webp",
      "/media/rebirth/process-04.webp",
      "/media/rebirth/process-05.webp",
      "/media/rebirth/process-06.webp",
    ],
  },
  {
    slug: "dorm-300",
    index: "03",
    title: "《宿舍300块》",
    enTitle: "THREE HUNDRED",
    category: "校园温情微电影",
    year: "2026",
    duration: "07:41",
    role: "导演 / 编剧 / 摄像 / 主导后期",
    summary: "围绕校园生活完成 29 镜分镜、剧本、现场拍摄与后期剪辑，是一次完整的团队实拍实践。",
    statement: "SMALL STORY. REAL EMOTION. COMPLETE PRODUCTION.",
    background: "这是一个校园温情微电影项目。我在团队中承担导演、编剧、摄像和主要后期工作，从文字脚本推进到现场调度，再把素材组织成完整成片。",
    preview: "/media/dorm-300/preview.mp4",
    poster: "/media/dorm-300/poster.jpg",
    accent: "#ff3828",
    tools: ["剧本创作", "分镜设计", "摄影摄像", "PR / 剪映", "现场调度"],
    responsibilities: ["29 镜分镜与剧本创作", "导演和演员调度", "现场摄影与素材管理", "主导后期剪辑", "声音、字幕与节奏调整"],
    process: ["根据校园题材完成剧本结构", "用分镜表明确景别与镜头任务", "组织演员与场景完成实拍", "筛选素材并重建叙事节奏", "完成成片输出"],
    results: ["完成约 7 分 41 秒实拍成片", "覆盖前期、拍摄与后期完整流程", "积累多人协作和现场执行经验"],
    videos: [{ label: "完整成片", src: "/media/dorm-300/full.mp4", duration: "07:41" }],
  },
  {
    slug: "three-minutes",
    index: "04",
    title: "《假如给我三分钟》",
    enTitle: "IF I HAD THREE MINUTES",
    category: "实拍短片",
    year: "2026",
    duration: "02:42",
    role: "除出演外全流程制作",
    summary: "独立承担除出演外的策划、拍摄与后期工作，以短时长完成完整表达。",
    statement: "THREE MINUTES. ONE COMPLETE EXPRESSION.",
    background: "项目以有限时长完成一次完整的实拍短片表达。我的工作覆盖前期规划、镜头执行、素材组织与后期成片，重点训练对节奏和信息密度的控制。",
    preview: "/media/three-minutes/preview.mp4",
    poster: "/media/three-minutes/poster.jpg",
    accent: "#ff3828",
    tools: ["策划", "摄影摄像", "剪辑", "声音设计", "字幕包装"],
    responsibilities: ["前期策划与拍摄安排", "现场镜头执行", "素材筛选与结构重组", "节奏、字幕和声音处理", "最终成片输出"],
    process: ["围绕短时长明确表达重点", "规划镜头并完成实拍", "筛选有效表演和环境素材", "通过剪辑压缩信息并建立节奏"],
    results: ["完成约 2 分 42 秒实拍短片", "独立覆盖除出演外的完整流程", "强化短内容的叙事压缩能力"],
    videos: [{ label: "完整成片", src: "/media/three-minutes/full.mp4", duration: "02:42" }],
  },
  {
    slug: "dormitory-name",
    index: "05",
    title: "《宿舍的名义》",
    enTitle: "IN THE NAME OF DORMITORY",
    category: "校园实拍 / 剪辑",
    year: "2026",
    duration: "05:40",
    role: "拍摄 / 剪辑",
    summary: "以校园宿舍为创作场景，负责现场拍摄与后期剪辑，将团队素材整理为完整作品。",
    statement: "CAMERA, RHYTHM, AND THE ENERGY OF A TEAM.",
    background: "项目以校园宿舍为主要创作环境。我负责拍摄与剪辑，在团队协作中完成镜头记录、素材管理和后期节奏组织。",
    preview: "/media/dormitory-name/preview.mp4",
    poster: "/media/dormitory-name/poster.jpg",
    accent: "#ff3828",
    tools: ["摄影摄像", "剪辑", "素材管理", "字幕", "音效"],
    responsibilities: ["现场拍摄与镜头记录", "素材整理和筛选", "后期结构与节奏编辑", "字幕和声音完善", "成片输出"],
    process: ["根据现场条件完成镜头采集", "整理多人协作产生的素材", "通过剪辑建立内容顺序和观看节奏", "完成声音与字幕处理"],
    results: ["完成约 5 分 40 秒成片", "承担核心拍摄与剪辑任务", "积累校园题材团队制作经验"],
    videos: [{ label: "完整成片", src: "/media/dormitory-name/full.mp4", duration: "05:40" }],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
