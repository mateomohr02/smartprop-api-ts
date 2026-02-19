import { Request, Response, NextFunction } from "express"
import { verifyAccessToken } from "@/utils/jwt"
import { User } from "@/db/models/User.model"
import { Tenant } from "@/db/models/Tenant.model"
import { AppError } from "@/utils/AppError"

import { toUserRequestDTO } from "@/modules/user/mappers/user.mapper"
import { toTenantRequestDTO } from "@/modules/tenant/mappers/tenant.mapper"

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", 401)
    }

    const token = authHeader.split(" ")[1]

    const payload = verifyAccessToken(token)

    // Buscar usuario real
    const user = await User.findByPk(payload.userId)

    if (!user) {
      throw new AppError("User not found", 404)
    }

    if (!user.isActive) {
      throw new AppError("User not active", 403)
    }

    // Buscar tenant real
    const tenant = await Tenant.findByPk(payload.tenantId)

    if (!tenant) {
      throw new AppError("Tenant not found", 404)
    }

    if (!tenant.isActive) {
      throw new AppError("Tenant not active", 403)
    }

    const userDTO = toUserRequestDTO(user)
    const tenantDTO = toTenantRequestDTO(tenant)


    // Adjuntar a request
    req.user = userDTO;

    req.tenant = tenantDTO;

    next()
  } catch (error) {
    next(error)
  }
}
