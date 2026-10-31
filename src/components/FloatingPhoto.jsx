import React, { useEffect, useRef, useState } from 'react';
import portrait from '../assets/gamba.jpeg';
import AppIcon from './AppIcon';

export default function FloatingPhoto() {
  const frameRef = useRef(null);
  const dragRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [minimized, setMinimized] = useState(false);

  const clampPosition = (x, y) => {
    const frame = frameRef.current;
    return {
      x: Math.max(0, Math.min(x, frame.parentElement.clientWidth - frame.offsetWidth)),
      y: Math.max(0, Math.min(y, frame.parentElement.clientHeight - frame.offsetHeight)),
    };
  };

  useEffect(() => {
    const frame = frameRef.current;
    const observer = new ResizeObserver(() => {
      setPosition(previous => previous ? clampPosition(previous.x, previous.y) : previous);
    });
    observer.observe(frame);
    observer.observe(frame.parentElement);
    return () => observer.disconnect();
  }, []);

  const startDrag = event => {
    if (event.button !== 0 || event.target.closest('button')) return;
    const frame = frameRef.current;
    const bounds = frame.getBoundingClientRect();
    dragRef.current = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = event => {
    if (!dragRef.current) return;
    const bounds = frameRef.current.parentElement.getBoundingClientRect();
    setPosition(clampPosition(
      event.clientX - bounds.left - dragRef.current.x,
      event.clientY - bounds.top - dragRef.current.y,
    ));
  };

  const moveWithKeyboard = event => {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (event.target !== event.currentTarget || !directions[event.key]) return;
    event.preventDefault();
    const frame = frameRef.current;
    const [x, y] = directions[event.key];
    setPosition(clampPosition(frame.offsetLeft + x * 16, frame.offsetTop + y * 16));
  };

  return (
    <aside
      ref={frameRef}
      className={`floating-photo ${minimized ? 'floating-photo--minimized' : ''}`}
      style={position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : undefined}
      aria-label="Profile photo"
    >
      <div
        className="os-window__titlebar floating-photo__handle"
        tabIndex={0}
        aria-label="Move photo: drag or use arrow keys"
        onKeyDown={moveWithKeyboard}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => { dragRef.current = null; }}
        onPointerCancel={() => { dragRef.current = null; }}
        onLostPointerCapture={() => { dragRef.current = null; }}
      >
        <span className="os-window__title floating-photo__title"><AppIcon name="photo" /> yusof.jpeg</span>
        <button
          className="os-window__control"
          title={minimized ? 'Restore photo' : 'Minimize photo'}
          aria-label={minimized ? 'Restore photo' : 'Minimize photo'}
          aria-expanded={!minimized}
          onClick={() => setMinimized(value => !value)}
        >{minimized ? '□' : '─'}</button>
      </div>
      {!minimized && <img className="floating-photo__image" src={portrait} alt="Muhammad Yusof Bin Shahilan" draggable={false} />}
    </aside>
  );
}
