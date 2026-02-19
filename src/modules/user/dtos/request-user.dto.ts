import { UserRole } from "@/db/models/User.model"

export interface RequestUserDTO {
    id: string
    name: string
    lastName: string
    role: UserRole
    email: string
    phone?: string
    isActive: boolean
}