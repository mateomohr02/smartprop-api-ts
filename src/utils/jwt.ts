import jwt from "jsonwebtoken"
import { env } from "@/config/env"
import { JwtPayloadDTO } from "@/modules/auth/dtos/jwt-payload.dto"

export function generateAccessToken(payload: JwtPayloadDTO): string {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn,
  })
}

export function generateRefreshToken(payload: JwtPayloadDTO): string {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  })
}

export function verifyAccessToken(token: string): JwtPayloadDTO {
  return jwt.verify(token, env.jwt.accessSecret) as JwtPayloadDTO
}
