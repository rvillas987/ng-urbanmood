export interface User {
    UserId?: string;
    UserName?: string;
    Password?: string;
}

export interface NewSales {
    custno?:string;
    currdate?:string;
    custname?:string;
    nickname?:string;
    mobile?:string;
    items?:NewSalesItems[];
}

export interface NewSalesItems {
    CustNo?:string;
    OrderDate?:string;
    Item?:string;
    Specs?:string;
    Address?:string;
    Region?:string;
    Quantity?:number;
    Sell?:number;
    Paid?:number;
    Cost?:number;
    Channel?:string;
    Payout?:string;
    Notes?:string;
    Tracking?:string;
    Status?:string;
    Eta?:string;
}

export interface MonthCode {
    code?:string;
    index?:string;
}

export interface Sales {
    custno?:string;
    currdate?:string;
    custname?:string;
    nickname?:string;
    mobile?:string;
    channel?:string;
    notes?:string;
    items?:NewSalesItems[];
}

export interface Channel {
    ChIndex?:number;
    Channel?:string;
}