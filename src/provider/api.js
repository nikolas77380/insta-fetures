import axios from 'axios';
const Config = {
    ProviderUrl: 'http://localhost:5000'
}


class Provider {
    async login({email, password}) {
        try {
            const response = await axios.post(`${Config.ProviderUrl}/api/auth`, {
                email,
                password
            },{
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

    async loginByAccessToken(accessToken) {
        try {
            const response = await axios.get(`${Config.ProviderUrl}/api/auth`,{
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': accessToken
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
}

const provider = new Provider();

export default provider;
