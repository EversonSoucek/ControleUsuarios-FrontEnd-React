const api = async (endpoint, metodo, data) => {
    return await fetch(`http://localhost:5213/${endpoint}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Credentials": "true" },
        credentials: "include",
        body: JSON.stringify(data)
    })
}

export default api