import axios from './axios.js'
        

export const registerRequest = async (user) => {
   
        const response = await axios.post(`/register`, user);
        console.log("Server response:", response.data);
        return response.data;
};


export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = async () => axios.get('/verify')
