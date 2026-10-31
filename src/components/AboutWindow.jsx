import React from 'react';

export default function AboutWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// background</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Education &amp; Background</h2>
      <p className="content-text">
        Pursuing a <strong style={{ color: 'var(--ct-text-primary)' }}>Bachelor of Computer Science</strong> at
        Multimedia University (MMU) Cyberjaya. Passionate about building production-grade web systems
        and community-driven tech initiatives.
      </p>

      <hr className="content-divider" />

      <p className="content-label">// experience.freelance</p>
      <h2 className="content-heading" style={{ fontSize: '18px' }}>Freelance Developer</h2>
      <p className="content-text">
        My freelance work includes building websites, apps, custom systems, and
        point-of-sale (POS) systems, tailored to each client’s needs and business workflows.
      </p>

      <p className="content-label" style={{ marginTop: '18px' }}>// experience.part_time</p>
      <h2 className="content-heading" style={{ fontSize: '18px' }}>Officer — Perniagaan Shahpini</h2>
      <p className="content-subheading">&gt; Part-time</p>
      <p className="content-text">
        Prepared bills of quantities (BQ) and tender documents, conducted site visits,
        and attended meetings.
      </p>

      <hr className="content-divider" />

      <p className="content-label">// community.leadership</p>
      <h2 className="content-heading" style={{ fontSize: '18px' }}>GDGoC MMU Cyberjaya</h2>
      <p className="content-subheading">&gt; Google Developer Groups on Campus</p>
      <p className="content-text">
        <strong style={{ color: 'var(--ct-text-primary)' }}>Core Team Member</strong> — Software Engineering Division.
      </p>
      <p className="content-text">
        <strong style={{ color: 'var(--ct-text-primary)' }}>Event Director</strong> — Organized and directed
        Golang workshops and the <span style={{ color: 'var(--ct-orange)' }}>Hackathon Bersedia</span> workshop series,
        introducing students to Google Cloud, Firebase, Flutter, and Gemini API.
      </p>

    </div>
  );
}
