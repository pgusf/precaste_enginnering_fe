// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const FEATURED_CATEGORIES = [
  {
    title: "Manholes & Foundry Castings",
    category: "Underground Infrastructure",
    desc: "Heavy-duty AASHTO H-20/H-25 cast iron manhole covers, paving riser rings, and gusseted base frames.",
    href: "/products/underground/manholes",
    image: "/heroI1.jpg",
    badge: "3D Video & Parts Catalog",
    darkBg: true,
  },
  {
    title: "Utility Vaults & Accessories",
    category: "Underground Infrastructure",
    desc: "Precast telecom, electrical, and gas utility vaults engineered for 50-state DOT compliance.",
    href: "/products/underground/utility-vaults",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
    badge: "Structural Precast",
    darkBg: false,
  },
  {
    title: "Catch Basins & Curb Inlets",
    category: "Stormwater Systems",
    desc: "High-capacity stormwater grates, curb inlets, and precast drainage structures.",
    href: "/products/stormwater/catch-basins",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
    badge: "Stormwater Grade",
    darkBg: false,
  },
  {
    title: "Transformer & Equipment Pads",
    category: "Site Infrastructure",
    desc: "Reinforced precast concrete pads, box culverts, and highway barrier systems.",
    href: "/products/site/equipment-pads",
    image: "https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=900&q=80",
    badge: "Utility Ready",
    darkBg: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#0b1b3a]">
      {/* ==================== HERO BANNER ==================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #001B48 0%, #002F7A 58%, #0046B0 100%)",
        }}
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest"
              style={{
                backgroundColor: "rgba(255, 200, 61, 0.16)",
                color: "#ffc83d",
                border: "1px solid rgba(255, 200, 61, 0.4)",
              }}
            >
              PRECAST ENGINEERING GROUP • FOUNDRY & STRUCTURAL DIVISION
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Precision Precast Engineering & Heavy-Duty Foundry Castings
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9d9fa] sm:text-base">
              Use the <strong className="text-white">Products & Solutions</strong> menu above to open any dedicated subcategory page—complete with our 2-column gallery, center 3D assembly video player, sticky quote & engineering sidebar, and clickable sub-components (Cover, Riser, Base Frame).
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Link
                to="/products/underground/manholes"
                className="rounded-lg px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-lg transition hover:opacity-95"
                style={{ backgroundColor: "#ffc83d", color: "#002F7A" }}
              >
                Explore Manholes Subcategory Page →
              </Link>
              <Link
                to="/products/underground/utility-vaults"
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-white/20"
              >
                Browse Utility Vaults
              </Link>
            </div>
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-5">
            <div
              className="overflow-hidden rounded-2xl border p-5 shadow-2xl"
              style={{
                backgroundColor: "#060d1a",
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wider text-[#ffc83d]">
                  Featured Subcategory Assembly
                </span>
                <Link
                  to="/products/underground/manholes"
                  className="font-bold text-[#9cc2ff] hover:underline"
                >
                  Open Full Page →
                </Link>
              </div>
              <img
                src={`${process.env.PUBLIC_URL || ""}/heroI1.jpg`}
                alt="Exploded Manhole Assembly"
                className="mx-auto max-h-72 w-auto object-contain"
              />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <Link
                  to="/products/underground/manholes/cover"
                  className="rounded-lg py-2 font-extrabold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#002F7A" }}
                >
                  01 Covers
                </Link>
                <Link
                  to="/products/underground/manholes/riser"
                  className="rounded-lg py-2 font-extrabold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#0066EE" }}
                >
                  02 Risers
                </Link>
                <Link
                  to="/products/underground/manholes/frame"
                  className="rounded-lg py-2 font-extrabold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#002F7A" }}
                >
                  03 Frames
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUICK SUBCATEGORY DIRECTORY ==================== */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-2 border-b border-[#dce6f7] pb-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "#0066EE" }}>
              STATIC FRONTEND PRODUCT DIRECTORY
            </span>
            <h2 className="mt-1 text-2xl font-black" style={{ color: "#002F7A" }}>
              Select Any Subcategory Page
            </h2>
          </div>
          <p className="text-xs font-semibold" style={{ color: "#5b6b8c" }}>
            Each subcategory has its own dedicated page file in <code>src/pages/subcategories/</code>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_CATEGORIES.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e3e9f5] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#0066EE] hover:shadow-xl"
            >
              <div>
                <div
                  className="relative h-48 w-full overflow-hidden"
                  style={{ backgroundColor: item.darkBg ? "#070e1c" : "#e9f0ff" }}
                >
                  <img
                    src={item.image.startsWith("/") ? `${process.env.PUBLIC_URL || ""}${item.image}` : item.image}
                    alt={item.title}
                    className={`h-full w-full ${item.darkBg ? "object-contain p-3" : "object-cover"} transition-transform duration-300 group-hover:scale-105`}
                  />
                  <span
                    className="absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: "#002F7A", color: "#ffc83d" }}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: "#0066EE" }}>
                    {item.category}
                  </div>
                  <h3 className="mt-1 text-lg font-extrabold" style={{ color: "#002F7A" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#5b6b8c" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#e3e9f5] bg-[#f8faff] px-5 py-3 text-xs font-extrabold uppercase tracking-wider" style={{ color: "#0066EE" }}>
                Open Subcategory Page →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}