// src/components/SubcategoryShowcaseLayout.js
// Same layout as before:
//  LEFT  (7/12): 2-column image gallery with one autoplay video in the middle
//  RIGHT (5/12): sticky product / options / quote sidebar + info cards
// Changes: top breadcrumb + "Jump to part" bar removed, yellow -> USA red (#D02F44),
// solid colors only (no gradients), cleaner cards, spacing and typography.

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DEFAULT_GALLERY = [
  { src: "/molds/M11.jpeg", caption: "Exploded 3D Manhole Assembly" },
  { src: "/molds/M12.jpg", caption: "Heavy-Duty Foundry Casting" },
  { src: "/molds/M13.jpg", caption: "CNC Machined Riser Seating" },
  { src: "/molds/M14.jpg", caption: "Paving Riser Ring & Seal" },
  { src: "/molds/M15.jpg", caption: "Municipal Roadway Installation" },
  { src: "/molds/M16.jpg", caption: "8-Gusset Flanged Base Frame" },
];

const DEFAULT_PARTS = [
  { id: "cover", partNumber: "01", name: "Manhole Covers & Lids", shortName: "Cover", specs: '24" - 36" Dia • Solid / Vented / Gasketed • Custom Foundry Logo', productCount: 6 },
  { id: "riser", partNumber: "02", name: "Paving Riser Rings & Extension Collars", shortName: "Riser", specs: '1" to 6" Rise Heights • Expandable & Fixed • Machined Bearing Seat', productCount: 6 },
  { id: "frame", partNumber: "03", name: "Flanged Base Frames & Gusseted Rings", shortName: "Base Frame", specs: '6" to 9" Frame Depth • 8-Gusset Ribbed Flange • Precast Anchor Holes', productCount: 6 },
  { id: "gaskets-hardware", partNumber: "04", name: "Seals, Gaskets & Locking Hardware", shortName: "Gaskets & Locks", specs: "Oil-Resistant Nitrile Red Seals • SS316 Lock Bolts • Butyl Mastic Rope", productCount: 4 },
];

const DEFAULT_SIZES = ['18" Dia', '24" Dia', '30" Dia', '36" Dia', '42" Dia', '48" Dia', "Custom"];

/* plain image tile: image fills the whole box */
function Tile({ item }) {
  return (
    <div className="aspect-[4/5] w-full overflow-hidden bg-[#eceef1]">
      <img src={item.src} alt={item.caption || ""} className="h-full w-full object-cover" />
    </div>
  );
}

const Label = ({ children }) => (
  <div className="mb-2.5 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#5b6b8c]">
    <span className="h-2 w-2 bg-[#D02F44]" />
    {children}
  </div>
);

export default function SubcategoryShowcaseLayout({ data = {} }) {
  const navigate = useNavigate();

  const parts = Array.isArray(data?.parts) && data.parts.length > 0 ? data.parts : DEFAULT_PARTS;
  const gallery = Array.isArray(data?.gallery) && data.gallery.length >= 6 ? data.gallery : DEFAULT_GALLERY;
  const sizes = Array.isArray(data?.sizes) && data.sizes.length > 0 ? data.sizes : DEFAULT_SIZES;

  const categorySlug = data?.categorySlug || "underground";
  const slug = data?.slug || "manholes";
  const categoryName = data?.categoryName || "Underground Infrastructure";
  const codeNumber = data?.codeNumber || `PEG-${slug.slice(0, 3).toUpperCase()}-2400`;
  const title = data?.title || "Manhole Assemblies & Foundry Castings";
  const subtitle = data?.subtitle || "Heavy-Duty Cast & Ductile Iron Cover, Paving Riser & Base Frame System";
  const loadRatingSpec = data?.loadRatingSpec || "AASHTO H-25 / HS-20 Rated";
  const standardBadge = data?.standardBadge || "ASTM A48 CL 35B";
  const videoUrl =
    data?.videoUrl || "/molds/MV1.mp4";

  const [selectedPart, setSelectedPart] = useState(parts[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[1] || sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const activePart = selectedPart || parts[0];
  const goPart = (id) => navigate(`/products/${categorySlug}/${slug}/${id || "cover"}`);

  useEffect(() => {
    if (!quoteOpen) return;
    const onKey = (e) => e.key === "Escape" && setQuoteOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [quoteOpen]);

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#0b1b3a]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ============ LEFT: IMAGES + ONE VIDEO IN THE MIDDLE ============ */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Tile item={gallery[0]} />
              <Tile item={gallery[1]} />

              <div className="bg-[#050b16] sm:col-span-2">
                <video
                  className="pointer-events-none aspect-[16/9] w-full object-cover"
                  src={videoUrl}
                  poster={gallery[0].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                />
              </div>

              <Tile item={gallery[2]} />
              <Tile item={gallery[3]} />
              <Tile item={gallery[4]} />
              <Tile item={gallery[5]} />
            </div>
          </div>

          {/* ============ RIGHT: STICKY SIDEBAR ============ */}
          <div className="lg:sticky lg:top-6 lg:col-span-5">
            <div className="border border-[#d6e3fa] bg-white p-6 shadow-sm">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5b6b8c]">
                {categoryName} • Product No: <span className="text-[#D02F44]">#{codeNumber}</span>
              </div>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#002F7A]">{title}</h1>
              <p className="mt-1 text-sm text-[#5b6b8c]">{subtitle}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                <span className="text-lg font-extrabold text-[#002F7A]">{loadRatingSpec}</span>
                <span className="bg-[#0066EE] px-2.5 py-1 text-[11px] font-extrabold uppercase text-white">{standardBadge}</span>
                <span className="text-xs font-semibold text-[#8b9bb4]">Exceeds Standard Class 20B</span>
              </div>

              <div className="mt-4 flex items-center gap-3 border border-[#c9dcff] bg-[#eef4ff] px-3.5 py-3">
                <span className="grid h-7 w-7 flex-none place-items-center bg-[#002F7A] text-xs font-black text-white">★</span>
                <div className="text-xs leading-snug">
                  <div className="font-extrabold text-[#002F7A]">Direct Foundry Supply • 50-State DOT & PE Stamped Submittals</div>
                  <div className="text-[11px] font-medium text-[#5b6b8c]">Custom municipal badging & bulk contractor pricing applied on quote</div>
                </div>
              </div>

              {/* component selector */}
              <div className="mt-6 border-t border-[#e3e9f5] pt-5">
                <Label>Select Assembly Component</Label>
                <div className="grid grid-cols-4 gap-2">
                  {parts.map((part) => {
                    const on = activePart.id === part.id;
                    return (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => setSelectedPart(part)}
                        onDoubleClick={() => goPart(part.id)}
                        className={`flex flex-col items-center gap-1.5 border-2 px-1 py-2.5 transition ${on ? "border-[#002F7A] bg-[#eef4ff]" : "border-[#e3e9f5] bg-white hover:border-[#0066EE]"}`}
                      >
                        <span className={`grid h-9 w-9 place-items-center text-[13px] font-black ${on ? "bg-[#D02F44] text-white" : "bg-[#002F7A] text-white"}`}>
                          {part.partNumber}
                        </span>
                        <span className={`text-center text-[11px] font-extrabold leading-tight ${on ? "text-[#002F7A]" : "text-[#5b6b8c]"}`}>{part.shortName}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2.5 text-xs text-[#5b6b8c]">
                  <strong className="text-[#002F7A]">{activePart.name}</strong> • {activePart.productCount || 6} models
                </p>
              </div>

              {/* sizes */}
              <div className="mt-5">
                <Label>Nominal Clear Opening / Size</Label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[64px] border-2 px-3 py-2 text-xs font-bold transition ${selectedSize === sz ? "border-[#002F7A] bg-[#002F7A] text-white" : "border-[#d6e3fa] bg-white text-[#0b1b3a] hover:border-[#0066EE]"}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* quantity + stock */}
              <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Label>Project Quantity</Label>
                  <div className="inline-flex items-center overflow-hidden border-2 border-[#d6e3fa] bg-white">
                    <button type="button" aria-label="Decrease" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 text-sm font-bold text-[#002F7A] hover:bg-[#eef4ff]">−</button>
                    <span className="min-w-[48px] text-center text-sm font-extrabold">{quantity}</span>
                    <button type="button" aria-label="Increase" onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2 text-sm font-bold text-[#002F7A] hover:bg-[#eef4ff]">+</button>
                  </div>
                </div>
                <div className="flex items-center gap-2 pb-2 text-xs font-semibold text-[#0b1b3a]">
                  <span className="h-2.5 w-2.5 bg-emerald-600" />
                  In stock at foundry — ready to dispatch
                </div>
              </div>

              {/* actions */}
              <div className="mt-6 grid gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="w-full bg-[#D02F44] py-3.5 text-[13px] font-extrabold uppercase tracking-wider text-white shadow-[0_10px_20px_-10px_rgba(208,47,68,0.8)] transition hover:bg-[#b02339]"
                >
                  Request a Quote
                </button>
                <button
                  type="button"
                  onClick={() => goPart(activePart.id)}
                  className="w-full border-2 border-[#002F7A] py-3 text-[12.5px] font-extrabold uppercase tracking-wider text-[#002F7A] transition hover:bg-[#002F7A] hover:text-white"
                >
                  View All {activePart.shortName} Models & CAD ({activePart.productCount || 6})
                </button>
              </div>

              <div className="mt-3 bg-[#eef4ff] px-3.5 py-2.5 text-xs font-semibold text-[#002F7A]">
                ⏱ PE-stamped submittals & shop drawings delivered within 1 business day
              </div>
            </div>

            {/* Card A: guide box */}
            <div className="mt-5 bg-[#002F7A] p-6 text-center text-white shadow-md">
              <span className="inline-block bg-[#D02F44] px-3 py-1 text-[10px] font-black uppercase tracking-widest">PEG Foundry & Engineering Guide</span>
              <h2 className="mt-3 text-lg font-extrabold leading-snug">Why Municipal & DOT Engineers Specify PEG {title} Over Standard Castings</h2>
              <p className="mt-2 text-xs leading-relaxed text-[#c9d9fa]">
                Precision CNC-machined seating surfaces, AASHTO H-25 heavy traffic load ratings, and integrated elastomeric cushion seals, engineered to eliminate lid rattle and infiltration.
              </p>
            </div>

            {/* Card B: challenges */}
            <div className="mt-4 border border-[#d6e3fa] border-l-4 border-l-[#D02F44] bg-white p-5 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#002F7A]">Solving common field & paving challenges</h3>
              <ul className="mt-3 grid gap-3 text-xs leading-relaxed text-[#253858]">
                {[
                  ["Zero Cover Rattle or Traffic Shock:", "Precision-ground bearing seats and red nitrile seals prevent rocking under heavy axle loads."],
                  ["Rapid Asphalt Overlay Adjustment:", "Paving riser rings adjust manhole height in minutes without tearing up road base concrete."],
                  ["8-Gusset Structural Flange Base:", "Distributes extreme wheel loads evenly into the precast concrete cone or top slab."],
                ].map(([h, t]) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-[#0066EE]" />
                    <span><strong className="text-[#002F7A]">{h}</strong> {t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card C: feature 01 */}
            <div className="mt-4 border border-[#d6e3fa] bg-white p-5 shadow-sm">
              <span className="inline-block bg-[#e1ecff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#002F7A]">Feature 01</span>
              <h3 className="mt-2 text-sm font-black uppercase tracking-wide text-[#002F7A]">Heavy-Duty AASHTO H-20 / H-25 Foundry Metallurgy</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5b6b8c]">
                Poured from certified ASTM A48 Class 35B gray iron and ASTM A536 ductile iron with full heat-lot traceability and mill test reports.
              </p>
              <div className="mt-4 overflow-hidden bg-[#060d1a]">
                <img src={gallery[0].src} alt={title} className="mx-auto max-h-56 w-auto object-contain p-3" />
                <div className="grid grid-cols-3 gap-2 bg-[#002F7A] p-3 text-center text-[11px] text-white">
                  {[["40,000+ LBS", "Proof Load Tested"], ["CNC SEAT", "Machined Tolerance"], ["50-STATE", "DOT Compliant"]].map(([a, b]) => (
                    <div key={a}>
                      <div className="font-black text-[#ff6b7f]">{a}</div>
                      <div className="text-[10px] text-[#c9d9fa]">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card D: feature 02 */}
            <div className="mt-4 border border-[#d6e3fa] bg-white p-5 shadow-sm">
              <span className="inline-block bg-[#e1ecff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#002F7A]">Feature 02 • Sub-Subcategory Parts</span>
              <h3 className="mt-2 text-sm font-black uppercase tracking-wide text-[#002F7A]">Click any part to view all products</h3>
              <div className="mt-3 grid gap-2">
                {parts.map((part) => (
                  <Link
                    key={part.id}
                    to={`/products/${categorySlug}/${slug}/${part.id}`}
                    className="flex items-center justify-between gap-3 border border-[#d6e3fa] bg-[#f8faff] px-3.5 py-3 text-xs transition hover:border-[#0066EE] hover:bg-[#eef4ff]"
                  >
                    <div>
                      <span className="font-extrabold text-[#002F7A]">#{part.partNumber} {part.name}</span>
                      <div className="mt-0.5 text-[11px] text-[#5b6b8c]">{part.specs}</div>
                    </div>
                    <span className="whitespace-nowrap font-extrabold text-[#D02F44]">{part.productCount || 6} Products →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ QUOTE MODAL ============ */}
      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b16]/80 p-4" onClick={() => setQuoteOpen(false)}>
          <div role="dialog" aria-modal="true" className="w-full max-w-lg bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 border-b border-[#e3e9f5] pb-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D02F44]">Product No: #{codeNumber}</span>
                <h3 className="text-lg font-black text-[#002F7A]">Request Foundry Quote & CAD Package</h3>
              </div>
              <button type="button" aria-label="Close" onClick={() => setQuoteOpen(false)} className="bg-[#eef4ff] px-2.5 py-1 text-xs font-extrabold text-[#002F7A] hover:bg-[#e1ecff]">✕</button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:ask@precastengineering.org?subject=Quote%20Request%20-%20${encodeURIComponent(`${title} (${activePart.shortName} - ${selectedSize})`)}&body=Quantity:%20${quantity}`;
                setQuoteOpen(false);
              }}
              className="mt-4 grid gap-3 text-xs"
            >
              <div className="bg-[#eef4ff] p-3 font-semibold text-[#002F7A]">
                Selected: <strong>{title}</strong> • Part: <strong>{activePart.shortName}</strong> • Size: <strong>{selectedSize}</strong> • Qty: <strong>{quantity}</strong>
              </div>
              {[["text", "Your Name / Engineering Firm", true], ["email", "Work Email Address", true], ["tel", "Phone Number", false]].map(([t, p, r]) => (
                <input key={p} type={t} required={r} placeholder={p} className="border border-[#d6e3fa] px-3 py-2.5 outline-none focus:border-[#0066EE]" />
              ))}
              <textarea rows={3} placeholder="Project location, DOT specification, or custom badging requirements..." className="border border-[#d6e3fa] px-3 py-2.5 outline-none focus:border-[#0066EE]" />
              <button type="submit" className="mt-1 bg-[#D02F44] py-3 font-extrabold uppercase tracking-wider text-white transition hover:bg-[#b02339]">Send Quote Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}