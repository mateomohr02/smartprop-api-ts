export interface ResponseUserDTO {
    id: string
    name: string
    lastName: string
    role: string
    email: string
    phone?: string
    isActive: boolean
    tenantId: string
    createdAt: Date
    updatedAt: Date
}