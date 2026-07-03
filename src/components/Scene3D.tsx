"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// 1. COMPONENTA: Rețeaua de date (Particulele)
function DataParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[particlesPosition, 3]} 
        />
      </bufferGeometry>
      {/* Puncte mai fine, consum mai mic */}
      <pointsMaterial size={0.02} color="#00f3ff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

// 2. COMPONENTA: Obiectul Hero (Nucleul Cyber)
function ZephyrCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      // Rotație lină după mouse
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, (state.mouse.x * Math.PI) / 4, 0.05);
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, (state.mouse.y * Math.PI) / 4, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      {/* Am coborât obiectul puțin (y: -0.5) și l-am făcut un grup */}
      <group ref={coreRef} position={[0, -0.5, 0]}>
        
        {/* Stratul 1: Miezul de metal negru solid */}
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Stratul 2: Cușca Wireframe Neon care îl înconjoară */}
        <mesh>
          <icosahedronGeometry args={[1.3, 0]} />
          {/* meshBasicMaterial cu wireframe consumă 0 resurse */}
          <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.3} />
        </mesh>
        
      </group>
    </Float>
  );
}

// 3. COMPONENTA PRINCIPALĂ
export default function Scene3D() {
  return (
    // FIX IMPORTANT: pointer-events-none lasă click-urile să treacă prin canvas către butoanele de HTML
    // fixed inset-0 îl ține blocat în fundal când dai scroll
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00f3ff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8a2be2" />
        
        <DataParticles />
        <ZephyrCore />
      </Canvas>
    </div>
  );
}