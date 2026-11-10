"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  DynamicDrawUsage,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  type Group,
  type Points,
} from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { soundscapes } from "@/features/soundscapes/data";
import { useAudioPlayer } from "@/components/audio/audio-player-provider";

const PARTICLE_COUNT = 3200;

function latLongToVector(latitude: number, longitude: number, radius: number) {
  const lat = (latitude * Math.PI) / 180;
  const lon = (longitude * Math.PI) / 180;
  return new Vector3(
    radius * Math.cos(lat) * Math.sin(lon),
    radius * Math.sin(lat),
    radius * Math.cos(lat) * Math.cos(lon),
  );
}

function makeGraticule() {
  const parallels: Vector3[][] = [];
  const meridians: Vector3[][] = [];
  const radius = 1.009;

  for (let latitude = -75; latitude <= 75; latitude += 15) {
    const points: Vector3[] = [];
    for (let index = 0; index <= 128; index += 1) {
      points.push(latLongToVector(latitude, -180 + (index / 128) * 360, radius));
    }
    parallels.push(points);
  }

  for (let longitude = -180; longitude < 180; longitude += 15) {
    const points: Vector3[] = [];
    for (let index = 0; index <= 96; index += 1) {
      points.push(latLongToVector(-88 + (index / 96) * 176, longitude, radius));
    }
    meridians.push(points);
  }

  return {
    parallels: parallels.map((points) => new Float32Array(points.flatMap((point) => point.toArray()))),
    meridians: meridians.map((points) => new Float32Array(points.flatMap((point) => point.toArray()))),
  };
}

function SoundParticles({ reducedMotion }: { reducedMotion: boolean }) {
  const pointsRef = useRef<Points>(null);
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const cyan = [0.32, 0.83, 1];
    const violet = [0.62, 0.48, 1];

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const y = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * index;
      const altitude = 1.045 + ((index * 37) % 100) / 1000;
      const offset = index * 3;
      basePositions[offset] = Math.cos(angle) * radius * altitude;
      basePositions[offset + 1] = y * altitude;
      basePositions[offset + 2] = Math.sin(angle) * radius * altitude;
      positions[offset] = basePositions[offset];
      positions[offset + 1] = basePositions[offset + 1];
      positions[offset + 2] = basePositions[offset + 2];
      const color = index % 5 === 0 ? violet : cyan;
      colors[offset] = color[0];
      colors[offset + 1] = color[1];
      colors[offset + 2] = color[2];
    }

    return { positions, basePositions, colors };
  }, []);

  useFrame(({ clock }, delta) => {
    const geometry = pointsRef.current?.geometry;
    if (!geometry) return;
    const positionAttribute = geometry.attributes.position as BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    const time = clock.elapsedTime;
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const offset = index * 3;
      const phase = index * 0.071;
      const drift = reducedMotion ? 0 : 0.0038;
      positions[offset] = particleData.basePositions[offset] + Math.sin(time * 0.27 + phase) * drift;
      positions[offset + 1] = particleData.basePositions[offset + 1] + Math.cos(time * 0.21 + phase) * drift;
      positions[offset + 2] = particleData.basePositions[offset + 2] + Math.sin(time * 0.19 + phase) * drift;
    }
    positionAttribute.needsUpdate = true;
    if (pointsRef.current && !reducedMotion) pointsRef.current.rotation.y += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} usage={DynamicDrawUsage} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.0065} sizeAttenuation vertexColors transparent opacity={0.82} depthWrite={false} />
    </points>
  );
}

function Atmosphere() {
  return (
    <mesh scale={1.075}>
      <sphereGeometry args={[1, 72, 72]} />
      <shaderMaterial
        side={BackSide}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        vertexShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vNormal = normalize(normalMatrix * normal); vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); vViewPosition = -mvPosition.xyz; gl_Position = projectionMatrix * mvPosition; }"
        fragmentShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ float rim = pow(0.72 - dot(normalize(vNormal), normalize(vViewPosition)), 3.2); gl_FragColor = vec4(0.22, 0.64, 1.0, clamp(rim * 0.78, 0.0, 0.58)); }"
      />
    </mesh>
  );
}

function RecordingMarker({
  track,
  hovered,
  setHovered,
}: {
  track: (typeof soundscapes)[number];
  hovered: boolean;
  setHovered: (id: string | null) => void;
}) {
  const { openPreview } = useAudioPlayer();
  const position = useMemo(() => latLongToVector(track.latitude, track.longitude, 1.02), [track.latitude, track.longitude]);

  return (
    <group position={position.toArray()}>
      <mesh
        onPointerEnter={() => setHovered(track.id)}
        onPointerLeave={() => setHovered(null)}
        onClick={(event) => { event.stopPropagation(); openPreview(track); }}
      >
        <sphereGeometry args={[0.027, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "#7ceaf5"} />
      </mesh>
      <mesh scale={hovered ? 2.45 : 1.8}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color="#71e5f2" transparent opacity={hovered ? 0.27 : 0.12} />
      </mesh>
      <Html center distanceFactor={8} zIndexRange={[30, 0]}>
        <button
          className={`globe-marker-button ${hovered ? "is-hovered" : ""}`}
          type="button"
          aria-label={`Open recording preview: ${track.title}, ${track.place}`}
          onPointerEnter={() => setHovered(track.id)}
          onPointerLeave={() => setHovered(null)}
          onClick={(event) => { event.stopPropagation(); openPreview(track); }}
        >
          <span className="globe-marker-pulse" />
          {hovered && <span className="globe-marker-label">{track.title}<small>{track.country}</small></span>}
        </button>
      </Html>
    </group>
  );
}

function EarthScene({ reducedMotion }: { reducedMotion: boolean }) {
  const globe = useRef<Group>(null);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const loadedEarthTexture = useLoader(TextureLoader, "/images/earth-blue-marble.webp");
  const earthTexture = useMemo(() => {
    const texture = loadedEarthTexture.clone();
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [loadedEarthTexture]);
  const grid = useMemo(() => makeGraticule(), []);

  useFrame((state, delta) => {
    if (globe.current && !reducedMotion) globe.current.rotation.y += delta * 0.026;
    const camera = state.camera;
    const targetX = reducedMotion ? 0 : state.pointer.x * 0.16;
    const targetY = reducedMotion ? 0 : state.pointer.y * 0.1;
    camera.position.x += (targetX - camera.position.x) * 0.018;
    camera.position.y += (targetY - camera.position.y) * 0.018;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={globe} rotation={[0, -0.2, 0]}>
      <mesh>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial map={earthTexture} color="#b5c6eb" roughness={0.9} metalness={0.03} emissive="#06101e" emissiveIntensity={0.3} />
      </mesh>
      <Atmosphere />
      <group>
        {grid.parallels.map((positions, index) => <line key={`lat-${index}`}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color="#7fdbef" transparent opacity={index === 5 ? 0.18 : 0.095} depthWrite={false} /></line>)}
        {grid.meridians.map((positions, index) => <line key={`lon-${index}`}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color="#a391ff" transparent opacity={index % 3 === 0 ? 0.16 : 0.075} depthWrite={false} /></line>)}
      </group>
      <SoundParticles reducedMotion={reducedMotion} />
      <mesh rotation={[1.08, -0.2, 0.14]}>
        <torusGeometry args={[1.31, 0.0025, 6, 180]} />
        <meshBasicMaterial color="#ac9bff" transparent opacity={0.36} />
      </mesh>
      {soundscapes.map((track) => (
        <RecordingMarker
          key={track.id}
          track={track}
          hovered={hoveredMarker === track.id}
          setHovered={setHoveredMarker}
        />
      ))}
    </group>
  );
}

export function OrbitalSoundscape({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className={`orbital-soundscape ${className}`.trim()} role="group" aria-label="Interactive Earth with geolocated sound recordings">
      <div className="globe-halo" aria-hidden="true" />
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={<div className="globe-fallback" aria-label="A map of Earth"><span>EARTH, IN SOUND</span></div>}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.72]} fov={35} />
        <ambientLight intensity={0.64} />
        <directionalLight position={[-2, 2, 4]} intensity={2.2} color="#d8e6ff" />
        <pointLight position={[2, 1.7, 2.4]} intensity={22} color="#55dff2" />
        <pointLight position={[-2, -1, -2]} intensity={14} color="#846cff" />
        <EarthScene reducedMotion={reducedMotion} />
      </Canvas>
      <div className="orbital-coordinate coordinate-top" aria-hidden="true">A PLANET IN STEREO <span>360°</span></div>
      <div className="orbital-coordinate coordinate-bottom" aria-hidden="true"><i /> {soundscapes.length.toString().padStart(2, "0")} OPEN RECORDINGS</div>
    </div>
  );
}
