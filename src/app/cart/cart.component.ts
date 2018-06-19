import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import{ HttpClientService } from'../services/http.service';
import { HttpHeaders } from '@angular/common/http';

import { CartItem } from '../models/cart.model';
import { API } from'../api';
import { AppService } from'../services/app.service';
import { Item } from '../models/item.model';
import { ItemDialog } from '../item-dialog/item.dialog';
import { MatDialog } from '@angular/material';
@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent {
	public Items : CartItem[] = [];

	constructor(
		private Http: HttpClientService,
		private appservice: AppService,
		private dialog: MatDialog){
		this.appservice.title = "Корзина";
		this.Items = JSON.parse(localStorage.getItem("cart"));
		if(this.Items==null){
			this.Items=[];
		}
	}

	calcresult() : number {
		let sum: number = 0;

		for(let i: number = 0; i < this.Items.length; i++) {
			if (this.Items[i].count < 0)
				return -1;

			sum+=this.Items[i].count*this.Items[i].item.price;
		}

		return sum;
	}

	makeorder(){
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append('Authorization', localStorage.getItem('token'));

		this.Http.post(API.makeorder, JSON.stringify(this.Items), headers).subscribe(
			result => {
				alert("Ваш заказ принят");
				localStorage.removeItem("cart");
				this.Items=[];
			},
			error => {
				alert(error.message);
			});
	}
	showitemdialog(item:Item){
		let dialogRef = this.dialog.open(ItemDialog, {
			width: '600px',
			data: { item: item }
	    });
	}

	isuserlogin():boolean{
		return localStorage.getItem('token')!=null;

	}
}