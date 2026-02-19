import { User } from '@/db/models/User.model';
import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction } from 'express'


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const userId = req.header('x-tenant-id');

        if (!userId) {
            throw new AppError('User Header Missing', 400)
        }

        const user = await User.findByPk(userId);

        if (!user) {
            throw new AppError('User Not Found', 404)
        }

        if (!user.isActive) {
            throw new AppError('User Not Active', 403)
        }

        req.user = user;
        
        next()

    } catch (error) {
        
        next(error)
    
    }

}