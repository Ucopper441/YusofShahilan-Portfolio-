import React from 'react';

const techStack = [
  { category: 'Frontend', items: ['Astro', 'HTML/CSS', 'Tailwind CSS v4', 'JavaScript', 'TypeScript'] },
  { category: 'Backend & Cloud', items: ['PHP (Laravel)', 'Python (Flask)', 'Google Cloud Run', 'Firebase', 'Supabase'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'openGauss'] },
  { category: 'Mobile & Systems', items: ['Flutter', 'C++', 'Docker Desktop', 'WSL2 Ubuntu'] },
];

export default function StackWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// system.capabilities</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Technical Arsenal</h2>
      <p className="content-text" style={{ marginBottom: '14px' }}>
        Technologies and tools in active rotation.
      </p>

      <div className="tech-grid">
        {techStack.map((section, i) => (
          <div key={i}>
            <div className="tech-category__title">{section.category}</div>
            {section.items.map((item, j) => (
              <div key={j} className="cert-item" style={{ padding: '3px 0' }}>
                <span className="cert-item__bullet">▸</span>
                <span className="cert-item__text">{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <hr className="content-divider" />

      <p className="content-label">// tools.matrix</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '6px',
        marginTop: '8px'
      }}>
        {techStack.flatMap(s => s.items).map((item, i) => (
          <div key={i} className={`tech-chip ${i % 3 === 0 ? 'tech-chip--accent' : ''}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
