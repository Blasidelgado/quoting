export interface IPriceList {
    _id: string;
    priceListName: string;
    prices: {
        productId: string;
        price: number;
        _id: string;
    }[];
}

export interface PriceListItem {
    productId: string;
    price: number;
    _id: string
}