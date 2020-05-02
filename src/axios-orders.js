import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-96a55.firebaseio.com/'
});

export default instance;