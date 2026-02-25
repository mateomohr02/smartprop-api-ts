import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { RelateRoomsSchema, RelateRoomsSchemaType } from "../schemas/relateRooms.schema";
import { AppError } from "@/utils/AppError";
import { relateRooms } from "../services/relateRooms";

export const relateRoomsController = catchAsync(async (req: Request<{},{}, RelateRoomsSchemaType>, res: Response) => {

    if (!req.tenant || !req.user) {
        throw new AppError("Unauthorized access",401)
    }

    const rooms = await relateRooms(req.body, req.tenant, req.user);

  // Controller logic would go here
  res.status(200).json({ 
    status: "success",
    data: rooms
  });
});