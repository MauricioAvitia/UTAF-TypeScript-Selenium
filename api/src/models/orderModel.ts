export interface OrderModel {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    status: string;
    complete: boolean;
}