// src/pages/SubcategoryPages.js
// All 17 Dedicated Static Subcategory Pages in ONE file (No extra folder required!)
// Each page is its own exported component so you can customize images, video, or text for any subcategory individually.

import React from "react";
import SubcategoryShowcaseLayout from "../components/SubcategoryShowcaseLayout";
import { getSubcategoryBySlug } from "../data/foundryCatalogData";

/* ==================== 1. UNDERGROUND INFRASTRUCTURE PAGES ==================== */
export function ManholesPage() {
  const data = getSubcategoryBySlug("manholes", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function UtilityVaultsPage() {
  const data = getSubcategoryBySlug("utility-vaults", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function HandholesPage() {
  const data = getSubcategoryBySlug("handholes", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function TrenchSystemsPage() {
  const data = getSubcategoryBySlug("trench-systems", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function GreaseInterceptorsPage() {
  const data = getSubcategoryBySlug("grease-interceptors", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function SepticSystemsPage() {
  const data = getSubcategoryBySlug("septic-systems", "underground");
  return <SubcategoryShowcaseLayout data={data} />;
}

/* ==================== 2. STORMWATER SYSTEMS PAGES ==================== */
export function CatchBasinsPage() {
  const data = getSubcategoryBySlug("catch-basins", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function ConcretePipePage() {
  const data = getSubcategoryBySlug("concrete-pipe", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function BoxCulvertPage() {
  const data = getSubcategoryBySlug("box-culvert", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function DetentionSystemsPage() {
  const data = getSubcategoryBySlug("detention-systems", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function StormwaterTreatmentPage() {
  const data = getSubcategoryBySlug("treatment", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function PumpStationsPage() {
  const data = getSubcategoryBySlug("pump-stations", "stormwater");
  return <SubcategoryShowcaseLayout data={data} />;
}

/* ==================== 3. SITE INFRASTRUCTURE PAGES ==================== */
export function RetainingWallsPage() {
  const data = getSubcategoryBySlug("retaining-walls", "site");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function HighwayBarriersPage() {
  const data = getSubcategoryBySlug("highway-barriers", "site");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function EquipmentPadsPage() {
  const data = getSubcategoryBySlug("equipment-pads", "site");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function PillarPostsPage() {
  const data = getSubcategoryBySlug("pillar-posts", "site");
  return <SubcategoryShowcaseLayout data={data} />;
}

export function AgriculturePage() {
  const data = getSubcategoryBySlug("agriculture", "site");
  return <SubcategoryShowcaseLayout data={data} />;
}