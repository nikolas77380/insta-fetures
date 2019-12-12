import axios from 'axios';
const Config = {
    ProviderUrl: 'http://localhost:5000'
}


class Provider {
    constructor() {
        this.config = {
            headers: {
                'Content-Type': 'application/json',
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
            const response = await axios.post(`${Config.ProviderUrl}/api/auth`, body, this.config);
            // return {
            //     token: response.data.token
            // };
            return response;
    }

    async uploadImage(blob){

    }

    async getLocations(q) {
        try {
            const response = await axios.get(`${Config.ProviderUrl}/api/posts/location?q=${q}`,this.config);
            // console.log(response); return [];
            return response;
        } catch (error) {
            console.error(error);
            return {error}
        }
    }

    async getHashtags(q) {
        try {
            const response = await axios.get(`${Config.ProviderUrl}/api/posts/hashtags?q=${encodeURI(q)}`,this.config);
            return response.data;
        } catch (error) {
            console.error(error);
            return {error}
        }
    }
}

const provider = new Provider();

export default provider;
