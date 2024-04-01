import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URI;

export const signupUser = async ({ name, mobile, email, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/signup`;
        const requestPayload = { name, mobile, email, password };
        console.log(requestUrl);
        const response = await axios.post(requestUrl, requestPayload);
        return response?.data;
    } catch (error) {
        return;
    }
}

export const loginUser = async ({ emailormobile, password }) => {
    try {
        const requestUrl = `${backendUrl}/auth/login`;
        const requestPayload = { emailormobile, password };
        const response = await axios.post(requestUrl, requestPayload);
        return response?.data;
    } catch (error) {
        return;
    }
}

export const addFeedback = async ({ id, feedbacktype, feedbackcontent }) => {
    try {
        const requestUrl = `${backendUrl}/auth/addfeedback`;
        const requestPayload = { id, feedbacktype, feedbackcontent };
        const response = await axios.post(requestUrl, requestPayload);
        return response?.data;
    } catch (error) {
        return;
    }
}