import { catchAsync } from "@/utils/catchAsync";
import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { postNeighborhood } from "../services/post-neighborhood.service";
import { FindOrCreateNeighborhoodSchemaType } from "../schemas/findOrCreate-neighborhood.schema";

export const postNeighborhoodController = catchAsync(
  async (req: Request< {}, {}, FindOrCreateNeighborhoodSchemaType>, res: Response) => {

    if (!req.tenant) {
        throw new AppError("Tenant not found", 409)
    }

    const createdNeighborhood = await postNeighborhood(req.body, req.tenant);

    res.status(200).json({
        status:"success",
        data:createdNeighborhood
    })

  },
);
