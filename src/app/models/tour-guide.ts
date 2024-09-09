export interface TourGuide {
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    bio?: string;
    phone?: string;
    photo?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    translations?: Translation[];
  }
  
  export interface Translation {
    language: string;
    name: string;
    description: string;
  }
  