"use client";

import Link from "next/link";
import { projects } from "./data/projects";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="返回首页">
          <span>ZM</span>
          <i>PORTFOLIO<br />INDEX / 26</i>
        </a>
        <div className="nav-links">
          <a href="#work">作品</a>
          <a href="#profile">简介</a>
          <a href="#contact">联系</a>
        </div>
        <a className="nav-contact" href="#contact">
          AVAILABLE <Arrow />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-noise" />

        <div className="hero-collage" aria-label="精选作品动态预览">
          {projects.map((project, index) => (
            <Link
              className={`collage-tile collage-tile-${index + 1}`}
              href={`/work/${project.slug}`}
              key={project.slug}
              aria-label={`查看${project.title}案例`}
            >
              <video autoPlay muted loop playsInline preload="metadata" poster={project.poster}>
                <source src={project.preview} type="video/mp4" />
              </video>
              <span className="collage-index">{project.index}</span>
              <span className="collage-title">{project.title}</span>
            </Link>
          ))}
        </div>

        <div className="hero-content container">
          <div className="hero-topline">
            <p>VISUAL / AI / FILM / EDITING</p>
            <p>SELECTED WORKS — 2026</p>
          </div>
          <h1><span>MING</span><span>XIAO</span></h1>
          <p className="hero-caption">Ideas need a visual system.<br />I build the one they deserve.</p>
          <div className="hero-stat">
            <span>///</span>
            <strong>05</strong>
            <p>Featured moving-image projects</p>
          </div>
          <a className="hero-start" href="#work">
            EXPLORE THE WORK <Arrow />
          </a>
          <div className="hero-statement">
            <span>WORK FIRST.</span>
            <strong>STORY ALWAYS.</strong>
          </div>
          <div className="hero-role"><span className="pulse" />OPEN TO INTERNSHIP · 2026</div>
        </div>
        <div className="hero-index">01 / 04 — SCROLL TO EXPLORE</div>
      </section>

      <section className="work section" id="work">
        <div className="container">
          <div className="section-heading dark-heading">
            <span>01 / SELECTED WORKS</span>
            <p>Five projects · One evolving practice</p>
          </div>
          <div className="work-intro">
            <h2>PROJECT<br /><i>INDEX</i></h2>
            <p>从 AIGC 影像到校园实拍，作品按完整度、独立创作程度与岗位相关性排序。</p>
          </div>

          <div className="project-index-list">
            {projects.map((project) => (
              <article className="index-project" key={project.slug}>
                <Link href={`/work/${project.slug}`}>
                  <div className="index-project-media">
                    <video muted loop playsInline preload="metadata" poster={project.poster}>
                      <source src={project.preview} type="video/mp4" />
                    </video>
                    <span className="project-play">PLAY <Arrow /></span>
                  </div>
                  <div className="index-project-copy">
                    <span className="project-number">{project.index}</span>
                    <div className="project-name">
                      <h3>{project.title}</h3>
                      <p>{project.enTitle}</p>
                    </div>
                    <p className="project-summary">{project.summary}</p>
                    <div className="project-facts">
                      <span>{project.category}</span>
                      <span>{project.duration}</span>
                      <span>{project.year}</span>
                    </div>
                    <span className="project-arrow"><Arrow /></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="profile section" id="profile">
        <div className="container">
          <div className="section-heading">
            <span>02 / PROFILE</span>
            <p>Short introduction, work stays central</p>
          </div>
          <div className="profile-grid">
            <p className="profile-lead">
              用设计、镜头与生成式工具，<em>把想法变成可以被看见的作品。</em>
            </p>
            <div className="profile-copy">
              <p>赵明啸，数字媒体技术本科在读。拥有广告视觉设计、实拍短片与 AIGC 视频制作经验，可独立完成策划、脚本分镜、素材生成、拍摄及后期剪辑。</p>
              <dl>
                <div><dt>Focus</dt><dd>AIGC / Film / Visual</dd></div>
                <div><dt>Based in</dt><dd>Shandong, China</dd></div>
                <div><dt>Status</dt><dd>Open to internship</dd></div>
              </dl>
            </div>
          </div>

          <div className="capability-row">
            <article><span>01</span><h3>AIGC 工作流</h3><p>脚本、分镜、人物场景、动态镜头与一致性控制。</p></article>
            <article><span>02</span><h3>拍摄与剪辑</h3><p>现场摄影、素材管理、节奏、字幕、音效与成片输出。</p></article>
            <article><span>03</span><h3>视觉设计</h3><p>PS、PR、AE、达芬奇与面向传播的视觉表达。</p></article>
            <article><span>04</span><h3>完整执行</h3><p>从概念到交付，兼顾创意、协作和落地效率。</p></article>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orb" />
        <div className="container contact-inner">
          <div className="eyebrow"><span className="pulse" />OPEN TO INTERNSHIP / COLLABORATION</div>
          <div>
            <p className="contact-kicker">作品仍在持续生长，期待下一次真实的创作与合作。</p>
            <a className="contact-title" href="mailto:2274793677@qq.com">
              LET&apos;S MAKE<br /><i>IT VISIBLE.</i>
              <span><Arrow /></span>
            </a>
          </div>
          <div className="contact-footer">
            <div><span>EMAIL</span><a href="mailto:2274793677@qq.com">2274793677@qq.com</a></div>
            <div><span>PHONE / WECHAT</span><a href="tel:+8615053465868">+86 150 5346 5868</a></div>
            <div><span>ROLE</span><p>VISUAL / AI / VIDEO</p></div>
            <p className="copyright">© 2026 ZHAO MINGXIAO</p>
          </div>
        </div>
      </section>
    </main>
  );
}
