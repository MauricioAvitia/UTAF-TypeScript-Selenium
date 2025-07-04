export interface PetModel {
    id: number;
    category: category;
    name: string;
    photoUrls: string[];
    tags: tag[];
    status: status;
}

export enum status {
    available = 'available',
    pending = 'pending',
    sold = 'sold'
}

export interface tag {
    id: number;
    name: string;
}

export interface category {
    id: number;
    name: string;
}