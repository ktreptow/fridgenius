import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  
import { Http, Response } from '@angular/http';
import { Location } from '@angular/common';
import { Product } from './product';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.scss']
})

export class homeComponent {
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://localhost:8080/fridge/api/v0.1/inventory';
  public static readonly ADD_PRODUCT = '/add';
  public static readonly GET_ALL = '/get';
  products: any[];
  testproducts: any[];
  ean : any;
  sub : any;

  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
  }

  goBack() {
    this._location.back();
  }



  getData(url : string){
    return this.http.get(url).map((res: Response) => res.json());
  }

  getProducts() {
    let url : string = homeComponent.BASE_URL.concat(homeComponent.GET_ALL);
    this.getData(url).subscribe(products => {
      this.products = products;
    })
  }

  // addProduct() {
  //   let url = homeComponent.BASE_URL.concat(homeComponent.ADD_PRODUCT);
  //   this.getData
  // }
  }