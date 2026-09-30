import { createServerFn } from "@tanstack/react-start";
export type {
  DbProperty,
  DbAgent,
  DbPromotion,
  DbPayment,
  DbSubscriptionPlan,
  DbWallet,
  DbWalletTransaction,
  DbInquiry,
  DbLocation,
  DbContactMessage,
  DbUser,
  UserRole,
} from "./swahivo-db.server";
import type { UserRole } from "./swahivo-db.server";

export type SessionPayload = {
  id?: string;
  email?: string;
  name?: string;
  role?: UserRole;
  agentId?: string;
} | null;

// Resolve user and assigned role on the server
export const resolveUserSessionFn = createServerFn({ method: "POST" })
  .validator((data: { email?: string; name?: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser } = await import("./swahivo-db.server");
    return resolveUser(data);
  });

// Public properties listing query with active promotion ranking
export const getPublicListingsFn = createServerFn({ method: "GET" })
  .validator((data?: { deal?: string; type?: string; q?: string; price?: string; beds?: string }) => data)
  .handler(async ({ data }) => {
    const { fetchPublicProperties } = await import("./swahivo-db.server");
    return fetchPublicProperties(data);
  });

// Public single property details
export const getPropertyDetailsFn = createServerFn({ method: "GET" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const { fetchPropertyById } = await import("./swahivo-db.server");
    return fetchPropertyById(data.id);
  });

// Public submit inquiry
export const submitInquiryFn = createServerFn({ method: "POST" })
  .validator((data: { propertyId: string; senderName: string; senderEmail: string; senderPhone?: string; message: string }) => data)
  .handler(async ({ data }) => {
    const { submitPropertyInquiry } = await import("./swahivo-db.server");
    await submitPropertyInquiry(data);
    return { success: true };
  });

// -----------------------------------------------------------------------------
// ADMIN ACTIONS (Require Super Admin authorization on server)
// -----------------------------------------------------------------------------

export const getAdminOverviewFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchRevenueAnalyticsAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchRevenueAnalyticsAdmin(user!);
  });

export const getAdminPropertiesFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchAdminProperties } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchAdminProperties(user!);
  });

export const getAdminAgentsFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchAdminAgents } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchAdminAgents(user!);
  });

export const getAdminPromotionsFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchAllPromotionsAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchAllPromotionsAdmin(user!);
  });

export const getAdminPaymentsFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchAllPaymentsAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchAllPaymentsAdmin(user!);
  });

export const getAdminSubscriptionsFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const { resolveUser, fetchAllSubscriptionsAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(session);
    return fetchAllSubscriptionsAdmin(user!);
  });

export const getAdminPlansFn = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchSubscriptionPlans } = await import("./swahivo-db.server");
  return fetchSubscriptionPlans();
});

export const getAdminPromoPricingFn = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchPromotionPricing } = await import("./swahivo-db.server");
  return fetchPromotionPricing();
});

export const setListingApprovalFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; propertyId: string; status: "APPROVED" | "REJECTED" | "SUSPENDED" | "PENDING" }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, setListingApproval } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await setListingApproval(user!, data.propertyId, data.status);
    return { success: true };
  });

export const assignAgentRoleFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    name: string;
    email: string;
    phone: string;
    city: string;
    bio: string;
    languages: string[];
    subscription_plan?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, assignNewAgent } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    const agent = await assignNewAgent(user!, data);
    return { success: true, agent };
  });

export const revokeAgentRoleFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; agentId: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, revokeAgentRole } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await revokeAgentRole(user!, data.agentId);
    return { success: true };
  });

export const setAgentStatusFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    agentId: string;
    account_status?: "ACTIVE" | "SUSPENDED";
    verification_status?: "VERIFIED" | "PENDING" | "UNVERIFIED";
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updateAgentRoleOrStatus } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await updateAgentRoleOrStatus(user!, data.agentId, {
      account_status: data.account_status,
      verification_status: data.verification_status,
    });
    return { success: true };
  });

export const updatePricingPlanFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    planId: string;
    updates: {
      name?: string;
      price?: number;
      listing_limit?: number;
      boost_allowance?: number;
      description?: string;
      is_active?: boolean;
    };
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updateSubscriptionPlanAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await updateSubscriptionPlanAdmin(user!, data.planId, data.updates);
    return { success: true };
  });

export const updatePromotionPriceFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; id: string; price: number }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updatePromotionPriceAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await updatePromotionPriceAdmin(user!, data.id, data.price);
    return { success: true };
  });

export const updatePaymentStatusFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; paymentId: string; status: "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "CANCELLED" }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updatePaymentStatusAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await updatePaymentStatusAdmin(user!, data.paymentId, data.status);
    return { success: true };
  });

export const cancelPromotionAdminFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; promoId: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, cancelPromotionAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await cancelPromotionAdmin(user!, data.promoId);
    return { success: true };
  });

// -----------------------------------------------------------------------------
// AGENT ACTIONS (Ownership strictly derived & verified on server)
// -----------------------------------------------------------------------------

export const getAgentDashboardFn = createServerFn({ method: "POST" })
  .validator((session: SessionPayload) => session)
  .handler(async ({ data: session }) => {
    const {
      resolveUser,
      fetchAgentProperties,
      fetchAgentPromotions,
      fetchAgentWallet,
      fetchAgentInquiries,
      fetchSubscriptionPlans,
    } = await import("./swahivo-db.server");

    const user = await resolveUser(session);
    if (!user) throw new Error("Unauthorized");

    const [properties, promotions, walletData, inquiries, plans] = await Promise.all([
      fetchAgentProperties(user),
      fetchAgentPromotions(user),
      fetchAgentWallet(user),
      fetchAgentInquiries(user),
      fetchSubscriptionPlans(),
    ]);

    return {
      user,
      properties,
      promotions,
      wallet: walletData.wallet,
      transactions: walletData.transactions,
      inquiries,
      plans,
    };
  });

export const createListingFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    property: {
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
    };
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, createPropertyListing } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    return createPropertyListing(user, data.property);
  });

export const updateListingFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    propertyId: string;
    updates: Partial<{
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
    }>;
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updatePropertyListing } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    await updatePropertyListing(user, data.propertyId, data.updates);
    return { success: true };
  });

export const deleteListingFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; propertyId: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, deletePropertyListing } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    await deletePropertyListing(user, data.propertyId);
    return { success: true };
  });

export const promotePropertyFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    propertyId: string;
    promotionType: "FEATURED" | "BOOST";
    durationDays: number;
    paymentMethod: "wallet" | "m-pesa" | "airtel-money" | "tigo-pesa" | "card";
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, promotePropertyListing } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    return promotePropertyListing(user, {
      propertyId: data.propertyId,
      promotionType: data.promotionType,
      durationDays: data.durationDays,
      paymentMethod: data.paymentMethod,
    });
  });

export const topupWalletFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; amount: number; provider: string; reference?: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, topupAgentWallet } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    return topupAgentWallet(user, data.amount, data.provider, data.reference);
  });

export const upgradeSubscriptionFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; planId: string; paymentMethod: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, upgradeAgentSubscription } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    await upgradeAgentSubscription(user, data.planId, data.paymentMethod);
    return { success: true };
  });

export const updateInquiryStatusFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; inquiryId: string; status: "NEW" | "READ" | "CONTACTED" | "ARCHIVED" }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updateInquiryStatus } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    if (!user) throw new Error("Unauthorized");
    await updateInquiryStatus(user, data.inquiryId, data.status);
    return { success: true };
  });

// -----------------------------------------------------------------------------
// LOCATIONS SERVER FUNCTIONS
// -----------------------------------------------------------------------------

export const getLocationsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    const { fetchLocations } = await import("./swahivo-db.server");
    return fetchLocations();
  });

export const getLocationBySlugFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { fetchLocationBySlug } = await import("./swahivo-db.server");
    return fetchLocationBySlug(data.slug);
  });

export const addLocationAdminFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    location: {
      slug: string;
      name: string;
      count?: number;
      image: string;
      blurb: string;
      is_branch?: boolean;
      branch_status?: "main" | "coming_soon" | "active" | null;
    };
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, insertLocationAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    return insertLocationAdmin(user, data.location);
  });

export const updateLocationAdminFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    slug: string;
    location: Partial<{
      slug: string;
      name: string;
      count: number;
      image: string;
      blurb: string;
      is_branch: boolean;
      branch_status: "main" | "coming_soon" | "active" | null;
    }>;
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updateLocationAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    return updateLocationAdmin(user, data.slug, data.location);
  });

export const deleteLocationAdminFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload; slug: string }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, deleteLocationAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    await deleteLocationAdmin(user, data.slug);
    return { success: true };
  });

// -----------------------------------------------------------------------------
// PROFILE SETTINGS SERVER FUNCTIONS
// -----------------------------------------------------------------------------

export const getUserProfileFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, fetchUserProfile } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    return fetchUserProfile(user);
  });

export const updateUserProfileFn = createServerFn({ method: "POST" })
  .validator((data: {
    session: SessionPayload;
    profile: {
      name?: string;
      phone?: string;
      city?: string;
      bio?: string;
      photo?: string;
      agency?: string;
      whatsapp?: string;
      languages?: string[];
    };
  }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, updateUserProfile } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    return updateUserProfile(user, data.profile);
  });

// -----------------------------------------------------------------------------
// CONTACT FORM SUBMISSION TO HELLO@SWAHIVO.COM
// -----------------------------------------------------------------------------

export const submitContactMessageFn = createServerFn({ method: "POST" })
  .validator((data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    recipient_email?: string;
  }) => data)
  .handler(async ({ data }) => {
    const { recordContactMessage } = await import("./swahivo-db.server");
    return recordContactMessage(data);
  });

export const getContactMessagesAdminFn = createServerFn({ method: "POST" })
  .validator((data: { session: SessionPayload }) => data)
  .handler(async ({ data }) => {
    const { resolveUser, fetchContactMessagesAdmin } = await import("./swahivo-db.server");
    const user = await resolveUser(data.session);
    return fetchContactMessagesAdmin(user);
  });
