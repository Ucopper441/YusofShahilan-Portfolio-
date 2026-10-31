import React from 'react';

const socialLinks = [
  { name: 'GitHub', label: 'github.com/Ucopper441', url: 'https://github.com/Ucopper441' },
  { name: 'Instagram', label: '@yusof._sh', url: 'https://www.instagram.com/yusof._sh?srtk=MTBnY2ZzajFhcTVieA%3D%3D&utm_source=qr' },
  { name: 'TikTok', label: '@ucopper', url: 'https://www.tiktok.com/@ucopper?_r=1&_t=ZS-9B0Ou95YH2o' },
  { name: 'LinkedIn', label: 'Muhammad Yusof Bin Shahilan', url: 'https://www.linkedin.com/in/muhammd-yusof-bin-shahilan-b13a5232a?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  { name: 'Threads', label: '@kurmatimurtengah172', url: 'https://www.threads.com/@kurmatimurtengah172?igshid=NTc4MTIwNjQ2YQ==' },
];

export default function ContactWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// contact.channels</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Let's Connect</h2>
      <p className="content-text" style={{ marginBottom: '20px' }}>
        Open for freelance projects, collaboration, and tech community events.
      </p>

      <hr className="content-divider" />

      <p className="content-label">// email</p>
      <a
        href="mailto:yusofshahilan@gmail.com"
        className="retro-btn"
        style={{ marginBottom: '12px', marginTop: '6px' }}
      >
        📧 yusofshahilan@gmail.com
      </a>

      {socialLinks.map(({ name, label, url }) => (
        <React.Fragment key={name}>
          <p className="content-label">// {name.toLowerCase()}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="retro-btn retro-btn--outline"
            style={{ marginBottom: '12px', marginTop: '6px' }}
            aria-label={`${name}: ${label}`}
          >
            ↗ {label}
          </a>
        </React.Fragment>
      ))}

      <hr className="content-divider" />

      <p className="content-label">// availability</p>
      <div className="availability-badge">
        <span className="status-dot status-dot--online" />
        <span>Currently accepting new projects</span>
      </div>

      <hr className="content-divider" />
      <p style={{
        fontSize: '11px', color: 'var(--ct-text-dim)', marginTop: '16px', lineHeight: '1.8',
      }}>
        &gt; Response time: typically within 24 hours.
      </p>
    </div>
  );
}
