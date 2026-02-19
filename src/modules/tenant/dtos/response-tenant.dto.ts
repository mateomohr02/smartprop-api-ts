export interface ResponseTenantDTO {
    id: string
    name: string
    email: string
    phone?: string
    slug: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}