'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Text, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { BIRTHDAY_CONFIG } from '@/config/birthday';

export default function IntroScene() {
  const groupRef = useRef<THREE.Group>(null);
  const giftRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Page 0 (0 to 1/7)
    const r1 = Math.min(Math.max(offset * 7, 0), 1);
    
    if (groupRef.current) {
      // Fade out the intro scene as we scroll past page 1 by moving it up
      groupRef.current.position.y = r1 * 10;
    }

    if (giftRef.current) {
      // Rotate the gift box
      giftRef.current.rotation.y += delta;
      giftRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Glowing Moon */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[2, 64, 64]} position={[-4, 3, -15]}>
          <meshStandardMaterial 
            color="#FFF5E1" 
            emissive="#FFD700"
            emissiveIntensity={0.4} 
            toneMapped={false} 
          />
        </Sphere>
      </Float>

      {/* Gift Box / Title */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <group position={[0, 0, 0]}>
          <Box 
            ref={giftRef}
            args={[1, 1, 1]} 
          >
            <meshStandardMaterial color="#F8C8DC" roughness={0.2} metalness={0.8} />
          </Box>
          <Text 
            position={[0, 2, 0]} 
            fontSize={0.8} 
            color="#FFD700" 
            font="https://fonts.gstatic.com/s/greatvibes/v14/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff"
            anchorX="center" 
            anchorY="middle"
          >
            Happiest Birthday {BIRTHDAY_CONFIG.birthdayPerson.name}
            <meshBasicMaterial toneMapped={false} />
          </Text>
        </group>
      </Float>
    </group>
  );
}
