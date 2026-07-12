"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const CITIES = [
  { name: "Lahore", lat: 31.55, lon: 74.35 },
  { name: "Makkah", lat: 21.39, lon: 39.83 },
  { name: "Madinah", lat: 24.47, lon: 39.61 },
  { name: "Tashkent", lat: 41.3, lon: 69.28 },
  { name: "Samarkand", lat: 39.65, lon: 66.96 },
  { name: "Bangkok", lat: 13.76, lon: 100.5 },
  { name: "Phuket", lat: 7.88, lon: 98.39 },
  { name: "Istanbul", lat: 41.01, lon: 28.98 },
  { name: "Kuala Lumpur", lat: 3.14, lon: 101.69 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Paris", lat: 48.86, lon: 2.35 },
  { name: "Delhi", lat: 28.61, lon: 77.23 },
  { name: "Karachi", lat: 24.86, lon: 67.01 },
  { name: "Islamabad", lat: 33.68, lon: 73.06 },
  { name: "Peshawar", lat: 34.02, lon: 71.55 },
];

const ROUTES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 5], [0, 7], [0, 11], [0, 14], [0, 15], [0, 16], [0, 17],
  [1, 2], [1, 11], [3, 4], [5, 6], [5, 8],
  [7, 8], [7, 10], [7, 11], [8, 9], [9, 12],
  [10, 12], [11, 5], [11, 1], [11, 7], [11, 8],
];

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function useEarthTexture(): THREE.Texture | null {
  return useMemo(() => {
    const s = 1024;
    const c = document.createElement("canvas");
    c.width = s;
    c.height = s / 2;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, "#0a1628"); grad.addColorStop(0.15, "#0d1f3c");
    grad.addColorStop(0.5, "#122547"); grad.addColorStop(0.85, "#0d1f3c");
    grad.addColorStop(1, "#0a1628");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s / 2);

    ctx.fillStyle = "#1a3366";
    // North America
    ctx.beginPath(); ctx.moveTo(0.05 * s, 0.15 * s); ctx.lineTo(0.22 * s, 0.1 * s); ctx.lineTo(0.28 * s, 0.18 * s); ctx.lineTo(0.25 * s, 0.35 * s); ctx.lineTo(0.15 * s, 0.42 * s); ctx.lineTo(0.08 * s, 0.35 * s); ctx.lineTo(0.03 * s, 0.28 * s); ctx.closePath(); ctx.fill();
    // South America
    ctx.beginPath(); ctx.moveTo(0.2 * s, 0.48 * s); ctx.lineTo(0.26 * s, 0.45 * s); ctx.lineTo(0.28 * s, 0.58 * s); ctx.lineTo(0.22 * s, 0.72 * s); ctx.lineTo(0.18 * s, 0.68 * s); ctx.lineTo(0.16 * s, 0.55 * s); ctx.closePath(); ctx.fill();
    // Europe
    ctx.beginPath(); ctx.moveTo(0.42 * s, 0.12 * s); ctx.lineTo(0.52 * s, 0.1 * s); ctx.lineTo(0.55 * s, 0.18 * s); ctx.lineTo(0.5 * s, 0.25 * s); ctx.lineTo(0.45 * s, 0.22 * s); ctx.lineTo(0.42 * s, 0.16 * s); ctx.closePath(); ctx.fill();
    // Africa
    ctx.beginPath(); ctx.moveTo(0.42 * s, 0.28 * s); ctx.lineTo(0.52 * s, 0.26 * s); ctx.lineTo(0.55 * s, 0.35 * s); ctx.lineTo(0.53 * s, 0.55 * s); ctx.lineTo(0.48 * s, 0.65 * s); ctx.lineTo(0.44 * s, 0.55 * s); ctx.lineTo(0.4 * s, 0.4 * s); ctx.closePath(); ctx.fill();
    // Asia
    ctx.beginPath(); ctx.moveTo(0.55 * s, 0.1 * s); ctx.lineTo(0.85 * s, 0.08 * s); ctx.lineTo(0.9 * s, 0.2 * s); ctx.lineTo(0.88 * s, 0.35 * s); ctx.lineTo(0.8 * s, 0.42 * s); ctx.lineTo(0.72 * s, 0.38 * s); ctx.lineTo(0.6 * s, 0.32 * s); ctx.lineTo(0.55 * s, 0.22 * s); ctx.closePath(); ctx.fill();
    // Australia
    ctx.beginPath(); ctx.ellipse(0.78 * s, 0.62 * s, 0.06 * s, 0.05 * s, 0, 0, Math.PI * 2); ctx.fill();
    // Greenland
    ctx.beginPath(); ctx.ellipse(0.32 * s, 0.08 * s, 0.04 * s, 0.03 * s, 0, 0, Math.PI * 2); ctx.fill();
    // UK
    ctx.beginPath(); ctx.ellipse(0.415 * s, 0.17 * s, 0.015 * s, 0.01 * s, 0, 0, Math.PI * 2); ctx.fill();
    // Japan
    ctx.beginPath(); ctx.ellipse(0.82 * s, 0.22 * s, 0.012 * s, 0.02 * s, 0.2, 0, Math.PI * 2); ctx.fill();
    // SE Asia
    ctx.beginPath(); ctx.moveTo(0.74 * s, 0.42 * s); ctx.lineTo(0.78 * s, 0.4 * s); ctx.lineTo(0.82 * s, 0.44 * s); ctx.lineTo(0.8 * s, 0.48 * s); ctx.lineTo(0.76 * s, 0.46 * s); ctx.closePath(); ctx.fill();
    // India
    ctx.beginPath(); ctx.moveTo(0.65 * s, 0.28 * s); ctx.lineTo(0.7 * s, 0.28 * s); ctx.lineTo(0.7 * s, 0.38 * s); ctx.lineTo(0.66 * s, 0.36 * s); ctx.lineTo(0.64 * s, 0.32 * s); ctx.closePath(); ctx.fill();
    // Antarctica
    ctx.fillStyle = "#162544"; ctx.fillRect(0, 0.88 * s, s, 0.12 * s);

    // Grid lines
    ctx.strokeStyle = "rgba(212, 175, 55, 0.04)"; ctx.lineWidth = 1;
    for (let lat = 1; lat < 10; lat++) { const y = (lat / 10) * (s / 2); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke(); }
    for (let lon = 1; lon < 20; lon++) { const x = (lon / 20) * s; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s / 2); ctx.stroke(); }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function EarthGlobe({ radius = 1.5 }: { radius?: number }) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const earthTexture = useEarthTexture();

  useFrame(({ clock }) => {
    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 72, 54]} />
        {earthTexture ? (
          <meshStandardMaterial map={earthTexture} roughness={0.7} metalness={0.1} />
        ) : (
          <meshPhysicalMaterial color="#0d1f3c" roughness={0.5} metalness={0.1} />
        )}
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.003, 48, 32]} />
        <meshBasicMaterial color="#D4AF37" wireframe transparent opacity={0.04} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.06, 64, 48]} />
        <shaderMaterial
          ref={shaderRef}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          uniforms={{ uTime: { value: 0 } }}
          vertexShader="varying vec3 vNormal; varying vec3 vPosition; void main() { vec4 worldPos = modelMatrix * vec4(position, 1.0); vNormal = normalize(mat3(modelMatrix) * normal); vPosition = worldPos.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
          fragmentShader="varying vec3 vNormal; varying vec3 vPosition; uniform float uTime; void main() { float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5); float shimmer = sin(vPosition.x * 4.0 + uTime) * 0.3 + 0.7; gl_FragColor = vec4(0.831, 0.686, 0.216, intensity * 0.25 * shimmer); }"
        />
      </mesh>
    </group>
  );
}

function CityMarker({ position, name }: { position: THREE.Vector3; name: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 2) * 0.08;
    }
  });
  return (
    <group position={position}>
      <mesh ref={ringRef}><ringGeometry args={[0.025, 0.045, 32]} /><meshBasicMaterial color="#D4AF37" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} /></mesh>
      <mesh><sphereGeometry args={[0.012, 16, 16]} /><meshBasicMaterial color="#D4AF37" transparent opacity={0.35} /></mesh>
      <mesh><sphereGeometry args={[0.006, 8, 8]} /><meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[0, 0.02, 0]}><cylinderGeometry args={[0.002, 0.004, 0.04, 8]} /><meshBasicMaterial color="#D4AF37" transparent opacity={0.6} /></mesh>
      <Float speed={0.5} floatIntensity={0.0003} floatingRange={[0, 0.001]}>
        <Text position={[0, 0.06, 0]} fontSize={0.028} color="#E8D07D" anchorX="center" anchorY="bottom" outlineWidth={0.003} outlineColor="#0a1628">{name}</Text>
      </Float>
    </group>
  );
}

function FlightArc({ start, end, radius }: { start: THREE.Vector3; end: THREE.Vector3; radius: number }) {
  const pts = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.25);
    return new THREE.QuadraticBezierCurve3(start.clone(), mid, end.clone()).getPoints(80);
  }, [start, end, radius]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(pts), [pts]);
  const dashGeos = useMemo(() => {
    const gs: THREE.BufferGeometry[] = [];
    const ppd = Math.floor(pts.length / 24);
    for (let i = 0; i < 12; i++) {
      const si = i * 2 * ppd, ei = si + ppd;
      if (ei < pts.length && pts.slice(si, ei).length >= 2) gs.push(new THREE.BufferGeometry().setFromPoints(pts.slice(si, ei)));
    }
    return gs;
  }, [pts]);

  return (
    <group>
      <line><primitive object={geo} attach="geometry" /><lineBasicMaterial color="#D4AF37" transparent opacity={0.06} depthWrite={false} /></line>
      {dashGeos.map((g, i) => <line key={i}><primitive object={g} attach="geometry" /><lineBasicMaterial color="#D4AF37" transparent opacity={0.2} depthWrite={false} /></line>)}
    </group>
  );
}

function AirplaneModel() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}><capsuleGeometry args={[0.006, 0.03, 4, 8]} /><meshStandardMaterial color="#E8D07D" emissive="#E8D07D" emissiveIntensity={0.6} roughness={0.2} metalness={0.4} /></mesh>
      <mesh position={[0, 0, 0.018]}><coneGeometry args={[0.006, 0.01, 8, 8]} /><meshStandardMaterial color="#E8D07D" emissive="#E8D07D" emissiveIntensity={0.4} roughness={0.2} metalness={0.4} /></mesh>
      <mesh position={[0, 0.001, 0]} rotation={[0, 0.15, 0]}><boxGeometry args={[0.04, 0.003, 0.01]} /><meshStandardMaterial color="#E8D07D" emissive="#E8D07D" emissiveIntensity={0.5} roughness={0.2} metalness={0.5} /></mesh>
      <mesh position={[0, 0.008, -0.015]}><boxGeometry args={[0.01, 0.012, 0.003]} /><meshStandardMaterial color="#E8D07D" emissive="#E8D07D" emissiveIntensity={0.5} roughness={0.2} metalness={0.5} /></mesh>
      <mesh position={[0, 0, -0.015]}><boxGeometry args={[0.02, 0.002, 0.006]} /><meshStandardMaterial color="#E8D07D" emissive="#E8D07D" emissiveIntensity={0.5} roughness={0.2} metalness={0.5} /></mesh>
      <pointLight color="#D4AF37" intensity={2} distance={0.08} position={[0, 0, -0.018]} />
      <mesh position={[0, 0, -0.019]}><sphereGeometry args={[0.003, 8, 8]} /><meshBasicMaterial color="#FFFFFF" /></mesh>
    </group>
  );
}

function Airplane({ routeIndex, radius }: { routeIndex: number; radius: number }) {
  const ref = useRef<THREE.Group>(null);
  const route = ROUTES[routeIndex % ROUTES.length];
  const sp = useMemo(() => latLonToVec3(CITIES[route[0]].lat, CITIES[route[0]].lon, radius), [radius]);
  const ep = useMemo(() => latLonToVec3(CITIES[route[1]].lat, CITIES[route[1]].lon, radius), [radius]);
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(sp, ep).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35);
    return new THREE.QuadraticBezierCurve3(sp.clone(), mid, ep.clone());
  }, [sp, ep, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const prog = ((clock.getElapsedTime() * 0.07 + routeIndex * 0.8) % 1 + 1) % 1;
    const pt = curve.getPoint(prog);
    const tan = curve.getTangent(prog).normalize();
    ref.current.position.copy(pt);
    const up = pt.clone().normalize();
    const m4 = new THREE.Matrix4().lookAt(pt, tan.clone().add(pt), up);
    const q = new THREE.Quaternion();
    m4.decompose(new THREE.Vector3(), q, new THREE.Vector3());
    const flip = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI);
    ref.current.quaternion.copy(q).multiply(flip);
  });

  return <group ref={ref}><AirplaneModel /></group>;
}

function GlobeGroup({ radius = 1.5 }: { radius?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (ref.current) { ref.current.rotation.y = clock.getElapsedTime() * 0.06; ref.current.rotation.x = 0.35; } });
  return (
    <group ref={ref}>
      <EarthGlobe radius={radius} />
      {CITIES.map((c) => <CityMarker key={c.name} position={latLonToVec3(c.lat, c.lon, radius)} name={c.name} />)}
      {ROUTES.map(([f, t], i) => <FlightArc key={`arc-${i}`} start={latLonToVec3(CITIES[f].lat, CITIES[f].lon, radius)} end={latLonToVec3(CITIES[t].lat, CITIES[t].lon, radius)} radius={radius} />)}
      {ROUTES.slice(0, 8).map((_, i) => <Airplane key={`plane-${i}`} routeIndex={i} radius={radius} />)}
    </group>
  );
}

function Scene() {
  return (<><ambientLight intensity={0.3} /><pointLight position={[10, 5, 10]} intensity={2} color="#D4AF37" /><pointLight position={[-5, -2, -5]} intensity={0.8} color="#1A2A6C" /><directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffffff" /><GlobeGroup radius={1.5} /><Environment preset="night" /></>);
}

function Loader() { return <div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" /></div>; }

export default function CityGlobe() {
  return (
    <div className="absolute inset-0">
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [0, 0.3, 3.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} style={{ background: "transparent" }}>
          <Scene />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} />
        </Canvas>
      </Suspense>
    </div>
  );
}
