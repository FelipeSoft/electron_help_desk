import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8410"
})

const token = {
    getClientByToken: async (token) => {
        const request = await instance.post("/resources/token",);
        return {
            name: request.data.name,
            email: request.data.email,
            enterprise_identifier: request.data.request_identifier,
            telephone: request.data.telephone,
            statusCode: request.status
        }
    }
}

module.exports = { token }