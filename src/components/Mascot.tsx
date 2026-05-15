import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

type OrbitConfig = {
  id: string;
  accent: string;
  glow: string;
  metal: string;
  y: number;
  z: number;
  scale: number;
  speed: number;
  phase: number;
  rotation: [number, number, number];
  spin: [number, number, number];
};

type OrbitLayout = OrbitConfig & {
  startX: number;
};

type PointerCaptureTarget = {
  releasePointerCapture?: (pointerId: number) => void;
  setPointerCapture?: (pointerId: number) => void;
};

const ORBITS: OrbitConfig[] = [
  {
    id: "contracts",
    accent: "#00a77d",
    glow: "#8df8d7",
    metal: "#d6ddd5",
    y: 1.45,
    z: -0.18,
    scale: 1.08,
    speed: 0.22,
    phase: 0.1,
    rotation: [0.62, -0.28, -0.22],
    spin: [0.18, 0.12, 0.16]
  },
  {
    id: "pipeline",
    accent: "#b76e45",
    glow: "#ffd391",
    metal: "#d7aa58",
    y: 0.65,
    z: -0.34,
    scale: 1.02,
    speed: 0.22,
    phase: 2.4,
    rotation: [0.7, 0.22, 0.16],
    spin: [0.14, -0.18, 0.2]
  },
  {
    id: "lineage",
    accent: "#2d6f9e",
    glow: "#9fc2ff",
    metal: "#d7d5c8",
    y: -0.12,
    z: -0.52,
    scale: 1.04,
    speed: 0.22,
    phase: 4.8,
    rotation: [0.58, -0.38, 0.12],
    spin: [-0.2, 0.16, -0.14]
  },
  {
    id: "insights",
    accent: "#9b741e",
    glow: "#ffe1a6",
    metal: "#d7c39a",
    y: -0.85,
    z: -0.66,
    scale: 0.96,
    speed: 0.22,
    phase: 6.1,
    rotation: [0.46, 0.12, -0.18],
    spin: [0.16, 0.2, 0.12]
  }
];

const RING_Y_SCALE = 0.72;

function pointOnOrbit(radius: number, angle: number, z = 0) {
  return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * RING_Y_SCALE, z);
}

function makeArcGeometry(radius: number, start: number, length: number, tube: number) {
  const points: THREE.Vector3[] = [];
  const segments = 112;

  for (let index = 0; index <= segments; index += 1) {
    const angle = start + (length * index) / segments;
    points.push(pointOnOrbit(radius, angle));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.TubeGeometry(curve, segments, tube, 22, false);
}

function ArcSegment({
  accent,
  color,
  length,
  radius,
  start,
  tube
}: {
  accent: string;
  color: string;
  length: number;
  radius: number;
  start: number;
  tube: number;
}) {
  const geometry = useMemo(() => makeArcGeometry(radius, start, length, tube), [length, radius, start, tube]);
  const startPoint = useMemo(() => pointOnOrbit(radius, start), [radius, start]);
  const endPoint = useMemo(() => pointOnOrbit(radius, start + length), [length, radius, start]);

  return (
    <group>
      <mesh castShadow geometry={geometry} receiveShadow>
        <meshPhysicalMaterial
          clearcoat={0.86}
          clearcoatRoughness={0.14}
          color={color}
          envMapIntensity={2.1}
          metalness={0.88}
          roughness={0.16}
        />
      </mesh>
      {[startPoint, endPoint].map((point, index) => (
        <mesh key={`${radius}-${start}-${index}`} castShadow position={point}>
          <sphereGeometry args={[tube * 1.04, 28, 18]} />
          <meshPhysicalMaterial
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            color={index === 0 ? color : accent}
            emissive={index === 0 ? "#000000" : accent}
            emissiveIntensity={index === 0 ? 0 : 0.12}
            envMapIntensity={2.2}
            metalness={0.9}
            roughness={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitWire({ color, opacity, radius, z }: { color: string; opacity: number; radius: number; z: number }) {
  return (
    <mesh position={[0, 0, z]} scale={[1, RING_Y_SCALE, 1]}>
      <torusGeometry args={[radius, 0.006, 8, 180]} />
      <meshBasicMaterial color={color} opacity={opacity} transparent />
    </mesh>
  );
}

function SignalNode({
  angle,
  color,
  glow,
  radius,
  size
}: {
  angle: number;
  color: string;
  glow: string;
  radius: number;
  size: number;
}) {
  const position = useMemo(() => pointOnOrbit(radius, angle, 0.12), [angle, radius]);

  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[size, 34, 22]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.08}
          color={color}
          emissive={glow}
          emissiveIntensity={0.1}
          envMapIntensity={2.4}
          metalness={0.82}
          roughness={0.1}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[size, 24, 16]} />
        <meshBasicMaterial color={glow} opacity={0.12} transparent />
      </mesh>
    </group>
  );
}

function FlowPacket({
  color,
  glow,
  offset,
  radius,
  reducedMotion,
  speed,
  motionPaused
}: {
  color: string;
  glow: string;
  offset: number;
  radius: number;
  reducedMotion: boolean;
  speed: number;
  motionPaused: boolean;
}) {
  const packetRef = useRef<THREE.Group | null>(null);
  const angleRef = useRef(offset);

  useFrame((state, delta) => {
    const packet = packetRef.current;
    if (!packet) {
      return;
    }

    const safeDelta = Math.min(delta, 0.1);

    if (!reducedMotion && !motionPaused) {
      angleRef.current += speed * safeDelta;
      if (angleRef.current > Math.PI * 2) {
        angleRef.current -= Math.PI * 2;
      }
    }

    packet.position.copy(pointOnOrbit(radius, angleRef.current, 0.22));
  });

  return (
    <group ref={packetRef}>
      <mesh>
        <sphereGeometry args={[0.052, 22, 16]} />
        <meshPhysicalMaterial
          clearcoat={1}
          clearcoatRoughness={0.05}
          color={color}
          emissive={glow}
          emissiveIntensity={0.32}
          envMapIntensity={2.6}
          metalness={0.42}
          roughness={0.08}
        />
      </mesh>
      <mesh scale={2.2}>
        <sphereGeometry args={[0.052, 18, 12]} />
        <meshBasicMaterial color={glow} opacity={0.16} transparent />
      </mesh>
    </group>
  );
}

function DataOrbitModel({
  config,
  reducedMotion,
  rotationOffset,
  motionPaused
}: {
  config: OrbitConfig;
  reducedMotion: boolean;
  rotationOffset: MutableRefObject<{ x: number; y: number }>;
  motionPaused: boolean;
}) {
  const modelRef = useRef<THREE.Group | null>(null);
  const spinRef = useRef({ x: 0, y: 0, z: 0 });
  const bobRef = useRef(0);

  useFrame((state, delta) => {
    const model = modelRef.current;
    if (!model) {
      return;
    }

    const safeDelta = Math.min(delta, 0.1);

    if (!reducedMotion && !motionPaused) {
      spinRef.current.x += config.spin[0] * safeDelta;
      spinRef.current.y += config.spin[1] * safeDelta;
      spinRef.current.z += config.spin[2] * safeDelta;
      if (spinRef.current.x > Math.PI * 2) {
        spinRef.current.x -= Math.PI * 2;
      }
      if (spinRef.current.y > Math.PI * 2) {
        spinRef.current.y -= Math.PI * 2;
      }
      if (spinRef.current.z > Math.PI * 2) {
        spinRef.current.z -= Math.PI * 2;
      }
      const t = state.clock.elapsedTime + config.phase;
      bobRef.current = Math.sin(t * 0.72) * 0.055;
    }

    model.rotation.x = config.rotation[0] + rotationOffset.current.x + spinRef.current.x;
    model.rotation.y = config.rotation[1] + rotationOffset.current.y + spinRef.current.y;
    model.rotation.z = config.rotation[2] + spinRef.current.z;
    model.position.y = bobRef.current;
  });

  return (
    <group ref={modelRef}>
      <OrbitWire color={config.metal} opacity={0.26} radius={1.92} z={-0.08} />
      <OrbitWire color={config.accent} opacity={0.22} radius={1.24} z={0.08} />
      <ArcSegment
        accent={config.accent}
        color={config.metal}
        length={Math.PI * 1.62}
        radius={1.58}
        start={Math.PI * 0.08}
        tube={0.105}
      />
      <ArcSegment
        accent={config.glow}
        color={config.accent}
        length={Math.PI * 1.4}
        radius={1.02}
        start={Math.PI * 0.95}
        tube={0.076}
      />
      <ArcSegment
        accent={config.accent}
        color={config.metal}
        length={Math.PI * 1.12}
        radius={0.54}
        start={Math.PI * -0.16}
        tube={0.054}
      />
      <mesh castShadow position={[0, 0, 0.14]}>
        <sphereGeometry args={[0.26, 44, 28]} />
        <meshPhysicalMaterial
          clearcoat={0.94}
          clearcoatRoughness={0.12}
          color="#202725"
          emissive={config.accent}
          emissiveIntensity={0.04}
          envMapIntensity={2.5}
          metalness={0.72}
          roughness={0.18}
        />
      </mesh>
      <SignalNode angle={Math.PI * 0.28} color="#f2efe4" glow={config.glow} radius={1.58} size={0.1} />
      <SignalNode angle={Math.PI * 1.2} color={config.accent} glow={config.glow} radius={1.02} size={0.086} />
      <SignalNode angle={Math.PI * 1.72} color={config.metal} glow={config.glow} radius={0.54} size={0.074} />
      <FlowPacket
        color="#fffaf0"
        glow={config.glow}
        offset={config.phase}
        radius={1.58}
        reducedMotion={reducedMotion}
        speed={0.86}
        motionPaused={motionPaused}
      />
      <FlowPacket
        color={config.accent}
        glow={config.glow}
        offset={config.phase + Math.PI * 0.82}
        radius={1.02}
        reducedMotion={reducedMotion}
        speed={1.08}
        motionPaused={motionPaused}
      />
    </group>
  );
}

function MovingOrbit({
  compact,
  config,
  reducedMotion,
  dragLock,
  setDragLock,
  wrapAt
}: {
  compact: boolean;
  config: OrbitLayout;
  reducedMotion: boolean;
  dragLock: string | null;
  setDragLock: (value: string | null) => void;
  wrapAt: number;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ pointerX: 0, pointerY: 0, rotationX: 0, rotationY: 0 });
  const rotationOffset = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scale = config.scale * (compact ? 0.68 : 1);
  const motionPaused = dragLock !== null && dragLock !== config.id;

  useEffect(() => {
    const event = new CustomEvent("ringHover", { detail: hovered && !dragLock });
    window.dispatchEvent(event);
  }, [hovered, dragLock]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const safeDelta = Math.min(delta, 0.1);
    const t = state.clock.elapsedTime + config.phase;
    const targetScale = active || hovered ? scale * 1.055 : scale;
    group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

    if (!dragging.current && !reducedMotion && !motionPaused) {
      group.position.x += config.speed * safeDelta * (compact ? 0.7 : 1);
      group.position.z = config.z + Math.sin(t * 0.22) * 0.08;

      if (group.position.x > wrapAt) {
        group.position.x = -wrapAt;
      }
    } else {
      group.position.z = config.z;
    }
  });

  function onPointerDown(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    dragging.current = true;
    setActive(true);
    setDragLock(config.id);
    dragStart.current = {
      pointerX: event.nativeEvent.clientX,
      pointerY: event.nativeEvent.clientY,
      rotationX: rotationOffset.current.x,
      rotationY: rotationOffset.current.y
    };
    (event.target as unknown as PointerCaptureTarget).setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) {
      return;
    }

    event.stopPropagation();
    const deltaX = event.nativeEvent.clientX - dragStart.current.pointerX;
    const deltaY = event.nativeEvent.clientY - dragStart.current.pointerY;
    rotationOffset.current.x = dragStart.current.rotationX + deltaY * 0.006;
    rotationOffset.current.y = dragStart.current.rotationY + deltaX * 0.0075;
    rotationOffset.current.x = THREE.MathUtils.euclideanModulo(rotationOffset.current.x, Math.PI * 2);
    rotationOffset.current.y = THREE.MathUtils.euclideanModulo(rotationOffset.current.y, Math.PI * 2);
  }

  function onPointerUp(event: ThreeEvent<PointerEvent>) {
    if (!dragging.current) {
      return;
    }

    event.stopPropagation();
    dragging.current = false;
    setActive(false);
    if (dragLock === config.id) {
      setDragLock(null);
    }
    (event.target as unknown as PointerCaptureTarget).releasePointerCapture?.(event.pointerId);
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerOut={() => setHovered(false)}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerCancel={onPointerUp}
      onPointerUp={onPointerUp}
      position={[config.startX * (compact ? 0.62 : 1), config.y * (compact ? 0.72 : 1), config.z]}
      scale={scale}
    >
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 12, 10]} />
        <meshBasicMaterial depthWrite={false} opacity={0} transparent />
      </mesh>
      <DataOrbitModel
        config={config}
        reducedMotion={reducedMotion}
        rotationOffset={rotationOffset}
        motionPaused={motionPaused || active}
      />
    </group>
  );
}

function OrbitScene({ compact, reducedMotion }: { compact: boolean; reducedMotion: boolean }) {
  const [dragLock, setDragLock] = useState<string | null>(null);
  const viewport = useThree((state) => state.viewport);
  const visibleOrbits = useMemo(() => (compact ? ORBITS.slice(0, 2) : ORBITS), [compact]);
  const orbitSpacing = compact ? 4.2 : 5.2;
  const minSpan = orbitSpacing * visibleOrbits.length;
  const wrapAt = Math.max(minSpan / 2, viewport.width / 2 + orbitSpacing);
  const layoutOrbits = useMemo(
    () =>
      visibleOrbits.map((config, index) => ({
        ...config,
        startX: -wrapAt + orbitSpacing * index
      })),
    [orbitSpacing, visibleOrbits, wrapAt]
  );

  return (
    <>
      <ambientLight intensity={0.38} />
      <directionalLight color="#fff6df" intensity={1.9} position={[3, 4, 7]} />
      <directionalLight color="#9fc2ff" intensity={0.75} position={[-4, 1.5, 4]} />
      <pointLight color="#00a77d" intensity={0.55} position={[0, 2.6, 3.2]} />
      <Suspense fallback={null}>
        <Environment resolution={256}>
          <Lightformer color="#fff8df" intensity={3.8} position={[0, 3.6, 6]} scale={[8, 2.2, 1]} />
          <Lightformer color="#87fff0" intensity={1.6} position={[-4, 1.2, 4]} scale={[2, 5, 1]} />
          <Lightformer color="#ffbc76" intensity={1.15} position={[4, -1.2, 5]} scale={[2.8, 3, 1]} />
        </Environment>
      </Suspense>
      {layoutOrbits.map((config) => (
        <MovingOrbit
          key={config.id}
          compact={compact}
          config={config}
          reducedMotion={reducedMotion}
          dragLock={dragLock}
          setDragLock={setDragLock}
          wrapAt={wrapAt}
        />
      ))}
    </>
  );
}

export function Mascot() {
  const compact = useMediaQuery("(max-width: 760px)");
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="orbit-field">
      <Canvas
        camera={{ fov: 38, position: [0, 0, 7.6] }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
        shadows
      >
        <OrbitScene compact={compact} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
