export class Product {
products : {
    category:string;
    ean:string;
    img_url:string;
    mhd : Date;
    name : string;
    stock_count:Number;
    stock_id:string;
}
    constructor(
        categor:string,
        ean:string,
        img_url:string,
        mhd : Date,
        name : string,
        stock_count:Number,
        stock_id:string
    ){}
}