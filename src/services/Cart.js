import { useMutation } from "react-query";
import { request } from "./axios";

export const getCart = () => {
    return request({
        url: "v1/cart",
        method: "GET",
    });
};



const addToCart = (tourId, data) => {
    return request({
        url: `/v1/cart/${tourId}`,
        method: "POST",
        data: data,
        successMsg: "Added to cart successfully",
    });
};


export const addToCartMutation = (tourId, data) => {
    return useMutation(() => addToCart(tourId, data), {
        onSuccess: (res) => console.log(res),
        onError: (err) => console.log(err),
    });
};


