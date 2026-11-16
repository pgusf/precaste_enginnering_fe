/*
  SiteHeader.jsx
  Responsive header with dual branding, desktop navigation, mega menu, and mobile drawer.
*/
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORIES,
  DROPDOWN_MENUS,
  NAV,
  PORTALS,
  REGIONS,
  ICONS,
  SHAPES,
} from "./headerData";
import "./header.css";

const NAVY = "#002F7A";

/* ---------- Small components ---------- */

function Thumb({ shape, image, alt }) {
  const [err, setErr] = useState(false);
  const photo = image && !err;

  return (
    <div
      className={`aspect-[16/10] overflow-hidden rounded-lg ${
        photo ? "bg-[#070e1c]" : "peg-thumb-bg"
      }`}
    >
      {photo ? (
        <img
          src={`${process.env.PUBLIC_URL || ""}${image}`}
          alt={alt}
          loading="lazy"
          onError={() => setErr(true)}
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <svg
          viewBox="0 0 160 100"
          preserveAspectRatio="xMidYMid slice"
          className="block h-full w-full"
          aria-hidden="true"
        >
          <ellipse
            cx="80"
            cy="94"
            rx="60"
            ry="4"
            fill={NAVY}
            opacity=".1"
          />
          {SHAPES[shape]}
        </svg>
      )}
    </div>
  );
}

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 10 10"
    className={`h-2 w-2 flex-shrink-0 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
  >
    <path
      d="M1 3l4 4 4-4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const USFlag = () => (
  <svg
    viewBox="0 0 28 20"
    className="h-3 w-[18px] flex-none rounded-[2px]"
    aria-hidden="true"
  >
    <rect width="28" height="20" fill="#fff" />
    <g fill="#d02f44">
      {[0, 3.08, 6.15, 9.23, 12.31, 15.38, 18.46].map((y) => (
        <rect key={y} y={y} width="28" height="1.54" />
      ))}
    </g>
    <rect width="12" height="10.77" fill={NAVY} />
  </svg>
);

function Pop({ open, children, w = "w-52" }) {
  if (!open) return null;

  return (
    <div
      className={`absolute right-0 top-full z-50 mt-2 ${w} rounded-lg border border-[#d6e3fa] bg-white py-1.5 shadow-[0_18px_40px_-12px_rgba(0,47,122,.45)]`}
    >
      {children}
    </div>
  );
}

/* ---------- Main component ---------- */

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState(REGIONS[0]);
  const [query, setQuery] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [logo2Error, setLogo2Error] = useState(false);

  const timer = useRef(null);
  const rootRef = useRef(null);

  // Desktop viewport check (1024px and above)
  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width:1024px)").matches;

  const enter = (label) => {
    clearTimeout(timer.current);
    if (isDesktop()) setOpenMenu(label);
  };

  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (isDesktop()) setOpenMenu(null);
    }, 160);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setPortalsOpen(false);
        setRegionOpen(false);
        setMobileOpen(false);
        setMobileSubmenu(null);
      }
    };

    const onClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setPortalsOpen(false);
        setRegionOpen(false);
        setOpenMenu(null);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileSubmenu(null);
      } else {
        setOpenMenu(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("resize", onResize);
      clearTimeout(timer.current);
    };
  }, []);

  const cat = CATEGORIES[activeCategory];
  const megaOpen = openMenu === "Products & Solutions";
  const dd = openMenu && DROPDOWN_MENUS[openMenu];

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <div ref={rootRef} className="relative z-50">
      {/* TOP UTILITY BAR */}
      <div className="peg-topbar text-[12px] text-white">
        <div className="mx-auto flex max-w-[1536px] flex-wrap items-center justify-between gap-2 px-4 py-1.5 sm:px-6">
          <a
            href="mailto:ask@precastengineering.org"
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide text-white/95 transition hover:text-[#9cc2ff]"
          >
            <svg
              viewBox="0 0 20 16"
              className="h-3.5 w-3.5 fill-none stroke-current"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="1.5" y="1.5" width="17" height="13" rx="2" />
              <path
                d="M2.5 3l7.5 5.5L17.5 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ask@precastengineering.org
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Portals */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={portalsOpen}
                onClick={() => {
                  setPortalsOpen((v) => !v);
                  setRegionOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-wider text-white transition hover:text-[#9cc2ff]"
              >
                Portals <Chevron open={portalsOpen} />
              </button>

              <Pop open={portalsOpen} w="w-56">
                {PORTALS.map((p) => (
                  <Link
                    key={p.name}
                    to={p.href}
                    onClick={() => setPortalsOpen(false)}
                    className="block px-4 py-2 text-[13px] font-semibold text-[#0b1b3a] transition hover:bg-[#eaf1ff] hover:text-[#0066EE]"
                  >
                    {p.name}
                  </Link>
                ))}
              </Pop>
            </div>

            {/* Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="relative hidden items-center sm:flex"
            >
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 fill-none stroke-[#b8cbf5]"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M13 13l4 4" strokeLinecap="round" />
              </svg>

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drawings, specs..."
                aria-label="Search drawings, specs"
                className="w-[200px] rounded-md border border-white/25 bg-white/10 py-1 pl-8 pr-3 text-[12px] text-white placeholder-[#b8cbf5] outline-none transition focus:border-white focus:bg-white/15 md:w-[240px]"
              />
            </form>

            {/* Region */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={regionOpen}
                onClick={() => {
                  setRegionOpen((v) => !v);
                  setPortalsOpen(false);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white transition hover:bg-white/20"
              >
                <USFlag /> {region.label}
                <Chevron open={regionOpen} />
              </button>

              <Pop open={regionOpen} w="w-48">
                {REGIONS.map((r) => (
                  <button
                    type="button"
                    key={r.code}
                    onClick={() => {
                      setRegion(r);
                      setRegionOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-[12px] font-bold text-[#0b1b3a] transition hover:bg-[#eaf1ff] hover:text-[#0066EE]"
                  >
                    {r.label}
                    {region.code === r.code && (
                      <span className="h-2 w-2 rounded-full bg-[#0066EE]" />
                    )}
                  </button>
                ))}
              </Pop>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="relative bg-white shadow-[0_6px_20px_-8px_rgba(0,47,122,0.25)]">
        <div className="peg-header-inner mx-auto flex h-[72px] sm:h-[76px] lg:h-[80px] xl:h-[84px] max-w-[1536px] items-center justify-between gap-2 lg:gap-4 px-4 sm:px-6">
          {/* PRIMARY LOGO */}
          <Link
            to="/"
            onClick={closeAll}
            className="peg-logo-primary flex flex-none items-center py-1.5"
          >
            {!logoError ? (
              <img
                src={`${process.env.PUBLIC_URL || ""}/peg_logo.png`}
                alt="PEG - Precast Engineering Group"
                onError={() => setLogoError(true)}
                className="h-[40px] sm:h-[46px] lg:h-[48px] xl:h-[52px] w-auto max-w-[150px] sm:max-w-[180px] lg:max-w-[195px] xl:max-w-[215px] object-contain flex-shrink-0"
              />
            ) : (
              <span className="flex items-center gap-2 flex-shrink-0">
                <span className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-md bg-[#002F7A] text-xs sm:text-sm font-extrabold text-white">
                  PEG
                </span>
                <span className="flex flex-col leading-none">
                  <b className="text-[13px] sm:text-[15px] font-black text-[#002F7A]">
                    PRECAST
                  </b>
                  <b className="text-[10px] sm:text-[12px] font-extrabold text-[#0066EE]">
                    ENGINEERING GROUP
                  </b>
                </span>
              </span>
            )}
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main"
            className="peg-main-nav hidden lg:flex lg:flex-1 lg:items-center lg:justify-center"
          >
            <div className="flex items-center gap-0.5 xl:gap-1 2xl:gap-2">
              {NAV.map((n) => {
                const isOpen = openMenu === n.label;

                const cls =
                  "peg-nav inline-flex items-center gap-1 px-2 py-2 text-[11px] xl:px-2.5 xl:text-[12px] 2xl:px-3.5 2xl:text-[12.5px] font-extrabold uppercase tracking-[0.01em] whitespace-nowrap rounded transition-colors";

                if (n.mega || n.dropdown) {
                  return (
                    <div
                      key={n.label}
                      className="relative flex items-center py-4"
                      onMouseEnter={() => enter(n.label)}
                      onMouseLeave={leave}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        data-open={isOpen}
                        onClick={() =>
                          setOpenMenu(isOpen ? null : n.label)
                        }
                        className={cls}
                      >
                        {n.label} <Chevron open={isOpen} />
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={n.label} className="relative flex items-center py-4">
                    <Link
                      to={n.href}
                      onClick={() => setOpenMenu(null)}
                      className={cls}
                    >
                      {n.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="peg-header-actions hidden items-center gap-2.5 lg:gap-3 xl:gap-4 lg:flex flex-none">
            {/* <Link
              to="/products/underground/manholes"
              className="peg-cta whitespace-nowrap rounded-md px-3 py-2 xl:px-4 xl:py-2.5 text-[11px] xl:text-[12px] font-extrabold uppercase tracking-wider text-white shadow-sm"
            >
              ACCESS VAULT
            </Link> */}

            {/* SECOND LOGO (shown on laptop/desktop screens where space permits) */}
            <span
              className="hidden h-7 w-px bg-[#d6e3fa] xl:inline-block"
              aria-hidden="true"
            />

            <Link
              to="/"
              className="peg-logo-secondary hidden xl:flex flex-none items-center"
              title="Precast Drawings - Advanced Specs"
            >
              {!logo2Error ? (
                <img
                  src={`${process.env.PUBLIC_URL || ""}/usf_logo.png`}
                  alt="Precast Drawings - Advanced Specs"
                  onError={() => setLogo2Error(true)}
                  className="h-[38px] xl:h-[46px] 2xl:h-[50px] w-auto max-w-[140px] xl:max-w-[175px] 2xl:max-w-[195px] object-contain flex-shrink-0"
                />
              ) : (
                <span className="flex flex-col leading-none flex-shrink-0">
                  <b className="text-[12px] xl:text-[13px] font-black text-[#002F7A]">
                    PRECAST
                  </b>
                  <b className="text-[12px] xl:text-[13px] font-black text-[#0066EE]">
                    DRAWINGS
                  </b>
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              setMobileSubmenu(null);
            }}
            className="peg-cta ml-auto flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white lg:hidden"
          >
            {mobileOpen ? (
              <>
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Close</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Menu</span>
              </>
            )}
          </button>
        </div>

        {/* RED ACCENT LINE */}
        <div className="h-[3px] bg-[#D02F44]" />

        {/* DESKTOP MEGA MENU (Visible only on desktop when open) */}
        {megaOpen && isDesktop() && (
          <div
            id="mega-panel"
            role="region"
            aria-label="Products & Solutions"
            onMouseEnter={() => enter("Products & Solutions")}
            onMouseLeave={leave}
            className="absolute left-0 right-0 top-full z-50 bg-white shadow-[0_30px_60px_-20px_rgba(0,47,122,0.4)] border-b border-[#d6e3fa]"
          >
            <div className="mx-auto grid max-w-[1536px] grid-cols-1 lg:min-h-[390px] lg:grid-cols-[270px_1fr_260px] xl:grid-cols-[290px_1fr_280px]">
              {/* LEFT CATEGORIES */}
              <div
                role="tablist"
                aria-orientation="vertical"
                className="border-r border-[#d6e3fa] bg-[#eef4ff] py-4"
              >
                <h6 className="mx-6 mb-2.5 text-[11px] font-bold uppercase tracking-wider text-[#0066EE]">
                  Browse by category
                </h6>

                {CATEGORIES.map((c, i) => {
                  const on = i === activeCategory;

                  return (
                    <button
                      type="button"
                      key={c.name}
                      role="tab"
                      aria-selected={on}
                      onMouseEnter={() =>
                        isDesktop() && setActiveCategory(i)
                      }
                      onFocus={() => setActiveCategory(i)}
                      onClick={() => setActiveCategory(i)}
                      className={`relative flex w-full items-center gap-3 px-6 py-3 text-left text-[14px] xl:text-[15px] font-bold transition-colors ${
                        on
                          ? "bg-[#002F7A] text-white"
                          : "text-[#0b1b3a] hover:bg-white/70"
                      }`}
                    >
                      {on && (
                        <span className="absolute inset-y-0 left-0 w-1 bg-[#D02F44]" />
                      )}

                      <span
                        className={`grid h-8 w-8 xl:h-9 xl:w-9 flex-none place-items-center rounded-[10px] border ${
                          on
                            ? "border-[#0066EE] bg-[#0066EE]"
                            : "border-[#c9daf8] bg-white"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 xl:h-5 xl:w-5 fill-none"
                          style={{ stroke: on ? "#fff" : NAVY }}
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {ICONS[c.icon]}
                        </svg>
                      </span>

                      <span className="leading-tight">
                        {c.name}
                        <small
                          className={`mt-0.5 block text-[11px] xl:text-[11.5px] font-medium ${
                            on ? "text-[#c9d9fa]" : "text-[#5b6b8c]"
                          }`}
                        >
                          {c.desc}
                        </small>
                      </span>

                      <svg
                        viewBox="0 0 16 16"
                        className={`ml-auto h-4 w-4 fill-none stroke-current transition ${
                          on
                            ? "opacity-100"
                            : "-translate-x-1.5 opacity-0"
                        }`}
                        strokeWidth="2"
                      >
                        <path d="M5 2l6 6-6 6" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {/* MIDDLE SUBCATEGORIES */}
              <div className="p-5 lg:px-6 lg:py-5 xl:px-7">
                <div key={activeCategory} className="pane-in">
                  <div className="mb-4 flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-extrabold tracking-tight text-[#002F7A]">
                      {cat.name}
                    </h3>

                    <Link
                      to={cat.href}
                      onClick={closeAll}
                      className="whitespace-nowrap text-[13px] font-bold text-[#0066EE] hover:underline"
                    >
                      View 3D Assembly →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                    {cat.items.map((s) => (
                      <Link
                        key={s.name}
                        to={s.href}
                        onClick={closeAll}
                        className="group flex flex-col gap-2 rounded-xl border border-[#d6e3fa] bg-white p-2 transition hover:-translate-y-0.5 hover:border-[#0066EE] hover:shadow-[0_12px_26px_-12px_rgba(0,102,238,0.55)]"
                      >
                        <Thumb
                          shape={s.shape}
                          image={s.image}
                          alt={s.name}
                        />
                        <b className="px-1 text-[13px] xl:text-[13.5px] leading-tight text-[#0b1b3a] group-hover:text-[#0066EE]">
                          {s.name}
                        </b>
                        <span className="-mt-1 px-1 pb-0.5 text-[11px] xl:text-[11.5px] text-[#5b6b8c]">
                          {s.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT CTA */}
              <aside className="peg-aside relative hidden flex-col gap-3 overflow-hidden p-6 text-white lg:flex">
                <span className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full border-[32px] border-white/[0.07]" />

                <h4 className="relative text-lg font-bold leading-tight">
                  Can't find the right product?
                </h4>

                <p className="relative text-[13px] leading-relaxed text-[#c9d9fa]">
                  Our precast engineers will size, detail and stamp it for your project.
                </p>

                <ul className="relative grid gap-2 text-[13px]">
                  {[
                    "CAD & shop drawings",
                    "50-state PE/SE stamps",
                    "Reply within 1 business day",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <i className="h-2 w-2 rounded-sm bg-[#D02F44]" />
                      {t}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/products/underground/manholes"
                  onClick={closeAll}
                  className="relative mt-auto rounded-md bg-white px-4 py-2.5 text-center text-[13px] font-bold text-[#002F7A] transition hover:bg-[#D02F44] hover:text-white"
                >
                  Open 3D Foundry Explorer
                </Link>
              </aside>
            </div>
          </div>
        )}

        {/* DESKTOP OTHER DROPDOWNS */}
        {dd && isDesktop() && (
          <div
            role="region"
            aria-label={openMenu}
            onMouseEnter={() => enter(openMenu)}
            onMouseLeave={leave}
            className="absolute left-0 right-0 top-full z-50 bg-white shadow-[0_24px_48px_-16px_rgba(0,47,122,0.35)] border-b border-[#d6e3fa]"
          >
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 px-6 py-6 lg:grid-cols-[270px_1fr]">
              <div className="peg-aside relative overflow-hidden rounded-xl p-5 text-white">
                <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border-[22px] border-white/[0.07]" />

                <p className="relative text-[11px] font-extrabold uppercase tracking-widest text-[#D02F44]">
                  {dd.eyebrow}
                </p>

                <h3 className="relative mt-2 text-lg font-extrabold">
                  {openMenu}
                </h3>

                <p className="relative mt-2 text-xs leading-relaxed text-[#c9d9fa]">
                  {dd.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {dd.groups.map((g) => (
                  <div key={g.title}>
                    <h4 className="mb-2.5 border-b-2 border-[#d6e3fa] pb-2 text-xs font-extrabold uppercase tracking-wider text-[#0066EE]">
                      {g.title}
                    </h4>

                    <div className="grid gap-1">
                      {g.links.map((l) => {
                        const inner = (
                          <>
                            <div className="text-[13.5px] font-bold text-[#0b1b3a] group-hover:text-[#0066EE]">
                              {l.name}
                            </div>
                            <div className="text-[11.5px] text-[#5b6b8c]">
                              {l.note}
                            </div>
                          </>
                        );

                        const c =
                          "group block rounded-md border-l-2 border-transparent px-3 py-1.5 transition hover:border-[#0066EE] hover:bg-[#eaf1ff]";

                        return l.href.startsWith("mailto:") ? (
                          <a key={l.name} href={l.href} className={c}>
                            {inner}
                          </a>
                        ) : (
                          <Link
                            key={l.name}
                            to={l.href}
                            onClick={closeAll}
                            className={c}
                          >
                            {inner}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileOpen && !isDesktop() && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden absolute left-0 right-0 top-full z-50 flex max-h-[82vh] flex-col overflow-y-auto border-t border-[#d6e3fa] bg-white px-4 py-3 shadow-2xl"
          >
            {/* Search in mobile drawer */}
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="relative my-2 flex sm:hidden items-center"
            >
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute left-3 h-3.5 w-3.5 fill-none stroke-[#5b6b8c]"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M13 13l4 4" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search drawings, specs..."
                aria-label="Search drawings, specs"
                className="w-full rounded-md border border-[#d6e3fa] bg-[#f4f8ff] py-2 pl-9 pr-3 text-[13px] text-[#0b1b3a] placeholder-[#5b6b8c] outline-none transition focus:border-[#0066EE] focus:bg-white"
              />
            </form>

            {/* Mobile Nav Links Accordion */}
            <div className="flex flex-col divide-y divide-[#eef4ff]">
              {NAV.map((n) => {
                const isSubOpen = mobileSubmenu === n.label;

                if (n.mega) {
                  return (
                    <div key={n.label} className="py-1">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenu(isSubOpen ? null : n.label)
                        }
                        className="flex w-full items-center justify-between px-3 py-3 text-[13px] font-extrabold uppercase tracking-wide text-[#002F7A]"
                      >
                        <span>{n.label}</span>
                        <Chevron open={isSubOpen} />
                      </button>

                      {isSubOpen && (
                        <div className="mb-2 mt-1 space-y-3 rounded-lg bg-[#f4f8ff] p-3 border border-[#d6e3fa]">
                          {CATEGORIES.map((c) => (
                            <div key={c.name} className="space-y-1">
                              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0066EE]">
                                {c.name}
                              </div>
                              <div className="grid grid-cols-1 gap-1 pl-2">
                                {c.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={closeAll}
                                    className="py-1 text-[12.5px] font-medium text-[#0b1b3a] hover:text-[#0066EE]"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (n.dropdown) {
                  const menuData = DROPDOWN_MENUS[n.label];
                  return (
                    <div key={n.label} className="py-1">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSubmenu(isSubOpen ? null : n.label)
                        }
                        className="flex w-full items-center justify-between px-3 py-3 text-[13px] font-extrabold uppercase tracking-wide text-[#002F7A]"
                      >
                        <span>{n.label}</span>
                        <Chevron open={isSubOpen} />
                      </button>

                      {isSubOpen && menuData && (
                        <div className="mb-2 mt-1 space-y-3 rounded-lg bg-[#f4f8ff] p-3 border border-[#d6e3fa]">
                          {menuData.groups.map((g) => (
                            <div key={g.title} className="space-y-1">
                              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#0066EE]">
                                {g.title}
                              </div>
                              <div className="grid grid-cols-1 gap-1 pl-2">
                                {g.links.map((link) => {
                                  const isMail = link.href.startsWith("mailto:");
                                  const compClass =
                                    "py-1 text-[12.5px] font-medium text-[#0b1b3a] hover:text-[#0066EE]";
                                  return isMail ? (
                                    <a
                                      key={link.name}
                                      href={link.href}
                                      className={compClass}
                                    >
                                      {link.name}
                                    </a>
                                  ) : (
                                    <Link
                                      key={link.name}
                                      to={link.href}
                                      onClick={closeAll}
                                      className={compClass}
                                    >
                                      {link.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={n.label} className="py-1">
                    <Link
                      to={n.href}
                      onClick={closeAll}
                      className="block px-3 py-3 text-[13px] font-extrabold uppercase tracking-wide text-[#002F7A] hover:text-[#0066EE]"
                    >
                      {n.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions: Access Vault + Second Logo */}
            <div className="mt-4 pt-3 border-t border-[#d6e3fa] space-y-3">
              <Link
                to="/products/underground/manholes"
                onClick={closeAll}
                className="peg-cta block w-full rounded-md py-3 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-sm"
              >
                ACCESS VAULT
              </Link>

              <div className="flex items-center justify-center pt-2 pb-1">
                <Link
                  to="/"
                  onClick={closeAll}
                  className="flex items-center gap-2"
                  title="Precast Drawings - Advanced Specs"
                >
                  {!logo2Error ? (
                    <img
                      src={`${process.env.PUBLIC_URL || ""}/usf_logo.png`}
                      alt="Precast Drawings - Advanced Specs"
                      onError={() => setLogo2Error(true)}
                      className="h-[42px] w-auto max-w-[180px] object-contain"
                    />
                  ) : (
                    <span className="flex flex-col leading-none text-center">
                      <b className="text-[13px] font-black text-[#002F7A]">
                        PRECAST
                      </b>
                      <b className="text-[13px] font-black text-[#0066EE]">
                        DRAWINGS
                      </b>
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
