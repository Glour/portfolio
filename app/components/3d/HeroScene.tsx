'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Sculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.12;
      groupRef.current.rotation.x = -0.12 + Math.sin(time * 0.22) * 0.06;
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.08;
      groupRef.current.position.x = 0.9 + Math.sin(time * 0.18) * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.08;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.12}>
      <group ref={groupRef}>
        <mesh scale={2.1}>
          <sphereGeometry args={[1, 96, 96]} />
          <meshPhysicalMaterial
            color="#dbeafe"
            roughness={0.12}
            metalness={0.08}
            transmission={0.82}
            thickness={1.35}
            clearcoat={1}
            clearcoatRoughness={0.12}
            ior={1.4}
            transparent
            opacity={0.95}
          />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0.38, 0.12]} scale={2.9}>
          <torusGeometry args={[1.12, 0.055, 32, 180]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            roughness={0.22}
            metalness={0.72}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            opacity={0.72}
          />
        </mesh>

        <mesh rotation={[-0.45, 0.7, 0.1]} position={[-0.7, 0.35, -0.4]} scale={1.5}>
          <torusGeometry args={[0.88, 0.042, 24, 160]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            roughness={0.2}
            metalness={0.48}
            clearcoat={1}
            transparent
            opacity={0.45}
          />
        </mesh>

        <mesh position={[0, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[3.2, 1.05, 1]}>
          <ringGeometry args={[0.92, 1.85, 128]} />
          <meshBasicMaterial color="#020617" transparent opacity={0.45} />
        </mesh>

        <mesh position={[0.25, 0.1, -1.8]} scale={4.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.06} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 8, 18]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 8]} intensity={1.25} color="#f8fafc" />
        <spotLight position={[0, 6, 7]} intensity={1.1} angle={0.35} penumbra={1} color="#e2e8f0" />
        <pointLight position={[-4, -2, 4]} intensity={1.35} color="#38bdf8" />
        <pointLight position={[4, 3, -4]} intensity={0.95} color="#a855f7" />

        <Sculpture />
      </Canvas>
    </div>
  );
}
