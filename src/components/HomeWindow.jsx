import React from 'react';

export default function HomeWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// system.identity</p>
      <h1 className="content-heading">Muhammad Yusof<br />Bin Shahilan</h1>
      <p className="content-subheading">
        &gt; Freelance Full-Stack Developer &amp; Computer Science Student specializing in Software Engineering.
      </p>
      <hr className="content-divider" />
      <p className="content-label">// contact.email</p>
      <p className="content-text">
        <a className="project-card__link" href="mailto:yusofshahilan@gmail.com">
          📧 yusofshahilan@gmail.com
        </a>
      </p>
      <hr className="content-divider" />
      <p className="content-label">// status</p>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
        <span className="status-dot status-dot--online" />
        <span className="content-text" style={{ margin: 0 }}>
          Available for freelance projects
        </span>
      </div>
      <hr className="content-divider" />
      <p className="content-label">// stack.preview</p>
      <div className="tag-list">
        {['Astro', 'React', 'Laravel', 'Flutter', 'Firebase', 'PostgreSQL', 'GCP'].map(tag => (
          <span key={tag} className="tag tag--accent">{tag}</span>
        ))}
      </div>
    </div>
  );
}
