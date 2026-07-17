'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Timeline() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 2 is between offset 2/7 and 3/7
    const start = 2/7;
    const end = 3/7;
    
    let visibility = 0;
    if (offset >= start - 0.1 && offset <= end + 0.1) {
      // Fade in and out around this section
      visibility = 1 - Math.abs((offset - (start + end) / 2) * 14);
      visibility = Math.max(0, Math.min(1, visibility));
    }
    
    if (groupRef.current) {
      // Scale up when scrolling into view
      const scale = THREE.MathUtils.lerp(groupRef.current.scale.x, visibility * 1.5, 0.1);
      groupRef.current.scale.set(scale, scale, scale);
      
      // Rotate the entire timeline slowly
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -25, -5]}>
      {/* 7th Standard Memory Crystal */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Icosahedron args={[1, 0]} position={[-3, 2, 0]}>
          <meshStandardMaterial color="#E6E6FA" roughness={0.1} metalness={0.9} />
        </Icosahedron>
      </Float>

      {/* High School Memory Crystal */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <Icosahedron args={[1.2, 0]} position={[3, 0, 2]}>
          <meshStandardMaterial color="#F8C8DC" roughness={0.1} metalness={0.9} />
        </Icosahedron>
      </Float>

      {/* College Memory Crystal */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <Icosahedron args={[0.8, 0]} position={[-2, -3, 1]}>
          <meshStandardMaterial color="#FFE5B4" roughness={0.1} metalness={0.9} />
        </Icosahedron>
      </Float>
      
      {/* Central Glowing Core */}
      <pointLight color="#E6E6FA" intensity={2} distance={10} position={[0, 0, 0]} />
    </group>
  );
}
