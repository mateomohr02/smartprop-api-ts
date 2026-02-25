import { sequelize } from "@/db/sequelize";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { FindOrCreateCharacteristicSchemaType } from "../schemas/findOrCreateCharacteristic.schema";
import { slugify } from "@/shared/slugify";
import { nameFormatter } from "@/shared/nameFormatter";
import { AppError } from "@/utils/AppError";
import { Property } from "@/db/models/Property.model";
import { Characteristic } from "@/db/models/Characteristic.model";

export const findOrCreateCharacteristic = async (
  { characteristics, propertyId }: FindOrCreateCharacteristicSchemaType,
  tenant: RequestTenantDTO,
  user: RequestUserDTO,
) => {
  return await sequelize.transaction(async (transaction) => {
    //--------------------------------
    // VALIDAR PROPIEDAD
    //--------------------------------

    const property = await Property.findOne({
      where: {
        id: propertyId,
        tenantId: tenant.id,
      },
      transaction,
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    //--------------------------------
    // FIND OR CREATE CHARACTERISTICS
    //--------------------------------

    const characteristicInstances = await Promise.all(
      characteristics.map(async (char) => {
        if (char.exists && char.id) {
          const existing = await Characteristic.findOne({
            where: {
              id: char.id,
              tenantId: tenant.id,
            },
            transaction,
          });

          if (!existing) {
            throw new AppError("Comodity not found", 404);
          }

          return existing;
        }

        if (!char.exists && char.name) {
          const formattedName = nameFormatter(char.name);
          const slug = slugify(formattedName);

          const [created] = await Characteristic.findOrCreate({
            where: {
              tenantId: tenant.id,
              slug,
            },
            defaults: {
              name: formattedName,
              slug,
              tenantId: tenant.id,
            },
            transaction,
          });

          return created;
        }

        throw new AppError("Invalid Comodity data", 400);
      }),
    );

    //--------------------------------
    // RELACIONAR (IDEMPOTENTE)
    //--------------------------------

    // Mejor que addCharacteristics
    await property.setCharacteristics(characteristicInstances, {
      through: {
        tenantId: tenant.id,
      },
      transaction,
    });

    //--------------------------------
    // DEVOLVER CHARACTERISTICS ACTUALIZADAS
    //--------------------------------

    const updatedProperty = await Property.findOne({
      where: {
        id: propertyId,
        tenantId: tenant.id,
      },
      include: [
        {
          model: Characteristic,
          as: "characteristics",
          through: { attributes: [] },
        },
      ],
      transaction,
    });

    return updatedProperty?.characteristics ?? [];
  });
};
