export interface Service {
    id: number;
    name: string;
    geolocation: string;
    youtube?: string;
    description?: string;
    directions?: string;
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
    serviceTypeId?: number;
    serviceType?: ServiceType;
    phone?: string;
    photo?: string;
    instagram?: string;
    openingHours?: string;
    website?: string;
    photos: Photo[];
    translations: Translation[];
  }
  
  export interface City {
    id: number;
    name: string;
  }
  
  export interface ServiceType {
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
  