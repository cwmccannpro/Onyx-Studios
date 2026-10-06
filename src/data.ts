// Site-wide content. Update the email here and it changes everywhere.
export const CONTACT_EMAIL = 'cwm@cwmccann.pro';
export const PERSONAL_PORTFOLIO_URL = 'https://cwmccann.pro';

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export interface Project {
  slug: string;
  client: string;
  location: string;
  category: string;
  summary: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'martin',
    client: 'Martin & Sons Roofing',
    location: 'Fort Worth, TX',
    category: 'Roof repair',
    summary:
      'A roofing site with a 3D roof that repairs itself as you scroll, clear service information and quick access to a phone number.',
    tags: ['3D / WebGL', 'Lead generation', 'Local SEO'],
  },
  {
    slug: 'underhill',
    client: 'Underhill Farms Country Inn',
    location: 'Moundridge, KS',
    category: 'Bed & breakfast',
    summary:
      'A five-page site for a country inn on a working deer and elk ranch. An animated wheat field opens the site, followed by rooms and details for planning a stay.',
    tags: ['Three.js', 'Multi-page', 'Hospitality'],
  },
  {
    slug: 'tailor',
    client: 'Buffalo Tailor',
    location: 'Buffalo, NY',
    category: 'Master tailoring',
    summary:
      'A tailoring site with deep green tones, large type and an animated golden thread, highlighting services and more than 20 years of experience.',
    tags: ['React', 'Three.js', 'Editorial design'],
  },
  {
    slug: 'cfw',
    client: 'CFW Electric',
    location: 'Derby, NY',
    category: 'Electrical contractor',
    summary:
      'A site for a family-owned electrical contractor, with clear service listings, current opening hours and a call button on every screen.',
    tags: ['Custom design', 'Mobile-first', 'Click to call'],
  },
  {
    slug: 'whitedog',
    client: 'White Dog Vintage',
    location: 'Buffalo, NY',
    category: 'Vintage boutique',
    summary:
      'A vintage shop site for an Allentown store, with a lookbook carousel, product browsing and a shopping bag.',
    tags: ['React', 'Tailwind', 'E-commerce'],
  },
  {
    slug: 'westwind',
    client: 'West Wind Vineyards',
    location: 'Fredonia, NY',
    category: 'Vineyard',
    summary:
      'A new site for a Lake Erie vineyard run by four generations of the same family. A 3D vineyard changes with the growing season as you scroll.',
    tags: ['3D / WebGL', 'Redesign', 'Mobile-friendly'],
  },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'First conversation',
    text: 'We talk through your business, who visits the site and what they need to do. Then we agree on the pages, budget and timeline.',
  },
  {
    number: '02',
    title: 'Design',
    text: 'I design the pages around your brand and content. You’ll see the direction early, with time to review it and make changes.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'I build the site, add the features we agreed on and check it on phones, tablets and desktop screens.',
  },
  {
    number: '04',
    title: 'Launch',
    text: 'I set up the domain and hosting, check the final details and put the site live. We can arrange updates and ongoing support after launch.',
  },
];
