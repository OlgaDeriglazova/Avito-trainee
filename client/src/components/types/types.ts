export interface Item {
    name: string;
    description: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
    image?: string;
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
  }
