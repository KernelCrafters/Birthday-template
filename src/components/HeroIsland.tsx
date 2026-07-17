'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroIsland() {
  const imageRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 1 is between offset 1/7 and 2/7
    const start = 1/7;
    const end = 2/7;
    
    let r2 = 0;
    if (offset >= start) {
      r2 = Math.min((offset - start) / (end - start), 1);
    }
    
    if (imageRef.current) {
      // The image rises from below as you scroll down
      imageRef.current.position.y = THREE.MathUtils.lerp(-20, 0, r2);
      
      // Slight floating rotation for a 3D feel
      imageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      imageRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group position={[3, -20, -5]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image 
          ref={imageRef as any}
          url="/assets/island.png" 
          transparent 
          scale={[10, 10]} 
          toneMapped={false}
        />
      </Float>
    </group>
  );
}
