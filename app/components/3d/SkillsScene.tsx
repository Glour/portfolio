'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSkillProps {
  text: string;
  position: [number, number, number];
  color: string;
}

function FloatingSkill({ text, position, color }: FloatingSkillProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[1.5, 0.6, 0.1]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {text}
      </Text>
    </group>
  );
}

export default function SkillsScene() {
  const skills = [
    { text: 'Python', position: [-2.4, 0.4, 0] as [number, number, number], color: '#0ea5e9' },
    { text: 'FastAPI', position: [-0.8, 1.1, -0.8] as [number, number, number], color: '#38bdf8' },
    { text: 'PostgreSQL', position: [1.4, 0.7, 0.2] as [number, number, number], color: '#ec4899' },
    { text: 'AI Agents', position: [2.6, -0.4, -0.6] as [number, number, number], color: '#a855f7' },
    { text: 'Telegram', position: [-1.7, -1.0, 0.8] as [number, number, number], color: '#60a5fa' },
    { text: 'Docker', position: [0.2, -1.25, 0.5] as [number, number, number], color: '#f59e0b' },
    { text: 'Next.js', position: [1.8, -1.1, 1] as [number, number, number], color: '#fb923c' },
  ];

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {skills.map((skill, index) => (
          <FloatingSkill key={index} {...skill} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
