import { Response, Request } from "express" 
import { catchAsync } from "@/utils/catchAsync";
import { loginUser } from "../services/login-user.service";
import { LoginUserSchemaType } from "../schema/user-login.schema";

export const loginUserController = catchAsync(async (req : Request<{}, {}, LoginUserSchemaType>, res: Response) => {

    const { accessToken, refreshToken } = await loginUser(req.body);

    res.status(200).json(
    { 
        status:"success",
        accessToken,
        refreshToken 
    }
);
});
