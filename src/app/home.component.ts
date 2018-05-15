import { Component, OnInit, Injectable, Inject, Input } from '@angular/core';
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

export class homeComponent implements OnInit{
  title = 'fridgenius';
  public static readonly BASE_URL = 'http://10.14.208.103:5000/fridge/api/v0.1/inventory';
  public static readonly ADD_PRODUCT = '/add';
  public static readonly GET_ALL = '/get';
  productsArray : any[];
  ean : any;
  sub : any
  newArray:Product[];

  constructor(private route: ActivatedRoute, private http: Http, private _location: Location) {
    this.ngOnInit();
  }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.getProducts();
  }

  getData(url : string){
    return this.http.get(url).map((res: Response) => res.json());
  }

  getProducts() {
    let url : string = homeComponent.BASE_URL.concat(homeComponent.GET_ALL);

    this.getData(url).subscribe(products => {
      this.productsArray = products.products;
      console.log(products);
      console.log("eigene");
      console.log(this.productsArray);
    })
    // this.newArray = Array.from(this.productsArray);


    // if (this.products===null) {
    //   let message : string = "Dein Kühlschrank ist leer :("
    //   let empty : boolean = true;
    // }
  }

  // makeArray(products) {
  //   return Array.from(this.products);
  // }

  // addProduct() {
  //   let url = homeComponent.BASE_URL.concat(homeComponent.ADD_PRODUCT);
  //   this.getData
  // }
  }