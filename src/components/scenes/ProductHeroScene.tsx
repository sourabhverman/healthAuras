import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const DNAStrand = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { spheres, connections } = useMemo(() => {
    const s: { pos: THREE.Vector3; color: string }[] = [];
    const c: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 3 - t * 6;
      const angle = t * Math.PI * 4;
      const r = 0.8;
      const p1 = new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
      const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r);
      s.push({ pos: p1, color: "#2dd4bf" }, { pos: p2, color: "#0e7490" });
      if (i % 3 === 0) c.push({ start: p1, end: p2 });
    }
    return { spheres: s, connections: c };
  }, []);

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.3} transparent opacity={0.7} />
        </mesh>
      ))}
      {connections.map((c, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([c.start, c.end]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.3 }))} />;
      })}
    </group>
  );
};

const ProductHeroScene = () => (
  <div className="absolute inset-0 opacity-40">
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, 3]} intensity={0.4} color="#2dd4bf" />
        <DNAStrand />
      </Suspense>
    </Canvas>
  </div>
);

export default ProductHeroScene;
