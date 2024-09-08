export interface Store {
    id: number;
    name: string;
    description?: string;
    directions?: string;
    geolocation?: string;
    youtube?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    street?: string;
    neighborhood?: string;
    number?: string;
    additionalAddress?: string;
    zipeCode?: string;
    city?: City;
    storeType?: StoreType;
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
  
  export interface StoreType {
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
    description?: string;
  }