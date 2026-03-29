import { Canvas } from "@react-three/fiber";
import { OrbitControls, Torus, Sphere } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const OrbitalRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group ref={ref} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
      <Torus args={[radius, 0.015, 16, 100]}>
        <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Torus>
      <Sphere args={[0.08, 16, 16]} position={[radius, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Sphere>
    </group>
  );
};

const SystemVisualization = () => (
  <group>
    <Sphere args={[0.4, 32, 32]}>
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
    </Sphere>
    <OrbitalRing radius={1.2} speed={0.5} color="#3b82f6" />
    <OrbitalRing radius={1.8} speed={-0.3} color="#06b6d4" />
    <OrbitalRing radius={2.4} speed={0.2} color="#8b5cf6" />
  </group>
);

const SystemScene = () => (
  <div className="w-full h-[400px] md:h-[500px]">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
        <SystemVisualization />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default SystemScene;
