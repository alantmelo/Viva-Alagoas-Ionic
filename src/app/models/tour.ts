export interface Tour {
    id: number;
    name: string;
    description?: string;
    duration: number;
    price: number;
    startDate: string;
    endDate?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    photos: Photo[];
    translations: Translation[];
    cityId?: number;
    city?: City;
    tourToTourPackages: TourToTourPackage[];
    tourToTourTypes: TourToTourType[];
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
  
  export interface City {
    id: number;
    name: string;
  }
  
  export interface TourToTourPackage {
    packageId: number;
    tourId: number;
  }
  
  export interface TourToTourType {
    typeId: number;
    tourId: number;
  }
  