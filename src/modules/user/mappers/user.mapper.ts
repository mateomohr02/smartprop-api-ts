import { RequestUserDTO } from "../dtos/request-user.dto"
import { ResponseUserDTO } from "../dtos/response-user.dto"


export const toUserResponseDTO = ( user:any ) : ResponseUserDTO => {
    return {
        id: user.id.toString(),
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        tenantId: user.tenantId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

export const toUserRequestDTO = (user:any) : RequestUserDTO => {
    return {
        id: user.id.toString(),
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
    }
}