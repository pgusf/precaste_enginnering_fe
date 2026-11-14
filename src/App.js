// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/header/SiteHeader";
import HomePage from "./pages/HomePage";
import Subcategory3DPage from "./pages/Subcategory3DPage";
import PartProductListPage from "./pages/PartProductListPage";
import SubcategoryShowcaseLayout from "./components/SubcategoryShowcaseLayout";


// All 17 Dedicated Static Subcategory Pages imported without needing a separate subfolders setup
import {
  UtilityVaultsPage,
  HandholesPage,
  TrenchSystemsPage,
  GreaseInterceptorsPage,
  SepticSystemsPage,
  CatchBasinsPage,
  ConcretePipePage,
  BoxCulvertPage,
  DetentionSystemsPage,
  StormwaterTreatmentPage,
  PumpStationsPage,
  RetainingWallsPage,
  HighwayBarriersPage,
  EquipmentPadsPage,
  PillarPostsPage,
  AgriculturePage,
} from "./pages/SubcategoryPages";

import "./App.css";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-[#f4f7fc] text-[#0b1b3a]">
        <SiteHeader />
        <Routes>
          {/* 1. Separate Home Page at "/" (Subcategory page only opens when clicked in navbar menu) */}
          <Route path="/" element={<SubcategoryShowcaseLayout />} />

          {/* 2. Dedicated Static Pages for Underground Infrastructure Subcategories */}
          <Route path="/products/underground/manholes" element={<Subcategory3DPage />} />
          <Route path="/products/underground/utility-vaults" element={<UtilityVaultsPage />} />
          <Route path="/products/underground/handholes" element={<HandholesPage />} />
          <Route path="/products/underground/trench-systems" element={<TrenchSystemsPage />} />
          <Route path="/products/underground/grease-interceptors" element={<GreaseInterceptorsPage />} />
          <Route path="/products/underground/septic-systems" element={<SepticSystemsPage />} />

          {/* 3. Dedicated Static Pages for Stormwater Systems Subcategories */}
          <Route path="/products/stormwater/catch-basins" element={<CatchBasinsPage />} />
          <Route path="/products/stormwater/concrete-pipe" element={<ConcretePipePage />} />
          <Route path="/products/stormwater/box-culvert" element={<BoxCulvertPage />} />
          <Route path="/products/stormwater/detention-systems" element={<DetentionSystemsPage />} />
          <Route path="/products/stormwater/treatment" element={<StormwaterTreatmentPage />} />
          <Route path="/products/stormwater/pump-stations" element={<PumpStationsPage />} />

          {/* 4. Dedicated Static Pages for Site Infrastructure Subcategories */}
          <Route path="/products/site/retaining-walls" element={<RetainingWallsPage />} />
          <Route path="/products/site/highway-barriers" element={<HighwayBarriersPage />} />
          <Route path="/products/site/equipment-pads" element={<EquipmentPadsPage />} />
          <Route path="/products/site/pillar-posts" element={<PillarPostsPage />} />
          <Route path="/products/site/agriculture" element={<AgriculturePage />} />

          {/* 5. Dynamic fallback for any additional subcategory route */}
          <Route path="/products/:categorySlug/:subcategorySlug" element={<Subcategory3DPage />} />

          {/* 6. Sub-Subcategory Part Product Listing Page (e.g. /products/underground/manholes/cover, /riser, /frame) */}
          <Route
            path="/products/:categorySlug/:subcategorySlug/:partSlug"
            element={<PartProductListPage />}
          />

          {/* Fallback route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;