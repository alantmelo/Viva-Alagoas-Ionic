export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    birthAt?: Date;
    role: string;
    created_at: Date;
    updated_at: Date;
  }
  