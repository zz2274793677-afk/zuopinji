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
    slug: "ai-spokesperson-01",
    index: "01",
    title: "企业合作 AI 数字人口播 01",
    enTitle: "ENTERPRISE AI SPOKESPERSON 01",
    category: "商业内容 / AI 数字人",
    year: "2026",
    duration: "00:29",
    role: "全流程负责",
    summary: "面向企业传播场景，完成数字人口播从内容梳理、数字人生成到画面包装与最终交付。",
    statement: "AI PRESENCE, SHAPED FOR BUSINESS COMMUNICATION.",
    background: "该项目服务于真实企业传播需求，合作信息不公开。我全流程负责内容整理、数字人画面生成、声音与口型处理、字幕包装、节奏控制及成片交付，让信息在短时间内被清晰、可信地传达。",
    preview: "/media/ai-spokesperson-01/preview.mp4",
    poster: "/media/ai-spokesperson-01/poster.jpg",
    accent: "#ff3828",
    tools: ["内容梳理", "AI 数字人工作流", "声音与口型合成", "字幕包装", "剪辑交付"],
    responsibilities: ["口播内容梳理与节奏规划", "数字人物与场景画面生成", "声音、口型与画面同步", "字幕和重点信息视觉包装", "成片校对与多端交付"],
    process: ["提炼企业传播内容与核心观点", "确定数字人物、场景和画面基调", "完成声音、口型及动作生成", "加入字幕和强调信息并控制节奏", "检查画面连贯性后输出成片"],
    results: ["完成 29 秒企业数字人口播成片", "独立覆盖从内容到交付的完整流程", "建立适用于短内容传播的数字人口播方法"],
    videos: [{ label: "完整成片", src: "/media/ai-spokesperson-01/full.mp4", duration: "00:29" }],
  },
  {
    slug: "ai-spokesperson-02",
    index: "02",
    title: "企业合作 AI 数字人口播 02",
    enTitle: "ENTERPRISE AI SPOKESPERSON 02",
    category: "商业内容 / AI 数字人",
    year: "2026",
    duration: "00:30",
    role: "全流程负责",
    summary: "以仓储商业场景承载口播信息，在有限时长内完成数字人物、重点字幕与传播节奏的统一。",
    statement: "TURN BUSINESS INFORMATION INTO A CLEAR VISUAL VOICE.",
    background: "该项目为企业合作内容，合作信息不公开。我从传播重点出发完成全流程制作，将数字人物置于匹配内容语境的商业场景中，并用字幕层级和节奏变化强化关键信息。",
    preview: "/media/ai-spokesperson-02/preview.mp4",
    poster: "/media/ai-spokesperson-02/poster.jpg",
    accent: "#ff3828",
    tools: ["传播内容拆解", "AI 数字人工作流", "场景视觉控制", "字幕动效", "剪辑交付"],
    responsibilities: ["传播信息拆解", "数字人物与场景设计", "口播声音和口型合成", "重点字幕与画面包装", "完整视频剪辑与输出"],
    process: ["拆分口播内容并设置视觉重点", "匹配数字人物与仓储场景", "生成连续口播画面", "添加字幕、图形与信息强调", "完成节奏校正和最终交付"],
    results: ["完成 30 秒竖屏数字人口播", "实现内容、人物与商业场景的统一", "形成可适配移动端传播的短视频成片"],
    videos: [{ label: "完整成片", src: "/media/ai-spokesperson-02/full.mp4", duration: "00:30" }],
  },
  {
    slug: "ai-spokesperson-03",
    index: "03",
    title: "企业合作 AI 数字人口播 03",
    enTitle: "ENTERPRISE AI SPOKESPERSON 03",
    category: "商业内容 / AI 数字人",
    year: "2026",
    duration: "00:30",
    role: "全流程负责",
    summary: "围绕企业短视频传播完成第三组数字人口播，以人物表现、字幕可读性和移动端观看效率为核心。",
    statement: "A DIGITAL PRESENTER, BUILT FOR FAST COMMUNICATION.",
    background: "作为同一商业传播方向的独立成片，本项目继续验证数字人口播在移动端短内容中的表达效率。合作信息不公开，我负责从内容组织到视觉生成、声音处理、剪辑包装和交付的全部环节。",
    preview: "/media/ai-spokesperson-03/preview.mp4",
    poster: "/media/ai-spokesperson-03/poster.jpg",
    accent: "#ff3828",
    tools: ["内容结构", "AI 数字人工作流", "声音与口型处理", "移动端字幕", "成片输出"],
    responsibilities: ["口播脚本信息编排", "数字人物表现控制", "场景与镜头连续性处理", "声音、字幕和节奏剪辑", "成片检查与输出交付"],
    process: ["明确移动端观看的首屏重点", "完成数字人物和场景生成", "调整动作、口型与声音配合", "优化字幕层级与画面节奏", "进行完整校对并交付"],
    results: ["完成 30 秒企业数字人口播成片", "独立完成全部制作环节", "提升竖屏商业信息的清晰度与观看效率"],
    videos: [{ label: "完整成片", src: "/media/ai-spokesperson-03/full.mp4", duration: "00:30" }],
  },
  {
    slug: "xunwei-dezhou",
    index: "04",
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
    index: "05",
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
    index: "06",
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
    index: "07",
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
    index: "08",
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
