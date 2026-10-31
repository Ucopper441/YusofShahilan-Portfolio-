import React from 'react';
import awardCertificates from '../assets/Itex&WYIE CERT.pdf?url';
import MediaPreview from './MediaPreview';
import itexPhoto from '../assets/itex.JPG';
import trophyPhoto from '../assets/MyieTrohpie.jpg';

export default function AchievementsWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// milestones.achievements</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Achievements</h2>
      <p className="content-text" style={{ marginBottom: '14px' }}>Awards, academic milestones, and qualifications.</p>

      <article className="project-card">
        <h3 className="project-card__name">ITEX 2023</h3>
        <MediaPreview src={itexPhoto} alt="Team members at the ITEX exhibition booth" caption="ITEX 2023 · At the exhibition" />
        <div className="tag-list"><span className="tag tag--accent">Gold Medal</span></div>
        <p style={{ marginTop: '10px' }}>
          <a className="project-card__link" href={awardCertificates} target="_blank" rel="noopener noreferrer" aria-label="View ITEX and WYIE certificates (PDF, opens in a new tab)">↗ View ITEX &amp; WYIE certificates (PDF)</a>
        </p>
      </article>

      <article className="project-card">
        <h3 className="project-card__name">WYIE 2023</h3>
        <div className="tag-list"><span className="tag tag--accent">Runner-up · 2nd Place</span></div>
        <p style={{ marginTop: '10px' }}>
          <a className="project-card__link" href={awardCertificates} target="_blank" rel="noopener noreferrer" aria-label="View ITEX and WYIE certificates (PDF, opens in a new tab)">↗ View ITEX &amp; WYIE certificates (PDF)</a>
        </p>
      </article>

      <article className="project-card">
        <h3 className="project-card__name">From the Awards</h3>
        <MediaPreview src={trophyPhoto} alt="MYIE 2023 Best Young Inventor trophy at the awards ceremony" caption="MYIE 2023 · Best Young Inventor trophy" portrait />
      </article>

      <article className="project-card">
        <h3 className="project-card__name">Malaysian University English Test (MUET)</h3>
        <p className="project-card__desc">Session 2, 2025</p>
        <div className="tag-list"><span className="tag tag--accent">Band 4.0</span><span className="tag">219 / 360</span></div>
      </article>

      <article className="project-card">
        <h3 className="project-card__name">Sijil Pelajaran Malaysia (SPM)</h3>
        <p className="project-card__desc">2023 · SMK Seksyen 3 Bandar Kinrara</p>
        <div className="tag-list"><span className="tag tag--accent">5 As</span><span className="tag">English CEFR B2</span></div>
        <p className="content-text" style={{ marginTop: '10px' }}>
          A in English, History, and Mathematics. A− in Islamic Education and Computer Science.
        </p>
      </article>
    </div>
  );
}
