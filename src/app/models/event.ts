export interface Event {
    id: number;
    name: string;
    description?: string;
    directions?: string;
    phone?: string;
    photo?: string;
    geolocation?: string;
    youtube?: string;
    price: number;
    status: boolean;
    startDate: Date;
    endDate: Date;
    created_at: Date;
    updated_at: Date;
    street?: string;
    neighborhood?: string;
    number?: string;
    additionalAddress?: string;
    zipeCode?: string;
    cityId?: number;
    city?: City;
    eventType?: EventType;
    translations: Translation[];
  }
  
  export interface City {
    id: number;
    name: string;
  }
  
  export interface EventType {
    id: number;
    name: string;
  }
  
  export interface Translation {
    id: number;
    lang: string;
    name: string;
    description: string;
  }
  