export interface Restaurant {
    id: number;
    name: string;
    description?: string;
    directions?: string;
    geolocation?: string;
    youtube?: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    street?: string;
    neighborhood?: string;
    number?: string;
    additionalAddress?: string;
    zipeCode?: string;
    cityId?: number;
    city?: City;
    phone?: string;
    photo?: string;
    instagram?: string;
    openingHours?: string;
    website?: string;
    photos: Photo[];
    translations: Translation[];
    restaurantTypes: RestaurantType[];
    restaurantToServiceType: ServiceType[];
  }
  
  export interface City {
    id: number;
    name: string;
  }
  
  export interface Photo {
    id: number;
    url: string;
  }
  
  export interface Translation {
    id: number;
    language: string;
    name: string;
    description: string;
  }
  
  export interface RestaurantType {
    id: number;
    name: string;
  }
  
  export interface ServiceType {
    id: number;
    name: string;
  }
  