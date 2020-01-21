import axios from 'axios';
const Config = {
    ProviderUrl: 'http://postponespace-env.idbqhkmj4q.us-east-2.elasticbeanstalk.com'
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

    async getPosts() {
        const response = await axios.get(`${Config.ProviderUrl}/api/posts`,this.config);
        return response.data;
    }

    async createPost(formData) {
        const body = JSON.stringify(formData);
        const response = await axios.post(`${Config.ProviderUrl}/api/posts/`, body, this.config);
        return response;

    }

    async schedulePost(post) {
        const body = JSON.stringify(post);
        console.log(body)
        const response = await axios.post(`${Config.ProviderUrl}/api/posts/schedule`, body, this.config);
        return response;
    }

    async deletePost(postId) {
        const body = JSON.stringify(postId);
        const response = await axios.get(`${Config.ProviderUrl}/api/posts/delete/${postId}`, this.config);
    }
}

const provider = new Provider();

export default provider;
