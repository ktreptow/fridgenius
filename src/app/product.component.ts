import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';

import 'rxjs/add/operator/map';

// produktdetails - get - /fridge/api/v0.1/food/get/{ean};
// BESTAND ÄNDERN - POST - /fridge/api/v0.1/inventory/update/{stock_id};
// PRODUKT ÄNDERN - POST - /fridge/api/v0.1/food/update/{ean};
// löschen - delete - /fridge/api/v0.1/inventory/remove/{stock_id}?amount={menge};
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./app.component.scss']
})
export class productComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://localhost:8080/fridge/api/v0.1/';
  public static readonly GET_ONE_URL = '/food/get'; // {ean}
  public static readonly CHANGE_AMOUNT = '/inventory/update'; // {stock_id}
  public static readonly CHANGE_PRODUCT = '/food/update'; // {ean}
  public static readonly DELETE_PRODUCT = '/inventory/remove/'; // {stock_id}?amount={menge}
  
  products: any[];

  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
  }



  getData(url : string){
    return this.http.get(url).map((res: Response) => res.json());
  }

  getProducts() {
    let url : string = productComponent.BASE_URL.concat(this.ean);
    this.getData(url).subscribe(categories => {
      this.products = products;
    })
  }


  }