import bcrypt from "bcrypt";
import { User } from "@/db/models/User.model";
import { AppError } from "@/utils/AppError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { LoginUserSchemaType } from "../schema/user-login.schema";

export const loginUser = async (credentials: LoginUserSchemaType) => {
  const user = await User.findOne({ where: { email: credentials.email } });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(credentials.password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!user.isActive) {
    throw new AppError("User not active", 403);
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    tenantId: user.tenantId,
  });

  const refreshToken = generateRefreshToken({
    userId: user.id,
    tenantId: user.tenantId,
  });

  return {
    accessToken,
    refreshToken,
  };
};
