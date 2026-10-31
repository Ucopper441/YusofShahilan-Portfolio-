import React from 'react';

export default function AchievementsWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// milestones.academic</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Achievements</h2>
      <p className="content-text" style={{ marginBottom: '14px' }}>Academic milestones and qualifications.</p>

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
