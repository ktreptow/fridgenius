import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';

import 'rxjs/add/operator/map';
import { DetailedProduct } from './detailed_product';
import { ProductAdd } from './product_add';

// produktdetails - get - /fridge/api/v0.1/food/get/{ean};
// BESTAND ÄNDERN - POST - /fridge/api/v0.1/inventory/update/{stock_id};
// PRODUKT ÄNDERN - POST - /fridge/api/v0.1/food/update/{ean};
// löschen - delete - /fridge/api/v0.1/inventory/remove/{stock_id}?amount={menge};

// DIALOG zum ändern der Bestände https://stackblitz.com/angular/ardpegolpnk?file=app%2Fdialog-overview-example-dialog.html
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./app.component.scss']
})
export class productComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://10.14.208.103:5000/fridge/api/v0.1';
  public static readonly GET_ONE_URL = '/food/get'; // {ean}
  public static readonly CHANGE_AMOUNT = '/inventory/update'; // {stock_id}
  public static readonly CHANGE_PRODUCT = '/food/update'; // {ean}
  public static readonly DELETE_PRODUCT = '/inventory/remove/'; // {stock_id}?amount={menge}
  
  sub : any; 
  detailedProduct : DetailedProduct;
  stockedProduct : Product;
  amount : number; 

  c_amount : number; 

  categories : any[];
  
  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
  }

  goBack() {
    this._location.back();
  }
  ngOnInit() {    
    this.sub = this.route.params.subscribe(params => {
      this.stockedProduct.ean = params['ean'];
    })
    this.getCategories();
  }

  getData(url : string){
    return this.http.get(url).map((res: Response) => res.json());
  }

  getProduct(ean : string) {
    let url : string = productComponent.BASE_URL.concat(productComponent.GET_ONE_URL.concat(this.stockedProduct.ean));
    this.getData(url).subscribe(detailedProduct => {
      this.detailedProduct = detailedProduct;
    })
  }

  deleteData(url: string){
    return this.http.delete(url);   
  }
  
  deleteProduct() {
    let url : string = productComponent.BASE_URL.concat(productComponent.DELETE_PRODUCT.concat(this.stockedProduct.stock_id.concat("?amount=".concat(this.amount.toString()))));
    this.deleteData(url).subscribe();
    this.goBack();
  }

  getCategories() {
    let url : string = productComponent.BASE_URL.concat("/food/categories/get");
    this.getData(url).subscribe(categories => {
      this.categories = categories;
    });
  }
  }