import * as THREE from 'three';

export class SceneManager {
  constructor(container) {
    this.container = container;
    this.mouse = { x: 0, y: 0 };
    this.targetCameraPos = { x: 0, y: 0 };
    this.clock = new THREE.Clock();
    this.onProjectionUpdate = null; // callback for screen overlay position
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Responsive camera distance — closer on desktop for a bigger screen
    this.isMobile = window.innerWidth < 768;
    const camZ = this.isMobile ? 10 : 8;
    this.camera.position.set(0, 3, camZ);
    this.camera.lookAt(0, 3.0, -0.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    this.setupLights();
    this.buildDesk();
    this.buildMonitor();
    this.setupEventListeners();
    this.animate();
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0x1a1a2e, 0.6);
    this.scene.add(ambient);

    const deskLight = new THREE.SpotLight(0xffa94d, 3, 20, Math.PI / 5, 0.5, 1);
    deskLight.position.set(-4, 8, 5);
    deskLight.target.position.set(0, 1, 0);
    deskLight.castShadow = true;
    deskLight.shadow.mapSize.set(1024, 1024);
    this.scene.add(deskLight);
    this.scene.add(deskLight.target);

    const screenGlow = new THREE.PointLight(0xe8751a, 1.5, 10, 2);
    screenGlow.position.set(0, 3.5, 3);
    this.scene.add(screenGlow);

    const rimLight = new THREE.DirectionalLight(0x4a90d9, 0.4);
    rimLight.position.set(3, 5, -3);
    this.scene.add(rimLight);
  }

  buildDesk() {
    // Background wall
    const wallGeo = new THREE.PlaneGeometry(30, 20);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d12, roughness: 0.95, metalness: 0.0,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 5, -3);
    wall.receiveShadow = true;
    this.scene.add(wall);

    // Desk surface
    const deskGeo = new THREE.BoxGeometry(14, 0.3, 6);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x1a1510, roughness: 0.7, metalness: 0.1,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -0.15, 1);
    desk.receiveShadow = true;
    desk.castShadow = true;
    this.scene.add(desk);

    // Desk legs
    const legGeo = new THREE.BoxGeometry(0.3, 3, 0.3);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x111111, roughness: 0.6, metalness: 0.3,
    });
    [[-6.5, -1.5, 3.5], [6.5, -1.5, 3.5], [-6.5, -1.5, -1.2], [6.5, -1.5, -1.2]].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      this.scene.add(leg);
    });

    // Keyboard
    const kbGeo = new THREE.BoxGeometry(3.2, 0.12, 1.2);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.2 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 0.06, 2.8);
    keyboard.castShadow = true;
    this.scene.add(keyboard);

    // Key rows
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        const keyGeo = new THREE.BoxGeometry(0.2, 0.05, 0.2);
        const keyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.3 });
        const key = new THREE.Mesh(keyGeo, keyMat);
        key.position.set(-1.35 + col * 0.245, 0.14, 2.35 + row * 0.28);
        this.scene.add(key);
      }
    }

    // Mouse
    const mouseGeo = new THREE.BoxGeometry(0.5, 0.15, 0.8);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.3, metalness: 0.15 });
    const mouseMesh = new THREE.Mesh(mouseGeo, mouseMat);
    mouseMesh.position.set(2.8, 0.08, 2.8);
    mouseMesh.castShadow = true;
    this.scene.add(mouseMesh);

    // Coffee mug
    const mugGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.6, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xe8751a, roughness: 0.4, metalness: 0.1 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-4.5, 0.3, 1.5);
    mug.castShadow = true;
    this.scene.add(mug);

    // Plant pot
    const potGeo = new THREE.CylinderGeometry(0.25, 0.2, 0.5, 8);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x3d2914, roughness: 0.8 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(5.5, 0.25, 0.5);
    pot.castShadow = true;
    this.scene.add(pot);

    const plantGeo = new THREE.SphereGeometry(0.4, 8, 8);
    const plantMat = new THREE.MeshStandardMaterial({ color: 0x2d5016, roughness: 0.9 });
    const plant = new THREE.Mesh(plantGeo, plantMat);
    plant.position.set(5.5, 0.8, 0.5);
    plant.castShadow = true;
    this.scene.add(plant);

    // Floor
    const floorGeo = new THREE.PlaneGeometry(30, 20);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  buildMonitor() {
    const monitorGroup = new THREE.Group();

    // CRT body
    const bodyGeo = new THREE.BoxGeometry(6.8, 5.2, 3.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.5, metalness: 0.15 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, -2.0);
    body.castShadow = true;
    monitorGroup.add(body);

    // Bezel frame (4 strips around the screen cutout)
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.2 });

    const OUTER_W = 7.2, OUTER_H = 5.6, DEPTH = 0.3;
    const SCREEN_Y_OFFSET = 0.1;
    const BEZEL_Z = 0.1;

    // Screen opening dimensions — saved for projection
    this.SCREEN_W = 5.9;
    this.SCREEN_H = 4.2;
    this.SCREEN_CENTER = new THREE.Vector3(0, 3.2 + SCREEN_Y_OFFSET, -0.5 + BEZEL_Z + DEPTH / 2 + 0.01);

    // Top strip
    const topH = (OUTER_H - this.SCREEN_H) / 2 + SCREEN_Y_OFFSET;
    const topBezel = new THREE.Mesh(new THREE.BoxGeometry(OUTER_W, topH, DEPTH), bezelMat);
    topBezel.position.set(0, OUTER_H / 2 - topH / 2, BEZEL_Z);
    topBezel.castShadow = true;
    monitorGroup.add(topBezel);

    // Bottom strip
    const botH = (OUTER_H - this.SCREEN_H) / 2 - SCREEN_Y_OFFSET;
    const botBezel = new THREE.Mesh(new THREE.BoxGeometry(OUTER_W, botH, DEPTH), bezelMat);
    botBezel.position.set(0, -OUTER_H / 2 + botH / 2, BEZEL_Z);
    botBezel.castShadow = true;
    monitorGroup.add(botBezel);

    // Left strip
    const sideW = (OUTER_W - this.SCREEN_W) / 2;
    const leftBezel = new THREE.Mesh(new THREE.BoxGeometry(sideW, this.SCREEN_H, DEPTH), bezelMat);
    leftBezel.position.set(-OUTER_W / 2 + sideW / 2, SCREEN_Y_OFFSET, BEZEL_Z);
    leftBezel.castShadow = true;
    monitorGroup.add(leftBezel);

    // Right strip
    const rightBezel = new THREE.Mesh(new THREE.BoxGeometry(sideW, this.SCREEN_H, DEPTH), bezelMat);
    rightBezel.position.set(OUTER_W / 2 - sideW / 2, SCREEN_Y_OFFSET, BEZEL_Z);
    rightBezel.castShadow = true;
    monitorGroup.add(rightBezel);

    // Screen backing (dark plane visible through the cutout)
    const screenBg = new THREE.Mesh(
      new THREE.PlaneGeometry(this.SCREEN_W, this.SCREEN_H),
      new THREE.MeshBasicMaterial({ color: 0x050508 })
    );
    screenBg.position.set(0, SCREEN_Y_OFFSET, BEZEL_Z - 0.01);
    monitorGroup.add(screenBg);

    // Brand label
    const labelGeo = new THREE.BoxGeometry(2, 0.3, 0.05);
    const labelMat = new THREE.MeshStandardMaterial({
      color: 0xe8751a, roughness: 0.3, metalness: 0.3,
      emissive: 0xe8751a, emissiveIntensity: 0.15,
    });
    const label = new THREE.Mesh(labelGeo, labelMat);
    label.position.set(0, -2.5, 0.28);
    monitorGroup.add(label);

    // Power LED
    const ledGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff44 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(2.8, -2.5, 0.3);
    monitorGroup.add(led);
    this.powerLed = led;

    // Stand
    const standMat = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.4, metalness: 0.3 });
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.25, 2.2), standMat);
    standBase.position.set(0, -2.95, -0.5);
    standBase.castShadow = true;
    monitorGroup.add(standBase);

    const standNeck = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.5), standMat);
    standNeck.position.set(0, -2.75, -0.5);
    standNeck.castShadow = true;
    monitorGroup.add(standNeck);

    monitorGroup.position.set(0, 3.2, -0.5);
    this.scene.add(monitorGroup);
    this.monitorGroup = monitorGroup;
  }

  /**
   * Project the 3D screen quad corners to 2D viewport coordinates.
   * Returns { left, top, width, height } in CSS pixels.
   */
  projectScreen() {
    const hw = this.SCREEN_W / 2;
    const hh = this.SCREEN_H / 2;
    const c = this.SCREEN_CENTER;

    // 4 corners in world space
    const tl = new THREE.Vector3(c.x - hw, c.y + hh, c.z);
    const tr = new THREE.Vector3(c.x + hw, c.y + hh, c.z);
    const bl = new THREE.Vector3(c.x - hw, c.y - hh, c.z);
    const br = new THREE.Vector3(c.x + hw, c.y - hh, c.z);

    const project = (v) => {
      v.project(this.camera);
      return {
        x: (v.x * 0.5 + 0.5) * window.innerWidth,
        y: (-v.y * 0.5 + 0.5) * window.innerHeight,
      };
    };

    const ptl = project(tl);
    const ptr = project(tr);
    const pbl = project(bl);
    const pbr = project(br);

    const left = Math.min(ptl.x, pbl.x);
    const top = Math.min(ptl.y, ptr.y);
    const right = Math.max(ptr.x, pbr.x);
    const bottom = Math.max(pbl.y, pbr.y);

    return {
      left,
      top,
      width: right - left,
      height: bottom - top,
    };
  }

  setupEventListeners() {
    // Mouse parallax (desktop)
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Touch parallax (mobile) — uses gyroscope-like drag
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        this.mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      const camZ = this.isMobile ? 10 : 8;
      this.camera.position.z = camZ;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const t = this.clock.getElapsedTime();

    // Parallax — gentler on mobile
    const parallaxX = this.isMobile ? 0.3 : 0.6;
    const parallaxY = this.isMobile ? 0.15 : 0.3;
    this.targetCameraPos.x = this.mouse.x * parallaxX;
    this.targetCameraPos.y = this.mouse.y * parallaxY + 3;

    this.camera.position.x += (this.targetCameraPos.x - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.targetCameraPos.y - this.camera.position.y) * 0.05;
    this.camera.lookAt(0, 3.0, -0.5);

    // Pulse power LED
    if (this.powerLed) {
      const pulse = 0.5 + 0.5 * Math.sin(t * 2);
      this.powerLed.material.color.setHex(pulse > 0.5 ? 0x00ff44 : 0x00cc33);
    }

    this.renderer.render(this.scene, this.camera);

    // Send screen projection to React overlay
    if (this.onProjectionUpdate) {
      this.onProjectionUpdate(this.projectScreen());
    }
  }

  dispose() {
    this.renderer.dispose();
  }
}
