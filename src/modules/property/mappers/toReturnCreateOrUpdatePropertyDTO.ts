import { Property } from "@/db/models/Property.model";

export const toCreateOrUpdatePropertyDTO = (property: Property) => {
    return { 
        id: property.id,
        title: property.title,
        description: property.description,
        propertyType: property.propertyTypeId,
        slug: property.slug,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        status: property.status,
        price:{
            amount: property.priceAmount,
            currency: property.priceCurrency
        },
        expenses:{
            amount: property.expensesAmount,
            currency: property.expensesCurrency
        },
        multimedia: property.multimedia,
        roomsAmount: property.roomsAmount,
        roomsSummary: property.roomsSummary,
        surface: property.surface,
        services: property.services,
        condition: property.condition,
        age: property.age,
        availability: property.availability,
        location: property.location,
        countryId: property.countryId,
        provinceId: property.provinceId,
        cityId: property.cityId,
        neighborhoodId: property.neighborhoodId,
        
    };
}