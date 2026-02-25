import { sequelize } from "@/db/sequelize";
import { RequestTenantDTO } from "@/modules/tenant/dtos/request-tenant.dto";
import { RelateRoomsSchemaType } from "../schemas/relateRooms.schema";
import { RequestUserDTO } from "@/modules/user/dtos/request-user.dto";
import { Room } from "@/db/models/Room.model";
import { Property_Room } from "@/db/models/Property_Room.model";
import { slugify } from "@/shared/slugify";
import { nameFormatter } from "@/shared/nameFormatter";
import { AppError } from "@/utils/AppError";
import { Property } from "@/db/models/Property.model";

export const relateRooms = async (
  { rooms, propertyId }: RelateRoomsSchemaType,
  tenant: RequestTenantDTO,
  user: RequestUserDTO,
) => {
  return await sequelize.transaction(async (transaction) => {

    //--------------------------------
    // VALIDAR PROPIEDAD
    //--------------------------------

    console.log(rooms, 'rooms');
    console.log(propertyId, 'propId');
    
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
    // FIND OR CREATE ROOMS
    //--------------------------------

    const roomInstances = await Promise.all(
      rooms.map(async (room) => {

        if (room.exists && room.id) {
          const existing = await Room.findOne({
            where: {
              id: room.id,
              tenantId: tenant.id,
            },
            transaction,
          });

          if (!existing) {
            throw new AppError("Room not found", 404);
          }

          return {
            instance: existing,
            detail: room.detail,
          };
        }

        if (!room.exists && room.name) {
          const formattedName = nameFormatter(room.name);
          const slug = slugify(formattedName);

          const [created] = await Room.findOrCreate({
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

          return {
            instance: created,
            detail: room.detail,
          };
        }

        throw new AppError("Invalid room data", 400);
      }),
    );

    //--------------------------------
    // SINCRONIZAR RELACIONES
    //--------------------------------

    // Eliminamos relaciones anteriores
    await Property_Room.destroy({
      where: {
        propertyId: property.id,
        tenantId: tenant.id,
      },
      transaction,
    });

    // Creamos nuevas relaciones con detail personalizado
    await Promise.all(
      roomInstances.map(({ instance, detail }) =>
        Property_Room.create(
          {
            propertyId: property.id,
            roomId: instance.id,
            tenantId: tenant.id,
            detail,
          },
          { transaction },
        ),
      ),
    );

    //--------------------------------
    // DEVOLVER ROOMS ACTUALIZADOS
    //--------------------------------

    const updatedProperty = await Property.findOne({
      where: {
        id: propertyId,
        tenantId: tenant.id,
      },
      include: [
        {
          model: Room,
          as: "rooms", 
          through: {
            attributes: ["detail"],
          },
        },
      ],
      transaction,
    });

    return updatedProperty?.rooms ?? [];
  });
};