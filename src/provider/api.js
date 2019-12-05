import axios from 'axios';
const Config = {
    ProviderUrl: 'http://localhost:5000'
}


class Provider {
    constructor() {
        this.config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    async authenticate() {
        try{
            const response = await axios.get(`${Config.ProviderUrl}/api/auth`,this.config);

            return response.data;
        } catch(err) {
            return {
                error: err
            }
        }
    }

    async login({email, password}) {
        const body = JSON.stringify({email, password});

        try {
            const response = await axios.post(`${Config.ProviderUrl}/api/auth`, body,{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return {
                token: response.data.token
            };
        } catch (error) {
            console.error(error);
            return {
                error: error
            }

        }
    }

    async uploadFile(file){

    }

}

const provider = new Provider();

export default provider;
