import React from 'react';
import MediaPreview from './MediaPreview';
import posImage from '../assets/POSsystem.png';
import mosqueImage from '../assets/masjidalquddus.png';
import coffeeImage from '../assets/coffeehauz.png';
import scheduleImage from '../assets/schedulconvertermmu.png';
import shahpiniImage from '../assets/Shahpini.png';

const projects = [
  {
    name: 'SPM SK 2023',
    desc: 'An SPM Computer Science project from 2023.',
    url: 'https://github.com/Ucopper441/SPM-SK-2023',
    urlLabel: 'View on GitHub',
    tags: ['Academic', 'Computer Science'],
  },
  {
    name: 'Programming Fundamental — Milestone 1',
    desc: 'A programming fundamentals coursework project for Milestone 1.',
    url: 'https://github.com/Ucopper441/Programming-Fundamental-Milestone-1-',
    urlLabel: 'View on GitHub',
    tags: ['Academic', 'Programming Fundamentals'],
  },
  {
    name: 'Custom Virtual Machine Interpreter',
    desc: 'A custom virtual machine interpreter project.',
    url: 'https://github.com/ellyazmir/Custom-Virtual-Machine-Interpreter',
    urlLabel: 'View on GitHub',
    tags: ['Virtual Machine', 'Interpreter'],
  },
  {
    name: 'POS System',
    image: posImage,
    desc: 'A point-of-sale (POS) system project.',
    url: 'https://github.com/Ucopper441/POS-System-',
    urlLabel: 'View on GitHub',
    tags: ['POS', 'System'],
  },
  {
    name: 'Masjid Al-Quddus',
    image: mosqueImage,
    desc: 'A production web platform developed to handle digital presence and community engagement for the mosque.',
    url: 'https://masjidalquddus.my',
    urlLabel: 'masjidalquddus.my',
    tags: ['Production', 'Web Platform', 'Community'],
  },
  {
    name: 'Coffee Hauz',
    image: coffeeImage,
    desc: 'Designed and deployed the official landing page for an outdoor industrial cafe in Taman Pinggiran Putra, focusing on brand identity and clean UI.',
    url: 'https://coffeehauz.com.my',
    urlLabel: 'coffeehauz.com.my',
    tags: ['Landing Page', 'Brand Identity', 'UI Design'],
  },
  {
    name: 'MMU Schedule Wallpaper Converter',
    image: scheduleImage,
    desc: 'A browser-based utility using Tesseract.js for client-side OCR parsing and html2canvas to export customized student lock screen wallpapers.',
    url: 'https://mmu-schedule-wallpaper-converter.vercel.app/',
    urlLabel: 'mmu-schedule-wallpaper-converter.vercel.app',
    tags: ['Tesseract.js', 'OCR', 'html2canvas', 'Utility'],
  },
  {
    name: 'Perniagaan Shahpini',
    image: shahpiniImage,
    desc: 'Engineered a custom production website and Vercel domain configuration for a Seri Kembangan construction contractor.',
    url: 'https://shahpini.com',
    urlLabel: 'shahpini.com',
    tags: ['Production', 'Vercel', 'Business'],
  },
  {
    name: 'Mosqscape App',
    desc: 'A Flutter-based mobile application repository built to handle specific ecosystem features.',
    url: 'https://github.com/Ucopper441/Mosqscape_app',
    urlLabel: 'View on GitHub',
    tags: ['Flutter', 'Mobile', 'Ecosystem'],
  },
];

export default function ProjectsWindow() {
  return (
    <div className="os-window__body">
      <p className="content-label">// projects.production</p>
      <h2 className="content-heading" style={{ fontSize: '20px' }}>Featured Projects</h2>
      <p className="content-text" style={{ marginBottom: '14px' }}>
        Live production systems and developer tools.
      </p>

      {projects.map((project, i) => (
        <div key={i} className="project-card">
          <div className="project-card__name">
            <span style={{ color: 'var(--ct-orange)', marginRight: '6px' }}>[{String(i).padStart(2, '0')}]</span>
            {project.name}
          </div>
          {project.image && (
            <MediaPreview src={project.image} alt={`${project.name} interface screenshot`} caption={`${project.name} · Interface preview`} />
          )}
          <p className="project-card__desc">{project.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div className="tag-list">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            {project.url && (
              <a
                className="project-card__link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ {project.urlLabel}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
