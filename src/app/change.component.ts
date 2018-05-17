// Quellcode zum Ändern von Produkten
// Hierbei wird das alte Produkt ausgelesen und in die Felder geschrieben. Werden diese geändert, dann wird der neue Wert übernommen.

// NICHT LAUFFÄHIG

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';
import { Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductAdd } from './product_add';
import { Observable } from 'rxjs/Observable';
import { DetailedProduct } from './detailed_product';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./app.component.scss']
})
export class changeComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://10.14.208.103:5000/fridge/api/v0.1';
  public static readonly ADD_PRODUCT = '/inventory/add';
  public static readonly CHANGE_AMOUNT = '/inventory/update'; //{stock_id}
  public static readonly CHANGE_PRODUCT = '/inventory/update'; //{ean}
  public static readonly GET_ONE_URL = '/food/get'; // {ean}

  stockedProduct : ProductAdd;
  productAdd : ProductAdd; 
  detailedProduct : DetailedProduct;
  categories : any[];
  sub : any;


  c_ean : any;
  c_name : any;
  c_mhd : any;
  c_content : any;
  c_content_unit : any;
  c_stock_count : any;
  c_category : any;

 errorMessage : string;

  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        this.c_ean = params['ean'];
      })

      this.getCategories();
      this.getProduct(this.c_ean);
    }

  goBack() {
    this._location.back();
  }

  getData(url : string){
    console.log(url);
    return this.http.get(url).map((res: Response) => res.json());
  }
  
  getCategories() {
    let url : string = changeComponent.BASE_URL.concat("/food/categories/get");
    this.getData(url).subscribe(categories => {
      this.categories = categories;
    });
    console.log(Response);
  }

  getProduct(ean : string) {
    let url : string = changeComponent.BASE_URL.concat(changeComponent.GET_ONE_URL.concat(ean));
    this.getData(url).subscribe(detailedProduct => {
      this.detailedProduct.name = detailedProduct.name;
      this.detailedProduct.category = detailedProduct.category;
      this.detailedProduct.mhd = detailedProduct.mhd;
      this.detailedProduct.content_unit = detailedProduct.content_unit;
      this.detailedProduct.content = detailedProduct.content;
      this.detailedProduct.nutriments = detailedProduct.nutriments;
      this.detailedProduct.image_url = detailedProduct.image_url;
      
          this.c_name = detailedProduct.name;
          this.c_category = this.detailedProduct.category;
          this.c_mhd = this.detailedProduct.mhd;
          this.c_content_unit = this.detailedProduct.content_unit;
          this.c_content = this.detailedProduct.content;
          this.detailedProduct.nutriments;
          this.detailedProduct.image_url;
    })
  }

  putProduct(productAdd: ProductAdd){
    let url : string = changeComponent.BASE_URL.concat(changeComponent.CHANGE_PRODUCT.concat(productAdd.ean));
    let body = JSON.stringify(productAdd);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData);   
}  

changeProduct() {
  let productAdd = new ProductAdd(undefined,this.c_name,this.c_category,this.c_mhd,undefined,undefined,undefined);
  productAdd.content = this.c_content;
  productAdd.content_unit = this.c_content_unit;
  productAdd.stock_count = this.c_stock_count;
  productAdd.ean = this.c_ean;
  
  this.putProduct(productAdd).subscribe(productAdd => productAdd, error => this.errorMessage = <any>error);

  if (this.c_stock_count>productAdd.stock_count) {
    for(let i=0;i==productAdd.stock_count;i++) {
        let productNew = new ProductAdd(productAdd.ean,productAdd.name,productAdd.category,productAdd.mhd,this.c_stock_count,productAdd.content,productAdd.content_unit);
      this.putProduct(productNew).subscribe(productNewc => productNew, error => this.errorMessage = <any>error);
    }  
    // this.changeAmount(productAdd.ean);
  }

  this.goBack(); 

  }

//   changeAmount (ean:string) {
//     let url : string = changeComponent.BASE_URL.concat(changeComponent.CHANGE_AMOUNT.concat(this.productAdd.stock_id));
//     let body = JSON.stringify(productAdd);
//     let headers = new Headers({'Content-Type':'application/json'});
//     let options = new RequestOptions({headers: headers});
//     // return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);   
//     return this.http.put(url, body, options).map(this.extractData);
//   }


private extractData(res: Response) {
  let body = res.json();
  return body.data || {};
}

private handleError(error: Response) {
  console.error(error);
  return Observable.throw(error.json().error || 'Server Error');
}
}