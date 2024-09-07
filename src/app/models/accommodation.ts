export interface Accommodation {
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
    city?: City;
    cityId?: number;
    phone?: string;
    photo?: string;
    instagram?: string;
    openingHours?: string;
    photos: Photo[];
    website?: string;
    AccommodationTypeId?: number;
    accommodationType?: AccommodationType;
    translations: Translation[];
  }
  
  export interface City {
    id: number;
    name: string;
  }
  
  export interface Photo {
    id: number;
    url: string;
  }
  
  export interface AccommodationType {
    id: number;
    name: string;
  }
  
  export interface Translation {
    id: number;
    language: string;
    name: string;
    description: string;
  }
  