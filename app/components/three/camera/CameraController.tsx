"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

interface CameraControllerProps {
  scrollY: number;
}

// Camera start and end positions
const START_POS = new THREE.Vector3(0, 2.5, 9);
const START_TARGET = new THREE.Vector3(0, 0, 0);
const END_POS = new THREE.Vector3(0, 3.5, 12);
const END_TARGET = new THREE.Vector3(0, 0.5, 0);

export default function CameraController({ scrollY }: CameraControllerProps) {
  const { camera } = useThree();
  const mode = useNimbaraStore((s) => s.mode);

  const currentPos = useRef(new THREE.Vector3().copy(START_POS));
  const currentTarget = useRef(new THREE.Vector3().copy(START_TARGET));
  const idleTime = useRef(0);

  useFrame((_, delta) => {
    idleTime.current += delta;

    if (mode === "explore") {
      // In explore mode — gentle auto-orbit
      const angle = idleTime.current * 0.12;
      const targetPos = new THREE.Vector3(
        Math.sin(angle) * 8,
        2.5 + Math.sin(idleTime.current * 0.08) * 0.4,
        Math.cos(angle) * 8
      );
      currentPos.current.lerp(targetPos, 0.012);
      currentTarget.current.lerp(START_TARGET, 0.05);
    } else {
      // Scroll mode — camera pulls back as user scrolls
      // scrollY is 0–1 normalized progress within hero section
      const t = Math.min(scrollY / 0.3, 1); // full effect at 30% scroll

      const targetPos = new THREE.Vector3(
        THREE.MathUtils.lerp(START_POS.x, END_POS.x, t),
        THREE.MathUtils.lerp(START_POS.y, END_POS.y, t),
        THREE.MathUtils.lerp(START_POS.z, END_POS.z, t)
      );
      const targetLook = new THREE.Vector3(
        THREE.MathUtils.lerp(START_TARGET.x, END_TARGET.x, t),
        THREE.MathUtils.lerp(START_TARGET.y, END_TARGET.y, t),
        THREE.MathUtils.lerp(START_TARGET.z, END_TARGET.z, t)
      );

      // Idle breathing on top of scroll position
      targetPos.y += Math.sin(idleTime.current * 0.4) * 0.06;

      currentPos.current.lerp(targetPos, 0.06);
      currentTarget.current.lerp(targetLook, 0.06);
    }

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}