import { expect } from 'chai';
import { Authenticator } from '../callers/authenticator';
import { PetService } from '../services/pet';
import dotenv from 'dotenv';
import { PetModel, status, category, tag } from '../models/petMode';
import { assert } from 'chai';

describe('Pet', async function () {
    dotenv.config();

    let authenticator: Authenticator;
    let petService: PetService;

    authenticator = new Authenticator();
    petService = new PetService(process.env.API_BASE_URL!);

    beforeEach(async () => {
        await authenticator.getToken();
    });

    // Test case for adding a new pet
    it('API Test 1.1.1 - pet add a new pet', async function () {
        // Create a new pet object to be added
        const petData: PetModel = {
            id: 12345,
            category: {
                id: 1,
                name: 'Dog'
            },
            name: 'Buddy',
            photoUrls: ['http://example.com/photo1.jpg'],
            tags: [
                { id: 1, name: 'friendly' },
                { id: 2, name: 'playful' }
            ],
            status: status.available
        };

        // Call the petPost method to add the new pet
        const response = await petService.petPost(petData);

        // Assert that the response status is 200
        assert.isTrue(response.status === 200, 'Response status should be 200');
    });

    // Test cases for updating, retrieving, finding by status, and deleting a pet
    it('API Test 1.1.2 - pet update an existing pet', async function () {
        const petData: PetModel = {
            id: 12345,
            category: {
                id: 1,
                name: 'Dog'
            },
            name: 'Buddy',
            photoUrls: ['http://example.com/photo1.jpg'],
            tags: [
                { id: 1, name: 'friendly' },
                { id: 2, name: 'playful' }
            ],
            status: status.available
        };

        const response = await petService.petPut(petData);

        assert.isTrue(response.status === 200, 'Response status should be 200');
    });

    it('API Test 1.1.3 - pet get a pet by ID', async function () {
        const petId = 12345;
        const response = await petService.petGet(petId);

        assert.isTrue(response.status === 200, 'Response status should be 200');
        expect(response.data.id).to.equal(petId, 'Pet ID should match');
    });

    it('API Test 1.1.4 - pet find pets by status', async function () {
        const statusToFind = status.available;
        const response = await petService.petFindByStatus(statusToFind);

        assert.isTrue(response.status === 200, 'Response status should be 200');
        expect(response.data).to.be.an('array', 'Response data should be an array');
        response.data.forEach(pet => {
            expect(pet.status).to.equal(statusToFind, 'Pet status should match the requested status');
        });
    });

    it('API Test 1.1.5 - pet delete a pet', async function () {
        const petId = 12345;
        const apiKey = authenticator.getTokenValue();
        const response = await petService.petDelete(petId, apiKey);

        assert.isTrue(response.status === 200, 'Response status should be 200');
    }); 
});