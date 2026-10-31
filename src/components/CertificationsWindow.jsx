import React from 'react';
import android from '../assets/Android Studio Cert.pdf?url';
import cloud from '../assets/cloud-untuk-rakyat.pdf?url';
import firebase from '../assets/Firebase Workshop eCert.pdf?url';
import flutter from '../assets/Flutter Cert.pdf?url';
import gemini from '../assets/Gemini API Worksop eCert.pdf?url';
import golang from '../assets/GolangCert.pdf?url';
import cloudRun from '../assets/Google Cloud Run Cert.pdf?url';
import quantum from '../assets/quantum-computing.pdf?url';

const certificates = [
  { name: 'Cloud untuk Rakyat', date: '31 October 2026', url: cloud },
  { name: 'Quantum Computing', date: '31 October 2026', url: quantum },
  { name: 'Go With The Flow: Go Lang Workshop', date: '15 August 2026', url: golang },
  { name: 'Android Studio Workshop', date: '16 May 2026', url: android },
  { name: 'Hackathon Bersedia! Introduction to Google Cloud Run Workshop', date: '12 March 2026', url: cloudRun },
  { name: 'Hackathon Bersedia! Introduction to Gemini API Workshop', date: '22 January 2026', url: gemini },
  { name: 'Hackathon Bersedia! Introduction to Firebase Workshop', date: '7–8 January 2026', url: firebase },
  { name: 'Hackathon Bersedia! Introduction to Flutter Workshop', date: '27–28 December 2025', url: flutter },
];

export default function CertificationsWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// learning.certifications</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Certifications</h2>
      <p className="content-text" style={{ marginBottom: '14px' }}>
        Certificates from technical workshops and learning programmes.
      </p>
      {certificates.map(cert => (
        <article className="project-card" key={cert.name}>
          <h3 className="project-card__name">{cert.name}</h3>
          <p className="project-card__desc">{cert.date}</p>
          <a className="project-card__link" href={cert.url} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${cert.name} (PDF, opens in a new tab)`}>
            ↗ View certificate (PDF)
          </a>
        </article>
      ))}
    </div>
  );
}
