import { Property } from "@/db/models/Property.model";

export const updateHeat = async () => {
  const properties = await Property.findAll({
    where: { status: "active" },
  });

  await Promise.all(
    properties.map(async (property) => {

      let score = 0;

      score = score + property.metrics.views;
      score = score + property.metrics.interactions * 3;
      score = score + property.metrics.shared * 5;

      const daysSinceCreated =
        (Date.now() - property.createdAt.getTime()) / 86400000;

        console.log(daysSinceCreated, 'daysSinceCreated');
        

      let recencyFactor = 1;

      if (daysSinceCreated < 8) recencyFactor = 1.3;
      else if (daysSinceCreated < 16) recencyFactor = 1.1;
      else if (daysSinceCreated > 30) recencyFactor = 0.8;

      score = score * recencyFactor;

      property.heat = score;

      console.log(property.heat, 'anterior', score, 'nuevo' );

      await property.save();
    }),
  );
};
