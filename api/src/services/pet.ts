import { Axios, AxiosResponse } from "axios";
import { ApiCaller } from "../callers/apiCaller";
import { PetModel } from "../models/petMode";

export class PetService extends ApiCaller {
    constructor(baseURL: string) {
        super(baseURL, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public async petPost(petData: PetModel): Promise<AxiosResponse<PetModel>> {
        return this.post("/pet", petData);
    }

    public async petPut(petData: PetModel): Promise<AxiosResponse<PetModel>> {
        return this.put("/pet", petData);
    }

    public async petGet(petId: number): Promise<AxiosResponse<PetModel>> {
        return this.get(`/pet/${petId}`);
    }

    public async petFindByStatus(status: string): Promise<AxiosResponse<PetModel[]>> {
        return this.get(`/pet/findByStatus?status=${status}`);
    }

    public async petDelete(petId: number, apiKey: string): Promise<AxiosResponse<void>> {
        return this.delete(`/pet/${petId}`, {
            headers: {
                "api_key": `Bearer xyz`,
            }
        });
    }
}