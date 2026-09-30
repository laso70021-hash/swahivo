import { getSql, Sql } from "./db";
import {
  agents as initialAgents,
  locations as initialLocations,
  properties as initialProperties,
} from "./data";

export type UserRole = "admin" | "agent" | "user";

export type DbUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "SUSPENDED";
  phone?: string | null;
  city?: string | null;
  bio?: string | null;
  photo?: string | null;
  created_at: string;
  updated_at?: string;
};

export type DbLocation = {
  slug: string;
  name: string;
  count: number;
  image: string;
  blurb: string;
  is_branch?: boolean;
  branch_status?: "main" | "coming_soon" | "active" | null;
  created_at?: string;
  updated_at?: string;
};

export type DbContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  recipient_email: string;
  status: "NEW" | "READ" | "REPLIED" | "ARCHIVED";
  created_at: string;
};

export type DbAgent = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  role: string;
  city: string;
  photo: string;
  bio: string;
  languages: string[];
  verification_status: "VERIFIED" | "PENDING" | "UNVERIFIED";
  account_status: "ACTIVE" | "SUSPENDED";
  subscription_plan: string;
  subscription_expires_at: string | null;
  created_at: string;
  // Computed stats
  total_listings?: number;
  active_listings?: number;
  total_views?: number;
  total_inquiries?: number;
};

export type DbProperty = {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  listing_type: "sale" | "rent";
  property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
  beds: number | null;
  baths: number | null;
  area: number;
  image: string;
  gallery: string[];
  agent_id: string;
  user_id: string | null;
  description: string;
  amenities: string[];
  year_built: number | null;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  views_count: number;
  inquiries_count: number;
  created_at: string;
  updated_at: string;
  // Promotion status
  is_featured?: boolean;
  is_boosted?: boolean;
  featured_expires_at?: string | null;
  boost_expires_at?: string | null;
  agent_name?: string | null;
  agent_photo?: string | null;
  agent_phone?: string | null;
  agent_email?: string | null;
};

export type DbSubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  billing_period: string;
  listing_limit: number;
  boost_allowance: number;
  description: string;
  features: string[];
  is_active: boolean;
  sort_order: number;
};

export type DbPromotion = {
  id: string;
  property_id: string;
  agent_id: string;
  promotion_type: "FEATURED" | "BOOST";
  duration_days: number;
  amount: number;
  start_at: string;
  expires_at: string;
  payment_id: string | null;
  status: "PENDING" | "ACTIVE" | "EXPIRED" | "CANCELLED";
  views_before: number;
  views_during: number;
  inquiries_count: number;
  favorites_count: number;
  created_at: string;
  property_title?: string;
  property_location?: string;
  property_image?: string;
  agent_name?: string;
};

export type DbWallet = {
  id: string;
  user_id: string;
  agent_id: string | null;
  balance: number;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type DbWalletTransaction = {
  id: string;
  wallet_id: string;
  user_id: string;
  type: "CREDIT" | "DEBIT" | "REFUND";
  amount: number;
  balance_before: number;
  balance_after: number;
  reference: string;
  description: string | null;
  status: "PENDING" | "COMPLETED" | "FAILED";
  created_at: string;
};

export type DbPayment = {
  id: string;
  user_id: string;
  agent_id: string | null;
  amount: number;
  currency: string;
  product_type:
    | "FEATURED_PROPERTY"
    | "LISTING_BOOST"
    | "SUBSCRIPTION"
    | "WALLET_TOPUP"
    | "VERIFICATION"
    | "ADVERTISEMENT"
    | "OTHER";
  product_id: string | null;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED";
  provider: string;
  provider_reference: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  agent_name?: string;
  user_email?: string;
};

export type DbInquiry = {
  id: string;
  property_id: string;
  agent_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  message: string;
  status: "NEW" | "READ" | "CONTACTED" | "ARCHIVED";
  created_at: string;
  property_title?: string;
};

const SUPER_ADMIN_EMAIL = "nithonia67@gmail.com";

let isSeeded = false;

/** Initialize seed data into database if empty */
export async function ensureSwahivoSeed(): Promise<void> {
  if (isSeeded) return;
  const sql = await getSql();

  try {
    // 0. Ensure tables and column schemas exist
    await sql`
      CREATE TABLE IF NOT EXISTS "swahivo_locations" (
        "slug" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "count" INTEGER NOT NULL DEFAULT 0,
        "image" TEXT NOT NULL,
        "blurb" TEXT NOT NULL,
        "is_branch" BOOLEAN NOT NULL DEFAULT false,
        "branch_status" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "swahivo_contact_messages" (
        "id" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "subject" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "recipient_email" TEXT NOT NULL DEFAULT 'hello@swahivo.com',
        "status" TEXT NOT NULL DEFAULT 'NEW',
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    // Ensure user and agent profile columns exist
    try {
      await sql`ALTER TABLE "swahivo_users" ADD COLUMN IF NOT EXISTS "phone" TEXT`;
      await sql`ALTER TABLE "swahivo_users" ADD COLUMN IF NOT EXISTS "city" TEXT`;
      await sql`ALTER TABLE "swahivo_users" ADD COLUMN IF NOT EXISTS "bio" TEXT`;
      await sql`ALTER TABLE "swahivo_users" ADD COLUMN IF NOT EXISTS "photo" TEXT`;
      await sql`ALTER TABLE "swahivo_users" ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMPTZ DEFAULT now()`;
      await sql`ALTER TABLE "swahivo_agents" ADD COLUMN IF NOT EXISTS "agency" TEXT`;
      await sql`ALTER TABLE "swahivo_agents" ADD COLUMN IF NOT EXISTS "whatsapp" TEXT`;
    } catch {
      // Column may already exist
    }

    // Ensure locations are seeded
    const locCount = await sql<{ count: number }>`SELECT count(*) as count FROM "swahivo_locations"`;
    if (Number(locCount[0]?.count || 0) === 0) {
      for (const loc of initialLocations) {
        const isBranch = loc.slug === "zanzibar" || loc.slug === "dar-es-salaam" || loc.slug === "arusha";
        const branchStatus = loc.slug === "zanzibar" ? "main" : (loc.slug === "dar-es-salaam" || loc.slug === "arusha") ? "coming_soon" : null;
        await sql`
          INSERT INTO "swahivo_locations" (
            "slug", "name", "count", "image", "blurb", "is_branch", "branch_status"
          )
          VALUES (
            ${loc.slug}, ${loc.name}, ${loc.count}, ${loc.image}, ${loc.blurb}, ${isBranch}, ${branchStatus}
          )
          ON CONFLICT ("slug") DO UPDATE SET
            "is_branch" = EXCLUDED."is_branch",
            "branch_status" = EXCLUDED."branch_status"
        `;
      }
    } else {
      // Ensure Zanzibar is Main Branch and Dar/Arusha are Coming Soon branches
      await sql`
        UPDATE "swahivo_locations" SET "is_branch" = true, "branch_status" = 'main' WHERE "slug" = 'zanzibar'
      `;
      await sql`
        UPDATE "swahivo_locations" SET "is_branch" = true, "branch_status" = 'coming_soon' WHERE "slug" IN ('dar-es-salaam', 'arusha')
      `;
    }

    // 1. Ensure Super Admin exists
    const adminUser = await sql<DbUser>`
      SELECT * FROM "swahivo_users" WHERE LOWER(email) = ${SUPER_ADMIN_EMAIL.toLowerCase()}
    `;
    if (adminUser.length === 0) {
      await sql`
        INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
        VALUES ('admin-nithonia', 'Super Administrator', ${SUPER_ADMIN_EMAIL}, 'admin', 'ACTIVE')
        ON CONFLICT ("email") DO UPDATE SET "role" = 'admin'
      `;
      await sql`
        INSERT INTO "swahivo_wallets" ("id", "user_id", "balance", "currency")
        VALUES ('wallet-admin-nithonia', 'admin-nithonia', 500000, 'TZS')
        ON CONFLICT ("user_id") DO NOTHING
      `;
    }

    // 2. Ensure initial agents exist
    const agentCount = await sql<{ count: number }>`SELECT count(*) as count FROM "swahivo_agents"`;
    if (Number(agentCount[0]?.count || 0) === 0) {
      for (const a of initialAgents) {
        const userId = `user-${a.id}`;
        await sql`
          INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
          VALUES (${userId}, ${a.name}, ${a.email}, 'agent', 'ACTIVE')
          ON CONFLICT ("email") DO NOTHING
        `;
        const langsJson = JSON.stringify(a.languages);
        await sql`
          INSERT INTO "swahivo_agents" (
            "id", "user_id", "name", "email", "phone", "role", "city",
            "photo", "bio", "languages", "verification_status", "account_status",
            "subscription_plan", "subscription_expires_at"
          )
          VALUES (
            ${a.id}, ${userId}, ${a.name}, ${a.email}, ${a.phone}, ${a.role}, ${a.city},
            ${a.photo}, ${a.bio}, ${langsJson}::jsonb, 'VERIFIED', 'ACTIVE',
            ${a.id === "aisha-mwinyi" ? "professional" : a.id === "zahra-hassan" ? "starter" : "professional"},
            now() + interval '30 days'
          )
          ON CONFLICT ("id") DO NOTHING
        `;
        await sql`
          INSERT INTO "swahivo_wallets" ("id", "user_id", "agent_id", "balance", "currency")
          VALUES (${`wallet-${a.id}`}, ${userId}, ${a.id}, 75000, 'TZS')
          ON CONFLICT ("user_id") DO NOTHING
        `;
      }
    }

    // 3. Ensure initial properties exist
    const propCount = await sql<{ count: number }>`SELECT count(*) as count FROM "swahivo_properties"`;
    if (Number(propCount[0]?.count || 0) === 0) {
      for (const p of initialProperties) {
        const galleryJson = JSON.stringify(p.gallery);
        const amenitiesJson = JSON.stringify(p.amenities);
        await sql`
          INSERT INTO "swahivo_properties" (
            "id", "title", "location", "city", "price", "listing_type",
            "property_type", "beds", "baths", "area", "image", "gallery",
            "agent_id", "user_id", "description", "amenities", "year_built",
            "status", "views_count", "inquiries_count"
          )
          VALUES (
            ${p.id}, ${p.title}, ${p.location}, ${p.city}, ${p.price}, ${p.listingType},
            ${p.propertyType}, ${p.beds}, ${p.baths}, ${p.area}, ${p.image}, ${galleryJson}::jsonb,
            ${p.agentId}, ${`user-${p.agentId}`}, ${p.description}, ${amenitiesJson}::jsonb, ${p.yearBuilt},
            'APPROVED', ${Math.floor(Math.random() * 200 + 45)}, ${Math.floor(Math.random() * 12 + 2)}
          )
          ON CONFLICT ("id") DO NOTHING
        `;

        // If marked featured in static data, create active promotion record
        if (p.featured) {
          const promoId = `promo-featured-${p.id}`;
          await sql`
            INSERT INTO "swahivo_promotions" (
              "id", "property_id", "agent_id", "promotion_type", "duration_days",
              "amount", "start_at", "expires_at", "status", "views_before", "views_during",
              "inquiries_count", "favorites_count"
            )
            VALUES (
              ${promoId}, ${p.id}, ${p.agentId}, 'FEATURED', 30,
              30000, now() - interval '5 days', now() + interval '25 days', 'ACTIVE',
              120, 280, 8, 19
            )
            ON CONFLICT ("id") DO NOTHING
          `;
          await sql`
            INSERT INTO "swahivo_payments" (
              "id", "user_id", "agent_id", "amount", "currency", "product_type",
              "product_id", "status", "provider", "provider_reference"
            )
            VALUES (
              ${`pay-${promoId}`}, ${`user-${p.agentId}`}, ${p.agentId}, 30000, 'TZS',
              'FEATURED_PROPERTY', ${promoId}, 'PAID', 'swahivo_wallet', ${`REF-${promoId}`}
            )
            ON CONFLICT ("id") DO NOTHING
          `;
        }
      }

      // Add a couple of sample BOOST promotions
      const boostProps = [
        { propId: "oceanview-condo-zanzibar", agentId: "daniel-msuya" },
        { propId: "cbd-commercial-floor", agentId: "omar-juma" },
      ];
      for (const item of boostProps) {
        const promoId = `promo-boost-${item.propId}`;
        await sql`
          INSERT INTO "swahivo_promotions" (
            "id", "property_id", "agent_id", "promotion_type", "duration_days",
            "amount", "start_at", "expires_at", "status", "views_before", "views_during",
            "inquiries_count", "favorites_count"
          )
          VALUES (
            ${promoId}, ${item.propId}, ${item.agentId}, 'BOOST', 14,
            9000, now() - interval '2 days', now() + interval '12 days', 'ACTIVE',
            85, 140, 5, 11
          )
          ON CONFLICT ("id") DO NOTHING
        `;
        await sql`
          INSERT INTO "swahivo_payments" (
            "id", "user_id", "agent_id", "amount", "currency", "product_type",
            "product_id", "status", "provider", "provider_reference"
          )
          VALUES (
            ${`pay-${promoId}`}, ${`user-${item.agentId}`}, ${item.agentId}, 9000, 'TZS',
            'LISTING_BOOST', ${promoId}, 'PAID', 'swahivo_wallet', ${`REF-${promoId}`}
          )
          ON CONFLICT ("id") DO NOTHING
        `;
      }

      // Add initial inquiries
      const initialInquiries = [
        {
          id: "inq-1",
          propId: "modern-4-bedroom-house",
          agentId: "aisha-mwinyi",
          name: "Baraka Mbowe",
          email: "baraka.m@gmail.com",
          phone: "+255 712 334 901",
          msg: "Hello Aisha, I am interested in viewing this 4-bedroom house in Mbezi Beach this Saturday. Is title deed available for review?",
        },
        {
          id: "inq-2",
          propId: "luxury-apartment-masaki",
          agentId: "zahra-hassan",
          name: "Claire Dupont",
          email: "claire.dupont@embassy.org",
          phone: "+255 768 990 123",
          msg: "Good day Zahra, I am relocating to Dar es Salaam next month and looking for a 3-bedroom furnished rental in Masaki. Please let me know availability.",
        },
        {
          id: "inq-3",
          propId: "oceanview-condo-zanzibar",
          agentId: "daniel-msuya",
          name: "Farhan Al-Kindi",
          email: "f.alkindi@investoman.com",
          phone: "+968 9123 4567",
          msg: "Greetings Daniel, our investment group is evaluating oceanview condos in Nungwi for short-stay hospitality. Please share full survey plan.",
        },
      ];
      for (const inq of initialInquiries) {
        await sql`
          INSERT INTO "swahivo_inquiries" (
            "id", "property_id", "agent_id", "sender_name", "sender_email",
            "sender_phone", "message", "status"
          )
          VALUES (
            ${inq.id}, ${inq.propId}, ${inq.agentId}, ${inq.name}, ${inq.email},
            ${inq.phone}, ${inq.msg}, 'NEW'
          )
          ON CONFLICT ("id") DO NOTHING
        `;
      }
    }

    isSeeded = true;
  } catch (err) {
    console.error("[swahivo-db] error seeding initial data:", err);
  }
}

/** Check expired promotions and auto-update them to EXPIRED */
async function expireStalePromotions(sql: Sql): Promise<void> {
  try {
    await sql`
      UPDATE "swahivo_promotions"
      SET "status" = 'EXPIRED'
      WHERE "status" = 'ACTIVE' AND "expires_at" <= now()
    `;
  } catch (e) {
    console.error("[swahivo-db] error expiring stale promotions:", e);
  }
}

/** Resolve user & role strictly on server */
export async function resolveUser(
  clientUser?: { email?: string; name?: string } | null,
): Promise<{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agentId?: string;
} | null> {
  await ensureSwahivoSeed();
  if (!clientUser?.email) return null;

  const email = clientUser.email.trim().toLowerCase();
  const sql = await getSql();

  // Super Admin check: always super admin role
  if (email === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return {
      id: "admin-nithonia",
      name: clientUser.name || "Super Administrator",
      email: SUPER_ADMIN_EMAIL,
      role: "admin",
    };
  }

  // Check if this user is a registered agent in swahivo_agents
  const agentRows = await sql<DbAgent>`
    SELECT * FROM "swahivo_agents" WHERE LOWER(email) = ${email}
  `;
  if (agentRows.length > 0) {
    const a = agentRows[0];
    return {
      id: a.user_id || `user-${a.id}`,
      name: a.name,
      email: a.email,
      role: "agent",
      agentId: a.id,
    };
  }

  // Check general users table
  const userRows = await sql<DbUser>`
    SELECT * FROM "swahivo_users" WHERE LOWER(email) = ${email}
  `;
  if (userRows.length > 0) {
    const u = userRows[0];
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
    };
  }

  // Auto-register as regular user if not found
  const newId = `user-${Date.now()}`;
  const userName = clientUser.name?.trim() || email.split("@")[0] || "User";
  await sql`
    INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
    VALUES (${newId}, ${userName}, ${email}, 'user', 'ACTIVE')
    ON CONFLICT ("email") DO NOTHING
  `;
  await sql`
    INSERT INTO "swahivo_wallets" ("id", "user_id", "balance", "currency")
    VALUES (${`wallet-${newId}`}, ${newId}, 0, 'TZS')
    ON CONFLICT ("user_id") DO NOTHING
  `;

  return {
    id: newId,
    name: userName,
    email,
    role: "user",
  };
}

/** Assert user is Super Admin */
export function assertAdmin(user: { role: string; email: string } | null): void {
  if (!user) throw new Error("Unauthorized: You must be logged in.");
  if (user.role !== "admin" && user.email.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Forbidden: Super Administrator access required.");
  }
}

/** Assert user is Agent or Admin */
export function assertAgent(user: { id?: string; role: string; email: string; agentId?: string } | null): {
  id: string;
  agentId: string;
} {
  if (!user) throw new Error("Unauthorized: You must be logged in.");
  if (user.role !== "agent" && user.role !== "admin" && user.email.toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Forbidden: Agent access required.");
  }
  const userId = user.id || user.email;
  const agentId = user.agentId || (user.role === "admin" ? "aisha-mwinyi" : userId);
  return { id: userId, agentId };
}

// -----------------------------------------------------------------------------
// PUBLIC PROPERTY QUERIES
// -----------------------------------------------------------------------------

export async function fetchPublicProperties(filters?: {
  deal?: string;
  type?: string;
  q?: string;
  price?: string;
  beds?: string;
}): Promise<DbProperty[]> {
  await ensureSwahivoSeed();
  const sql = await getSql();
  await expireStalePromotions(sql);

  // Query only APPROVED properties, joined with active promotions and agents
  const rows = await sql<{
    id: string;
    title: string;
    location: string;
    city: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    image: string;
    gallery: string;
    agent_id: string;
    user_id: string | null;
    description: string;
    amenities: string;
    year_built: number | null;
    status: "APPROVED";
    views_count: number;
    inquiries_count: number;
    created_at: string;
    updated_at: string;
    agent_name: string | null;
    agent_photo: string | null;
    has_featured: boolean;
    has_boost: boolean;
  }>`
    SELECT
      p.*,
      a.name as agent_name,
      a.photo as agent_photo,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'FEATURED'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_featured,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'BOOST'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_boost
    FROM "swahivo_properties" p
    LEFT JOIN "swahivo_agents" a ON p.agent_id = a.id
    WHERE p.status = 'APPROVED'
    ORDER BY
      has_featured DESC,
      has_boost DESC,
      p.created_at DESC
  `;

  let list = rows.map((r) => ({
    ...r,
    gallery: typeof r.gallery === "string" ? JSON.parse(r.gallery) : r.gallery || [],
    amenities: typeof r.amenities === "string" ? JSON.parse(r.amenities) : r.amenities || [],
    is_featured: Boolean(r.has_featured),
    is_boosted: Boolean(r.has_boost),
  }));

  // Apply in-memory search filters if provided
  if (filters?.deal) {
    list = list.filter((p) => p.listing_type === filters.deal);
  }
  if (filters?.type) {
    list = list.filter((p) => p.property_type === filters.type);
  }
  if (filters?.q) {
    const qLower = filters.q.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(qLower) ||
        p.location.toLowerCase().includes(qLower) ||
        p.city.toLowerCase().includes(qLower),
    );
  }
  if (filters?.beds) {
    const bedsNum = Number(filters.beds);
    list = list.filter((p) => p.beds != null && (bedsNum >= 4 ? p.beds >= 4 : p.beds === bedsNum));
  }
  if (filters?.price) {
    const [minStr, maxStr] = filters.price.split("-");
    const min = minStr ? Number(minStr) : 0;
    const max = maxStr ? Number(maxStr) : Infinity;
    list = list.filter((p) => p.price >= min && p.price <= max);
  }

  return list;
}

export async function fetchPropertyById(id: string): Promise<DbProperty | null> {
  await ensureSwahivoSeed();
  const sql = await getSql();
  await expireStalePromotions(sql);

  // Increment views
  await sql`UPDATE "swahivo_properties" SET "views_count" = "views_count" + 1 WHERE id = ${id}`;

  const rows = await sql<{
    id: string;
    title: string;
    location: string;
    city: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    image: string;
    gallery: string;
    agent_id: string;
    user_id: string | null;
    description: string;
    amenities: string;
    year_built: number | null;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
    views_count: number;
    inquiries_count: number;
    created_at: string;
    updated_at: string;
    agent_name: string | null;
    agent_photo: string | null;
    agent_phone: string | null;
    agent_email: string | null;
    has_featured: boolean;
    has_boost: boolean;
  }>`
    SELECT
      p.*,
      a.name as agent_name,
      a.photo as agent_photo,
      a.phone as agent_phone,
      a.email as agent_email,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'FEATURED'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_featured,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'BOOST'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_boost
    FROM "swahivo_properties" p
    LEFT JOIN "swahivo_agents" a ON p.agent_id = a.id
    WHERE p.id = ${id}
  `;

  if (rows.length === 0) return null;
  const r = rows[0];

  return {
    ...r,
    gallery: typeof r.gallery === "string" ? JSON.parse(r.gallery) : r.gallery || [],
    amenities: typeof r.amenities === "string" ? JSON.parse(r.amenities) : r.amenities || [],
    is_featured: Boolean(r.has_featured),
    is_boosted: Boolean(r.has_boost),
  };
}

// -----------------------------------------------------------------------------
// ADMIN PROPERTY & USER OPERATIONS
// -----------------------------------------------------------------------------

export async function fetchAdminProperties(adminUser: { role: string; email: string }): Promise<DbProperty[]> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await expireStalePromotions(sql);

  const rows = await sql<{
    id: string;
    title: string;
    location: string;
    city: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    image: string;
    gallery: string;
    agent_id: string;
    user_id: string | null;
    description: string;
    amenities: string;
    year_built: number | null;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
    views_count: number;
    inquiries_count: number;
    created_at: string;
    updated_at: string;
    agent_name: string | null;
    agent_email: string | null;
    has_featured: boolean;
    has_boost: boolean;
  }>`
    SELECT
      p.*,
      a.name as agent_name,
      a.email as agent_email,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'FEATURED'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_featured,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'BOOST'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_boost
    FROM "swahivo_properties" p
    LEFT JOIN "swahivo_agents" a ON p.agent_id = a.id
    ORDER BY p.created_at DESC
  `;

  return rows.map((r) => ({
    ...r,
    gallery: typeof r.gallery === "string" ? JSON.parse(r.gallery) : r.gallery || [],
    amenities: typeof r.amenities === "string" ? JSON.parse(r.amenities) : r.amenities || [],
    is_featured: Boolean(r.has_featured),
    is_boosted: Boolean(r.has_boost),
  }));
}

export async function setListingApproval(
  adminUser: { role: string; email: string },
  propertyId: string,
  newStatus: "APPROVED" | "REJECTED" | "SUSPENDED" | "PENDING",
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await sql`
    UPDATE "swahivo_properties"
    SET "status" = ${newStatus}, "updated_at" = now()
    WHERE "id" = ${propertyId}
  `;
}

export async function fetchAdminAgents(adminUser: { role: string; email: string }): Promise<DbAgent[]> {
  assertAdmin(adminUser);
  const sql = await getSql();

  const rows = await sql<DbAgent & { total_listings: number; active_listings: number; total_views: number; total_inquiries: number }>`
    SELECT
      a.*,
      COUNT(p.id) as total_listings,
      COUNT(CASE WHEN p.status = 'APPROVED' THEN 1 END) as active_listings,
      COALESCE(SUM(p.views_count), 0) as total_views,
      COALESCE(SUM(p.inquiries_count), 0) as total_inquiries
    FROM "swahivo_agents" a
    LEFT JOIN "swahivo_properties" p ON a.id = p.agent_id
    GROUP BY a.id
    ORDER BY a.created_at ASC
  `;

  return rows.map((r) => ({
    ...r,
    languages: typeof r.languages === "string" ? JSON.parse(r.languages) : r.languages || ["English", "Swahili"],
    total_listings: Number(r.total_listings || 0),
    active_listings: Number(r.active_listings || 0),
    total_views: Number(r.total_views || 0),
    total_inquiries: Number(r.total_inquiries || 0),
  }));
}

export async function updateAgentRoleOrStatus(
  adminUser: { role: string; email: string },
  agentId: string,
  updates: {
    account_status?: "ACTIVE" | "SUSPENDED";
    verification_status?: "VERIFIED" | "PENDING" | "UNVERIFIED";
    subscription_plan?: string;
  },
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  if (updates.account_status) {
    await sql`UPDATE "swahivo_agents" SET "account_status" = ${updates.account_status}, "updated_at" = now() WHERE "id" = ${agentId}`;
  }
  if (updates.verification_status) {
    await sql`UPDATE "swahivo_agents" SET "verification_status" = ${updates.verification_status}, "updated_at" = now() WHERE "id" = ${agentId}`;
  }
  if (updates.subscription_plan) {
    await sql`UPDATE "swahivo_agents" SET "subscription_plan" = ${updates.subscription_plan}, "updated_at" = now() WHERE "id" = ${agentId}`;
  }
}

export async function assignNewAgent(
  adminUser: { role: string; email: string },
  data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    bio: string;
    languages: string[];
    subscription_plan?: string;
  },
): Promise<DbAgent> {
  assertAdmin(adminUser);
  const sql = await getSql();
  const email = data.email.trim().toLowerCase();
  const agentId = `agent-${Date.now()}`;
  const userId = `user-${agentId}`;

  // Ensure user has agent role
  await sql`
    INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
    VALUES (${userId}, ${data.name}, ${email}, 'agent', 'ACTIVE')
    ON CONFLICT ("email") DO UPDATE SET "role" = 'agent'
  `;

  const langsJson = JSON.stringify(data.languages || ["English", "Swahili"]);
  await sql`
    INSERT INTO "swahivo_agents" (
      "id", "user_id", "name", "email", "phone", "role", "city",
      "photo", "bio", "languages", "verification_status", "account_status",
      "subscription_plan", "subscription_expires_at"
    )
    VALUES (
      ${agentId}, ${userId}, ${data.name}, ${email}, ${data.phone}, 'Certified Agent', ${data.city},
      '/images/agents/aisha.jpg', ${data.bio}, ${langsJson}::jsonb, 'VERIFIED', 'ACTIVE',
      ${data.subscription_plan || "starter"}, now() + interval '30 days'
    )
    ON CONFLICT ("email") DO UPDATE SET
      "name" = ${data.name},
      "phone" = ${data.phone},
      "city" = ${data.city},
      "bio" = ${data.bio},
      "verification_status" = 'VERIFIED'
  `;

  await sql`
    INSERT INTO "swahivo_wallets" ("id", "user_id", "agent_id", "balance", "currency")
    VALUES (${`wallet-${agentId}`}, ${userId}, ${agentId}, 50000, 'TZS')
    ON CONFLICT ("user_id") DO NOTHING
  `;

  return (await sql<DbAgent>`SELECT * FROM "swahivo_agents" WHERE "id" = ${agentId}`)[0];
}

export async function revokeAgentRole(
  adminUser: { role: string; email: string },
  agentId: string,
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  const agentRows = await sql<DbAgent>`SELECT * FROM "swahivo_agents" WHERE "id" = ${agentId}`;
  if (agentRows.length === 0) return;
  const a = agentRows[0];
  await sql`UPDATE "swahivo_agents" SET "account_status" = 'SUSPENDED' WHERE "id" = ${agentId}`;
  if (a.email) {
    await sql`UPDATE "swahivo_users" SET "role" = 'user' WHERE LOWER("email") = ${a.email.toLowerCase()}`;
  }
}

// -----------------------------------------------------------------------------
// AGENT DASHBOARD & LISTING OPERATIONS
// -----------------------------------------------------------------------------

export async function fetchAgentProperties(agentUser: {
  role: string;
  email: string;
  agentId?: string;
  id: string;
}): Promise<DbProperty[]> {
  const { agentId } = assertAgent(agentUser);
  const sql = await getSql();
  await expireStalePromotions(sql);

  const rows = await sql<{
    id: string;
    title: string;
    location: string;
    city: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    image: string;
    gallery: string;
    agent_id: string;
    user_id: string | null;
    description: string;
    amenities: string;
    year_built: number | null;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
    views_count: number;
    inquiries_count: number;
    created_at: string;
    updated_at: string;
    has_featured: boolean;
    has_boost: boolean;
    featured_expires: string | null;
    boost_expires: string | null;
  }>`
    SELECT
      p.*,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'FEATURED'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_featured,
      EXISTS(
        SELECT 1 FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'BOOST'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
      ) as has_boost,
      (
        SELECT promo.expires_at FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'FEATURED'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
        LIMIT 1
      ) as featured_expires,
      (
        SELECT promo.expires_at FROM "swahivo_promotions" promo
        WHERE promo.property_id = p.id
          AND promo.promotion_type = 'BOOST'
          AND promo.status = 'ACTIVE'
          AND promo.expires_at > now()
        LIMIT 1
      ) as boost_expires
    FROM "swahivo_properties" p
    WHERE p.agent_id = ${agentId} OR p.user_id = ${agentUser.id}
    ORDER BY p.created_at DESC
  `;

  return rows.map((r) => ({
    ...r,
    gallery: typeof r.gallery === "string" ? JSON.parse(r.gallery) : r.gallery || [],
    amenities: typeof r.amenities === "string" ? JSON.parse(r.amenities) : r.amenities || [],
    is_featured: Boolean(r.has_featured),
    is_boosted: Boolean(r.has_boost),
    featured_expires_at: r.featured_expires,
    boost_expires_at: r.boost_expires,
  }));
}

export async function createPropertyListing(
  user: { role: string; email: string; agentId?: string; id: string },
  data: {
    title: string;
    city: string;
    location: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    description: string;
    image?: string;
    gallery?: string[];
    amenities?: string[];
  },
): Promise<DbProperty> {
  const { agentId } = assertAgent(user);
  const sql = await getSql();

  // 1. Enforce Subscription Listing Limits
  const agentRows = await sql<DbAgent>`SELECT * FROM "swahivo_agents" WHERE "id" = ${agentId}`;
  if (agentRows.length > 0) {
    const agent = agentRows[0];
    const planRows = await sql<DbSubscriptionPlan>`SELECT * FROM "swahivo_subscription_plans" WHERE "id" = ${agent.subscription_plan}`;
    const plan = planRows[0];
    if (plan) {
      const activeCount = await sql<{ count: number }>`
        SELECT count(*) as count FROM "swahivo_properties"
        WHERE "agent_id" = ${agentId} AND "status" = 'APPROVED'
      `;
      const currentActive = Number(activeCount[0]?.count || 0);
      if (currentActive >= plan.listing_limit) {
        throw new Error(
          `Listing limit reached: Your ${plan.name} plan allows up to ${plan.listing_limit} active listings. Please upgrade your subscription plan to add more properties.`,
        );
      }
    }
  }

  const propId = `listing-${Date.now()}`;
  const defaultImage = data.image || "/images/properties/modern-house.jpg";
  const galleryJson = JSON.stringify(data.gallery || [defaultImage, "/images/properties/interior-kitchen.jpg"]);
  const amenitiesJson = JSON.stringify(data.amenities || ["Parking", "Security", "Water tank"]);
  const status = user.role === "admin" ? "APPROVED" : "PENDING";

  await sql`
    INSERT INTO "swahivo_properties" (
      "id", "title", "location", "city", "price", "listing_type",
      "property_type", "beds", "baths", "area", "image", "gallery",
      "agent_id", "user_id", "description", "amenities", "year_built",
      "status", "views_count", "inquiries_count"
    )
    VALUES (
      ${propId}, ${data.title}, ${data.location}, ${data.city}, ${data.price}, ${data.listing_type},
      ${data.property_type}, ${data.beds}, ${data.baths}, ${data.area}, ${defaultImage}, ${galleryJson}::jsonb,
      ${agentId}, ${user.id}, ${data.description}, ${amenitiesJson}::jsonb, 2024,
      ${status}, 0, 0
    )
  `;

  return (await fetchPropertyById(propId))!;
}

export async function updatePropertyListing(
  user: { role: string; email: string; agentId?: string; id: string },
  propertyId: string,
  data: Partial<{
    title: string;
    city: string;
    location: string;
    price: number;
    listing_type: "sale" | "rent";
    property_type: "apartment" | "house" | "villa" | "plot" | "commercial" | "condo";
    beds: number | null;
    baths: number | null;
    area: number;
    description: string;
    status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
  }>,
): Promise<void> {
  const sql = await getSql();
  const rows = await sql<DbProperty>`SELECT * FROM "swahivo_properties" WHERE "id" = ${propertyId}`;
  if (rows.length === 0) throw new Error("Property not found.");
  const p = rows[0];

  // Ownership verification
  if (user.role !== "admin" && p.agent_id !== user.agentId && p.user_id !== user.id) {
    throw new Error("Forbidden: You do not own this property.");
  }

  // Update allowed fields
  if (data.title !== undefined) await sql`UPDATE "swahivo_properties" SET "title" = ${data.title} WHERE "id" = ${propertyId}`;
  if (data.city !== undefined) await sql`UPDATE "swahivo_properties" SET "city" = ${data.city} WHERE "id" = ${propertyId}`;
  if (data.location !== undefined) await sql`UPDATE "swahivo_properties" SET "location" = ${data.location} WHERE "id" = ${propertyId}`;
  if (data.price !== undefined) await sql`UPDATE "swahivo_properties" SET "price" = ${data.price} WHERE "id" = ${propertyId}`;
  if (data.listing_type !== undefined) await sql`UPDATE "swahivo_properties" SET "listing_type" = ${data.listing_type} WHERE "id" = ${propertyId}`;
  if (data.property_type !== undefined) await sql`UPDATE "swahivo_properties" SET "property_type" = ${data.property_type} WHERE "id" = ${propertyId}`;
  if (data.beds !== undefined) await sql`UPDATE "swahivo_properties" SET "beds" = ${data.beds} WHERE "id" = ${propertyId}`;
  if (data.baths !== undefined) await sql`UPDATE "swahivo_properties" SET "baths" = ${data.baths} WHERE "id" = ${propertyId}`;
  if (data.area !== undefined) await sql`UPDATE "swahivo_properties" SET "area" = ${data.area} WHERE "id" = ${propertyId}`;
  if (data.description !== undefined) await sql`UPDATE "swahivo_properties" SET "description" = ${data.description} WHERE "id" = ${propertyId}`;
  if (data.status !== undefined && user.role === "admin") {
    await sql`UPDATE "swahivo_properties" SET "status" = ${data.status} WHERE "id" = ${propertyId}`;
  }

  await sql`UPDATE "swahivo_properties" SET "updated_at" = now() WHERE "id" = ${propertyId}`;
}

export async function deletePropertyListing(
  user: { role: string; email: string; agentId?: string; id: string },
  propertyId: string,
): Promise<void> {
  const sql = await getSql();
  const rows = await sql<DbProperty>`SELECT * FROM "swahivo_properties" WHERE "id" = ${propertyId}`;
  if (rows.length === 0) return;
  const p = rows[0];

  // Ownership verification
  if (user.role !== "admin" && p.agent_id !== user.agentId && p.user_id !== user.id) {
    throw new Error("Forbidden: You do not have permission to delete this property.");
  }

  await sql`DELETE FROM "swahivo_properties" WHERE "id" = ${propertyId}`;
}

// -----------------------------------------------------------------------------
// MONETIZATION: PROMOTIONS (FEATURED & BOOST)
// -----------------------------------------------------------------------------

export async function fetchPromotionPricing(): Promise<Array<{
  id: string;
  promotion_type: "FEATURED" | "BOOST";
  duration_days: number;
  price: number;
}>> {
  await ensureSwahivoSeed();
  const sql = await getSql();
  return sql`SELECT * FROM "swahivo_promotion_pricing" WHERE "is_active" = true ORDER BY promotion_type, duration_days ASC`;
}

export async function updatePromotionPriceAdmin(
  adminUser: { role: string; email: string },
  id: string,
  price: number,
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await sql`UPDATE "swahivo_promotion_pricing" SET "price" = ${price}, "updated_at" = now() WHERE "id" = ${id}`;
}

export async function promotePropertyListing(
  user: { role: string; email: string; agentId?: string; id: string },
  params: {
    propertyId: string;
    promotionType: "FEATURED" | "BOOST";
    durationDays: number;
    paymentMethod: "wallet" | "m-pesa" | "airtel-money" | "tigo-pesa" | "card";
  },
): Promise<DbPromotion> {
  const { agentId } = assertAgent(user);
  const sql = await getSql();
  await expireStalePromotions(sql);

  // 1. Verify property ownership & approval
  const propRows = await sql<DbProperty>`SELECT * FROM "swahivo_properties" WHERE "id" = ${params.propertyId}`;
  if (propRows.length === 0) throw new Error("Property not found.");
  const property = propRows[0];
  if (user.role !== "admin" && property.agent_id !== agentId && property.user_id !== user.id) {
    throw new Error("Forbidden: You do not own this property.");
  }
  if (property.status !== "APPROVED") {
    throw new Error("Promotion requires property approval. This property is currently " + property.status);
  }

  // 2. Fetch pricing
  const pricingRows = await sql<{ price: number }>`
    SELECT price FROM "swahivo_promotion_pricing"
    WHERE "promotion_type" = ${params.promotionType} AND "duration_days" = ${params.durationDays}
  `;
  if (pricingRows.length === 0) throw new Error("Invalid promotion duration or type.");
  const amount = Number(pricingRows[0].price);

  // 3. Process payment
  const promoId = `promo-${Date.now()}`;
  const paymentId = `pay-${promoId}`;

  if (params.paymentMethod === "wallet") {
    const walletRows = await sql<DbWallet>`
      SELECT * FROM "swahivo_wallets" WHERE "user_id" = ${user.id} OR "agent_id" = ${agentId} LIMIT 1
    `;
    if (walletRows.length === 0 || Number(walletRows[0].balance) < amount) {
      const current = Number(walletRows[0]?.balance || 0);
      throw new Error(`Insufficient wallet balance (TSh ${current.toLocaleString()}). Required: TSh ${amount.toLocaleString()}. Please top up your wallet.`);
    }
    const wallet = walletRows[0];
    const newBalance = Number(wallet.balance) - amount;

    await sql`UPDATE "swahivo_wallets" SET "balance" = ${newBalance}, "updated_at" = now() WHERE "id" = ${wallet.id}`;
    await sql`
      INSERT INTO "swahivo_wallet_transactions" (
        "id", "wallet_id", "user_id", "type", "amount", "balance_before",
        "balance_after", "reference", "description", "status"
      )
      VALUES (
        ${`tx-${Date.now()}`}, ${wallet.id}, ${user.id}, 'DEBIT', ${amount},
        ${wallet.balance}, ${newBalance}, ${`REF-${promoId}`},
        ${`${params.promotionType} promotion for ${property.title} (${params.durationDays} days)`},
        'COMPLETED'
      )
    `;
  }

  // Record payment
  await sql`
    INSERT INTO "swahivo_payments" (
      "id", "user_id", "agent_id", "amount", "currency", "product_type",
      "product_id", "status", "provider", "provider_reference"
    )
    VALUES (
      ${paymentId}, ${user.id}, ${agentId}, ${amount}, 'TZS',
      ${params.promotionType === "FEATURED" ? "FEATURED_PROPERTY" : "LISTING_BOOST"},
      ${promoId}, 'PAID', ${params.paymentMethod}, ${`REF-${promoId}`}
    )
  `;

  // Create active promotion
  await sql`
    INSERT INTO "swahivo_promotions" (
      "id", "property_id", "agent_id", "promotion_type", "duration_days",
      "amount", "start_at", "expires_at", "payment_id", "status",
      "views_before", "views_during", "inquiries_count", "favorites_count"
    )
    VALUES (
      ${promoId}, ${params.propertyId}, ${agentId}, ${params.promotionType}, ${params.durationDays},
      ${amount}, now(), now() + (${params.durationDays} || ' days')::interval, ${paymentId}, 'ACTIVE',
      ${property.views_count}, 0, 0, 0
    )
  `;

  return (await sql<DbPromotion>`SELECT * FROM "swahivo_promotions" WHERE "id" = ${promoId}`)[0];
}

export async function fetchAgentPromotions(agentUser: {
  role: string;
  email: string;
  agentId?: string;
  id: string;
}): Promise<DbPromotion[]> {
  const { agentId } = assertAgent(agentUser);
  const sql = await getSql();
  await expireStalePromotions(sql);

  const rows = await sql<DbPromotion>`
    SELECT
      promo.*,
      p.title as property_title,
      p.location as property_location,
      p.image as property_image
    FROM "swahivo_promotions" promo
    JOIN "swahivo_properties" p ON promo.property_id = p.id
    WHERE promo.agent_id = ${agentId}
    ORDER BY promo.created_at DESC
  `;

  return rows;
}

export async function fetchAllPromotionsAdmin(adminUser: { role: string; email: string }): Promise<DbPromotion[]> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await expireStalePromotions(sql);

  return sql<DbPromotion>`
    SELECT
      promo.*,
      p.title as property_title,
      p.location as property_location,
      p.image as property_image,
      a.name as agent_name
    FROM "swahivo_promotions" promo
    JOIN "swahivo_properties" p ON promo.property_id = p.id
    LEFT JOIN "swahivo_agents" a ON promo.agent_id = a.id
    ORDER BY promo.created_at DESC
  `;
}

export async function cancelPromotionAdmin(adminUser: { role: string; email: string }, promoId: string): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await sql`UPDATE "swahivo_promotions" SET "status" = 'CANCELLED' WHERE "id" = ${promoId}`;
}

// -----------------------------------------------------------------------------
// MONETIZATION: SUBSCRIPTION PLANS & MANAGEMENT
// -----------------------------------------------------------------------------

export async function fetchSubscriptionPlans(): Promise<DbSubscriptionPlan[]> {
  await ensureSwahivoSeed();
  const sql = await getSql();
  const rows = await sql<DbSubscriptionPlan>`SELECT * FROM "swahivo_subscription_plans" ORDER BY "sort_order" ASC`;
  return rows.map((r) => ({
    ...r,
    features: typeof r.features === "string" ? JSON.parse(r.features) : r.features || [],
  }));
}

export async function updateSubscriptionPlanAdmin(
  adminUser: { role: string; email: string },
  planId: string,
  data: Partial<{
    name: string;
    price: number;
    listing_limit: number;
    boost_allowance: number;
    description: string;
    is_active: boolean;
  }>,
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  if (data.name !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "name" = ${data.name} WHERE "id" = ${planId}`;
  if (data.price !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "price" = ${data.price} WHERE "id" = ${planId}`;
  if (data.listing_limit !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "listing_limit" = ${data.listing_limit} WHERE "id" = ${planId}`;
  if (data.boost_allowance !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "boost_allowance" = ${data.boost_allowance} WHERE "id" = ${planId}`;
  if (data.description !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "description" = ${data.description} WHERE "id" = ${planId}`;
  if (data.is_active !== undefined) await sql`UPDATE "swahivo_subscription_plans" SET "is_active" = ${data.is_active} WHERE "id" = ${planId}`;
  await sql`UPDATE "swahivo_subscription_plans" SET "updated_at" = now() WHERE "id" = ${planId}`;
}

export async function upgradeAgentSubscription(
  agentUser: { role: string; email: string; agentId?: string; id: string },
  planId: string,
  paymentMethod: string,
): Promise<void> {
  const { agentId } = assertAgent(agentUser);
  const sql = await getSql();

  const planRows = await sql<DbSubscriptionPlan>`SELECT * FROM "swahivo_subscription_plans" WHERE "id" = ${planId}`;
  if (planRows.length === 0) throw new Error("Plan not found.");
  const plan = planRows[0];
  const price = Number(plan.price);

  if (price > 0 && paymentMethod === "wallet") {
    const walletRows = await sql<DbWallet>`SELECT * FROM "swahivo_wallets" WHERE "user_id" = ${agentUser.id} OR "agent_id" = ${agentId} LIMIT 1`;
    if (walletRows.length === 0 || Number(walletRows[0].balance) < price) {
      const current = Number(walletRows[0]?.balance || 0);
      throw new Error(`Insufficient wallet balance (TSh ${current.toLocaleString()}). Required: TSh ${price.toLocaleString()}.`);
    }
    const wallet = walletRows[0];
    const newBal = Number(wallet.balance) - price;
    await sql`UPDATE "swahivo_wallets" SET "balance" = ${newBal}, "updated_at" = now() WHERE "id" = ${wallet.id}`;
    await sql`
      INSERT INTO "swahivo_wallet_transactions" (
        "id", "wallet_id", "user_id", "type", "amount", "balance_before",
        "balance_after", "reference", "description", "status"
      )
      VALUES (
        ${`tx-${Date.now()}`}, ${wallet.id}, ${agentUser.id}, 'DEBIT', ${price},
        ${wallet.balance}, ${newBal}, ${`SUB-${planId}`}, ${`Subscription: ${plan.name} Plan`}, 'COMPLETED'
      )
    `;
  }

  const subId = `sub-${Date.now()}`;
  await sql`
    INSERT INTO "swahivo_payments" (
      "id", "user_id", "agent_id", "amount", "currency", "product_type",
      "product_id", "status", "provider", "provider_reference"
    )
    VALUES (
      ${`pay-${subId}`}, ${agentUser.id}, ${agentId}, ${price}, 'TZS',
      'SUBSCRIPTION', ${planId}, 'PAID', ${paymentMethod}, ${`REF-${subId}`}
    )
  `;

  await sql`
    INSERT INTO "swahivo_subscriptions" (
      "id", "agent_id", "plan_id", "amount", "status", "start_at", "expires_at", "payment_id"
    )
    VALUES (
      ${subId}, ${agentId}, ${planId}, ${price}, 'ACTIVE', now(), now() + interval '30 days', ${`pay-${subId}`}
    )
  `;

  await sql`
    UPDATE "swahivo_agents"
    SET "subscription_plan" = ${planId}, "subscription_expires_at" = now() + interval '30 days', "updated_at" = now()
    WHERE "id" = ${agentId}
  `;
}

export async function fetchAllSubscriptionsAdmin(adminUser: { role: string; email: string }): Promise<Array<{
  id: string;
  agent_id: string;
  agent_name: string;
  agent_email: string;
  plan_id: string;
  plan_name: string;
  amount: number;
  status: string;
  start_at: string;
  expires_at: string;
}>> {
  assertAdmin(adminUser);
  const sql = await getSql();

  return sql`
    SELECT
      s.*,
      a.name as agent_name,
      a.email as agent_email,
      p.name as plan_name
    FROM "swahivo_subscriptions" s
    JOIN "swahivo_agents" a ON s.agent_id = a.id
    JOIN "swahivo_subscription_plans" p ON s.plan_id = p.id
    ORDER BY s.created_at DESC
  `;
}

// -----------------------------------------------------------------------------
// MONETIZATION: AGENT WALLET & CREDITS
// -----------------------------------------------------------------------------

export async function fetchAgentWallet(user: { role: string; email: string; agentId?: string; id: string }): Promise<{
  wallet: DbWallet;
  transactions: DbWalletTransaction[];
}> {
  await ensureSwahivoSeed();
  const sql = await getSql();

  let rows = await sql<DbWallet>`
    SELECT * FROM "swahivo_wallets" WHERE "user_id" = ${user.id} OR ("agent_id" IS NOT NULL AND "agent_id" = ${user.agentId || ""}) LIMIT 1
  `;

  if (rows.length === 0) {
    const wId = `wallet-${user.id}`;
    await sql`
      INSERT INTO "swahivo_wallets" ("id", "user_id", "agent_id", "balance", "currency")
      VALUES (${wId}, ${user.id}, ${user.agentId || null}, 0, 'TZS')
      ON CONFLICT ("user_id") DO NOTHING
    `;
    rows = await sql<DbWallet>`SELECT * FROM "swahivo_wallets" WHERE "id" = ${wId}`;
  }

  const wallet = rows[0];
  const txRows = await sql<DbWalletTransaction>`
    SELECT * FROM "swahivo_wallet_transactions" WHERE "wallet_id" = ${wallet.id} ORDER BY "created_at" DESC LIMIT 50
  `;

  return { wallet, transactions: txRows };
}

export async function topupAgentWallet(
  user: { role: string; email: string; agentId?: string; id: string },
  amount: number,
  provider: string,
  reference?: string,
): Promise<{ balance: number; transactionId: string }> {
  if (amount <= 0) throw new Error("Top up amount must be positive.");
  const sql = await getSql();

  const { wallet } = await fetchAgentWallet(user);
  const newBalance = Number(wallet.balance) + amount;
  const txId = `tx-${Date.now()}`;
  const ref = reference || `TOPUP-${Date.now()}`;

  await sql`UPDATE "swahivo_wallets" SET "balance" = ${newBalance}, "updated_at" = now() WHERE "id" = ${wallet.id}`;

  await sql`
    INSERT INTO "swahivo_wallet_transactions" (
      "id", "wallet_id", "user_id", "type", "amount", "balance_before",
      "balance_after", "reference", "description", "status"
    )
    VALUES (
      ${txId}, ${wallet.id}, ${user.id}, 'CREDIT', ${amount},
      ${wallet.balance}, ${newBalance}, ${ref}, ${`Wallet credit via ${provider}`}, 'COMPLETED'
    )
  `;

  await sql`
    INSERT INTO "swahivo_payments" (
      "id", "user_id", "agent_id", "amount", "currency", "product_type",
      "product_id", "status", "provider", "provider_reference"
    )
    VALUES (
      ${`pay-${txId}`}, ${user.id}, ${user.agentId || null}, ${amount}, 'TZS',
      'WALLET_TOPUP', ${txId}, 'PAID', ${provider}, ${ref}
    )
  `;

  return { balance: newBalance, transactionId: txId };
}

// -----------------------------------------------------------------------------
// MONETIZATION: PAYMENTS & REVENUE ANALYTICS
// -----------------------------------------------------------------------------

export async function fetchAllPaymentsAdmin(adminUser: { role: string; email: string }): Promise<DbPayment[]> {
  assertAdmin(adminUser);
  const sql = await getSql();

  const rows = await sql<DbPayment>`
    SELECT
      p.*,
      a.name as agent_name,
      u.email as user_email
    FROM "swahivo_payments" p
    LEFT JOIN "swahivo_agents" a ON p.agent_id = a.id
    LEFT JOIN "swahivo_users" u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `;

  return rows;
}

export async function updatePaymentStatusAdmin(
  adminUser: { role: string; email: string },
  paymentId: string,
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED",
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await sql`UPDATE "swahivo_payments" SET "status" = ${status}, "updated_at" = now() WHERE "id" = ${paymentId}`;
}

export async function fetchRevenueAnalyticsAdmin(adminUser: { role: string; email: string }): Promise<{
  todayRevenue: number;
  monthRevenue: number;
  totalRevenue: number;
  featuredRevenue: number;
  boostRevenue: number;
  subscriptionRevenue: number;
  walletRevenue: number;
  totalProperties: number;
  activeProperties: number;
  pendingProperties: number;
  totalAgents: number;
  totalUsers: number;
  activePromotions: number;
  activeSubscriptions: number;
}> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await expireStalePromotions(sql);

  const [
    revTotals,
    todayTot,
    monthTot,
    byProduct,
    propCounts,
    agentCounts,
    userCounts,
    promoCounts,
    subCounts,
  ] = await Promise.all([
    sql<{ sum: number }>`SELECT COALESCE(SUM(amount), 0) as sum FROM "swahivo_payments" WHERE status = 'PAID'`,
    sql<{ sum: number }>`SELECT COALESCE(SUM(amount), 0) as sum FROM "swahivo_payments" WHERE status = 'PAID' AND created_at >= date_trunc('day', now())`,
    sql<{ sum: number }>`SELECT COALESCE(SUM(amount), 0) as sum FROM "swahivo_payments" WHERE status = 'PAID' AND created_at >= date_trunc('month', now())`,
    sql<{ product_type: string; sum: number }>`SELECT product_type, COALESCE(SUM(amount), 0) as sum FROM "swahivo_payments" WHERE status = 'PAID' GROUP BY product_type`,
    sql<{ total: number; active: number; pending: number }>`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'APPROVED' THEN 1 END) as active,
        COUNT(CASE WHEN status = 'PENDING' THEN 1 END) as pending
      FROM "swahivo_properties"
    `,
    sql<{ count: number }>`SELECT COUNT(*) as count FROM "swahivo_agents"`,
    sql<{ count: number }>`SELECT COUNT(*) as count FROM "swahivo_users"`,
    sql<{ count: number }>`SELECT COUNT(*) as count FROM "swahivo_promotions" WHERE status = 'ACTIVE' AND expires_at > now()`,
    sql<{ count: number }>`SELECT COUNT(*) as count FROM "swahivo_subscriptions" WHERE status = 'ACTIVE' AND expires_at > now()`,
  ]);

  let featuredRevenue = 0;
  let boostRevenue = 0;
  let subscriptionRevenue = 0;
  let walletRevenue = 0;

  for (const b of byProduct) {
    if (b.product_type === "FEATURED_PROPERTY") featuredRevenue = Number(b.sum);
    else if (b.product_type === "LISTING_BOOST") boostRevenue = Number(b.sum);
    else if (b.product_type === "SUBSCRIPTION") subscriptionRevenue = Number(b.sum);
    else if (b.product_type === "WALLET_TOPUP") walletRevenue = Number(b.sum);
  }

  return {
    todayRevenue: Number(todayTot[0]?.sum || 0),
    monthRevenue: Number(monthTot[0]?.sum || 0),
    totalRevenue: Number(revTotals[0]?.sum || 0),
    featuredRevenue,
    boostRevenue,
    subscriptionRevenue,
    walletRevenue,
    totalProperties: Number(propCounts[0]?.total || 0),
    activeProperties: Number(propCounts[0]?.active || 0),
    pendingProperties: Number(propCounts[0]?.pending || 0),
    totalAgents: Number(agentCounts[0]?.count || 0),
    totalUsers: Number(userCounts[0]?.count || 0),
    activePromotions: Number(promoCounts[0]?.count || 0),
    activeSubscriptions: Number(subCounts[0]?.count || 0),
  };
}

// -----------------------------------------------------------------------------
// INQUIRIES & LEADS
// -----------------------------------------------------------------------------

export async function submitPropertyInquiry(data: {
  propertyId: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
}): Promise<void> {
  const sql = await getSql();
  const propRows = await sql<DbProperty>`SELECT * FROM "swahivo_properties" WHERE "id" = ${data.propertyId}`;
  if (propRows.length === 0) throw new Error("Property not found.");
  const p = propRows[0];
  const inqId = `inq-${Date.now()}`;

  await sql`
    INSERT INTO "swahivo_inquiries" (
      "id", "property_id", "agent_id", "sender_name", "sender_email",
      "sender_phone", "message", "status"
    )
    VALUES (
      ${inqId}, ${p.id}, ${p.agent_id}, ${data.senderName}, ${data.senderEmail},
      ${data.senderPhone || null}, ${data.message}, 'NEW'
    )
  `;

  await sql`UPDATE "swahivo_properties" SET "inquiries_count" = "inquiries_count" + 1 WHERE "id" = ${p.id}`;

  // If there's an active promotion for this property, increment promo inquiries counter too
  await sql`
    UPDATE "swahivo_promotions"
    SET "inquiries_count" = "inquiries_count" + 1
    WHERE "property_id" = ${p.id} AND "status" = 'ACTIVE' AND "expires_at" > now()
  `;
}

export async function fetchAgentInquiries(agentUser: {
  role: string;
  email: string;
  agentId?: string;
  id: string;
}): Promise<DbInquiry[]> {
  const { agentId } = assertAgent(agentUser);
  const sql = await getSql();

  return sql<DbInquiry>`
    SELECT
      i.*,
      p.title as property_title
    FROM "swahivo_inquiries" i
    JOIN "swahivo_properties" p ON i.property_id = p.id
    WHERE i.agent_id = ${agentId}
    ORDER BY i.created_at DESC
  `;
}

export async function updateInquiryStatus(
  agentUser: { role: string; email: string; agentId?: string; id: string },
  inquiryId: string,
  status: "NEW" | "READ" | "CONTACTED" | "ARCHIVED",
): Promise<void> {
  const { agentId } = assertAgent(agentUser);
  const sql = await getSql();
  await sql`
    UPDATE "swahivo_inquiries"
    SET "status" = ${status}
    WHERE "id" = ${inquiryId} AND "agent_id" = ${agentId}
  `;
}

// -----------------------------------------------------------------------------
// DYNAMIC LOCATIONS SYSTEM
// -----------------------------------------------------------------------------

export async function fetchLocations(): Promise<DbLocation[]> {
  const sql = await getSql();
  await ensureSwahivoSeed();
  try {
    const rows = await sql<DbLocation>`
      SELECT * FROM "swahivo_locations"
      ORDER BY 
        CASE 
          WHEN branch_status = 'main' THEN 1
          WHEN branch_status = 'coming_soon' THEN 2
          ELSE 3
        END,
        count DESC,
        name ASC
    `;
    if (rows.length > 0) return rows;
  } catch (err) {
    console.error("[swahivo-db] error fetching locations:", err);
  }
  return initialLocations.map((l) => ({
    ...l,
    is_branch: l.slug === "zanzibar" || l.slug === "dar-es-salaam" || l.slug === "arusha",
    branch_status: l.slug === "zanzibar" ? "main" : (l.slug === "dar-es-salaam" || l.slug === "arusha") ? "coming_soon" : null,
  }));
}

export async function fetchLocationBySlug(slug: string): Promise<DbLocation | null> {
  const sql = await getSql();
  await ensureSwahivoSeed();
  const rows = await sql<DbLocation>`
    SELECT * FROM "swahivo_locations" WHERE "slug" = ${slug.toLowerCase()} LIMIT 1
  `;
  if (rows[0]) return rows[0];
  const found = initialLocations.find((l) => l.slug === slug.toLowerCase());
  if (found) {
    return {
      ...found,
      is_branch: found.slug === "zanzibar" || found.slug === "dar-es-salaam" || found.slug === "arusha",
      branch_status: found.slug === "zanzibar" ? "main" : (found.slug === "dar-es-salaam" || found.slug === "arusha") ? "coming_soon" : null,
    };
  }
  return null;
}

export async function insertLocationAdmin(
  adminUser: { email: string; role: string } | null,
  data: {
    slug: string;
    name: string;
    count?: number;
    image: string;
    blurb: string;
    is_branch?: boolean;
    branch_status?: "main" | "coming_soon" | "active" | null;
  },
): Promise<DbLocation> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await ensureSwahivoSeed();
  const slug = (data.slug || data.name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const rows = await sql<DbLocation>`
    INSERT INTO "swahivo_locations" (
      "slug", "name", "count", "image", "blurb", "is_branch", "branch_status"
    )
    VALUES (
      ${slug}, ${data.name.trim()}, ${data.count || 0}, ${data.image.trim() || "/images/locations/dar-es-salaam.jpg"},
      ${data.blurb.trim()}, ${Boolean(data.is_branch)}, ${data.branch_status || null}
    )
    ON CONFLICT ("slug") DO UPDATE SET
      "name" = EXCLUDED."name",
      "count" = EXCLUDED."count",
      "image" = EXCLUDED."image",
      "blurb" = EXCLUDED."blurb",
      "is_branch" = EXCLUDED."is_branch",
      "branch_status" = EXCLUDED."branch_status",
      "updated_at" = now()
    RETURNING *
  `;
  return rows[0];
}

export async function updateLocationAdmin(
  adminUser: { email: string; role: string } | null,
  slug: string,
  data: Partial<DbLocation>,
): Promise<DbLocation> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await ensureSwahivoSeed();
  const existing = await fetchLocationBySlug(slug);
  if (!existing) throw new Error(`Location ${slug} not found`);

  const updatedName = data.name ?? existing.name;
  const updatedCount = data.count !== undefined ? data.count : existing.count;
  const updatedImage = data.image ?? existing.image;
  const updatedBlurb = data.blurb ?? existing.blurb;
  const updatedIsBranch = data.is_branch !== undefined ? data.is_branch : (existing.is_branch || false);
  const updatedBranchStatus = data.branch_status !== undefined ? data.branch_status : (existing.branch_status || null);

  const rows = await sql<DbLocation>`
    UPDATE "swahivo_locations"
    SET
      "name" = ${updatedName},
      "count" = ${updatedCount},
      "image" = ${updatedImage},
      "blurb" = ${updatedBlurb},
      "is_branch" = ${updatedIsBranch},
      "branch_status" = ${updatedBranchStatus},
      "updated_at" = now()
    WHERE "slug" = ${slug}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteLocationAdmin(
  adminUser: { email: string; role: string } | null,
  slug: string,
): Promise<void> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await ensureSwahivoSeed();
  await sql`DELETE FROM "swahivo_locations" WHERE "slug" = ${slug}`;
}

// -----------------------------------------------------------------------------
// USER PROFILE SETTINGS CONTROLS
// -----------------------------------------------------------------------------

export async function fetchUserProfile(userSession: { email: string } | null): Promise<{
  user: DbUser;
  agent: DbAgent | null;
}> {
  if (!userSession?.email) throw new Error("Unauthorized: Log in required.");
  const sql = await getSql();
  await ensureSwahivoSeed();
  const email = userSession.email.trim().toLowerCase();

  const userRows = await sql<DbUser>`
    SELECT * FROM "swahivo_users" WHERE LOWER(email) = ${email} LIMIT 1
  `;
  let user = userRows[0];
  if (!user) {
    const id = `user-${email.split("@")[0]}-${Date.now().toString(36)}`;
    const role: UserRole = email === SUPER_ADMIN_EMAIL.toLowerCase() ? "admin" : "user";
    const ins = await sql<DbUser>`
      INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
      VALUES (${id}, ${email.split("@")[0]}, ${email}, ${role}, 'ACTIVE')
      RETURNING *
    `;
    user = ins[0];
  }

  const agentRows = await sql<DbAgent>`
    SELECT * FROM "swahivo_agents" WHERE LOWER(email) = ${email} LIMIT 1
  `;

  return { user, agent: agentRows[0] || null };
}

export async function updateUserProfile(
  userSession: { id?: string; email: string; role?: string; agentId?: string } | null,
  data: {
    name?: string;
    phone?: string;
    city?: string;
    bio?: string;
    photo?: string;
    agency?: string;
    whatsapp?: string;
    languages?: string[];
  },
): Promise<{ user: DbUser; agent: DbAgent | null }> {
  if (!userSession?.email) throw new Error("Unauthorized: Log in required.");
  const sql = await getSql();
  await ensureSwahivoSeed();
  const email = userSession.email.trim().toLowerCase();

  // 1. Update user in swahivo_users
  const userRows = await sql<DbUser>`
    UPDATE "swahivo_users"
    SET
      "name" = COALESCE(${data.name?.trim() || null}, "name"),
      "phone" = COALESCE(${data.phone?.trim() || null}, "phone"),
      "city" = COALESCE(${data.city?.trim() || null}, "city"),
      "bio" = COALESCE(${data.bio?.trim() || null}, "bio"),
      "photo" = COALESCE(${data.photo?.trim() || null}, "photo"),
      "updated_at" = now()
    WHERE LOWER(email) = ${email}
    RETURNING *
  `;
  const user = userRows[0];

  // 2. If agent exists or user is an agent, update agent table
  let agent: DbAgent | null = null;
  const agentRows = await sql<DbAgent>`
    SELECT * FROM "swahivo_agents" WHERE LOWER(email) = ${email} LIMIT 1
  `;
  if (agentRows[0]) {
    const langsJson = data.languages ? JSON.stringify(data.languages) : null;
    const updAgent = await sql<DbAgent>`
      UPDATE "swahivo_agents"
      SET
        "name" = COALESCE(${data.name?.trim() || null}, "name"),
        "phone" = COALESCE(${data.phone?.trim() || null}, "phone"),
        "city" = COALESCE(${data.city?.trim() || null}, "city"),
        "bio" = COALESCE(${data.bio?.trim() || null}, "bio"),
        "photo" = COALESCE(${data.photo?.trim() || null}, "photo"),
        "agency" = COALESCE(${data.agency?.trim() || null}, "agency"),
        "whatsapp" = COALESCE(${data.whatsapp?.trim() || null}, "whatsapp"),
        "languages" = COALESCE(${langsJson}::jsonb, "languages"),
        "updated_at" = now()
      WHERE "id" = ${agentRows[0].id}
      RETURNING *
    `;
    agent = updAgent[0];

    // Propagate updated agent name, phone, photo across all their properties
    if (data.name || data.phone || data.photo) {
      await sql`
        UPDATE "swahivo_properties"
        SET
          "agent_name" = COALESCE(${data.name?.trim() || null}, "agent_name"),
          "agent_phone" = COALESCE(${data.phone?.trim() || null}, "agent_phone"),
          "agent_photo" = COALESCE(${data.photo?.trim() || null}, "agent_photo")
        WHERE "agent_id" = ${agentRows[0].id}
      `;
    }
  }

  return { user, agent };
}

// -----------------------------------------------------------------------------
// CONTACT FORM SUBMISSION TO HELLO@SWAHIVO.COM
// -----------------------------------------------------------------------------

export async function recordContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recipient_email?: string;
}): Promise<DbContactMessage> {
  const sql = await getSql();
  await ensureSwahivoSeed();
  const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const recipient = data.recipient_email || "hello@swahivo.com";

  const rows = await sql<DbContactMessage>`
    INSERT INTO "swahivo_contact_messages" (
      "id", "name", "email", "phone", "subject", "message", "recipient_email", "status"
    )
    VALUES (
      ${id}, ${data.name.trim()}, ${data.email.trim()}, ${data.phone?.trim() || null},
      ${data.subject.trim()}, ${data.message.trim()}, ${recipient}, 'NEW'
    )
    RETURNING *
  `;
  return rows[0];
}

export async function fetchContactMessagesAdmin(
  adminUser: { email: string; role: string } | null,
): Promise<DbContactMessage[]> {
  assertAdmin(adminUser);
  const sql = await getSql();
  await ensureSwahivoSeed();
  return sql<DbContactMessage>`
    SELECT * FROM "swahivo_contact_messages" ORDER BY "created_at" DESC
  `;
}
