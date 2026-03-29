import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Spine = () => {
  const groupRef = useRef<THREE.Group>(null);
  const vertebraeRef = useRef<THREE.Mesh[]>([]);

  const vertebrae = useMemo(() => {
    const v: { pos: [number, number, number]; size: number }[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 2.5 - t * 5;
      const z = Math.sin(t * Math.PI * 0.8) * 0.3;
      const size = 0.12 + (1 - Math.abs(t - 0.4)) * 0.06;
      v.push({ pos: [0, y, z], size });
    }
    return v;
  }, []);

  // Spinal cord
  const spinalCord = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 50;
      const y = 2.5 - t * 5;
      const z = Math.sin(t * Math.PI * 0.8) * 0.3;
      points.push(new THREE.Vector3(0, y, z));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.5 })
    );
  }, []);

  // Nerve branches
  const nerves = useMemo(() => {
    const lines: THREE.Line[] = [];
    vertebrae.forEach((v, i) => {
      if (i % 2 === 0) {
        const spread = 0.4 + Math.random() * 0.3;
        [-1, 1].forEach((side) => {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, v.pos[1], v.pos[2]),
            new THREE.Vector3(side * spread, v.pos[1] - 0.1, v.pos[2] + 0.1),
          ]);
          lines.push(
            new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#fbbf24", transparent: true, opacity: 0.2 }))
          );
        });
      }
    });
    return lines;
  }, [vertebrae]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.12;

    vertebraeRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const wave = Math.sin(t * 1.5 + i * 0.3) * 0.02;
      mesh.position.x = wave;
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(t * 2 + i * 0.5) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {vertebrae.map((v, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) vertebraeRef.current[i] = el; }}
          position={v.pos}
        >
          <boxGeometry args={[v.size * 2, 0.08, v.size]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
      ))}

      {/* Disc between vertebrae */}
      {vertebrae.slice(0, -1).map((v, i) => (
        <mesh key={`d-${i}`} position={[0, (v.pos[1] + vertebrae[i + 1].pos[1]) / 2, (v.pos[2] + vertebrae[i + 1].pos[2]) / 2]}>
          <cylinderGeometry args={[v.size * 0.7, v.size * 0.7, 0.04, 12]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} transparent opacity={0.4} />
        </mesh>
      ))}

      <primitive object={spinalCord} />

      {nerves.map((n, i) => (
        <primitive key={`n-${i}`} object={n} />
      ))}
    </group>
  );
};

const ProductsScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={0.7} color="#34d399" />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#06b6d4" />
        <Spine />
      </Suspense>
    </Canvas>
  </div>
);

export default ProductsScene;
