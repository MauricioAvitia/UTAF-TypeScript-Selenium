import { Axios, AxiosResponse } from "axios";
import { ApiCaller } from "../callers/apiCaller";
import { PetModel } from "../models/petMode";
import { InventoryModel } from "../models/inventoryModel";
import { OrderModel } from "../models/orderModel";

export class StoreService extends ApiCaller {
    constructor(baseURL: string) {
        super(baseURL, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public async storeInventoryGet(): Promise<AxiosResponse<InventoryModel>> {
        return this.get("/store/inventory");
    }

    public async storeOrderPost(orderData: OrderModel): Promise<AxiosResponse<OrderModel>> {
        return this.post("/store/order", orderData);
    }

    public async storeOrderGet(orderId: number): Promise<AxiosResponse<OrderModel>> {
        return this.get(`/store/order/${orderId}`);
    }

    public async storeOrderDelete(orderId: number): Promise<AxiosResponse<void>> {
        return this.delete(`/store/order/${orderId}`);
    }
}