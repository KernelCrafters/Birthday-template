'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function Lanterns() {
  const lanternsRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 7 (Final Page)
    const start = 6.5/7;
    const end = 1;
    
    let visibility = 0;
    if (offset >= start - 0.1) {
      visibility = Math.min((offset - start) * 10, 1);
      visibility = Math.max(0, visibility);
    }
    
    if (lanternsRef.current) {
      const targetScale = visibility * 25;
      
      lanternsRef.current.scale.set(
        THREE.MathUtils.lerp(lanternsRef.current.scale.x, targetScale, 0.05),
        THREE.MathUtils.lerp(lanternsRef.current.scale.y, targetScale, 0.05),
        1
      );
      
      // Float slowly upwards
      lanternsRef.current.position.y = THREE.MathUtils.lerp(lanternsRef.current.position.y, -70 + (visibility * 5), 0.05);
    }
  });

  return (
    <group position={[0, -80, -10]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={1}>
        <Image 
          ref={lanternsRef as any}
          url="/assets/lanterns.png" 
          transparent 
          scale={[0, 0]} 
          toneMapped={false}
        />
      </Float>
    </group>
  );
}
