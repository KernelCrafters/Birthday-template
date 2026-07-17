'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import IntroScene from './IntroScene';
import CameraRig from './CameraRig';
import HeroIsland from './HeroIsland';
import Timeline from './Timeline';
import TreeSection from './TreeSection';
import DogParade from './DogParade';
import MemoryBook from './MemoryBook';
import Lanterns from './Lanterns';

export default function Experience() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0D1025']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

      {/* 3D Scene Components */}
      <CameraRig />
      <IntroScene />
      <HeroIsland />
      <Timeline />
      <TreeSection />
      <DogParade />
      <MemoryBook />
      <Lanterns />

      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={1.2} />
      </EffectComposer>
      <Preload all />
    </Canvas>
  );
}
