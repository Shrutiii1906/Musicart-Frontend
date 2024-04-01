import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URI;

export const getproductinfo = async (productid) => {
    try {
        const p = productid;
        const requestUrl = `${backendUrl}/music/product-info/${p}`;
        const response = await axios.get(requestUrl);
        if (response?.success == false)
            return response?.data;
        return response?.data?.data;
    } catch (error) {
        return;
    }
}