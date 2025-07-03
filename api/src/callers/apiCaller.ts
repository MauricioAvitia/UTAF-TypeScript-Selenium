import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiCaller {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, config?: AxiosRequestConfig) {
        this.axiosInstance = axios.create({
            baseURL,
            ...config,
        });
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }
}