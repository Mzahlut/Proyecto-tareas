import axios from './axios'

const API = 'http://localhost:3000/api'

export const registerRequest = async (user) => {
   
        const response = await axios.post(`${API}/register`, user);
        console.log("Server response:", response.data);
        return response.data;
};


export const loginRequest = user => axios.post(`${API}/login`, user)