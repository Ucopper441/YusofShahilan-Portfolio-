import React from 'react';

export default function MediaPreview({ src, alt, caption, portrait = false }) {
  return (
    <figure className={`media-preview ${portrait ? 'media-preview--portrait' : ''}`}>
      <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`View full-size image: ${alt} (opens in a new tab)`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <span className="media-preview__expand" aria-hidden="true">↗ Full size</span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
