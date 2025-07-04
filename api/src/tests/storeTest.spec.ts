import { Authenticator } from '../callers/authenticator';
import { PetService } from '../services/pet';
import dotenv from 'dotenv';
import { PetModel, status, category, tag } from '../models/petMode';
import { assert } from 'chai';
import { StoreService } from '../services/store';
import { OrderModel } from '../models/orderModel';

describe('Store', async function () {
    dotenv.config();

    let authenticator: Authenticator;
    let petService: PetService;
    let storeService: StoreService;

    authenticator = new Authenticator();
    petService = new PetService(process.env.API_BASE_URL!);

    beforeEach(async () => {
        await authenticator.getToken();
    });

    it('API Test 1.2.1 - store get inventory', async function () {
        storeService = new StoreService(process.env.API_BASE_URL!);
        const response = await storeService.storeInventoryGet();

        assert.isTrue(response.status === 200, 'Response status should be 200');
        assert.isObject(response.data, 'Response data should be an object');
    });

    it('API Test 1.2.2 - store place an order', async function () {
        const orderData: OrderModel = {
            id: 12345,
            petId: 12345,
            quantity: 1,
            shipDate: new Date().toISOString(),
            status: 'placed',
            complete: true
        };

        storeService = new StoreService(process.env.API_BASE_URL!);
        const response = await storeService.storeOrderPost(orderData);

        assert.isTrue(response.status === 200, 'Response status should be 200');
        assert.isObject(response.data, 'Response data should be an object');
    });

    it('API Test 1.2.3 - store get order by ID', async function () {
        const orderId = 12345; // Use the same ID as in the previous test
        storeService = new StoreService(process.env.API_BASE_URL!);
        const response = await storeService.storeOrderGet(orderId);

        assert.isTrue(response.status === 200, 'Response status should be 200');
        assert.isObject(response.data, 'Response data should be an object');
        assert.equal(response.data.id, orderId, 'Order ID should match');
    }); 

    it('API Test 1.2.4 - store delete order by ID', async function () {
        const orderId = 12345; // Use the same ID as in the previous tests
        storeService = new StoreService(process.env.API_BASE_URL!);
        const response = await storeService.storeOrderDelete(orderId);

        assert.isTrue(response.status === 200, 'Response status should be 200');
    }); 
});