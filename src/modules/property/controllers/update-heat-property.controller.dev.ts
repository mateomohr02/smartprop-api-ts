import { catchAsync } from "@/utils/catchAsync";
import { updateHeat } from "../services/update-heat.service";
import { Request, Response } from "express";

export const updateHeatController = catchAsync (async (req: Request, res:Response) =>{
    
    await updateHeat();

    res.status(200).json({
        status:"success"
    })

})