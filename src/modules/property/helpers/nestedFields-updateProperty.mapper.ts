import { UpdatePropertySchemaType } from "../schemas/update-property.schema";

export const nestedFieldsMapper = (
  updateData: any,
  fields: UpdatePropertySchemaType,
) => {

  if (fields.price) {
    if (fields.price.amount !== undefined) {
      updateData.priceAmount = fields.price.amount;
    }

    if (fields.price.currency !== undefined) {
      updateData.priceCurrency = fields.price.currency;
    }
  }

  if (fields.expenses) {
    if (fields.expenses.amount !== undefined) {
      updateData.expensesAmount = fields.expenses.amount;
    }

    if (fields.expenses.currency !== undefined) {
      updateData.expensesCurrency = fields.expenses.currency;
    }
  }

  if (fields.surface) {
        if (fields.surface.total !== undefined) {
            updateData.surface.total = fields.surface.total;
        }

        if (fields.surface.covered !== undefined) {
            updateData.surface.covered = fields.surface.covered;
        }
  }

  if (fields.services) {
        if (fields.services.light !== undefined) {
            updateData.services.light = fields.services.light;
        }

        if (fields.services.gas !== undefined) {
            updateData.services.gas = fields.services.gas;
        }   

        if (fields.services.water !== undefined) {
            updateData.services.water = fields.services.water;
        }
  }

  if (fields.availability) {
        if (fields.availability.type !== undefined) {
            updateData.availability.type = fields.availability.type;
        }

        if (fields.availability.date !== undefined) {
            updateData.availability.date = fields.availability.date;
        }
  }

  if (fields.roomsSummary) {
        if (fields.roomsSummary.bedrooms !== undefined) {
            updateData.rooms.bedrooms = fields.roomsSummary.bedrooms;
        }

        if (fields.roomsSummary.bathrooms !== undefined) {
            updateData.roomsSummary.bathrooms = fields.roomsSummary.bathrooms;
        }

        if (fields.roomsSummary.garages !== undefined) {
            updateData.roomsSummary.garages = fields.roomsSummary.garages;
        }
  }

  if (fields.multimedia) {
        if (fields.multimedia.images) {
            updateData.multimedia.images = fields.multimedia.images;
        }

        if (fields.multimedia.videos) {
            updateData.multimedia.videos = fields.multimedia.videos;
        }

        if (fields.multimedia.blueprints) {
            updateData.multimedia.blueprints = fields.multimedia.blueprints;
        }
  }

  if (fields.location) {
        if (fields.location.address) {
            if (fields.location.address.street !== undefined) {
                updateData.location.address.street = fields.location.address.street;
            }
            if (fields.location.address.number !== undefined) {
                updateData.location.address.number = fields.location.address.number;
            }
        }

        if (fields.location.coordinates) {
            if (fields.location.coordinates.lat !== undefined) {
                updateData.location.coordinates.lat = fields.location.coordinates.lat;
            }
            if (fields.location.coordinates.lng !== undefined) {
                updateData.location.coordinates.lng = fields.location.coordinates.lng;
            }
        }
  }

  return updateData;
};
