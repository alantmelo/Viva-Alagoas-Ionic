export interface Beach {
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
    photos: Photo[];
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
  
  export interface Translation {
    id: number;
    language: string;
    name: string;
    description: string;
  }
  