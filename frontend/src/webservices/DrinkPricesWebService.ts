import axios from "axios";

const url = import.meta.env.VITE_API_STRING + 'Price-History';
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Bearer')}`
    }
}

export const getDrinksPrices = async(pairIds :number[]) => {
    const ids={
        ids : pairIds
    }
    return (await axios.post(`${url}/many`, ids, config)).data;
}

export const buyDrink = async(pairId : number, isDrinkOne : boolean) => {
    const payload = {
        isDrinkOne : isDrinkOne
    }
    return (await axios.post(`${url}/buy/${pairId}`, payload, config)).data;
}

export const removeLastAction = async(pairId : number) => {
    console.log(pairId)
    return (await axios.delete(`${url}/${pairId}`, config)).data;
}

export const getAllForActiveEvent = async(lastPricesOnly : boolean) => {    
    try {
        const response = await axios.get(`${url}/getAll/${lastPricesOnly}`, config);
        return response.data;
    } catch (error : any) {
        if (error.response?.data?.message.includes("no active event")) {
            alert("No currently active event");
        }
        return [];
    }
    

}