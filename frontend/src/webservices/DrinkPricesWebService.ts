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
export const getAllForActiveEvent = async() => {
    return (await axios.get(`${url}/getAll/`, config)).data;
}