import { UpdatePropertySchemaType } from "../schemas/update-property.schema";

export const simpleFieldsMapper = (
  updateData: any,
  fields: UpdatePropertySchemaType,
): any => {

  if (fields.title !== undefined) {
    updateData.title = fields.title;
  }

  if (fields.description !== undefined) {
    updateData.description = fields.description;
  }

  if (fields.condition !== undefined) {
    updateData.condition = fields.condition;
  }

  if (fields.age !== undefined) {
    updateData.age = fields.age;
  }

  if (fields.status !== undefined) {
    updateData.status = fields.status;
  }

  if (fields.isFeatured !== undefined) {
    updateData.isFeatured = fields.isFeatured;
  }

  return updateData;
};
