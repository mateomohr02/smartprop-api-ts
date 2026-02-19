import { Tenant } from "@/db/models/Tenant.model";
import { RequestTenantDTO } from "../dtos/request-tenant.dto";
import { ResponseTenantDTO } from "../dtos/response-tenant.dto";

export const toTenantResponseDTO = (tenant: Tenant): ResponseTenantDTO => {
  return {
    id: tenant.id.toString(),
    name: tenant.name,
    email: tenant.email,
    phone: tenant.phone,
    isActive: tenant.isActive,
    slug: tenant.slug,
    createdAt: tenant.createdAt,
    updatedAt: tenant.updatedAt,
  };
};

export const toTenantRequestDTO = (tenant: Tenant): RequestTenantDTO => {
  return {
    id: tenant.id.toString(),
    name: tenant.name,
    slug: tenant.slug,
    email: tenant.email,
    phone: tenant.phone,
    createdAt: tenant.createdAt,
    updatedAt: tenant.updatedAt,
    isActive: tenant.isActive,
  };
};

