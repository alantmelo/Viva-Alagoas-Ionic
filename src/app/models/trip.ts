// import { Item } from "./item";
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
    status?: boolean;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    userId: number;
    cityId?: number;
    city?: City;
    item?: Item[];
    total?: number;
    tripUser: TripUser[];
  }
  export interface TripUser {
    id: number;
    user: User;
  }
  
  export interface TripResponse {
    items: Trip[];
    total: number;
  }
  export interface User {
    name: string;
  }
  
  export interface ItemUser {
    id: number;
    user: User;
  }
  
  export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    itemUser: ItemUser[];
    itemType: {
      id: number;
      name: string;
    };
    total: number;
  }