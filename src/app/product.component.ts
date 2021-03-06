// Quellcode zur detaillierten Anzeige eines Produktes

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';

import 'rxjs/add/operator/map';
import { DetailedProduct } from './detailed_product';
import { ProductAdd } from './product_add';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./app.component.scss']
})
export class productComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://10.14.208.103:5000/fridge/api/v0.1';
  public static readonly GET_ONE_URL = '/food/get/'; // {ean}
  public static readonly CHANGE_AMOUNT = '/inventory/update'; // {stock_id}
  public static readonly CHANGE_PRODUCT = '/food/update'; // {ean}
  public static readonly DELETE_PRODUCT = '/inventory/remove/'; // {stock_id}?amount={menge}
  
  sub : any; 
  detailedProduct : DetailedProduct;
  stockedProduct : Product;
  amount : number; 
  nutritions : any[];
  stock_id : string;
  ean : string;

  c_amount : number; 

  categories : any[];
  
  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
  }

  goBack() {
    this._location.back();
  }
  ngOnInit() {    
    this.sub = this.route.params.subscribe(params => {
      this.stock_id = params['stock_id'];
      this.ean = params['ean'];
      console.log(this.ean);
      console.log(this.stock_id);
    })
    this.getProduct(this.ean);
    this.getCategories();
  }

  getData(url : string){
    return this.http.get(url).map((res: Response) => res.json());
  }

  getProduct(ean : string) {
    let url : string = productComponent.BASE_URL.concat(productComponent.GET_ONE_URL.concat(ean));
    this.getData(url).subscribe(detailedProduct => {
      this.detailedProduct = detailedProduct;
      this.detailedProduct.name = detailedProduct.name;
      this.detailedProduct.image_url = detailedProduct.image_url;
    })
  }

  deleteData(url: string){
    return this.http.delete(url);   
  }
  
  deleteProduct() {
    let url : string = productComponent.BASE_URL.concat(productComponent.DELETE_PRODUCT.concat(this.stock_id.concat("?amount=".concat(this.amount.toString()))));
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