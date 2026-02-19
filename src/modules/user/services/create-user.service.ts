import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { AppError } from "@/utils/AppError";
import { User } from "@/db/models/User.model";
import bcrypt from "bcrypt";
import { CreateUserSchemaType } from "../schemas/create-user.schema";
import { env } from "@/config/env";


export const createUser = async (
  newUserData: CreateUserSchemaType,
  tenant: RequestTenantDTO
) => {

  const existingUser = await User.findOne({
    where: {
      email: newUserData.email,
      tenantId: tenant.id
    }
  });

  if (existingUser) {
    throw new AppError("User already exists in this tenant", 409);
  }

  if (newUserData.role === "admin") {
    const usersCount = await User.count({
      where: { tenantId: tenant.id }
    });

    if (usersCount > 0) {
      throw new AppError("Admin must be the first user of the tenant", 409);
    }
  }
  
  const salt = await bcrypt.genSalt(env.bcrypt.saltRounds);

  const hashedPassword = await bcrypt.hash(newUserData.password, salt);

  newUserData.password = hashedPassword;

  const createdUser = await User.create({
    ...newUserData,
    tenantId: tenant.id
  });

  return createdUser;
}
