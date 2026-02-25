import { sequelize } from "@/db/sequelize";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { FindOrCreateComoditySchemaType } from "../schemas/findOrCreateComodity.schema";
import { Comodity } from "@/db/models/Comodity.model";
import { slugify } from "@/shared/slugify";
import { nameFormatter } from "@/shared/nameFormatter";
import { AppError } from "@/utils/AppError";
import { Property } from "@/db/models/Property.model";

export const findOrCreateComodity = async (
  { comodities, propertyId }: FindOrCreateComoditySchemaType,
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
    // FIND OR CREATE COMODITIES
    //--------------------------------

    const comodityInstances = await Promise.all(
      comodities.map(async (comodity) => {
        if (comodity.exists && comodity.id) {
          const existing = await Comodity.findOne({
            where: {
              id: comodity.id,
              tenantId: tenant.id,
            },
            transaction,
          });

          if (!existing) {
            throw new AppError("Comodity not found", 404);
          }

          return existing;
        }

        if (!comodity.exists && comodity.name) {
          const formattedName = nameFormatter(comodity.name);
          const slug = slugify(formattedName);

          const [created] = await Comodity.findOrCreate({
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

    // Mejor que addComodities
    await property.setComodities(comodityInstances, {
      through: {
        tenantId: tenant.id,
      },
      transaction,
    });

    //--------------------------------
    // DEVOLVER COMODITIES ACTUALIZADAS
    //--------------------------------

    const updatedProperty = await Property.findOne({
      where: {
        id: propertyId,
        tenantId: tenant.id, // 🔥 SIEMPRE filtrar por tenant
      },
      include: [
        {
          model: Comodity,
          as: "comodities", // 🔥 IMPORTANTE (alias obligatorio)
          through: { attributes: [] },
        },
      ],
      transaction,
    });

    return updatedProperty?.comodities ?? [];
  });
};
