'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.12;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.18;
    }

    if (materialRef.current) {
      materialRef.current.distort = 0.34 + Math.sin(time * 1.2) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} scale={2.35}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#38bdf8"
          distort={0.34}
          speed={1.8}
          roughness={0.18}
          metalness={0.95}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0.6, 0]} scale={3.5}>
        <torusGeometry args={[1.35, 0.02, 16, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.5, 0.9, 0.2]} scale={2.9}>
        <torusGeometry args={[1.75, 0.016, 16, 180]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 220;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 4.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[i * 3 + 2] = radius * Math.cos(phi);
    }

    return array;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.04;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c084fc" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 8]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-5, -2, 4]} intensity={1.7} color="#38bdf8" />
        <pointLight position={[4, 3, -4]} intensity={1.1} color="#a855f7" />

        <group>
          <CoreOrb />
          <ParticleField />
        </group>
      </Canvas>
    </div>
  );
}
