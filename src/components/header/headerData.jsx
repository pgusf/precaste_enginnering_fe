/* headerData.jsx - all menu data + SVG pieces used by SiteHeader.js */

export const CATEGORIES = [
  {
    name: "Underground Infrastructure",
    desc: "Vaults, manholes & septic",
    icon: "vault",
    href: "/products/underground/manholes",
    items: [
      { name: "Manholes (3D Foundry View)", shape: "round", note: "Covers, risers & base frames", href: "/products/underground/manholes", image: "/heroI1.jpg" },
      { name: "Utility Vaults & Accessories", shape: "box", note: "Telecom, power, gas", href: "/products/underground/utility-vaults" },
      { name: "Handholes", shape: "box", note: "Compact access boxes", href: "/products/underground/handholes" },
      { name: "Trench Systems", shape: "trench", note: "Cable & drainage", href: "/products/underground/trench-systems" },
      { name: "Grease Interceptors", shape: "tank", note: "Food service ready", href: "/products/underground/grease-interceptors" },
      { name: "Septic Systems", shape: "tank", note: "Tanks & chambers", href: "/products/underground/septic-systems" },
    ],
  },
  {
    name: "Stormwater Systems",
    desc: "Inlets, pipe, culverts & treatment",
    icon: "pipe",
    href: "/products/stormwater/catch-basins",
    items: [
      { name: "Catch Basins & Inlets", shape: "grate", note: "Surface drainage", href: "/products/stormwater/catch-basins" },
      { name: "Concrete Pipe", shape: "pipe", note: "RCP, all classes", href: "/products/stormwater/concrete-pipe" },
      { name: "Box Culvert", shape: "box", note: "Single & multi-cell", href: "/products/stormwater/box-culvert" },
      { name: "Detention Systems", shape: "tank", note: "Underground storage", href: "/products/stormwater/detention-systems" },
      { name: "Stormwater Treatment", shape: "round", note: "Water quality", href: "/products/stormwater/treatment" },
      { name: "Pump Stations", shape: "pump", note: "Wet wells & vaults", href: "/products/stormwater/pump-stations" },
    ],
  },
  {
    name: "Site Infrastructure",
    desc: "Walls, barriers, pads & posts",
    icon: "wall",
    href: "/products/site/retaining-walls",
    items: [
      { name: "Retaining Walls & Concrete Fences", shape: "wall", note: "Structural & screening", href: "/products/site/retaining-walls" },
      { name: "Highway Barriers", shape: "barrier", note: "Median & roadside", href: "/products/site/highway-barriers" },
      { name: "Transformer & Equipment Pads", shape: "pad", note: "Utility ready", href: "/products/site/equipment-pads" },
      { name: "Harvest Pillar Posts", shape: "post", note: "Durable fence posts", href: "/products/site/pillar-posts" },
      { name: "Agriculture", shape: "trench", note: "Troughs & bunkers", href: "/products/site/agriculture" },
    ],
  },
];

export const DROPDOWN_MENUS = {
  "Engineering & CAD": {
    eyebrow: "Engineering Services",
    description: "Precast-specific engineering support, from structural calculations through detailed shop drawings.",
    groups: [
      { title: "Engineering", links: [
        { name: "Structural Engineering", href: "/engineering-cad/structural-engineering", note: "Calculations & PE stamps" },
        { name: "Shop Drawings & CAD", href: "/engineering-cad/shop-drawings", note: "Production-ready CAD" },
        { name: "Precast Detailing", href: "/engineering-cad/precast-detailing", note: "Rebar & hardware layouts" },
      ] },
      { title: "Design & Production", links: [
        { name: "Mold & Formwork Engineering", href: "/engineering-cad/formwork", note: "Custom steel & form design" },
        { name: "Product & Mold Design", href: "/engineering-cad/product-design", note: "New product development" },
        { name: "Manufacturing Support", href: "/engineering-cad/manufacturing-support", note: "Plant optimization" },
      ] },
    ],
  },
  "Specs & Compliance": {
    eyebrow: "Technical Standards",
    description: "Specification resources and approval-ready documentation for precast projects.",
    groups: [
      { title: "Standards Referenced by PEG", links: [
        { name: "PCI Standards", href: "/specs-compliance/pci", note: "Precast/Prestressed Concrete Institute" },
        { name: "AASHTO Specifications", href: "/specs-compliance/aashto", note: "Highway & bridge compliance" },
        { name: "ASTM Standards", href: "/specs-compliance/astm", note: "Material & testing specs" },
        { name: "CSA Compliance", href: "/specs-compliance/csa", note: "Canadian standards" },
      ] },
      { title: "Submittals & Specifications", links: [
        { name: "Structural Submittals", href: "/specs-compliance/submittals", note: "Approval-ready packages" },
        { name: "State DOT Specifications", href: "/specs-compliance/state-dot", note: "50-state DOT requirements" },
        { name: "Outline Specs", href: "/specs-compliance/outline-specs", note: "Editable master specs" },
      ] },
    ],
  },
  "Resources & Knowledge": {
    eyebrow: "Technical Library",
    description: "PEG's technical library includes project references, educational media, catalogs, and specifications.",
    groups: [
      { title: "Browse Resources", links: [
        { name: "Project Portfolio", href: "/resources/projects", note: "Case studies & installations" },
        { name: "Catalogs & Data Sheets", href: "/resources/catalogs", note: "Downloadable PDFs" },
        { name: "Videos & Webinars", href: "/resources/videos", note: "Technical briefings" },
        { name: "Detailed Podcast", href: "/resources/podcast", note: "Industry conversations" },
      ] },
      { title: "Learning & Updates", links: [
        { name: "Continuing Ed PE Credits", href: "/resources/continuing-education", note: "PDH accredited courses" },
        { name: "Certifications", href: "/resources/certifications", note: "Plant & quality programs" },
        { name: "Green Reports", href: "/resources/green-reports", note: "Sustainability & EPD data" },
        { name: "Newsletter", href: "/resources/newsletter", note: "Monthly technical digest" },
      ] },
    ],
  },
  Company: {
    eyebrow: "Precast Engineering Group",
    description: "Learn about PEG's precast-focused team, engineering expertise, and approach to project support.",
    groups: [
      { title: "About PEG", links: [
        { name: "The Who: PEG Experts", href: "/company/experts", note: "Meet our leadership & PEs" },
        { name: "The What: Knowledge & Expertise", href: "/company/expertise", note: "Decades of precast focus" },
        { name: "The Why: Clearly Why", href: "/company/why-peg", note: "Our engineering philosophy" },
      ] },
      { title: "Connect", links: [
        { name: "Contact Engineers", href: "mailto:ask@precastengineering.org", note: "Direct technical support" },
        { name: "Blog & Insights", href: "/blog", note: "Latest articles" },
        { name: "Contact PEG", href: "/contact", note: "General inquiries" },
      ] },
    ],
  },
};

export const NAV = [
  { label: "Engineering & CAD", dropdown: true },
  { label: "Specs & Compliance", dropdown: true },
  { label: "Products & Solutions", mega: true },
  { label: "Resources & Knowledge", dropdown: true },
  { label: "Company", dropdown: true },
  { label: "Blog", href: "/blog" },
];

export const PORTALS = [
  { name: "Client Project Portal", href: "/portals/client" },
  { name: "Engineer Submittal Hub", href: "/portals/submittals" },
  { name: "CAD & Drawing Library", href: "/portals/cad-library" },
  { name: "Producer Partner Login", href: "/portals/partner" },
];

export const REGIONS = [
  { code: "US", label: "UNITED STATES" },
  { code: "CA", label: "CANADA" },
  { code: "INT", label: "INTERNATIONAL" },
];

export const ICONS = {
  vault: <><rect x="4" y="7" width="16" height="12" rx="1.5" /><path d="M4 11h16M9 7V5h6v2" /></>,
  pipe: <><ellipse cx="6" cy="12" rx="2.5" ry="5" /><path d="M6 7h12a2.5 5 0 010 10H6" /></>,
  wall: <path d="M3 20h18M4 20V9h7v11M13 20V5h7v15M4 14.5h7M13 12h7" />,
};

export const SHAPES = {
  box: <><rect x="30" y="38" width="100" height="52" rx="3" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M30 38l14-14h100l-14 14M144 24v52l-14 14" fill="#dfe9ff" stroke="#002F7A" strokeWidth="3" /><rect x="48" y="52" width="64" height="24" fill="#0066EE" opacity=".18" /></>,
  round: <><ellipse cx="80" cy="82" rx="46" ry="12" fill="#c9d9fa" stroke="#002F7A" strokeWidth="3" /><path d="M34 52v30M126 52v30" stroke="#002F7A" strokeWidth="3" /><ellipse cx="80" cy="52" rx="46" ry="12" fill="#fff" stroke="#002F7A" strokeWidth="3" /><ellipse cx="80" cy="52" rx="16" ry="4.5" fill="#0066EE" /></>,
  pipe: <><rect x="22" y="40" width="116" height="44" rx="6" fill="#fff" stroke="#002F7A" strokeWidth="3" /><ellipse cx="138" cy="62" rx="12" ry="22" fill="#dfe9ff" stroke="#002F7A" strokeWidth="3" /><ellipse cx="138" cy="62" rx="6" ry="13" fill="#0066EE" opacity=".35" /></>,
  trench: <><path d="M16 46h128l-10 40H26z" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M34 58h92l-6 24H40z" fill="#0066EE" opacity=".2" /><path d="M16 46h128" stroke="#002F7A" strokeWidth="6" /></>,
  tank: <><rect x="24" y="36" width="112" height="56" rx="12" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M80 36v56" stroke="#002F7A" strokeWidth="3" /><circle cx="52" cy="36" r="7" fill="#0066EE" /><circle cx="108" cy="36" r="7" fill="#0066EE" /></>,
  grate: <><rect x="30" y="36" width="100" height="56" rx="4" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M46 46v36M62 46v36M78 46v36M94 46v36M110 46v36" stroke="#0066EE" strokeWidth="5" strokeLinecap="round" /></>,
  wall: <><path d="M20 90V40h34v50M60 90V28h34v62M100 90V50h34v40" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M20 65h34M60 56h34M100 70h34" stroke="#0066EE" strokeWidth="3" /></>,
  barrier: <><path d="M24 90l10-48h92l10 48z" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M44 90l6-24h60l6 24" fill="#0066EE" opacity=".2" /></>,
  pad: <><path d="M20 74l26-22h94l-26 22z" fill="#dfe9ff" stroke="#002F7A" strokeWidth="3" /><rect x="20" y="74" width="94" height="16" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M114 74l26-22v16l-26 22z" fill="#c9d9fa" stroke="#002F7A" strokeWidth="3" /></>,
  post: <><rect x="68" y="22" width="24" height="68" rx="3" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M68 38h24M68 54h24" stroke="#0066EE" strokeWidth="3" /><rect x="52" y="86" width="56" height="8" fill="#c9d9fa" stroke="#002F7A" strokeWidth="3" /></>,
  pump: <><rect x="40" y="44" width="80" height="48" rx="4" fill="#fff" stroke="#002F7A" strokeWidth="3" /><path d="M60 44V28h40v16" fill="none" stroke="#002F7A" strokeWidth="3" /><circle cx="80" cy="68" r="12" fill="#0066EE" opacity=".25" stroke="#002F7A" strokeWidth="3" /></>,
};