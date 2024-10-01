export interface TouristAttraction {
    id?: number;
    name: string;
    description: string;
    street: string;
    neighborhood: string;
    number: string;
    additionalAddress?: string;
    zipeCode: string;
    phone?: string;
    photo?: string;
    website?: string;
    instagram?: string;
    geolocation: string;
    cityId: number;
    translations: Translation[];
  }
  
  export interface Translation {
    lang: string;
    name: string;
    description: string;
  }
  