import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FluidBackdrop from "../../components/FluidBackdrop";
import PortfolioVideoPlayer from "../../components/PortfolioVideoPlayer";
import { getAdjacentProjects, getProject, projects } from "../../data/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — 赵明啸作品集`,
    description: project.summary,
  };
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <main className="case-page" style={{ "--case-accent": project.accent } as CSSProperties}>
      <nav className="case-nav">
        <Link className="brand case-brand" href="/">
          <span>ZM</span><i>PORTFOLIO<br />INDEX / 26</i>
        </Link>
        <Link className="case-back" href="/#work">← BACK TO INDEX</Link>
        <a className="case-contact" href="mailto:2274793677@qq.com">CONTACT <Arrow /></a>
      </nav>

      <header className="case-hero">
        <div className="case-hero-media">
          <video autoPlay muted loop playsInline poster={project.poster}>
            <source src={project.preview} type="video/mp4" />
          </video>
          <div className="case-hero-shade" />
        </div>
        <div className="case-hero-copy container">
          <div className="case-kicker"><span>{project.index}</span><p>{project.category}</p><p>{project.year}</p></div>
          <h1>{project.enTitle}</h1>
          <p className="case-cn-title">{project.title}</p>
          <div className="case-hero-bottom">
            <p>{project.statement}</p>
            <span>SCROLL TO VIEW THE CASE ↓</span>
          </div>
        </div>
      </header>

      <section className="case-overview case-section">
        <div className="container">
          <div className="case-section-label">01 / OVERVIEW</div>
          <div className="case-overview-grid">
            <h2>{project.summary}</h2>
            <div className="case-overview-copy">
              <p>{project.background}</p>
              <dl>
                <div><dt>Role</dt><dd>{project.role}</dd></div>
                <div><dt>Duration</dt><dd>{project.duration}</dd></div>
                <div><dt>Year</dt><dd>{project.year}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="case-film case-section">
        <FluidBackdrop className="case-fluid" />
        <div className="container">
          <div className="case-section-label light-label">02 / FINAL FILM</div>
          <div className="case-film-heading">
            <h2>WATCH THE<br /><i>WORK.</i></h2>
            <p>点击播放器开启声音并观看完整成片。</p>
          </div>
          <div className="case-video-stack">
            {project.videos.map((video) => (
              <PortfolioVideoPlayer
                durationLabel={video.duration}
                label={video.label}
                poster={project.poster}
                src={video.src}
                key={video.src}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="case-system case-section">
        <div className="container">
          <div className="case-section-label">03 / CREATIVE SYSTEM</div>
          <div className="case-system-grid">
            <div>
              <span className="case-small-title">MY RESPONSIBILITIES</span>
              <ol>{project.responsibilities.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
            </div>
            <div>
              <span className="case-small-title">TOOLS</span>
              <div className="tool-cloud">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-process case-section">
        <div className="container">
          <div className="case-section-label">04 / PROCESS ARCHIVE</div>
          <div className="case-process-head">
            <h2>PROCESS,<br /><i>KEPT QUIET.</i></h2>
            <p>过程资料作为成片背后的证据保留在这里，不干扰主要观看路径。</p>
          </div>
          <details className="process-details">
            <summary><span>展开创作过程</span><b>＋</b></summary>
            <div className="process-content">
              <ol>{project.process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
              {project.gallery && (
                <div className="process-gallery">
                  {project.gallery.map((image, index) => <img src={image} alt={`${project.title}过程素材 ${index + 1}`} key={image} />)}
                </div>
              )}
            </div>
          </details>
        </div>
      </section>

      <section className="case-results case-section">
        <div className="container">
          <div className="case-section-label light-label">05 / OUTCOME</div>
          <div className="result-grid">
            {project.results.map((result, index) => <article key={result}><span>0{index + 1}</span><p>{result}</p></article>)}
          </div>
        </div>
      </section>

      <footer className="case-next">
        <FluidBackdrop className="case-fluid" />
        <Link href={`/work/${previous.slug}`}><span>PREVIOUS</span><p>{previous.title}</p></Link>
        <Link className="next-link" href={`/work/${next.slug}`}><span>NEXT PROJECT</span><p>{next.title} <Arrow /></p></Link>
      </footer>
    </main>
  );
}
