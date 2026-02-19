export interface RequestTenantDTO {
    id: string
    name: string
    slug: string
    email: string
    phone?: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}