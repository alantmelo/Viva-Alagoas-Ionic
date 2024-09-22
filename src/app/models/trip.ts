export interface City {
    id: number;
    name: string;
    description: string;
    geolocation: string;
    youtube: string;
    state: string;
    photo: string | null;
    status: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Trip {
    id: number;
    name: string;
    password: string;
    tripCode: string;
    status: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    cityId: number;
    city: City;
  }
  
  export interface TripResponse {
    items: Trip[];
    total: number;
  }
  