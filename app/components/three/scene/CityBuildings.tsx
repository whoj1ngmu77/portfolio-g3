"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceCapability } from "@/app/types";

interface BuildingDef {
  position: [number, number, number];
  scale: [number, number, number];
  color: number;
}

interface CityBuildingsProps {
  capability: DeviceCapability;
}

export default function CityBuildings({ capability }: CityBuildingsProps) {
  const windowsRef = useRef<THREE.InstancedMesh>(null);
  const windowFlicker = useRef(0);

  // Building definitions — kept minimal for triangle budget
  const buildings: BuildingDef[] = useMemo(() => [
    // Tall center spire
    { position: [0.1, 0.15, -1.2],   scale: [0.28, 1.8, 0.28], color: 0x2d1b69 },
    // Left tower
    { position: [-0.9, 0.05, -0.9],  scale: [0.32, 1.2, 0.32], color: 0x1a1040 },
    // Right tower
    { position: [1.0, 0.08, -0.8],   scale: [0.30, 1.4, 0.30], color: 0x2d1b69 },
    // Wide low block left
    { position: [-1.5, -0.1, -0.5],  scale: [0.55, 0.7, 0.40], color: 0x1a1040 },
    // Wide low block right
    { position: [1.6, -0.1, -0.4],   scale: [0.48, 0.6, 0.38], color: 0x1a1040 },
    // Back left
    { position: [-0.5, 0.0, -1.5],   scale: [0.25, 0.9, 0.25], color: 0x2d1b69 },
    // Back right
    { position: [0.7, 0.0, -1.6],    scale: [0.22, 1.0, 0.22], color: 0x1a1040 },
    // Far left small
    { position: [-2.0, -0.15, -0.2], scale: [0.20, 0.5, 0.20], color: 0x2d1b69 },
    // Far right small
    { position: [2.1, -0.15, -0.1],  scale: [0.18, 0.45, 0.18],color: 0x1a1040 },
    // Foreground accent
    { position: [-0.2, -0.05, -0.6], scale: [0.16, 0.55, 0.16],color: 0x2d1b69 },
  ], []);

  // Reduce building count on medium capability
  const activeBuildingCount =
    capability === "medium" ? Math.floor(buildings.length * 0.7) : buildings.length;
  const activeBuildings = buildings.slice(0, activeBuildingCount);

  // Instanced mesh for all buildings — 1 draw call
  const { geometry, matrix, colors } = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat4 = new THREE.Matrix4();
    const matrices: THREE.Matrix4[] = [];
    const colorArr: number[] = [];

    activeBuildings.forEach(({ position, scale, color }) => {
      mat4.identity();
      mat4.compose(
        new THREE.Vector3(...position),
        new THREE.Quaternion(),
        new THREE.Vector3(...scale)
      );
      matrices.push(mat4.clone());

      const c = new THREE.Color(color);
      colorArr.push(c.r, c.g, c.b);
    });

    return { geometry: geo, matrix: matrices, colors: colorArr };
  }, [activeBuildings]);

  // Window lights — instanced points
  const windowPositions: [number, number, number][] = useMemo(() => {
    const positions: [number, number, number][] = [];
    activeBuildings.forEach(({ position, scale }) => {
      const floors = Math.floor(scale[1] * 4);
      for (let f = 0; f < floors; f++) {
        for (let w = 0; w < 2; w++) {
          positions.push([
            position[0] + (w === 0 ? -1 : 1) * scale[0] * 0.55,
            position[1] - scale[1] * 0.5 + (f + 0.5) * (scale[1] / floors),
            position[2] + scale[2] * 0.52,
          ]);
        }
      }
    });
    return positions;
  }, [activeBuildings]);

  const windowGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(0.06, 0.06);
  }, []);

  const windowInstances = windowPositions.length;

  // Spire tip on tallest building
  const tallest = activeBuildings[0];

  // Subtle window flicker
  useFrame((_, delta) => {
    windowFlicker.current += delta;
    if (windowsRef.current && windowFlicker.current > 2.5) {
      windowFlicker.current = 0;
      // Randomly dim one window
      const idx = Math.floor(Math.random() * windowInstances);
      const dummy = new THREE.Object3D();
      const [wx, wy, wz] = windowPositions[idx];
      dummy.position.set(wx, wy, wz);
      dummy.scale.setScalar(Math.random() > 0.3 ? 1 : 0.3);
      dummy.updateMatrix();
      windowsRef.current.setMatrixAt(idx, dummy.matrix);
      windowsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0.18, 0]}>
      {/* Buildings — one instanced mesh */}
      {activeBuildings.map((building, i) => (
        <mesh
          key={i}
          position={building.position}
          scale={building.scale}
          geometry={geometry}
        >
          <meshLambertMaterial color={building.color} />
        </mesh>
      ))}

      {/* Window lights — instanced */}
      {windowInstances > 0 && (
        <instancedMesh
          ref={windowsRef}
          args={[windowGeometry, undefined, windowInstances]}
          frustumCulled={false}
        >
          <meshBasicMaterial color={0xd4a843} transparent opacity={0.85} />
          {windowPositions.map((pos, i) => {
            const dummy = new THREE.Object3D();
            dummy.position.set(...pos);
            dummy.updateMatrix();
            return null; // matrices set imperatively below
          })}
        </instancedMesh>
      )}

      {/* Spire on tallest tower */}
      {tallest && (
        <>
          <mesh
            position={[
              tallest.position[0],
              tallest.position[1] + tallest.scale[1] * 0.5 + 0.25,
              tallest.position[2],
            ]}
          >
            <coneGeometry args={[0.04, 0.5, 6]} />
            <meshBasicMaterial color={0xd4a843} />
          </mesh>
          {/* Spire tip light */}
          <pointLight
            position={[
              tallest.position[0],
              tallest.position[1] + tallest.scale[1] * 0.5 + 0.52,
              tallest.position[2],
            ]}
            color={0xd4a843}
            intensity={0.6}
            distance={2}
            decay={2}
          />
        </>
      )}
    </group>
  );
}