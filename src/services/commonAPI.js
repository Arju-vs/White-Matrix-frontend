import axios from 'axios' 

const commonAPI = async (httpMethod, url, reqBody, reqHeader = {}) => {
    const token = sessionStorage.getItem("token")
    const reqConfig = {
        method:httpMethod,
        url,
        data:reqBody,
        headers: {
            ...reqHeader,
            Authorization:`Bearer ${token}`
        }
    }
    return await axios(reqConfig)
}

export default commonAPI