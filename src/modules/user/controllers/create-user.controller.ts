import { Request, Response } from "express";
import { catchAsync } from "@/utils/catchAsync";
import { createUser } from "../services/create-user.service";
import { AppError } from "@/utils/AppError";
import { toUserResponseDTO } from "../mappers/user.mapper";
import { CreateUserSchemaType } from "../schemas/create-user.schema";

export const createUserController = catchAsync(async (req: Request<{}, {}, CreateUserSchemaType>, res: Response) => {

    if (!req.tenant) {
        throw new AppError("Tenant not found", 404)
    }

    const createdUser = await createUser(req.body, req.tenant)

    const response = toUserResponseDTO(createdUser);

    return res.status(201).json({
        status: "success",
        data: response
    });



})