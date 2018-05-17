// Klasse und Struktur eines Produktes, was in die eigene Kühlschrankdatenbank geschrieben und neu erstellt werden soll 

export class ProductAdd {

    ean:string;
    name:string;
    category:string;
    mhd:Date;
    stock_count:Number;
    content:Number;
    content_unit:string;

    constructor(
        ean:string,
        name:string,
        category:string,
        mhd:Date,
        stock_count:Number,
        content:Number,
        content_unit:string,
    
    ){}
}