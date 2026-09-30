-- Swahivo Marketplace: Properties, Agents, Subscriptions, Promotions, Wallets, and Payments

CREATE TABLE IF NOT EXISTS "swahivo_users" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "role" TEXT NOT NULL DEFAULT 'user', -- 'admin' | 'agent' | 'user'
  "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE' | 'SUSPENDED'
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_agents" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'Certified Agent',
  "city" TEXT NOT NULL,
  "photo" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "languages" JSONB NOT NULL DEFAULT '["English", "Swahili"]',
  "verification_status" TEXT NOT NULL DEFAULT 'VERIFIED', -- 'VERIFIED' | 'PENDING' | 'UNVERIFIED'
  "account_status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE' | 'SUSPENDED'
  "subscription_plan" TEXT NOT NULL DEFAULT 'free', -- 'free' | 'starter' | 'professional' | 'agency'
  "subscription_expires_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_properties" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "price" NUMERIC NOT NULL,
  "listing_type" TEXT NOT NULL, -- 'sale' | 'rent'
  "property_type" TEXT NOT NULL, -- 'apartment' | 'house' | 'villa' | 'plot' | 'commercial' | 'condo'
  "beds" INTEGER,
  "baths" INTEGER,
  "area" NUMERIC NOT NULL,
  "image" TEXT NOT NULL,
  "gallery" JSONB NOT NULL DEFAULT '[]',
  "agent_id" TEXT NOT NULL,
  "user_id" TEXT,
  "description" TEXT NOT NULL,
  "amenities" JSONB NOT NULL DEFAULT '[]',
  "year_built" INTEGER,
  "status" TEXT NOT NULL DEFAULT 'APPROVED', -- 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  "views_count" INTEGER NOT NULL DEFAULT 0,
  "inquiries_count" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_subscription_plans" (
  "id" TEXT PRIMARY KEY, -- 'free', 'starter', 'professional', 'agency'
  "name" TEXT NOT NULL,
  "price" NUMERIC NOT NULL,
  "billing_period" TEXT NOT NULL DEFAULT 'month',
  "listing_limit" INTEGER NOT NULL,
  "boost_allowance" INTEGER NOT NULL DEFAULT 0,
  "description" TEXT NOT NULL,
  "features" JSONB NOT NULL DEFAULT '[]',
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_subscriptions" (
  "id" TEXT PRIMARY KEY,
  "agent_id" TEXT NOT NULL REFERENCES "swahivo_agents"("id") ON DELETE CASCADE,
  "plan_id" TEXT NOT NULL REFERENCES "swahivo_subscription_plans"("id"),
  "amount" NUMERIC NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  "start_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "expires_at" TIMESTAMPTZ NOT NULL,
  "payment_id" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_promotion_pricing" (
  "id" TEXT PRIMARY KEY,
  "promotion_type" TEXT NOT NULL, -- 'FEATURED' | 'BOOST'
  "duration_days" INTEGER NOT NULL,
  "price" NUMERIC NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_promotions" (
  "id" TEXT PRIMARY KEY,
  "property_id" TEXT NOT NULL REFERENCES "swahivo_properties"("id") ON DELETE CASCADE,
  "agent_id" TEXT NOT NULL REFERENCES "swahivo_agents"("id") ON DELETE CASCADE,
  "promotion_type" TEXT NOT NULL, -- 'FEATURED' | 'BOOST'
  "duration_days" INTEGER NOT NULL,
  "amount" NUMERIC NOT NULL,
  "start_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "expires_at" TIMESTAMPTZ NOT NULL,
  "payment_id" TEXT,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE', -- 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED'
  "views_before" INTEGER NOT NULL DEFAULT 0,
  "views_during" INTEGER NOT NULL DEFAULT 0,
  "inquiries_count" INTEGER NOT NULL DEFAULT 0,
  "favorites_count" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_wallets" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL UNIQUE,
  "agent_id" TEXT,
  "balance" NUMERIC NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'TZS',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_wallet_transactions" (
  "id" TEXT PRIMARY KEY,
  "wallet_id" TEXT NOT NULL REFERENCES "swahivo_wallets"("id") ON DELETE CASCADE,
  "user_id" TEXT NOT NULL,
  "type" TEXT NOT NULL, -- 'CREDIT' | 'DEBIT' | 'REFUND'
  "amount" NUMERIC NOT NULL,
  "balance_before" NUMERIC NOT NULL,
  "balance_after" NUMERIC NOT NULL,
  "reference" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'COMPLETED', -- 'PENDING' | 'COMPLETED' | 'FAILED'
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_payments" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "agent_id" TEXT,
  "amount" NUMERIC NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'TZS',
  "product_type" TEXT NOT NULL, -- 'FEATURED_PROPERTY' | 'LISTING_BOOST' | 'SUBSCRIPTION' | 'WALLET_TOPUP' | 'VERIFICATION' | 'ADVERTISEMENT' | 'OTHER'
  "product_id" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED'
  "provider" TEXT NOT NULL DEFAULT 'swahivo_wallet',
  "provider_reference" TEXT,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_inquiries" (
  "id" TEXT PRIMARY KEY,
  "property_id" TEXT NOT NULL REFERENCES "swahivo_properties"("id") ON DELETE CASCADE,
  "agent_id" TEXT NOT NULL REFERENCES "swahivo_agents"("id") ON DELETE CASCADE,
  "sender_name" TEXT NOT NULL,
  "sender_email" TEXT NOT NULL,
  "sender_phone" TEXT,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW', -- 'NEW' | 'READ' | 'CONTACTED' | 'ARCHIVED'
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_settings" (
  "key" TEXT PRIMARY KEY,
  "value" JSONB NOT NULL,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "swahivo_locations" (
  "slug" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 0,
  "image" TEXT NOT NULL,
  "blurb" TEXT NOT NULL,
  "is_branch" BOOLEAN NOT NULL DEFAULT false,
  "branch_status" TEXT, -- 'main' | 'coming_soon' | 'active' | null
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
);

-- Seed initial locations
INSERT INTO "swahivo_locations" ("slug", "name", "count", "image", "blurb", "is_branch", "branch_status")
VALUES
  ('zanzibar', 'Zanzibar', 1120, '/images/locations/zanzibar.jpg', 'Stone Town heritage homes, beachfront villas, and investment condos along the Indian Ocean.', true, 'main'),
  ('dar-es-salaam', 'Dar es Salaam', 2340, '/images/locations/dar-es-salaam.jpg', 'Tanzania’s commercial capital — Masaki apartments, Mbezi family homes, and Kigamboni waterfront.', true, 'coming_soon'),
  ('arusha', 'Arusha', 680, '/images/locations/arusha.jpg', 'Gateway to the northern circuit. Cool-climate houses, safari lodges, and hillside plots.', true, 'coming_soon'),
  ('mwanza', 'Mwanza', 530, '/images/locations/mwanza.jpg', 'Lake Victoria living with growing residential estates and lakeside commercial space.', false, null),
  ('dodoma', 'Dodoma', 410, '/images/locations/dodoma.jpg', 'The capital’s new government quarter is driving demand for houses, plots, and offices.', false, null),
  ('tanga', 'Tanga', 350, '/images/locations/tanga.jpg', 'Quiet coastal city with beach plots, colonial bungalows, and emerging holiday rentals.', false, null)
ON CONFLICT ("slug") DO UPDATE SET
  "is_branch" = EXCLUDED."is_branch",
  "branch_status" = EXCLUDED."branch_status";

-- Indices for performance
CREATE INDEX IF NOT EXISTS "idx_properties_status" ON "swahivo_properties"("status");
CREATE INDEX IF NOT EXISTS "idx_properties_agent" ON "swahivo_properties"("agent_id");
CREATE INDEX IF NOT EXISTS "idx_properties_city" ON "swahivo_properties"("city");
CREATE INDEX IF NOT EXISTS "idx_promotions_prop" ON "swahivo_promotions"("property_id");
CREATE INDEX IF NOT EXISTS "idx_promotions_status" ON "swahivo_promotions"("status", "expires_at");
CREATE INDEX IF NOT EXISTS "idx_payments_user" ON "swahivo_payments"("user_id");
CREATE INDEX IF NOT EXISTS "idx_payments_agent" ON "swahivo_payments"("agent_id");
CREATE INDEX IF NOT EXISTS "idx_inquiries_agent" ON "swahivo_inquiries"("agent_id");

-- Seed initial subscription plans
INSERT INTO "swahivo_subscription_plans" ("id", "name", "price", "billing_period", "listing_limit", "boost_allowance", "description", "features", "sort_order")
VALUES
  ('free', 'Free', 0, 'month', 1, 0, 'Essential presence for occasional landlords', '["1 active listing", "Basic profile", "Direct inquiries", "Standard search placement"]', 1),
  ('starter', 'Starter', 25000, 'month', 10, 3, 'Perfect for emerging agents and small portfolios', '["10 active listings", "Listing analytics", "3 promotional boosts/month", "Verified profile badge", "Direct WhatsApp link"]', 2),
  ('professional', 'Professional', 50000, 'month', 30, 10, 'For established high-volume real estate agents', '["30 active listings", "Advanced lead & view analytics", "10 promotional boosts/month", "Priority search placement", "Verified agent accreditation"]', 3),
  ('agency', 'Agency', 100000, 'month', 100, 30, 'Enterprise suite for real estate agencies and firms', '["Up to 100 active listings", "Team management & sub-agents", "30 promotional boosts/month", "Dedicated agency profile", "Highest search priority & branding"]', 4)
ON CONFLICT ("id") DO NOTHING;

-- Seed initial promotion pricing
INSERT INTO "swahivo_promotion_pricing" ("id", "promotion_type", "duration_days", "price")
VALUES
  ('featured_7', 'FEATURED', 7, 10000),
  ('featured_14', 'FEATURED', 14, 18000),
  ('featured_30', 'FEATURED', 30, 30000),
  ('boost_7', 'BOOST', 7, 5000),
  ('boost_14', 'BOOST', 14, 9000),
  ('boost_30', 'BOOST', 30, 15000)
ON CONFLICT ("id") DO NOTHING;

-- Seed default super admin user
INSERT INTO "swahivo_users" ("id", "name", "email", "role", "status")
VALUES ('admin-nithonia', 'Super Administrator', 'nithonia67@gmail.com', 'admin', 'ACTIVE')
ON CONFLICT ("email") DO UPDATE SET "role" = 'admin';

-- Seed default wallet for super admin
INSERT INTO "swahivo_wallets" ("id", "user_id", "balance", "currency")
VALUES ('wallet-admin', 'admin-nithonia', 500000, 'TZS')
ON CONFLICT ("user_id") DO NOTHING;
