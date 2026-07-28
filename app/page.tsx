"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import FluidBackdrop from "./components/FluidBackdrop";
import { projects } from "./data/projects";

const selectedProject = projects[0];
const featuredProjects = projects.slice(0, 3);

export default function Home() {
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollFrame: number | null = null;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const updateRevealProgress = () => {
      scrollFrame = null;

      if (reduceMotion.matches) {
        revealElements.forEach((element) => {
          element.style.removeProperty("--scroll-opacity");
          element.style.removeProperty("--scroll-y");
          element.style.removeProperty("--scroll-blur");
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const enterProgress = clamp(
          (viewportHeight * 0.94 - rect.top) / (viewportHeight * 0.34),
        );
        const exitProgress = clamp(
          (viewportHeight * 0.16 - rect.bottom) / (viewportHeight * 0.42),
        );
        const visibility = clamp(Math.min(enterProgress, 1 - exitProgress));
        const translateY = (1 - enterProgress) * 52 - exitProgress * 28;
        const blur = (1 - visibility) * 8;

        element.style.setProperty("--scroll-opacity", visibility.toFixed(3));
        element.style.setProperty("--scroll-y", `${translateY.toFixed(2)}px`);
        element.style.setProperty("--scroll-blur", `${blur.toFixed(2)}px`);
      });
    };

    const queueRevealUpdate = () => {
      if (scrollFrame !== null) return;
      scrollFrame = requestAnimationFrame(updateRevealProgress);
    };

    updateRevealProgress();
    window.addEventListener("scroll", queueRevealUpdate, { passive: true });
    window.addEventListener("resize", queueRevealUpdate);
    reduceMotion.addEventListener("change", queueRevealUpdate);

    return () => {
      if (scrollFrame !== null) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queueRevealUpdate);
      window.removeEventListener("resize", queueRevealUpdate);
      reduceMotion.removeEventListener("change", queueRevealUpdate);
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

  return (
    <main className="portfolio" onPointerMove={handlePointerMove}>
      <div className="ambient" aria-hidden="true">
        <FluidBackdrop className="ambient__fluid" scope="window" />
        <div className="ambient__shade" />
      </div>

      <nav className="site-nav container" aria-label="主导航">
        <a className="site-brand" href="#top" aria-label="返回首页">
          <strong>ZHAO MINGXIAO</strong>
          <span>赵明啸</span>
        </a>
        <div className="site-nav__links">
          <a href="#featured">FEATURED</a>
          <a href="#work">ALL WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
        <span className="site-nav__dot" aria-hidden="true" />
      </nav>

      <section className="stage-hero scroll-reveal" id="top" data-scroll-reveal>
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
            <span>ENTER NEW PROJECT</span>
          </Link>
        </div>

        <Link className="hero-film hero-film--portrait" href={`/work/${selectedProject.slug}`} aria-label={`进入${selectedProject.title}项目案例`}>
          <img src={selectedProject.poster} alt="" />
          <video autoPlay muted loop playsInline preload="metadata" poster={selectedProject.poster}>
            <source src={selectedProject.preview} type="video/mp4" />
          </video>
          <span className="hero-film__index">01 / NEW FEATURED</span>
          <span className="hero-film__title">{selectedProject.title}</span>
        </Link>

        <p className="hero-manifesto">DESIGN <span>IS NOT</span> DECORATION</p>
        <a className="hero-scroll" href="#featured">SCROLL TO WORK</a>
      </section>

      <section className="featured-stage" id="featured">
        <div className="container">
          <div className="section-heading scroll-reveal" data-scroll-reveal>
            <span>01 / NEW FEATURED</span>
            <div>
              <h2>企业合作<br />AI 数字人口播</h2>
              <p>三条独立商业内容，全部由我全流程负责。</p>
            </div>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <Link
                className={`featured-card featured-card--${index + 1} scroll-reveal`}
                href={`/work/${project.slug}`}
                data-scroll-reveal
                key={project.slug}
              >
                <div className="featured-card__media">
                  <img src={project.poster} alt={`${project.title}封面`} />
                  <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
                    <source src={project.preview} type="video/mp4" />
                  </video>
                  <span className="featured-card__play">VIEW CASE ↗</span>
                </div>
                <div className="featured-card__meta">
                  <span>{project.index}</span>
                  <h3>{project.title}</h3>
                  <p>{project.category} · {project.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="work-index" id="work">
        <div className="container">
          <div className="section-heading section-heading--compact scroll-reveal" data-scroll-reveal>
            <span>02 / ALL WORK</span>
            <div>
              <h2>全部作品</h2>
              <p>八个项目全部直接可见，点击任意卡片进入完整案例。</p>
            </div>
          </div>

          <div className="work-grid">
            {projects.map((project) => (
              <Link className="work-card scroll-reveal" href={`/work/${project.slug}`} data-scroll-reveal key={project.slug}>
                <div className="work-card__media">
                  <img src={project.poster} alt={`${project.title}封面`} />
                  <span>OPEN PROJECT ↗</span>
                </div>
                <div className="work-card__copy">
                  <b>{project.index}</b>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.enTitle}</p>
                  </div>
                  <small>{project.category}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stage" id="about">
        <div className="container about-stage__inner scroll-reveal" data-scroll-reveal>
          <div className="about-stage__copy">
            <span>03 / ABOUT</span>
            <h2>我用视觉思考，<br />用设计建立秩序。</h2>
            <p>I THINK WITH VISUALS.<br />I BUILD ORDER THROUGH DESIGN.</p>
            <a className="text-link" href="mailto:2274793677@qq.com">LET&apos;S CONNECT</a>
          </div>
          <div className="about-stage__profile">
            <p>赵明啸，山东外国语职业技术大学数字媒体技术本科在读。专注视觉设计、AI 影像与品牌表达，能够从策划、脚本和分镜出发，完成生成、拍摄、剪辑与最终呈现。</p>
            <dl>
              <div><dt>08</dt><dd>SELECTED PROJECTS<br />精选项目</dd></div>
              <div><dt>03</dt><dd>CREATIVE MODES<br />商业 / AIGC / 实拍</dd></div>
              <div><dt>2026</dt><dd>PORTFOLIO STATUS<br />持续更新</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <footer className="contact-stage" id="contact">
        <div className="container contact-stage__inner scroll-reveal" data-scroll-reveal>
          <span>04 / CONTACT</span>
          <p>OPEN TO INTERNSHIP<br />AND CREATIVE COLLABORATION</p>
          <a href="mailto:2274793677@qq.com">2274793677@qq.com</a>
          <a href="tel:+8615053465868">+86 150 5346 5868</a>
          <small>© 2026 ZHAO MINGXIAO · SHANDONG, CHINA</small>
        </div>
      </footer>
    </main>
  );
}
