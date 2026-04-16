import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Brain = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodeMeshes = useRef<THREE.Mesh[]>([]);

  const { cerebrumWire, cerebellumWire, stemMesh, nodePositions, cerebNodes } = useMemo(() => {
    // ── CEREBRUM: deformed sphere with gyri-like noise ──
    const cGeo = new THREE.SphereGeometry(1.0, 28, 22);
    const cPos = cGeo.attributes.position;
    const nodePos: [number, number, number][] = [];

    for (let i = 0; i < cPos.count; i++) {
      const ox = cPos.getX(i), oy = cPos.getY(i), oz = cPos.getZ(i);
      const r = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1e-9;
      const nx = ox / r, ny = oy / r, nz = oz / r;

      // Flatten base (underside)
      if (ny < -0.50) {
        cPos.setXYZ(i, nx * 0.66, -0.40, nz * 0.56);
        continue;
      }

      // Gyri: layered high-frequency sinusoidal noise
      const g =
        0.046 * Math.sin(nx * 10.2 + ny * 7.1) * Math.cos(nz * 9.0 + ny * 4.6) +
        0.022 * Math.cos(nx * 16.4 + nz * 13.8) * Math.sin(ny * 15.2) +
        0.012 * Math.sin(nx * 22.0 + nz * 19.5);

      const px = nx * 0.93 * (1 + g);
      const py = ny * 0.79 * (1 + g * 0.45);
      const pz = nz * 0.72 * (1 + g);

      cPos.setXYZ(i, px, py, pz);
      if (Math.random() > 0.58) nodePos.push([px, py, pz]);
    }

    cGeo.computeVertexNormals();

    const cerebrumWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(cGeo, 13),
      new THREE.LineBasicMaterial({ color: "#0d9488", transparent: true, opacity: 0.42 })
    );

    // ── CEREBELLUM: smaller sphere with horizontal foliation ──
    const cbGeo = new THREE.SphereGeometry(0.31, 18, 14);
    const cbPos = cbGeo.attributes.position;
    const cbNodes: [number, number, number][] = [];

    for (let i = 0; i < cbPos.count; i++) {
      const ox = cbPos.getX(i), oy = cbPos.getY(i), oz = cbPos.getZ(i);
      const r = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1e-9;
      const nx = ox / r, ny = oy / r, nz = oz / r;
      const fold = 0.038 * Math.sin(ny * 26);
      const px = nx * 0.30 * (1 + fold);
      const py = ny * 0.23 * (1 + fold);
      const pz = nz * 0.30 * (1 + fold);
      cbPos.setXYZ(i, px, py, pz);
      if (Math.random() > 0.52) cbNodes.push([px, py, pz]);
    }

    cbGeo.computeVertexNormals();
    const cerebellumWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(cbGeo, 10),
      new THREE.LineBasicMaterial({ color: "#14b8a6", transparent: true, opacity: 0.52 })
    );

    // ── BRAIN STEM ──
    const stemMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.062, 0.52, 10),
      new THREE.MeshStandardMaterial({
        color: "#0f766e", emissive: "#0f766e",
        emissiveIntensity: 0.5, transparent: true, opacity: 0.58, roughness: 0.38,
      })
    );
    stemMesh.position.set(0, -0.96, 0.18);

    return { cerebrumWire, cerebellumWire, stemMesh, nodePositions: nodePos, cerebNodes: cbNodes };
  }, []);

  const fireTimes = useRef<number[]>(nodePositions.map(() => -(Math.random() * 10)));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;

    // Cerebral node firing
    nodeMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;

      // Cerebellum nodes: gentle glow only
      if (i >= nodePositions.length) {
        mat.emissiveIntensity = 0.42 + Math.sin(t * 1.3 + i * 0.28) * 0.12;
        return;
      }

      const delta = t - fireTimes.current[i];

      if (delta >= 0 && delta < 0.28) {
        // Firing: bright flash
        const intensity = Math.sin((delta / 0.28) * Math.PI);
        mat.emissiveIntensity = 0.8 + intensity * 4.2;
        (mat.color as THREE.Color).set(intensity > 0.45 ? "#fef08a" : "#fbbf24");
        mesh.scale.setScalar(1 + intensity * 0.55);
      } else {
        // Resting: organic pulse
        mat.emissiveIntensity = 0.46 + Math.sin(t * 1.2 + i * 0.22) * 0.13;
        (mat.color as THREE.Color).set(i % 3 === 0 ? "#fef08a" : "#fbbf24");
        mesh.scale.setScalar(1);
        if (delta > 3.5 && Math.random() < 0.0006) fireTimes.current[i] = t;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      {/* Cerebrum wireframe mesh */}
      <primitive object={cerebrumWire} />

      {/* Cortical neuron dots */}
      {nodePositions.map((p, i) => (
        <mesh key={`n-${i}`} position={p}
          ref={(el) => { if (el) nodeMeshes.current[i] = el; }}>
          <sphereGeometry args={[0.021, 7, 7]} />
          <meshStandardMaterial
            color="#fbbf24" emissive="#fbbf24"
            emissiveIntensity={0.50} transparent opacity={0.82}
            roughness={0.22} metalness={0.18}
          />
        </mesh>
      ))}

      {/* Cerebellum */}
      <group position={[0.10, -0.88, -0.38]}>
        <primitive object={cerebellumWire} />
        {cerebNodes.map((p, i) => (
          <mesh key={`cb-${i}`} position={p}
            ref={(el) => { if (el) nodeMeshes.current[nodePositions.length + i] = el; }}>
            <sphereGeometry args={[0.020, 6, 6]} />
            <meshStandardMaterial
              color="#f59e0b" emissive="#f59e0b"
              emissiveIntensity={0.44} transparent opacity={0.78}
              roughness={0.24} metalness={0.20}
            />
          </mesh>
        ))}
      </group>

      {/* Brain stem */}
      <primitive object={stemMesh} />

      {/* Longitudinal fissure line */}
      <mesh position={[0, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 1.55, 6]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4"
          emissiveIntensity={0.9} transparent opacity={0.30} />
      </mesh>

      {/* Inner ambient glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.88, 14, 14]} />
        <meshStandardMaterial
          color="#0d9488" emissive="#0d9488"
          emissiveIntensity={1} transparent opacity={0.04}
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const AboutScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [2.0, 0.5, 3.0], fov: 48 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.10} />
        <pointLight position={[4, 3, 3]}    intensity={1.1} color="#34d399" />
        <pointLight position={[-3, -1, -3]} intensity={0.55} color="#06b6d4" />
        <pointLight position={[0, 4, 1]}    intensity={0.35} color="#a7f3d0" />
        <Brain />
      </Suspense>
    </Canvas>
  </div>
);

export default AboutScene;
