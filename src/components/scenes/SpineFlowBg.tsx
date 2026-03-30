import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const SpineFlow = () => {
  const groupRef = useRef<THREE.Group>(null);
  const vertebraeRef = useRef<THREE.Mesh[]>([]);

  const { vertebrae, cord, nerves } = useMemo(() => {
    const v: { pos: THREE.Vector3; size: number }[] = [];
    const count = 22;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 3.5 - t * 7;
      const z = Math.sin(t * Math.PI * 0.7) * 0.4;
      const size = 0.1 + (1 - Math.abs(t - 0.4)) * 0.05;
      v.push({ pos: new THREE.Vector3(0, y, z), size });
    }

    const cordPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      const t = i / 60;
      cordPoints.push(new THREE.Vector3(0, 3.5 - t * 7, Math.sin(t * Math.PI * 0.7) * 0.4));
    }

    const n: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    v.forEach((vert, i) => {
      if (i % 2 === 0) {
        const spread = 0.5 + Math.random() * 0.4;
        [-1, 1].forEach((side) => {
          n.push({
            start: vert.pos.clone(),
            end: new THREE.Vector3(side * spread, vert.pos.y - 0.05, vert.pos.z + 0.08),
          });
        });
      }
    });

    return { vertebrae: v, cord: cordPoints, nerves: n };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
    }
    vertebraeRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.x = Math.sin(t * 0.8 + i * 0.3) * 0.015;
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.15 + Math.sin(t * 1.2 + i * 0.5) * 0.1;
    });
  });

  const cordGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(cord), [cord]);
  const nerveGeos = useMemo(() =>
    nerves.map((n) => new THREE.BufferGeometry().setFromPoints([n.start, n.end])), [nerves]
  );

  return (
    <group ref={groupRef}>
      {vertebrae.map((v, i) => (
        <mesh key={i} ref={(el) => { if (el) vertebraeRef.current[i] = el; }} position={v.pos}>
          <boxGeometry args={[v.size * 2, 0.06, v.size]} />
          <meshStandardMaterial color="#1a4a42" emissive="#2dd4bf" emissiveIntensity={0.2} transparent opacity={0.4} roughness={0.6} />
        </mesh>
      ))}
      <primitive object={new THREE.Line(cordGeo, new THREE.LineBasicMaterial({ color: "#2dd4bf", transparent: true, opacity: 0.15 }))} />
      {nerveGeos.map((geo, i) => (
        <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#0d9488", transparent: true, opacity: 0.08 }))} />
      ))}
    </group>
  );
};

const SpineFlowBg = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.04} />
        <pointLight position={[3, 3, 4]} intensity={0.15} color="#2dd4bf" />
        <SpineFlow />
      </Suspense>
    </Canvas>
  </div>
);

export default SpineFlowBg;
