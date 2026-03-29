import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const FloatingCubes = () => {
  const groupRef = useRef<THREE.Group>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  const cubeData = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.5 + (i % 3) * 0.4;
      return {
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.25 + Math.random() * 0.15,
        speed: 0.3 + Math.random() * 0.5,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;

    cubesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = cubeData[i];
      mesh.position.y = data.position[1] + Math.sin(t * data.speed + i) * 0.3;
      mesh.rotation.x = t * 0.3 + i;
      mesh.rotation.z = t * 0.2 + i * 0.5;
    });
  });

  // Light beams between cubes
  const beams = useMemo(() => {
    const result: THREE.Line[] = [];
    for (let i = 0; i < cubeData.length; i++) {
      const j = (i + 1) % cubeData.length;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...cubeData[i].position),
        new THREE.Vector3(...cubeData[j].position),
      ]);
      result.push(
        new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.15 }))
      );
    }
    return result;
  }, [cubeData]);

  return (
    <group ref={groupRef}>
      {cubeData.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) cubesRef.current[i] = el; }}
          position={cube.position}
        >
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {beams.map((beam, i) => (
        <primitive key={`b-${i}`} object={beam} />
      ))}
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

const ProductsScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 1.5, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.7} color="#34d399" />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#06b6d4" />
        <FloatingCubes />
      </Suspense>
    </Canvas>
  </div>
);

export default ProductsScene;
