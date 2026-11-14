/*
  Subcategory3DPage.jsx  (updated)

  INSTALL (only needed for .glb 3D models):
    npm i three @react-three/fiber @react-three/drei

  Add ONE of these to each subcategory in foundryCatalogData:
    model: "/models/manhole.glb"                       // best: real 3D model
    framePath: "/360/manhole-{n}.webp", frameCount: 36 // or a photo/render sequence
  If neither exists, the page falls back to heroImage (static, no rotation).
*/
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Bounds, Html, useProgress } from "@react-three/drei";
import { getSubcategoryBySlug } from "../data/foundryCatalogData";

const pub = (p) => `${process.env.PUBLIC_URL || ""}${p}`;

/* ---------- 360 VIEWERS ---------- */
function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function Loading() {
  const { progress } = useProgress();
  return (
    <Html center className="whitespace-nowrap text-sm font-semibold text-[#b8cbf5]">
      Loading {progress.toFixed(0)}%
    </Html>
  );
}

function ModelViewer({ url }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [3, 2, 5] }}>
      <Suspense fallback={<Loading />}>
        <Environment preset="city" />
        <Bounds fit clip observe margin={1.3}>
          <Model url={url} />
        </Bounds>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={12} blur={2.6} far={4} color="#0066EE" />
      </Suspense>
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={1.2}
        enablePan={false}
        minDistance={2}
        maxDistance={9}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
    </Canvas>
  );
}

function SequenceViewer({ framePath, count, alt }) {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const drag = useRef(null);
  const auto = useRef(true);
  const src = (n) => pub(framePath.replace("{n}", String(n).padStart(2, "0")));

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      Array.from({ length: count }, (_, k) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src(k + 1);
        })
      )
    ).then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, [framePath, count]);

  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => auto.current && setI((v) => (v + 1) % count), 90);
    return () => clearInterval(t);
  }, [ready, count]);

  const down = (e) => { auto.current = false; drag.current = { x: e.clientX, i }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => {
    if (!drag.current) return;
    const step = Math.round((e.clientX - drag.current.x) / 12);
    setI((((drag.current.i - step) % count) + count) % count);
  };
  const up = () => { drag.current = null; };

  return (
    <div
      className="relative h-full w-full cursor-grab select-none active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      {!ready && <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-[#b8cbf5]">Loading 360° view…</div>}
      <img src={src(i + 1)} alt={alt} draggable={false} className={`h-full w-full object-contain ${ready ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

function Viewer360({ data }) {
  if (data.model) return <ModelViewer url={pub(data.model)} />;
  if (data.framePath && data.frameCount) return <SequenceViewer framePath={data.framePath} count={data.frameCount} alt={data.title} />;
  return (
    <img
      src={pub(data.heroImage)}
      alt={data.title}
      draggable={false}
      className="h-full w-full object-contain"
      style={{ filter: "drop-shadow(0 28px 38px rgba(0,0,0,0.85))" }}
    />
  );
}

/* ---------- PAGE ---------- */
export default function Subcategory3DPage() {
  const { categorySlug = "underground", subcategorySlug = "manholes" } = useParams();
  const navigate = useNavigate();
  const data = getSubcategoryBySlug(subcategorySlug);
  const [activePartId, setActivePartId] = useState(data.parts[0]?.id || "cover");

  const goToPartProducts = (partId) => navigate(`/products/${categorySlug}/${subcategorySlug}/${partId}`);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4f7fc", color: "#0b1b3a" }}>
      {/* ==================== HERO / BREADCRUMB ==================== */}
      <div
        className="border-b border-white/10 text-white"
        style={{ background: "linear-gradient(135deg, #001B48 0%, #002F7A 55%, #003e9c 100%)" }}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:py-8">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#b8cbf5]">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to={`/products/${categorySlug}/${subcategorySlug}`} className="capitalize hover:text-white">
              {categorySlug.replace(/-/g, " ")}
            </Link>
            <span>/</span>
            <span className="font-bold text-[#ffc83d]">{data.title}</span>
          </nav>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest"
                style={{ backgroundColor: "rgba(255,200,61,0.16)", color: "#ffc83d", border: "1px solid rgba(255,200,61,0.35)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ffc83d" }} />
                {data.badge}
              </span>
              <h1 className="mt-2.5 text-2xl font-black tracking-tight text-white sm:text-4xl">{data.title}</h1>
              <p className="mt-1.5 max-w-3xl text-sm text-[#c9d9fa] sm:text-base">{data.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {data.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-lg border border-white/15 px-3.5 py-2.5 backdrop-blur-sm"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#9cc2ff]">{h.label}</div>
                  <div className="mt-0.5 text-xs font-extrabold text-white">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 360 VIEWER + PARTS PANEL ==================== */}
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12">
          {/* LEFT: clean 360 viewer (no toolbar, no badge, no pins, no buttons) */}
          <div className="lg:col-span-7">
            <div
              className="relative h-[520px] overflow-hidden rounded-2xl border shadow-2xl sm:h-[620px]"
              style={{
                borderColor: "#002F7A",
                boxShadow: "0 25px 60px -15px rgba(0,47,122,0.35)",
                background:
                  "radial-gradient(60% 55% at 50% 45%, rgba(0,102,238,0.28), transparent 70%), linear-gradient(180deg,#07102a 0%,#050a14 100%)",
              }}
            >
              {/* faint grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[.06]"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                  backgroundSize: "52px 52px",
                }}
              />
              <div className="relative h-full w-full p-4">
                <Viewer360 data={data} />
              </div>
              <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-[#7f95c4]">
                Drag to rotate · Scroll to zoom
              </p>
            </div>
          </div>

          {/* RIGHT: parts list */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="rounded-2xl border border-[#e3e9f5] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#e3e9f5] pb-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: "#0066EE" }}>
                    ASSEMBLY PARTS
                  </span>
                  <h2 className="mt-1 text-xl font-black" style={{ color: "#002F7A" }}>
                    Select a Component to View Products
                  </h2>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ backgroundColor: "#f4f7fc", color: "#002F7A" }}>
                  {data.parts.length} Sub-Categories
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {data.parts.map((part) => {
                  const on = activePartId === part.id;
                  return (
                    <div
                      key={part.id}
                      onMouseEnter={() => setActivePartId(part.id)}
                      onClick={() => goToPartProducts(part.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && goToPartProducts(part.id)}
                      className="group cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        backgroundColor: on ? "#002F7A" : "#ffffff",
                        borderColor: on ? "#002F7A" : "#e3e9f5",
                        color: on ? "#ffffff" : "#0b1b3a",
                        boxShadow: on ? "0 14px 28px -10px rgba(0,47,122,0.45)" : "0 2px 6px rgba(0,47,122,0.04)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <span
                            className="grid h-10 w-10 flex-none place-items-center rounded-lg text-sm font-black"
                            style={{ backgroundColor: on ? "#ffc83d" : "#f4f7fc", color: "#002F7A" }}
                          >
                            {part.partNumber}
                          </span>
                          <div>
                            <h3 className="text-base font-extrabold" style={{ color: on ? "#ffffff" : "#002F7A" }}>
                              {part.name}
                            </h3>
                            <p className="mt-0.5 text-xs" style={{ color: on ? "#c9d9fa" : "#5b6b8c" }}>
                              {part.tagline}
                            </p>
                            <div
                              className="mt-2 inline-block rounded px-2 py-0.5 text-[11px] font-bold"
                              style={{ backgroundColor: on ? "rgba(255,255,255,0.12)" : "#f4f7fc", color: on ? "#ffc83d" : "#0066EE" }}
                            >
                              {part.specs}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between self-stretch">
                          <span
                            className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-extrabold"
                            style={{ backgroundColor: on ? "#0066EE" : "#e9f0ff", color: on ? "#ffffff" : "#002F7A" }}
                          >
                            {part.productCount} Models
                          </span>
                          <span
                            className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider"
                            style={{ color: on ? "#ffc83d" : "#0066EE" }}
                          >
                            View List →
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-5 flex flex-col justify-between gap-3 rounded-xl p-4 sm:flex-row sm:items-center"
                style={{ backgroundColor: "#f4f7fc", border: "1px solid #dce6f7" }}
              >
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider" style={{ color: "#002F7A" }}>
                    Need Custom Badging or Special Rise Height?
                  </div>
                  <div className="text-xs" style={{ color: "#5b6b8c" }}>
                    We cast custom municipal logos, DOT specs, and bespoke ring heights.
                  </div>
                </div>
                <a
                  href="mailto:ask@precastengineering.org"
                  className="whitespace-nowrap rounded-md px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white transition hover:opacity-95"
                  style={{ backgroundColor: "#002F7A" }}
                >
                  Request Custom Casting
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PART CARDS GRID ==================== */}
        <div className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-2 border-b border-[#dce6f7] pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0066EE" }}>
                DIRECT COMPONENT CATALOG
              </span>
              <h2 className="mt-1 text-2xl font-black" style={{ color: "#002F7A" }}>
                Browse {data.title} by Part Category
              </h2>
            </div>
            <p className="text-xs font-semibold" style={{ color: "#5b6b8c" }}>
              Click any component card below to open its complete specification table & product catalog
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.parts.map((part) => (
              <Link
                key={part.id}
                to={`/products/${categorySlug}/${subcategorySlug}/${part.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3e9f5] bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#0066EE] hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden" style={{ backgroundColor: "#070e1c" }}>
                  <img
                    src={pub(data.heroImage)}
                    alt={part.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ objectPosition: part.products[0]?.cropPosition || "50% 50%" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,27,72,0.85) 0%, transparent 60%)" }} />
                  <span
                    className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: "#002F7A", color: "#ffc83d", border: "1px solid rgba(255,200,61,0.4)" }}
                  >
                    Part #{part.partNumber}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold text-white" style={{ backgroundColor: "#0066EE" }}>
                    {part.productCount} Products
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="text-lg font-extrabold group-hover:text-[#0066EE]" style={{ color: "#002F7A" }}>
                      {part.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#5b6b8c" }}>
                      {part.tagline}
                    </p>
                  </div>
                  <div className="mt-4 border-t border-[#e3e9f5] pt-3">
                    <div className="text-[11px] font-bold" style={{ color: "#0b1b3a" }}>{part.specs}</div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider" style={{ color: "#0066EE" }}>
                      <span>Explore {part.shortName} Products</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}