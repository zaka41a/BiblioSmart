import { prisma } from '../prisma';
import { Plan, OrgStatus } from '@prisma/client';

export interface CreateOrganizationData {
  name: string;
  slug: string;
  plan?: Plan;
  trialDays?: number;
}

export interface UpdateOrganizationData {
  name?: string;
  slug?: string;
  plan?: Plan;
  status?: OrgStatus;
}

export class OrganizationService {
  /**
   * Create a new organization
   */
  async create(data: CreateOrganizationData) {
    // Check if slug is already taken
    const existing = await prisma.organization.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      throw new Error('Ce nom d\'organisation est déjà pris');
    }

    // Calculate trial end date
    const trialDays = data.trialDays || 14;
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
        plan: data.plan || Plan.TRIAL,
        status: OrgStatus.ACTIVE,
        trialEndsAt
      }
    });

    return organization;
  }

  /**
   * Get organization by ID
   */
  async getById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        books: {
          select: {
            id: true,
            title: true,
            author: true
          },
          take: 10
        },
        subscription: true
      }
    });

    if (!organization) {
      throw new Error('Organisation introuvable');
    }

    return organization;
  }

  /**
   * Get organization by slug
   */
  async getBySlug(slug: string) {
    const organization = await prisma.organization.findUnique({
      where: { slug },
      include: {
        subscription: true
      }
    });

    if (!organization) {
      throw new Error('Organisation introuvable');
    }

    return organization;
  }

  /**
   * Update organization
   */
  async update(id: string, data: UpdateOrganizationData) {
    // If updating slug, check uniqueness
    if (data.slug) {
      const existing = await prisma.organization.findFirst({
        where: {
          slug: data.slug,
          NOT: { id }
        }
      });

      if (existing) {
        throw new Error('Ce nom d\'organisation est déjà pris');
      }
    }

    const organization = await prisma.organization.update({
      where: { id },
      data
    });

    return organization;
  }

  /**
   * Delete organization (and all related data)
   */
  async delete(id: string) {
    await prisma.organization.delete({
      where: { id }
    });

    return { success: true };
  }

  /**
   * Get all organizations (admin only)
   */
  async getAll(filters?: { plan?: Plan; status?: OrgStatus }) {
    const where: any = {};

    if (filters?.plan) {
      where.plan = filters.plan;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    const organizations = await prisma.organization.findMany({
      where,
      include: {
        _count: {
          select: {
            users: true,
            books: true
          }
        },
        subscription: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return organizations;
  }

  /**
   * Get organization statistics
   */
  async getStats(organizationId: string) {
    const [userCount, bookCount, purchaseCount] = await Promise.all([
      prisma.user.count({
        where: { organizationId }
      }),
      prisma.book.count({
        where: { organizationId }
      }),
      prisma.purchase.count({
        where: {
          user: {
            organizationId
          }
        }
      })
    ]);

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        subscription: true
      }
    });

    if (!organization) {
      throw new Error('Organisation introuvable');
    }

    return {
      users: userCount,
      books: bookCount,
      purchases: purchaseCount,
      plan: organization.plan,
      status: organization.status,
      trialEndsAt: organization.trialEndsAt,
      subscription: organization.subscription
    };
  }

  /**
   * Check if organization has reached plan limits
   */
  async checkLimits(organizationId: string) {
    const org = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        _count: {
          select: {
            users: true,
            books: true
          }
        }
      }
    });

    if (!org) {
      throw new Error('Organisation introuvable');
    }

    // Define limits per plan
    const limits: Record<Plan, { users: number; books: number }> = {
      [Plan.TRIAL]: { users: 1, books: 100 },
      [Plan.BASIC]: { users: 3, books: 1000 },
      [Plan.PRO]: { users: 10, books: -1 }, // -1 = unlimited
      [Plan.ENTERPRISE]: { users: -1, books: -1 }
    };

    const planLimits = limits[org.plan];

    const hasReachedUserLimit = planLimits.users !== -1 && org._count.users >= planLimits.users;
    const hasReachedBookLimit = planLimits.books !== -1 && org._count.books >= planLimits.books;

    return {
      plan: org.plan,
      currentUsers: org._count.users,
      maxUsers: planLimits.users,
      hasReachedUserLimit,
      currentBooks: org._count.books,
      maxBooks: planLimits.books,
      hasReachedBookLimit,
      canAddUsers: !hasReachedUserLimit,
      canAddBooks: !hasReachedBookLimit
    };
  }

  /**
   * Add user to organization
   */
  async addUser(organizationId: string, userId: string) {
    // Check limits first
    const limits = await this.checkLimits(organizationId);

    if (!limits.canAddUsers) {
      throw new Error('Limite d\'utilisateurs atteinte pour votre plan');
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { organizationId }
    });

    return user;
  }

  /**
   * Remove user from organization
   */
  async removeUser(organizationId: string, userId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { organizationId: null }
    });

    return user;
  }
}

export const organizationService = new OrganizationService();
