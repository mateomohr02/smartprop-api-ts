import { Currency, PropertyStatus } from "@/db/models/Property.model"

export interface ReturnCreatedOrUpdatedPropertyDTO {
    id?: string,
    title?: string,
    description?: string,
    propertyType?: string,
    slug?: string
    createdAt?: Date,
    updatedAt?: Date
    status?: PropertyStatus
    price?: {
        amount?: number,
        currency?: Currency
    }
    expenses?: {
        amount?: number,
        currency?: Currency
    }
    multimedia?: {
        images?: string[],
        videos?: string[]
        blueprints?: string[]
    }
    roomsAmount?: number
    rooms?: {
        bedrooms?: number,
        bathrooms?: number,
        garages?: number
    }
    surface?: {
        total?: number,
        covered?: number
    }
    services?: {
        light?: boolean,
        gas?: boolean,
        water?: boolean
    }
    condition?: string
    age?: number
    availability?: {
        type?: string,
        date?: Date
    }
    location?: {
        address?: {
            street: string,
            number?: number
        },
        coordinates?: {
            lat: number,
            lng: number
        }
    },
    countryId: string,
    provinceId: string,
    cityId: string,
    neighborhoodId: string,
}