export const PriceFormater = (price,isCheckout) => {

    if(isCheckout){
        return price.toLocaleString("pl-PL", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }else {
        return price.toFixed(2)
    }
};