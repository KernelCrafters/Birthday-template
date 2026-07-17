'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig() {
  useFrame((state) => {
    // Calculate scroll progress (0 to 1) based on window height and scrollY
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const offset = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    let targetX = 0;
    let targetY = 0;
    let targetZ = 10;
    
    // Page 0 (Intro): 0 to 1/7
    if (offset < 1/7) {
      targetX = state.pointer.x * 2;
      targetY = state.pointer.y * 2;
      targetZ = 10;
    } 
    // Page 1 (Hero Island): 1/7 to 2/7
    else if (offset >= 1/7 && offset < 2/7) {
      const localOffset = (offset - 1/7) * 7; // 0 to 1 within this section
      targetX = THREE.MathUtils.lerp(0, 5, localOffset);
      targetY = THREE.MathUtils.lerp(0, -5, localOffset);
      targetZ = THREE.MathUtils.lerp(10, 5, localOffset);
    } 
    // Other Pages
    else {
      targetX = state.pointer.x * 2;
      targetY = -10 - (offset * 20); // Move down
      targetZ = 5 + Math.sin(offset * Math.PI) * 5;
    }

    // Dampen camera movement
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    
    state.camera.lookAt(0, targetY, 0);
  });

  return null;
}
