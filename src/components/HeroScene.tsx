import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const AICore = () => (
  <group>
    <Sphere args={[1, 64, 64]} scale={2.2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
    <Sphere args={[1, 32, 32]} scale={2.8}>
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={0.08}
        wireframe
      />
    </Sphere>
    <Sphere args={[1, 16, 16]} scale={3.5}>
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.04}
        wireframe
      />
    </Sphere>
  </group>
);

const HeroScene = () => (
  <div className="w-full h-[500px] md:h-[600px]">
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        <AICore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
