export const CurrencyFormater=(price)=>{
    return price.toLocaleString('pl-PL', {
        style: 'currency',
        currency: 'PLN',
    });
};
