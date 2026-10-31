import React, { useState, useEffect, useCallback, useRef } from 'react';
import BootSequence from './BootSequence';
import HomeWindow from './HomeWindow';
import AboutWindow from './AboutWindow';
import ProjectsWindow from './ProjectsWindow';
import StackWindow from './StackWindow';
import ContactWindow from './ContactWindow';
import AchievementsWindow from './AchievementsWindow';
import CertificationsWindow from './CertificationsWindow';
import FloatingPhoto from './FloatingPhoto';
import AppIcon from './AppIcon';

const WINDOWS = [
  { id: 'home', label: 'home.exe', icon: '🏠', component: HomeWindow },
  { id: 'about', label: 'about.exe', icon: '👤', component: AboutWindow },
  { id: 'achievements', label: 'achievements.exe', icon: '🏆', component: AchievementsWindow },
  { id: 'certifications', label: 'certifications.exe', icon: '📜', component: CertificationsWindow },
  { id: 'projects', label: 'projects.exe', icon: '📁', component: ProjectsWindow },
  { id: 'stack', label: 'stack.exe', icon: '⚙', component: StackWindow },
  { id: 'contact', label: 'contact.exe', icon: '📧', component: ContactWindow },
];

export default function RetroOS() {
  const [booted, setBooted] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [clock, setClock] = useState('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [zCounter, setZCounter] = useState(10);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    // Auto-open home window after boot
    setTimeout(() => {
      openWindow('home');
    }, 300);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setClock(`${h}:${m}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = (id) => {
    setStartMenuOpen(false);
    if (openWindows.find(w => w.id === id)) {
      // Already open — just focus it
      focusWindow(id);
      return;
    }
    const win = WINDOWS.find(w => w.id === id);
    if (!win) return;
    const newZ = zCounter + 1;
    setZCounter(newZ);
    setOpenWindows(prev => [...prev, { ...win, z: newZ, minimized: false }]);
    setActiveWindow(id);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter(w => w.id !== id);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const focusWindow = (id) => {
    const newZ = zCounter + 1;
    setZCounter(newZ);
    setOpenWindows(prev => prev.map(w =>
      w.id === id ? { ...w, z: newZ, minimized: false } : w
    ));
    setActiveWindow(id);
  };

  const minimizeWindow = (id) => {
    setOpenWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
    if (activeWindow === id) {
      const visible = openWindows.filter(w => w.id !== id && !w.minimized);
      setActiveWindow(visible.length > 0 ? visible[visible.length - 1].id : null);
    }
  };

  const toggleMinimize = (id) => {
    const win = openWindows.find(w => w.id === id);
    if (win && win.minimized) {
      focusWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="crt-screen" onClick={() => startMenuOpen && setStartMenuOpen(false)}>
      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <>
          {/* Desktop area with icons */}
          <div className="os-desktop">
            <div className="desktop-icons">
              {WINDOWS.map((win, i) => (
                <button
                  key={win.id}
                  className="desktop-icon"
                  title={win.label}
                  aria-label={`Open ${win.id}`}
                  onClick={() => openWindow(win.id)}
                >
                  <span className="desktop-icon__glyph"><AppIcon name={win.id} /></span>
                  <span className="desktop-icon__label">{win.id}<span className="desktop-icon__extension">.exe</span></span>
                </button>
              ))}
            </div>

            <FloatingPhoto />

            {/* Open windows */}
            {openWindows.map((win) => {
              const Comp = win.component;
              return (
                <DraggableWindow
                  key={win.id}
                  id={win.id}
                  title={win.label}
                  z={win.z}
                  isActive={activeWindow === win.id}
                  minimized={win.minimized}
                  onFocus={() => focusWindow(win.id)}
                  onClose={() => closeWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                >
                  <Comp />
                </DraggableWindow>
              );
            })}
          </div>

          {/* Taskbar */}
          <div className="os-taskbar">
            <button
              className={`os-taskbar__start ${startMenuOpen ? 'os-taskbar__start--active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
            >
              <div className="os-taskbar__start-icon">
                <span /><span /><span /><span />
              </div>
              CLEM OS
            </button>

            <div className="os-taskbar__tabs">
              {openWindows.map(win => (
                <button
                  key={win.id}
                  className={`os-taskbar__tab ${activeWindow === win.id && !win.minimized ? 'os-taskbar__tab--active' : ''}`}
                  onClick={() => toggleMinimize(win.id)}
                >
                  <AppIcon name={win.id} />
                  {win.label}
                </button>
              ))}
            </div>

            <div className="os-taskbar__tray">
              <span className="os-taskbar__tray-dot" />
              <span className="os-taskbar__clock">{clock}</span>
            </div>
          </div>

          {/* Start menu */}
          {startMenuOpen && (
            <div className="start-menu" onClick={(e) => e.stopPropagation()}>
              <div className="start-menu__sidebar">
                <span className="start-menu__sidebar-text">CLEM OS</span>
              </div>
              <div className="start-menu__items">
                {WINDOWS.map(win => (
                  <button
                    key={win.id}
                    className="start-menu__item"
                    onClick={() => openWindow(win.id)}
                  >
                    <span className="start-menu__item-icon"><AppIcon name={win.id} /></span>
                    <span className="start-menu__item-label">{win.label}</span>
                  </button>
                ))}
                <div className="start-menu__divider" />
                <div className="start-menu__item start-menu__item--info">
                  <span className="start-menu__item-icon">💡</span>
                  <span className="start-menu__item-label" style={{ color: 'var(--ct-text-dim)' }}>
                    v1.0 — Clementine Tech
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


/* ─── Draggable Window ─────────────────────── */

function DraggableWindow({ id, title, z, isActive, minimized, onFocus, onClose, onMinimize, children }) {
  const windowRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [maximized, setMaximized] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Center window on first render
  useEffect(() => {
    if (windowRef.current && !initialized) {
      const el = windowRef.current;
      const parent = el.parentElement;
      if (parent) {
        const px = Math.max(20, (parent.clientWidth - el.offsetWidth) / 2);
        const py = Math.max(10, (parent.clientHeight - el.offsetHeight) / 2.5);
        // Slight random offset so stacked windows don't perfectly overlap
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 30;
        setPos({
          x: Math.max(0, Math.min(px + offsetX, parent.clientWidth - el.offsetWidth)),
          y: Math.max(0, Math.min(py + offsetY, parent.clientHeight - el.offsetHeight)),
        });
        setInitialized(true);
      }
    }
  }, [initialized]);

  const onPointerDown = (e) => {
    if (maximized) return;
    onFocus();
    dragging.current = true;
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const parent = windowRef.current.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const x = e.clientX - parentRect.left - dragOffset.current.x;
    const y = e.clientY - parentRect.top - dragOffset.current.y;
    setPos({ x: Math.max(0, x), y: Math.max(0, y) });
  };

  const onPointerUp = () => {
    dragging.current = false;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  if (minimized) return null;

  return (
    <div
      ref={windowRef}
      className={`os-window ${isActive ? 'os-window--active' : 'os-window--inactive'} ${maximized ? 'os-window--maximized' : ''}`}
      style={{
        zIndex: z,
        left: maximized ? 0 : pos.x,
        top: maximized ? 0 : pos.y,
        width: maximized ? '100%' : undefined,
        height: maximized ? '100%' : undefined,
      }}
      onPointerDown={onFocus}
    >
      <div className="os-window__titlebar" onPointerDown={onPointerDown}>
        <span className="os-window__title">{title}</span>
        <div className="os-window__controls">
          <button className="os-window__control" onClick={(e) => { e.stopPropagation(); onMinimize(); }} title="Minimize">─</button>
          <button className="os-window__control" onClick={(e) => { e.stopPropagation(); setMaximized(!maximized); }} title="Maximize">□</button>
          <button className="os-window__control os-window__control--close" onClick={(e) => { e.stopPropagation(); onClose(); }} title="Close">✕</button>
        </div>
      </div>
      {children}
    </div>
  );
}
