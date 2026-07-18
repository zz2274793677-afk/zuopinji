"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FluidBackdrop from "./components/FluidBackdrop";
import { projects } from "./data/projects";

const selectedProject = projects[0];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [backgroundProject, setBackgroundProject] = useState<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const activeProject = projects[activeIndex];

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--pointer-x", `${x * -18}px`);
      document.documentElement.style.setProperty("--pointer-y", `${y * -12}px`);
      document.documentElement.style.setProperty("--pointer-frame-x", `${x * 7}px`);
      document.documentElement.style.setProperty("--pointer-frame-y", `${y * 5}px`);
    });
  }

  function selectProject(index: number) {
    setActiveIndex(index);
    setBackgroundProject(index);
  }

  return (
    <main className="portfolio" onPointerMove={handlePointerMove}>
      <div className="ambient" aria-hidden="true">
        <FluidBackdrop className="ambient__fluid" scope="window" />
        {projects.map((project, index) => (
          <video
            className={`ambient__video ${backgroundProject === index ? "is-visible" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={project.poster}
            key={project.slug}
          >
            <source src={project.preview} type="video/mp4" />
          </video>
        ))}
        <div className="ambient__shade" />
      </div>

      <nav className="site-nav container" aria-label="主导航">
        <a className="site-brand" href="#top" aria-label="返回首页">
          <strong>ZHAO MINGXIAO</strong>
          <span>赵明啸</span>
        </a>
        <div className="site-nav__links">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
        <span className="site-nav__dot" aria-hidden="true" />
      </nav>

      <section className="stage-hero" id="top">
        <p className="hero-role">VISUAL DESIGNER / AI DESIGNER / BRAND DESIGNER</p>
        <h1 className="hero-wordmark" aria-label="Mingxiao">MINGXIAO</h1>

        <div className="hero-copy container">
          <p className="hero-edition">PORTFOLIO · 2026</p>
          <div className="hero-headline">
            <h2>影像级<br />视觉构建</h2>
            <p>为品牌与故事，打造可被记住的视觉系统</p>
            <span>BUILD VISUAL SYSTEMS THAT<br />BRANDS AND STORIES<br />WORTH REMEMBERING</span>
          </div>
          <Link className="hero-cta" href={`/work/${selectedProject.slug}`}>
            <b>PLAY</b>
            <span>ENTER PROJECT</span>
          </Link>
        </div>

        <Link className="hero-film" href={`/work/${selectedProject.slug}`} aria-label={`进入${selectedProject.title}项目案例`}>
          <img src={selectedProject.poster} alt="" />
          <video autoPlay muted loop playsInline preload="metadata" poster={selectedProject.poster}>
            <source src={selectedProject.preview} type="video/mp4" />
          </video>
          <span className="hero-film__index">01 / FEATURED FILM</span>
          <span className="hero-film__title">{selectedProject.title} · {selectedProject.enTitle}</span>
        </Link>

        <p className="hero-manifesto">DESIGN <span>IS NOT</span> DECORATION</p>
        <a className="hero-scroll" href="#work">SCROLL TO WORK</a>
      </section>

      <section
        className="project-stage"
        id="work"
        onPointerLeave={() => setBackgroundProject(null)}
      >
        <div className="container project-stage__inner">
          <div className="project-stage__heading">
            <span>01 / SELECTED WORK</span>
            <p>五个真实项目 · 站内播放 · 独立案例页</p>
          </div>

          <div className="active-project">
            <div className="active-project__copy">
              <span className="active-project__number">{activeProject.index} / PROJECT</span>
              <h2>{activeProject.title}<br /><i>{activeProject.enTitle}</i></h2>
              <dl>
                <div><dt>ROLE</dt><dd>{activeProject.role}</dd></div>
                <div><dt>YEAR</dt><dd>{activeProject.year}</dd></div>
                <div><dt>TYPE</dt><dd>{activeProject.category}</dd></div>
              </dl>
              <p>{activeProject.summary}</p>
              <Link className="text-link" href={`/work/${activeProject.slug}`}>VIEW FULL CASE</Link>
            </div>

            <Link className="active-project__media" href={`/work/${activeProject.slug}`} aria-label={`查看${activeProject.title}完整案例`}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={activeProject.poster}
                key={activeProject.preview}
              >
                <source src={activeProject.preview} type="video/mp4" />
              </video>
              <span className="media-play">PLAY FILM</span>
            </Link>
          </div>

          <div className="project-rail" role="list" aria-label="项目切换">
            {projects.map((project, index) => (
              <button
                className={activeIndex === index ? "is-active" : ""}
                type="button"
                onClick={() => selectProject(index)}
                onPointerEnter={() => selectProject(index)}
                onFocus={() => selectProject(index)}
                aria-pressed={activeIndex === index}
                aria-label={`切换到${project.title}`}
                key={project.slug}
              >
                <strong>{project.index}</strong>
                <span>{project.title}<small>{project.enTitle}</small></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stage" id="about">
        <div className="container about-stage__inner">
          <div className="about-stage__copy">
            <span>02 / ABOUT</span>
            <h2>我用视觉思考，<br />用设计建立秩序。</h2>
            <p>I THINK WITH VISUALS.<br />I BUILD ORDER THROUGH DESIGN.</p>
            <a className="text-link" href="mailto:2274793677@qq.com">LET&apos;S CONNECT</a>
          </div>
          <div className="about-stage__profile">
            <p>赵明啸，山东外国语职业技术大学数字媒体技术本科在读。专注视觉设计、AI 影像与品牌表达，能够从策划、脚本和分镜出发，完成生成、拍摄、剪辑与最终呈现。</p>
            <dl>
              <div><dt>05</dt><dd>SELECTED PROJECTS<br />精选项目</dd></div>
              <div><dt>02</dt><dd>CREATIVE MODES<br />AIGC / 实拍</dd></div>
              <div><dt>2026</dt><dd>PORTFOLIO STATUS<br />持续更新</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <footer className="contact-stage" id="contact">
        <div className="container contact-stage__inner">
          <span>03 / CONTACT</span>
          <p>OPEN TO INTERNSHIP<br />AND CREATIVE COLLABORATION</p>
          <a href="mailto:2274793677@qq.com">2274793677@qq.com</a>
          <a href="tel:+8615053465868">+86 150 5346 5868</a>
          <small>© 2026 ZHAO MINGXIAO · SHANDONG, CHINA</small>
        </div>
      </footer>
    </main>
  );
}
