import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";

declare global {
    namespace Express {
    interface Request {
      tenant?: RequestTenantDTO;
      user?: RequestUserDTO;
    }
  }
}

export {}