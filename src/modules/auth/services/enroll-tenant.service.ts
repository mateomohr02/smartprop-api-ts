import { Tenant } from "@/db/models/Tenant.model";
import { slugify } from "@/shared/slugify";
import { AppError } from "@/utils/AppError";
import { EnrollTenantSchemaType } from "../schema/enroll-tenant.schema";
import { User } from "@/db/models/User.model";
import bcrypt from "bcrypt";
import { env } from "@/config/env";
import { toEnrolledTenantDTO } from "../mappers/toEnrolledTenantDTO";

export const enrollTenant = async (enrollData: EnrollTenantSchemaType) => {
  
  //-------------
  //CREATE TENANT
  //-------------
  
  const existingTenant = await Tenant.findOne({
    where: { email: enrollData.tenant.email },
  });

  if (existingTenant) {
    throw new AppError("Tenant already exists", 409);
  }

  const slug = slugify(enrollData.tenant.name);

  const createdTenant = await Tenant.create({
    ...enrollData.tenant,
    slug,
  });

  //-----------------
  //CREATE ADMIN USER
  //-----------------
    
    const salt = await bcrypt.genSalt(env.bcrypt.saltRounds);
  
    const hashedPassword = await bcrypt.hash(enrollData.user.password, salt);
  
    enrollData.user.password = hashedPassword;
  
    const createdUser = await User.create({
      ...enrollData.user,
      role: "admin",
      password: hashedPassword,
      tenantId: createdTenant.id
    });

    //-------------------------------
    //PROCEED TO SUBSCRIPTION PAYMENT
    //-------------------------------
    
    return toEnrolledTenantDTO(createdTenant, createdUser)

};
