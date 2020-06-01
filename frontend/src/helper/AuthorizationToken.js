var tokenAuth = localStorage.getItem('token')
export default {
    setToken: (token) => {
        tokenAuth = token
        localStorage.setItem('token', token)
    },
    getToken: () => {
        return tokenAuth
    },
    getAuth: () => {
        return {
            Authorization: `Bearer ${tokenAuth}`
        }
    }
};
