export type ListingType = "sale" | "rent";
export type PropertyType =
  | "apartment"
  | "house"
  | "villa"
  | "plot"
  | "commercial"
  | "condo";

export type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  beds: number | null;
  baths: number | null;
  area: number;
  image: string;
  gallery: string[];
  agentId: string;
  description: string;
  amenities: string[];
  yearBuilt: number | null;
  featured?: boolean;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  city: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  listings: number;
  languages: string[];
};

export type Location = {
  slug: string;
  name: string;
  count: number;
  image: string;
  blurb: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMins: number;
  image: string;
  body: string[];
};

export const locations: Location[] = [
  {
    slug: "zanzibar",
    name: "Zanzibar",
    count: 1120,
    image: "/images/locations/zanzibar.jpg",
    blurb:
      "Stone Town heritage homes, beachfront villas, and investment condos along the Indian Ocean.",
  },
  {
    slug: "dar-es-salaam",
    name: "Dar es Salaam",
    count: 2340,
    image: "/images/locations/dar-es-salaam.jpg",
    blurb:
      "Tanzania’s commercial capital — Masaki apartments, Mbezi family homes, and Kigamboni waterfront.",
  },
  {
    slug: "arusha",
    name: "Arusha",
    count: 680,
    image: "/images/locations/arusha.jpg",
    blurb:
      "Gateway to the northern circuit. Cool-climate houses, safari lodges, and hillside plots.",
  },
  {
    slug: "mwanza",
    name: "Mwanza",
    count: 530,
    image: "/images/locations/mwanza.jpg",
    blurb:
      "Lake Victoria living with growing residential estates and lakeside commercial space.",
  },
  {
    slug: "dodoma",
    name: "Dodoma",
    count: 410,
    image: "/images/locations/dodoma.jpg",
    blurb:
      "The capital’s new government quarter is driving demand for houses, plots, and offices.",
  },
  {
    slug: "tanga",
    name: "Tanga",
    count: 350,
    image: "/images/locations/tanga.jpg",
    blurb:
      "Quiet coastal city with beach plots, colonial bungalows, and emerging holiday rentals.",
  },
];

export const propertyTypes: {
  id: PropertyType;
  label: string;
  count: number;
}[] = [
  { id: "apartment", label: "Apartments", count: 1240 },
  { id: "house", label: "Houses", count: 2150 },
  { id: "villa", label: "Villas", count: 890 },
  { id: "plot", label: "Plots", count: 1020 },
  { id: "commercial", label: "Commercial", count: 560 },
  { id: "condo", label: "Condos", count: 320 },
];

export const agents: Agent[] = [
  {
    id: "aisha-mwinyi",
    name: "Aisha Mwinyi",
    role: "Senior Agent, Dar es Salaam",
    city: "Dar es Salaam",
    phone: "+255 754 221 190",
    email: "aisha@swahivo.com",
    photo: "/images/agents/aisha.jpg",
    bio: "Aisha has closed more than 180 residential deals across Masaki, Oysterbay, and Mbezi Beach. She specialises in verified family homes and waterfront apartments.",
    listings: 42,
    languages: ["English", "Swahili"],
  },
  {
    id: "daniel-msuya",
    name: "Daniel Msuya",
    role: "Luxury Specialist, Zanzibar",
    city: "Zanzibar",
    phone: "+255 765 441 008",
    email: "daniel@swahivo.com",
    photo: "/images/agents/daniel.jpg",
    bio: "Daniel advises investors on beachfront villas and boutique hotels from Nungwi to Paje, with a focus on clear title and rental yield.",
    listings: 28,
    languages: ["English", "Swahili", "Italian"],
  },
  {
    id: "neema-lyimo",
    name: "Neema Lyimo",
    role: "Arusha & Northern Circuit",
    city: "Arusha",
    phone: "+255 713 908 442",
    email: "neema@swahivo.com",
    photo: "/images/agents/neema.jpg",
    bio: "Neema knows every hillside plot from Njiro to Usa River. She helps families and safari operators find land with clean documentation.",
    listings: 35,
    languages: ["English", "Swahili"],
  },
  {
    id: "omar-juma",
    name: "Omar Juma",
    role: "Commercial Lead",
    city: "Dar es Salaam",
    phone: "+255 784 112 670",
    email: "omar@swahivo.com",
    photo: "/images/agents/omar.jpg",
    bio: "Omar places offices, warehouses, and retail in CBD, Mwenge, and the new Kigamboni corridor. Ten years in Tanzanian commercial real estate.",
    listings: 19,
    languages: ["English", "Swahili", "Arabic"],
  },
  {
    id: "zahra-hassan",
    name: "Zahra Hassan",
    role: "Rentals Manager",
    city: "Dar es Salaam",
    phone: "+255 622 331 909",
    email: "zahra@swahivo.com",
    photo: "/images/agents/zahra.jpg",
    bio: "Zahra matches tenants with verified apartments in Sinza, Mikocheni, and Masaki. Fast viewings, honest condition reports, no surprise fees.",
    listings: 51,
    languages: ["English", "Swahili"],
  },
  {
    id: "jabari-mwakasege",
    name: "Jabari Mwakasege",
    role: "Lake Zone Agent",
    city: "Mwanza",
    phone: "+255 758 220 114",
    email: "jabari@swahivo.com",
    photo: "/images/agents/jabari.jpg",
    bio: "Jabari covers Mwanza and the lake zone — family homes, lakeside plots, and growing estate developments around Ilemela.",
    listings: 22,
    languages: ["English", "Swahili"],
  },
];

const galleryHouse = [
  "/images/properties/modern-house.jpg",
  "/images/properties/interior-kitchen.jpg",
  "/images/properties/interior-bedroom.jpg",
  "/images/properties/bathroom.jpg",
];
const galleryApt = [
  "/images/properties/luxury-apt.jpg",
  "/images/properties/dark-apt.jpg",
  "/images/properties/interior-kitchen.jpg",
  "/images/properties/studio.jpg",
];
const galleryVilla = [
  "/images/properties/beach-villa.jpg",
  "/images/properties/house-dusk.jpg",
  "/images/misc/cta-villa.jpg",
  "/images/properties/bathroom.jpg",
];

export const properties: Property[] = [
  {
    id: "modern-4-bedroom-house",
    title: "Modern 4-Bedroom House",
    location: "Mbezi Beach, Dar es Salaam",
    city: "Dar es Salaam",
    price: 450_000_000,
    listingType: "sale",
    propertyType: "house",
    beds: 4,
    baths: 3,
    area: 250,
    image: "/images/properties/modern-house.jpg",
    gallery: galleryHouse,
    agentId: "aisha-mwinyi",
    featured: true,
    yearBuilt: 2022,
    amenities: ["Parking", "Generator", "Garden", "Security", "Water tank"],
    description:
      "A contemporary family house in Mbezi Beach with open-plan living, a covered terrace, and landscaped tropical gardens. Quiet cul-de-sac, minutes from the beach road.",
  },
  {
    id: "luxury-apartment-masaki",
    title: "Luxury Apartment",
    location: "Masaki, Dar es Salaam",
    city: "Dar es Salaam",
    price: 2_500_000,
    listingType: "rent",
    propertyType: "apartment",
    beds: 3,
    baths: 2,
    area: 180,
    image: "/images/properties/luxury-apt.jpg",
    gallery: galleryApt,
    agentId: "zahra-hassan",
    featured: true,
    yearBuilt: 2021,
    amenities: ["Pool", "Gym", "24/7 security", "Backup power", "Sea view"],
    description:
      "Bright corner apartment in a gated Masaki compound. Floor-to-ceiling windows, fitted kitchen, and shared pool. Walking distance to restaurants and the peninsula.",
  },
  {
    id: "beachfront-villa-kigamboni",
    title: "Beachfront Villa",
    location: "Kigamboni, Dar es Salaam",
    city: "Dar es Salaam",
    price: 680_000_000,
    listingType: "sale",
    propertyType: "villa",
    beds: 5,
    baths: 4,
    area: 400,
    image: "/images/properties/beach-villa.jpg",
    gallery: galleryVilla,
    agentId: "aisha-mwinyi",
    featured: true,
    yearBuilt: 2023,
    amenities: ["Private pool", "Beach access", "Staff quarters", "Garage", "Smart home"],
    description:
      "A 5-bedroom villa with a private pool and direct beach access in Kigamboni. Ideal as a family compound or a high-yield holiday let.",
  },
  {
    id: "3-bedroom-house-mbagala",
    title: "3-Bedroom House",
    location: "Mbagala, Dar es Salaam",
    city: "Dar es Salaam",
    price: 120_000_000,
    listingType: "sale",
    propertyType: "house",
    beds: 3,
    baths: 2,
    area: 150,
    image: "/images/properties/house-dusk.jpg",
    gallery: galleryHouse,
    agentId: "aisha-mwinyi",
    featured: true,
    yearBuilt: 2019,
    amenities: ["Parking", "Walled compound", "Water tank"],
    description:
      "Solid 3-bedroom house in a walled Mbagala compound. Ready to occupy, with space to extend at the rear.",
  },
  {
    id: "2-bedroom-apartment-oysterbay",
    title: "2-Bedroom Apartment",
    location: "Oysterbay, Dar es Salaam",
    city: "Dar es Salaam",
    price: 1_800_000,
    listingType: "rent",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    area: 120,
    image: "/images/properties/dark-apt.jpg",
    gallery: galleryApt,
    agentId: "zahra-hassan",
    featured: true,
    yearBuilt: 2020,
    amenities: ["Security", "Backup power", "Parking", "Fibre"],
    description:
      "Stylish 2-bedroom apartment in Oysterbay with city views. Fibre-ready, assigned parking, and a quiet block of only twelve units.",
  },
  {
    id: "elegant-family-home-mwanza",
    title: "Elegant Family Home",
    location: "Mwanza",
    city: "Mwanza",
    price: 350_000_000,
    listingType: "sale",
    propertyType: "house",
    beds: 4,
    baths: 3,
    area: 280,
    image: "/images/properties/family-home.jpg",
    gallery: galleryHouse,
    agentId: "jabari-mwakasege",
    featured: true,
    yearBuilt: 2018,
    amenities: ["Garden", "Garage", "Generator", "Lake view"],
    description:
      "A generous family home on a landscaped plot overlooking Lake Victoria. Four bedrooms, formal lounge, and a shaded garden for entertaining.",
  },
  {
    id: "residential-plot-arusha",
    title: "Residential Plot",
    location: "Arusha",
    city: "Arusha",
    price: 85_000_000,
    listingType: "sale",
    propertyType: "plot",
    beds: null,
    baths: null,
    area: 600,
    image: "/images/properties/plot.jpg",
    gallery: [
      "/images/properties/plot.jpg",
      "/images/locations/arusha.jpg",
      "/images/properties/family-home.jpg",
    ],
    agentId: "neema-lyimo",
    featured: true,
    yearBuilt: null,
    amenities: ["Title deed", "Road access", "Electricity nearby"],
    description:
      "600 m² surveyed plot with a clean title in a growing Arusha neighbourhood. Road access and power at the boundary.",
  },
  {
    id: "studio-apartment-sinza",
    title: "Studio Apartment",
    location: "Sinza, Dar es Salaam",
    city: "Dar es Salaam",
    price: 950_000,
    listingType: "rent",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    area: 60,
    image: "/images/properties/studio.jpg",
    gallery: galleryApt,
    agentId: "zahra-hassan",
    featured: true,
    yearBuilt: 2021,
    amenities: ["Furnished", "Security", "Water"],
    description:
      "Compact furnished studio in Sinza — ideal for young professionals. Kitchenette, fast water supply, and a secure compound.",
  },
  {
    id: "oceanview-condo-zanzibar",
    title: "Oceanview Condo",
    location: "Nungwi, Zanzibar",
    city: "Zanzibar",
    price: 420_000_000,
    listingType: "sale",
    propertyType: "condo",
    beds: 2,
    baths: 2,
    area: 110,
    image: "/images/properties/condo.jpg",
    gallery: galleryVilla,
    agentId: "daniel-msuya",
    yearBuilt: 2024,
    amenities: ["Hotel-managed", "Pool", "Beach club", "Rental programme"],
    description:
      "Hotel-managed condo with ocean views in Nungwi. Optional rental programme with audited occupancy reports.",
  },
  {
    id: "cbd-commercial-floor",
    title: "CBD Commercial Floor",
    location: "City Centre, Dar es Salaam",
    city: "Dar es Salaam",
    price: 8_500_000,
    listingType: "rent",
    propertyType: "commercial",
    beds: null,
    baths: 2,
    area: 320,
    image: "/images/properties/commercial.jpg",
    gallery: [
      "/images/properties/commercial.jpg",
      "/images/properties/condo.jpg",
      "/images/locations/dar-es-salaam.jpg",
    ],
    agentId: "omar-juma",
    yearBuilt: 2017,
    amenities: ["Lift", "Parking", "Backup power", "Fibre"],
    description:
      "An entire office floor in a well-managed CBD tower. Open plan, two meeting rooms, and assigned basement parking.",
  },
  {
    id: "garden-villa-arusha",
    title: "Garden Villa",
    location: "Njiro, Arusha",
    city: "Arusha",
    price: 510_000_000,
    listingType: "sale",
    propertyType: "villa",
    beds: 4,
    baths: 4,
    area: 340,
    image: "/images/properties/family-home.jpg",
    gallery: galleryHouse,
    agentId: "neema-lyimo",
    yearBuilt: 2020,
    amenities: ["Garden", "Fireplace", "Staff quarters", "Borehole"],
    description:
      "Cool-climate villa in Njiro with mature gardens, a fireplace lounge, and mountain views on clear mornings.",
  },
  {
    id: "penthouse-masaki",
    title: "Masaki Penthouse",
    location: "Masaki, Dar es Salaam",
    city: "Dar es Salaam",
    price: 890_000_000,
    listingType: "sale",
    propertyType: "apartment",
    beds: 4,
    baths: 4,
    area: 310,
    image: "/images/properties/luxury-apt.jpg",
    gallery: galleryApt,
    agentId: "aisha-mwinyi",
    yearBuilt: 2023,
    amenities: ["Private terrace", "Sea view", "Smart home", "2 parking"],
    description:
      "Full-floor penthouse with a wraparound terrace and peninsula views. Specced for a lock-up-and-leave lifestyle.",
  },
  {
    id: "townhouse-mwanza",
    title: "Ilemela Townhouse",
    location: "Ilemela, Mwanza",
    city: "Mwanza",
    price: 1_200_000,
    listingType: "rent",
    propertyType: "house",
    beds: 3,
    baths: 2,
    area: 160,
    image: "/images/properties/house-dusk.jpg",
    gallery: galleryHouse,
    agentId: "jabari-mwakasege",
    yearBuilt: 2021,
    amenities: ["Gated estate", "Playground", "Parking"],
    description:
      "3-bedroom townhouse in a gated Ilemela estate. Shared playground, reliable water, and a short drive to the lake.",
  },
  {
    id: "beach-plot-tanga",
    title: "Coastal Plot",
    location: "Tanga",
    city: "Tanga",
    price: 64_000_000,
    listingType: "sale",
    propertyType: "plot",
    beds: null,
    baths: null,
    area: 800,
    image: "/images/locations/tanga.jpg",
    gallery: [
      "/images/locations/tanga.jpg",
      "/images/properties/plot.jpg",
      "/images/properties/beach-villa.jpg",
    ],
    agentId: "daniel-msuya",
    yearBuilt: null,
    amenities: ["Beach proximity", "Title deed", "Surveyed"],
    description:
      "800 m² coastal plot a short walk from the Tanga shoreline. Clean title, ready for a holiday home or small lodge.",
  },
  {
    id: "family-apartment-dodoma",
    title: "Capital Family Apartment",
    location: "Dodoma",
    city: "Dodoma",
    price: 780_000,
    listingType: "rent",
    propertyType: "apartment",
    beds: 3,
    baths: 2,
    area: 140,
    image: "/images/properties/studio.jpg",
    gallery: galleryApt,
    agentId: "zahra-hassan",
    yearBuilt: 2022,
    amenities: ["Generator", "Parking", "Security"],
    description:
      "New 3-bedroom apartment near the government quarter in Dodoma. Assigned parking and a backup generator.",
  },
  {
    id: "warehouse-ubungo",
    title: "Light Industrial Warehouse",
    location: "Ubungo, Dar es Salaam",
    city: "Dar es Salaam",
    price: 185_000_000,
    listingType: "sale",
    propertyType: "commercial",
    beds: null,
    baths: 1,
    area: 720,
    image: "/images/properties/commercial.jpg",
    gallery: [
      "/images/properties/commercial.jpg",
      "/images/locations/dar-es-salaam.jpg",
    ],
    agentId: "omar-juma",
    yearBuilt: 2015,
    amenities: ["Yard", "3-phase power", "Truck access"],
    description:
      "720 m² warehouse with a loading yard on the Morogoro Road corridor. 3-phase power and high eaves.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "10-tips-first-time-home-buyers",
    title: "10 Tips for First-Time Home Buyers",
    excerpt:
      "From title checks to mortgage pre-approval — a practical checklist for buying your first home in Tanzania.",
    category: "Real Estate Tips",
    date: "May 15, 2024",
    readMins: 5,
    image: "/images/blog/tips.jpg",
    body: [
      "Buying your first home in Tanzania is exciting — and it is also a legal process. Start with a budget that includes stamp duty, legal fees, and a 10% contingency, not just the advertised price.",
      "Always instruct an independent advocate to run a land registry search. A beautiful house on disputed land is not a bargain. Ask for the title number, survey plan, and seller identification before you pay a reservation fee.",
      "Pre-approval from a bank or SACCOS tells you exactly what you can offer. It also signals to the seller that you are a serious buyer, which matters in competitive pockets like Masaki and Mbezi Beach.",
      "Walk the property at two times of day. Check water pressure, backup power, drainage after rain, and the neighbour situation. Photos never capture a noisy bar two doors down.",
      "Finally, do not skip the inspection. A structural engineer’s half-day visit is cheaper than a cracked foundation. Swahivo agents can arrange verified inspectors in every city we cover.",
    ],
  },
  {
    slug: "tanzania-market-trends-2024",
    title: "Real Estate Market Trends in Tanzania 2024",
    excerpt:
      "Where prices are firming, where rental yields still surprise, and what the capital move means for Dodoma.",
    category: "Market Insights",
    date: "May 10, 2024",
    readMins: 6,
    image: "/images/blog/market.jpg",
    body: [
      "2024 has been a year of two markets. Prime Dar es Salaam stock — Masaki, Oysterbay, Mikocheni — remains tight, with well-finished apartments letting quickly and sale prices holding.",
      "Kigamboni and the southern beach road continue to attract villa buyers who want land and a pool without Masaki prices. Title quality varies, so due diligence is not optional.",
      "Dodoma is the structural story. Government relocation is pulling housing and office demand into the capital. Purpose-built apartments near the new ministries are seeing stronger occupancy than a year ago.",
      "Zanzibar’s tourism rebound supports condo and villa yields, particularly in hotel-managed schemes. Investors should model occupancy conservatively and confirm the leasehold remaining on the title.",
      "Across the country, buyers are more documentation-aware. Listings with scanned titles, utility bills, and a named advocate close faster — which is why Swahivo verifies every property before it goes live.",
    ],
  },
  {
    slug: "why-zanzibar-real-estate-investment",
    title: "Why Zanzibar is Perfect for Real Estate Investment",
    excerpt:
      "Tourism, unique architecture, and a growing professional rental market — a clear-eyed look at the islands.",
    category: "Zanzibar Living",
    date: "May 5, 2024",
    readMins: 4,
    image: "/images/blog/zanzibar.jpg",
    body: [
      "Zanzibar combines a year-round tourism season with a growing local professional class. That mix supports both short-let villas and longer residential leases in Stone Town and the north.",
      "Beachfront is not the only play. Restored coral-stone houses in Stone Town and well-run condos in Nungwi and Paje have different risk and yield profiles — match the asset to your time horizon.",
      "Foreign buyers typically take leasehold. Understand the remaining term, the land department process, and any hotel-management contract before you sign. A good local advocate is worth more than a discounted asking price.",
      "Swahivo’s Zanzibar desk works with surveyed titles only. If you want a viewing itinerary — Stone Town, Nungwi, Paje — Daniel Msuya can arrange it in a single trip.",
    ],
  },
  {
    slug: "renting-in-dar-neighbourhood-guide",
    title: "A Neighbourhood Guide to Renting in Dar es Salaam",
    excerpt:
      "Masaki vs Mikocheni vs Sinza — who each area is for, and what you should expect to pay.",
    category: "City Guides",
    date: "April 22, 2024",
    readMins: 7,
    image: "/images/locations/dar-es-salaam.jpg",
    body: [
      "Dar is a city of villages. The right neighbourhood depends on your commute, your budget, and whether you want a compound with a pool or a walkable high street.",
      "Masaki and Oysterbay remain the premium peninsula: sea air, restaurants, and embassy-adjacent security. Expect to pay for it, and inspect backup power — outages still happen.",
      "Mikocheni and Mbezi Beach offer more house for the money, with family compounds and improving roads. Sinza and Ubungo are practical for professionals who want a short daladala or BRT hop.",
      "Always confirm who pays TANESCO and DAWASCO, whether the rent is quoted in TZS or USD, and how many months deposit the landlord wants. Three months is common; six is a conversation.",
    ],
  },
  {
    slug: "selling-your-home-fast",
    title: "How to Sell Your Property Fast in Tanzania",
    excerpt:
      "Pricing, photography, and paperwork — the three things that actually move a listing.",
    category: "Selling",
    date: "April 8, 2024",
    readMins: 5,
    image: "/images/blog/market.jpg",
    body: [
      "Overpricing is the number-one reason homes linger. We compare your property to closed sales, not asking prices, in the same street and condition band.",
      "Photography is not vanity. Bright, honest photos with a measured floor plan get more serious enquiries than a dark phone snapshot. We shoot every Swahivo listing.",
      "Have your title, land rent receipts, and ID ready. Buyers who can complete due diligence in a week do not wait for a seller who cannot find the file.",
    ],
  },
  {
    slug: "plots-vs-built-homes",
    title: "Should You Buy a Plot or a Built Home?",
    excerpt:
      "Control versus convenience — a framework for first-time land buyers in Arusha, Dodoma, and the coast.",
    category: "Land",
    date: "March 28, 2024",
    readMins: 6,
    image: "/images/properties/plot.jpg",
    body: [
      "A plot gives you control: orientation, finishes, and the chance to build in stages. It also gives you contractor risk, holding costs, and a longer path to living there.",
      "A built home is faster and usually easier to finance. You can see the cracks. You also pay for someone else’s choices — and sometimes their shortcuts.",
      "If you buy land, insist on a surveyed beaconed plot and walk the boundaries with the seller and a surveyor. In Arusha and Dodoma especially, ‘almost titled’ is not titled.",
    ],
  },
];

export const faqs = [
  {
    q: "Does Swahivo verify every listing?",
    a: "Yes. Every property is checked for title, seller identity, and basic condition before it is published. Verified listings carry a badge on the card and the detail page.",
  },
  {
    q: "What fees do buyers pay?",
    a: "Swahivo does not charge buyers to browse or enquire. Your advocate’s fees, stamp duty, and registration costs are separate and explained before you commit.",
  },
  {
    q: "Can I list a property if I am not an agent?",
    a: "Yes. Homeowners can list directly. We review the documents, then publish. You can also ask one of our agents to represent you.",
  },
  {
    q: "Do you work outside Dar es Salaam and Zanzibar?",
    a: "We cover Dar es Salaam, Zanzibar, Arusha, Mwanza, Dodoma, and Tanga, with visiting agents for Mbeya and Moshi on request.",
  },
  {
    q: "Is the valuation tool a formal appraisal?",
    a: "No. It is an estimate based on comparable Swahivo listings. For a bank or court, commission a licensed valuer — we can introduce one.",
  },
];

export function getAgent(id: string) {
  return agents.find((a) => a.id === id);
}

export function getProperty(id: string) {
  return properties.find((p) => p.id === id);
}

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function propertiesForAgent(agentId: string) {
  return properties.filter((p) => p.agentId === agentId);
}

export function propertiesForCity(city: string) {
  return properties.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase(),
  );
}
