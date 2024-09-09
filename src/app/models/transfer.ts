export interface Transfer {
    id: number;
    name: string;
    type: string; // Adjust the type according to your enum or type definition
    capacity?: number;
    description?: string;
    licensePlate?: string;
    driverName?: string;
    userId: number;
    phone?: string;
    photo?: string;
    created_at: string; // Adjust the type according to your API response
    updated_at: string; // Adjust the type according to your API response
    translations?: Translation[];
  }
  
  export interface Translation {
    language: string;
    name: string;
    description: string;
  }
  