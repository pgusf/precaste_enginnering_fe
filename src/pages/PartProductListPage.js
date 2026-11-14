// src/pages/PartProductListPage.js
// Product list page. Layout follows the competitor reference:
//   title block  ->  left "Refine by" filters  ->  product rows with "Add to quote"
// Square corners, solid colors only (navy #002F7A, blue #0066EE, USA red #D02F44).
import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubcategoryBySlug } from "../data/foundryCatalogData";

const pub = (p) => `${process.env.PUBLIC_URL || ""}${p || ""}`;

// Filters are built from your product data. Add a key here to add a new filter.
const FACETS = [
  { key: "material", label: "Material" },
  { key: "loadRating", label: "Load Rating" },
  { key: "clearOpening", label: "Clear Opening" },
];
const EMPTY = { material: [], loadRating: [], clearOpening: [] };

const mail = (subject) => `mailto:ask@precastengineering.org?subject=${encodeURIComponent(subject)}`;

export default function PartProductListPage() {
  const { categorySlug = "underground", subcategorySlug = "manholes", partSlug = "cover" } = useParams();

  const subcategory = getSubcategoryBySlug(subcategorySlug);
  const currentPart = subcategory.parts.find((p) => p.id === partSlug.toLowerCase()) || subcategory.parts[0];
  const base = `/products/${categorySlug}/${subcategorySlug}`;

  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState(EMPTY);
  const [sort, setSort] = useState("default");
  const [view, setView] = useState("list"); // "list" | "table"
  const [selected, setSelected] = useState(null);

  // reset when the user switches to another part
  useEffect(() => {
    setSearch("");
    setPicked(EMPTY);
    setSelected(null);
  }, [currentPart.id]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const facets = useMemo(
    () =>
      FACETS.map((f) => {
        const counts = {};
        currentPart.products.forEach((p) => {
          if (p[f.key]) counts[p[f.key]] = (counts[p[f.key]] || 0) + 1;
        });
        return { ...f, options: Object.entries(counts) };
      }).filter((f) => f.options.length > 0),
    [currentPart]
  );

  const toggle = (key, val) =>
    setPicked((s) => ({ ...s, [key]: s[key].includes(val) ? s[key].filter((v) => v !== val) : [...s[key], val] }));
  const activeCount = Object.values(picked).reduce((n, a) => n + a.length, 0);
  const clearAll = () => { setPicked(EMPTY); setSearch(""); };

  const products = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = currentPart.products.filter((p) => {
      const hit = !q || [p.name, p.sku, p.dimensions, p.material].some((v) => String(v || "").toLowerCase().includes(q));
      const ok = FACETS.every((f) => picked[f.key].length === 0 || picked[f.key].includes(p[f.key]));
      return hit && ok;
    });
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "sku") return [...list].sort((a, b) => a.sku.localeCompare(b.sku));
    return list;
  }, [currentPart, search, picked, sort]);

  return (
    <div className="min-h-screen bg-white text-[#0b1b3a]">
      {/* ===== breadcrumb ===== */}
      <div className="border-b border-[#d6e3fa] bg-[#f4f7fc]">
        <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#5b6b8c] sm:px-6">
          <Link to="/" className="hover:text-[#0066EE]">Home</Link>
          <span>/</span>
          <Link to={base} className="hover:text-[#0066EE]">{subcategory.title}</Link>
          <span>/</span>
          <span className="font-extrabold text-[#002F7A]">{currentPart.name}</span>
        </nav>
      </div>

      {/* ===== title block ===== */}
      <header className="border-b border-[#d6e3fa] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#5b6b8c]">
              <span className="h-2 w-2 bg-[#D02F44]" />
              Part #{currentPart.partNumber} • {subcategory.title}
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#002F7A] sm:text-4xl">{currentPart.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#3b4a68]">
              {currentPart.tagline}. {currentPart.specs}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to={base} className="border-2 border-[#002F7A] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#002F7A] transition hover:bg-[#002F7A] hover:text-white">
              ← Back to {subcategory.title}
            </Link>
            <a href={mail(`Submittal Package Request - ${currentPart.name}`)} className="bg-[#D02F44] px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-[#b02339]">
              Request Submittal Package
            </a>
          </div>
        </div>

        {/* sibling part tabs */}
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-2 px-4 pb-5 sm:px-6">
          {subcategory.parts.map((part) => {
            const on = part.id === currentPart.id;
            return (
              <Link
                key={part.id}
                to={`${base}/${part.id}`}
                className={`inline-flex items-center gap-2 border-2 px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider transition ${on ? "border-[#002F7A] bg-[#002F7A] text-white" : "border-[#d6e3fa] bg-white text-[#002F7A] hover:border-[#0066EE]"}`}
              >
                <span>#{part.partNumber}</span>
                <span>{part.shortName}</span>
                <span className={`px-1.5 py-0.5 text-[10px] ${on ? "bg-[#D02F44] text-white" : "bg-[#e1ecff] text-[#002F7A]"}`}>{part.productCount}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* ===== sidebar + list ===== */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr]">
        {/* refine by */}
        <aside className="self-start border border-[#d6e3fa] bg-[#f4f7fc] lg:sticky lg:top-4">
          <div className="flex items-center justify-between border-b border-[#d6e3fa] bg-[#002F7A] px-4 py-3 text-white">
            <h2 className="text-sm font-extrabold uppercase tracking-wider">Refine by</h2>
            {(activeCount > 0 || search) && (
              <button type="button" onClick={clearAll} className="text-[11px] font-extrabold uppercase tracking-wider text-[#ff8a9a] hover:text-white">
                Clear all
              </button>
            )}
          </div>

          <div className="p-4">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#5b6b8c]" htmlFor="plp-search">Search</label>
            <input
              id="plp-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SKU, size or spec..."
              className="mt-1.5 w-full border border-[#c9daf8] bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-[#0066EE]"
            />
          </div>

          {facets.map((f) => (
            <fieldset key={f.key} className="border-t border-[#d6e3fa] p-4">
              <legend className="float-left mb-2 w-full text-[13px] font-extrabold text-[#002F7A]">{f.label}</legend>
              <div className="clear-both grid gap-1.5">
                {f.options.map(([val, count]) => (
                  <label key={val} className="flex cursor-pointer items-start gap-2 text-xs font-semibold text-[#0b1b3a] hover:text-[#0066EE]">
                    <input
                      type="checkbox"
                      checked={picked[f.key].includes(val)}
                      onChange={() => toggle(f.key, val)}
                      className="mt-0.5 h-3.5 w-3.5 flex-none accent-[#002F7A]"
                    />
                    <span>{val} <span className="text-[#8b9bb4]">({count})</span></span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </aside>

        {/* results */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#002F7A] pb-3">
            <p className="text-xs font-bold text-[#5b6b8c]">
              Showing <strong className="text-[#002F7A]">{products.length}</strong> of {currentPart.products.length} products
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-[#5b6b8c]">
                Sort
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-[#c9daf8] bg-white px-2 py-1.5 text-xs font-bold text-[#002F7A] outline-none focus:border-[#0066EE]">
                  <option value="default">Featured</option>
                  <option value="name">Name A–Z</option>
                  <option value="sku">SKU</option>
                </select>
              </label>
              <div className="flex border border-[#c9daf8]">
                {[["list", "List"], ["table", "Spec Table"]].map(([k, l]) => (
                  <button key={k} type="button" onClick={() => setView(k)} className={`px-3 py-1.5 text-xs font-extrabold ${view === k ? "bg-[#002F7A] text-white" : "bg-white text-[#5b6b8c] hover:text-[#002F7A]"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="border border-dashed border-[#c9daf8] bg-[#f4f7fc] p-10 text-center">
              <p className="text-sm font-bold text-[#002F7A]">No products match your filters.</p>
              <button type="button" onClick={clearAll} className="mt-3 bg-[#D02F44] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#b02339]">Clear all filters</button>
            </div>
          ) : view === "list" ? (
            <div className="border border-[#d6e3fa]">
              {products.map((p) => (
                <article key={p.id} className="flex flex-col gap-4 border-b border-[#d6e3fa] p-4 last:border-b-0 hover:bg-[#f8faff] sm:flex-row sm:items-center">
                  <button type="button" onClick={() => setSelected(p)} aria-label={`View ${p.name}`} className="h-32 w-full flex-none overflow-hidden bg-[#070e1c] sm:w-32">
                    <img src={pub(p.image)} alt={p.name} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: p.cropPosition || "50% 50%" }} />
                  </button>

                  <div className="min-w-0 flex-1">
                    <h3>
                      <button type="button" onClick={() => setSelected(p)} className="text-left text-base font-extrabold text-[#0066EE] hover:text-[#002F7A] hover:underline">
                        {p.name}
                      </button>
                    </h3>
                    <div className="mt-1 text-xs font-bold">
                      SKU: <span className="font-mono text-[#002F7A]">{p.sku}</span>
                      {p.partType && <span className="ml-2 bg-[#e1ecff] px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-[#002F7A]">{p.partType}</span>}
                    </div>
                    <dl className="mt-2 grid gap-x-8 gap-y-1 text-xs sm:grid-cols-2">
                      {[["Material", p.material], ["Dimensions", p.dimensions], ["Clear opening", p.clearOpening], ["Load rating", p.loadRating], ["Weight", p.weight]].map(([k, v]) =>
                        v ? (
                          <div key={k} className="flex gap-1.5">
                            <dt className="font-semibold text-[#5b6b8c]">{k}:</dt>
                            <dd className="font-bold text-[#0b1b3a]">{v}</dd>
                          </div>
                        ) : null
                      )}
                    </dl>
                    <button type="button" onClick={() => setSelected(p)} className="mt-2.5 text-[11px] font-extrabold uppercase tracking-wider text-[#0066EE] hover:text-[#002F7A]">
                      See more details →
                    </button>
                  </div>

                  <div className="flex flex-none gap-2 sm:w-36 sm:flex-col">
                    <a href={mail(`Quote Request - ${p.sku} ${p.name}`)} className="flex-1 bg-[#D02F44] px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white transition hover:bg-[#b02339]">
                      Add to quote
                    </a>
                    <a href={mail(`CAD Request - ${p.sku}`)} className="flex-1 border-2 border-[#002F7A] px-4 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-[#002F7A] transition hover:bg-[#002F7A] hover:text-white">
                      CAD
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto border border-[#d6e3fa]">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-[#002F7A] text-white">
                    {["SKU", "Product", "Material", "Dimensions", "Weight", "Load", ""].map((h) => (
                      <th key={h} className="px-4 py-3 font-extrabold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d6e3fa]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#f4f7fc]">
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-extrabold text-[#0066EE]">{p.sku}</td>
                      <td className="px-4 py-3 font-bold text-[#002F7A]">{p.name}</td>
                      <td className="px-4 py-3">{p.material}</td>
                      <td className="px-4 py-3 font-semibold">{p.dimensions}</td>
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-bold">{p.weight}</td>
                      <td className="px-4 py-3">{p.loadRating}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button type="button" onClick={() => setSelected(p)} className="mr-2 border border-[#002F7A] px-3 py-1.5 text-[11px] font-extrabold uppercase text-[#002F7A] hover:bg-[#002F7A] hover:text-white">Details</button>
                        <a href={mail(`Quote Request - ${p.sku} ${p.name}`)} className="bg-[#D02F44] px-3 py-1.5 text-[11px] font-extrabold uppercase text-white hover:bg-[#b02339]">Quote</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* ===== details modal ===== */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b16]/80 p-4" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 bg-[#002F7A] px-5 py-4 text-white">
              <div>
                <div className="font-mono text-xs font-bold text-[#9cc2ff]">{selected.sku}{selected.partType ? ` • ${selected.partType}` : ""}</div>
                <h3 className="mt-1 text-xl font-extrabold">{selected.name}</h3>
              </div>
              <button type="button" aria-label="Close" onClick={() => setSelected(null)} className="bg-white/10 px-3 py-1.5 text-xs font-extrabold hover:bg-white/20">✕</button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
              <div className="flex items-center justify-center bg-[#070e1c] p-4">
                <img src={pub(selected.image)} alt={selected.name} className="max-h-72 w-auto object-contain" />
              </div>
              <dl className="grid content-start gap-px border border-[#d6e3fa] bg-[#d6e3fa] text-xs">
                {[["Material specification", selected.material], ["Dimensions", selected.dimensions], ["Clear opening", selected.clearOpening], ["Load rating", selected.loadRating], ["Weight", selected.weight], ["Surface / seat", selected.surface], ["Finish", selected.coating], ["Lifting / hardware", selected.lifting]].map(([k, v]) =>
                  v ? (
                    <div key={k} className="bg-white px-3 py-2.5">
                      <dt className="text-[10px] font-extrabold uppercase tracking-wider text-[#5b6b8c]">{k}</dt>
                      <dd className="mt-0.5 font-bold text-[#002F7A]">{v}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            <div className="flex flex-wrap justify-end gap-2.5 border-t border-[#d6e3fa] p-4">
              <a href={mail(`Request CAD Drawing - ${selected.sku}`)} className="border-2 border-[#002F7A] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#002F7A] hover:bg-[#002F7A] hover:text-white">Download CAD</a>
              <a href={mail(`Quote Request - ${selected.sku} ${selected.name}`)} className="bg-[#D02F44] px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#b02339]">Add to quote</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}