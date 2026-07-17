'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function MemoryBook() {
  const bookRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 6 is between offset 6/7 and 7/7
    const start = 5.5/7;
    const end = 6.5/7;
    
    let visibility = 0;
    if (offset >= start - 0.1 && offset <= end + 0.1) {
      visibility = 1 - Math.abs((offset - (start + end) / 2) * 14);
      visibility = Math.max(0, Math.min(1, visibility));
    }
    
    if (bookRef.current) {
      const targetScale = visibility * 15;
      
      bookRef.current.scale.set(
        THREE.MathUtils.lerp(bookRef.current.scale.x, targetScale, 0.1),
        THREE.MathUtils.lerp(bookRef.current.scale.y, targetScale, 0.1),
        1
      );
      
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      bookRef.current.position.y = Math.cos(state.clock.elapsedTime * 1.5) * 0.5 - 2;
    }
  });

  return (
    <group position={[0, -60, -5]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image 
          ref={bookRef as any}
          url="/assets/book.png" 
          transparent 
          scale={[0, 0]} 
          toneMapped={false}
        />
      </Float>
    </group>
  );
}
