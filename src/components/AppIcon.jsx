import React from 'react';

const paths = {
  home: <><path d="m3 10 9-7 9 7v11H3Z" /><path d="M9 21v-8h6v8" /></>,
  about: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-3a8 8 0 0 1 16 0v3Z" /></>,
  achievements: <><path d="M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 14v7m-5 0h10" /></>,
  certifications: <><path d="M5 3h14v12H5Z" /><path d="M8 7h8M8 10h5" /><circle cx="12" cy="16" r="3" /><path d="m10 19-1 3 3-1 3 1-1-3" /></>,
  projects: <path d="M3 6h7l2 3h9v12H3ZM3 9V4h7l2 2h7v3" />,
  stack: <><path d="m12 3 10 5-10 5L2 8ZM2 12l10 5 10-5M2 16l10 5 10-5" /></>,
  contact: <><rect x="2" y="5" width="20" height="14" rx="1" /><path d="m2 6 10 8L22 6" /></>,
  photo: <><rect x="2" y="5" width="20" height="16" rx="1" /><circle cx="8" cy="10" r="2" /><path d="m3 20 6-6 4 4 4-6 5 8" /></>,
};

export default function AppIcon({ name }) {
  return <svg className="app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
