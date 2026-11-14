import {
  Accessibility,
  BookOpen,
  Building2,
  ClipboardList,
  DraftingCompass,
  Factory,
  FileCheck2,
  FileText,
  Layers3,
  Newspaper,
  Podcast,
  Ruler,
  ShieldCheck,
  Video,
} from 'lucide-react';

export const menuSections = [
  {
    label: 'Engineering & CAD',
    path: '/engineering-cad',
    eyebrow: 'Engineering services',
    description: 'Precast-specific engineering support, from structural calculations through detailed shop drawings.',
    icon: DraftingCompass,
    groups: [
      {
        title: 'Engineering',
        links: [
          ['Structural Engineering', '/engineering-cad/structural-engineering', Ruler],
          ['Shop Drawings & CAD', '/engineering-cad/shop-drawings', DraftingCompass],
          ['Precast Detailing', '/engineering-cad/precast-detailing', Layers3],
        ],
      },
      {
        title: 'Design & production',
        links: [
          ['Mold & Formwork Engineering', '/engineering-cad/formwork', Factory],
          ['Product & Mold Design', '/engineering-cad/product-design', Building2],
          ['Manufacturing Support', '/engineering-cad/manufacturing-support', ClipboardList],
        ],
      },
    ],
  },
  {
    label: 'Specs & Compliance',
    path: '/specs-compliance',
    eyebrow: 'Technical standards',
    description: 'Specification resources and approval-ready documentation for precast projects.',
    icon: ShieldCheck,
    groups: [
      {
        title: 'Standards referenced by PEG',
        links: [
          ['PCI', '/specs-compliance/pci', ShieldCheck],
          ['AASHTO', '/specs-compliance/aashto', FileCheck2],
          ['ASTM', '/specs-compliance/astm', FileCheck2],
          ['CSA', '/specs-compliance/csa', FileCheck2],
        ],
      },
      {
        title: 'Submittals & specifications',
        links: [
          ['Structural Submittals', '/specs-compliance/submittals', FileText],
          ['State DOT Specifications', '/specs-compliance/state-dot', ClipboardList],
          ['Outline Specs', '/specs-compliance/outline-specs', BookOpen],
        ],
      },
    ],
  },
  {
    label: 'Products & Solutions',
    path: '/products-solutions',
    eyebrow: 'Precast solutions',
    description: 'Explore product categories and engineering support for precast concrete applications.',
    icon: Layers3,
    groups: [
      {
        title: 'Structures',
        links: [
          ['Box Culverts', '/products-solutions/box-culverts', Layers3],
          ['Tilt-Up Panels', '/products-solutions/tilt-up-panels', Building2],
          ['Hollow-Core Slabs', '/products-solutions/hollow-core-slabs', Layers3],
        ],
      },
      {
        title: 'Site & access',
        links: [
          ['Utility', '/products-solutions/utility', Factory],
          ['Leaching Galleys', '/products-solutions/leaching-galleys', Building2],
          ['ADA Products', '/products-solutions/ada-products', Accessibility],
        ],
      },
    ],
  },
  {
    label: 'Resources & Knowledge',
    path: '/resources',
    eyebrow: 'Technical resources',
    description: 'PEG’s technical library includes project references, educational media, catalogs, and specifications.',
    icon: BookOpen,
    groups: [
      {
        title: 'Browse resources',
        links: [
          ['Project Portfolio', '/resources/projects', Building2],
          ['Catalogs & Data Sheets', '/resources/catalogs', FileText],
          ['Videos & Webinars', '/resources/videos', Video],
          ['Detailed Podcast', '/resources/podcast', Podcast],
        ],
      },
      {
        title: 'Learning & updates',
        links: [
          ['Continuing Ed PE Credits', '/resources/continuing-education', BookOpen],
          ['Certifications', '/resources/certifications', FileCheck2],
          ['Green Reports', '/resources/green-reports', FileText],
          ['Newsletter', '/resources/newsletter', Newspaper],
        ],
      },
    ],
  },
  {
    label: 'Company',
    path: '/company',
    eyebrow: 'Precast Engineering Group',
    description: 'Learn about PEG’s precast-focused team, engineering expertise, and approach to project support.',
    icon: Building2,
    groups: [
      {
        title: 'About PEG',
        links: [
          ['The Who: PEG Experts', '/company/experts', Building2],
          ['The What: Knowledge & Expertise', '/company/expertise', BookOpen],
          ['The Why: Clearly Why', '/company/why-peg', FileCheck2],
        ],
      },
      {
        title: 'Connect',
        links: [
          ['Contact Engineers', 'mailto:ask@precastengineering.org', Newspaper],
          ['Blog', '/blog', Newspaper],
          ['Contact PEG', 'mailto:ask@precastengineering.org', FileText],
        ],
      },
    ],
  },
];