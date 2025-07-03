import { expect } from 'chai';
import { Authenticator } from '../callers/authenticator';

describe('LogIn', async function () {
    let authenticator: Authenticator;
    authenticator = new Authenticator();
    
    beforeEach(async () => {
        await authenticator.getToken();
    });

    it('API Test 1.1.1 - LogIn with valid credentials', async function () {
        // Aquí va la lógica de la prueba
        expect(true).to.be.true;
    });

    it('API Test 1.1.2 - LogIn with invalid credentials', async function () {
        // Aquí va la lógica de la prueba
        expect(true).to.be.true;
    });
});