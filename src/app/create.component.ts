import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';
import { ProductAdd } from './product_add';
import { Observable } from 'rxjs/Observable';
import { Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailedProduct } from './detailed_product';

// Produkt hinzufügen - add - put -  &quot;/fridge/api/v0.1/inventory/add&quot;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./app.component.scss']
})
export class createComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://10.14.208.103:5000/fridge/api/v0.1';
  public static readonly ADD_PRODUCT = '/inventory/add';
  public static readonly GET_ONE_URL = '/food/get'; // {ean}

  scannedProducts: DetailedProduct;
  productAdd : ProductAdd; 
  detailedProduct : DetailedProduct;
  categories : any[];

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
    this.getCategories();
  }
  goBack() {
    this._location.back();
  }

  getData(url : string){
    console.log(url);
    return this.http.get(url).map((res: Response) => res.json());
  }
  
  getCategories() {
    let url : string = createComponent.BASE_URL.concat("/food/categories/get");
    this.getData(url).subscribe(categories => {
      this.categories = categories;
    });
    console.log(Response);
  }

  getProduct(ean : string) {
    let url : string = createComponent.BASE_URL.concat(createComponent.GET_ONE_URL.concat(ean));
    this.getData(url).subscribe(detailedProduct => {
      this.detailedProduct = detailedProduct;
    })
  }

  putProduct(productAdd: ProductAdd){
    let url : string = createComponent.BASE_URL.concat(createComponent.ADD_PRODUCT);
    let body = JSON.stringify(productAdd);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, body, options).map(this.extractData);   
    // return this.http.put(url, body, options).map(this.extractData).catch(this.handleError);   
}  

createProduct() {
  let productAdd = new ProductAdd(undefined,this.c_name,this.c_category,this.c_mhd,undefined,undefined,undefined);
  productAdd.content = this.c_content;
  productAdd.content_unit = this.c_content_unit;
  productAdd.stock_count = this.c_stock_count;
  productAdd.ean = this.c_ean;

  if (this.c_ean!=undefined) {
    this.getProduct(this.c_ean);
    productAdd.name = this.detailedProduct.name;
  }

  this.putProduct(productAdd).subscribe(productAdd => productAdd, error => this.errorMessage = <any>error);
  this.goBack();
}

private extractData(res: Response) {
  let body = res.json();
  return body.data || {};
}

private handleError(error: Response) {
  console.error(error);
  return Observable.throw(error.json().error || 'Server Error');
}
}