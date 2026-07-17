'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function TreeSection() {
  const treeRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 4 is between offset 4/7 and 5/7
    const start = 4/7;
    const end = 5/7;
    
    let visibility = 0;
    if (offset >= start - 0.1 && offset <= end + 0.1) {
      visibility = 1 - Math.abs((offset - (start + end) / 2) * 14);
      visibility = Math.max(0, Math.min(1, visibility));
    }
    
    if (treeRef.current) {
      // Gentle pulsing effect for the magical tree
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const baseScale = visibility * 8;
      
      const targetScale = baseScale * pulse;
      
      treeRef.current.scale.set(
        THREE.MathUtils.lerp(treeRef.current.scale.x, targetScale, 0.2),
        THREE.MathUtils.lerp(treeRef.current.scale.y, targetScale, 0.2),
        1
      );
      
      // Floating motion
      treeRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group position={[3, -40, -5]}>
      {/* Magical Tree Image Plane */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image 
          ref={treeRef as any}
          url="/assets/tree.png" 
          transparent 
          scale={[0, 0]} 
          toneMapped={false}
        />
      </Float>
    </group>
  );
}
