import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const HeartbeatWave = () => {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);

  const { points, vessels } = useMemo(() => {
    // ECG-style heartbeat wave
    const p: THREE.Vector3[] = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 6;
      const x = (i / count) * 8 - 4;
      let y = 0;
      const phase = t % (Math.PI * 2);
      if (phase > 1.5 && phase < 1.8) y = 0.8;
      else if (phase > 1.8 && phase < 2.0) y = -0.3;
      else if (phase > 2.0 && phase < 2.3) y = 1.5;
      else if (phase > 2.3 && phase < 2.5) y = -0.5;
      else if (phase > 2.5 && phase < 2.8) y = 0.3;
      else y = Math.sin(phase * 0.5) * 0.05;
      p.push(new THREE.Vector3(x, y * 0.3, 0));
    }

    // Blood vessel network
    const v: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    for (let i = 0; i < 15; i++) {
      const sx = (Math.random() - 0.5) * 6;
      const sy = (Math.random() - 0.5) * 3;
      const len = 0.3 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      v.push({
        start: new THREE.Vector3(sx, sy, -0.5),
        end: new THREE.Vector3(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len, -0.5),
      });
    }

    return { points: p, vessels: v };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lineRef.current) {
      const positions = (lineRef.current.geometry as THREE.BufferGeometry).attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const origX = (i / positions.count) * 8 - 4;
        positions.setX(i, origX + Math.sin(t * 0.5) * 0.1);
      }
      positions.needsUpdate = true;
    }
  });

  const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <group ref={groupRef}>
      <primitive
        ref={lineRef}
        object={new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: "#2dd4bf", transparent: true, opacity: 0.15 }))}
      />
      {vessels.map((v, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([v.start, v.end]);
        return <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#134e4a", transparent: true, opacity: 0.06 }))} />;
      })}
    </group>
  );
};

const HeartbeatBg = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.04} />
        <pointLight position={[2, 2, 3]} intensity={0.1} color="#2dd4bf" />
        <HeartbeatWave />
      </Suspense>
    </Canvas>
  </div>
);

export default HeartbeatBg;
