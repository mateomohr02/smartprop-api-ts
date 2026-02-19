import { Tenant } from '@/db/models/Tenant.model';
import { toTenantRequestDTO } from '@/modules/tenant/mappers/tenant.mapper';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express'


export const validateTenant = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const tenantId = req.header('x-tenant-id');

        if (!tenantId) {
            throw new AppError('Tenant Header Missing', 400)
        }

        const tenant = await Tenant.findByPk(tenantId);

        if (!tenant) {
            throw new AppError('Tenant Not Found', 404)
        }

        if (!tenant.isActive) {
            throw new AppError('Tenant Not Active', 403)
        }

        req.tenant = toTenantRequestDTO(tenant);
        
        next()

    } catch (error) {
        
        next(error)
    
    }

}