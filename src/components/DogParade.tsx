'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function DogParade() {
  const dogRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 5 is between offset 5/7 and 6/7
    const start = 5/7;
    const end = 6/7;
    
    let visibility = 0;
    if (offset >= start - 0.1 && offset <= end + 0.1) {
      visibility = 1 - Math.abs((offset - (start + end) / 2) * 14);
      visibility = Math.max(0, Math.min(1, visibility));
    }
    
    if (dogRef.current) {
      const targetScale = visibility * 12;
      
      dogRef.current.scale.set(
        THREE.MathUtils.lerp(dogRef.current.scale.x, targetScale, 0.1),
        THREE.MathUtils.lerp(dogRef.current.scale.y, targetScale, 0.1),
        1
      );
      
      // Joyful bouncing motion
      dogRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.5 - 2;
      dogRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[-3, -50, -5]}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <Image 
          ref={dogRef as any}
          url="/assets/puppies.png" 
          transparent 
          scale={[0, 0]} 
          toneMapped={false}
        />
      </Float>
    </group>
  );
}
