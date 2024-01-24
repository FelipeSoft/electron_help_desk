const BASE_URL = "http://localhost:8410"

export const serverClient = {
    getClientByToken: async (token) => {
        try {
            const request = await fetch(BASE_URL + "/resources/agent/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: token
            })

            if (request.status !== 200) {
                throw new Error("Request Error " + request.status)
            }

            const response = await request.json()
            return response;
        } catch (error) {
            console.error(error)
        }
    },

    invokeClientAgent: async (id) => {
        try {
            const request = await fetch(BASE_URL + "/resources/agent/set", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    clientId: id,
                }
            })

            return request.status !== 201
        } catch (error) {
            console.error(error)
        }
    }
}

