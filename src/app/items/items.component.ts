import { Component } from '@angular/core';
import {
	ActivatedRoute,
	Params } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Item } from '../models/item.model';
import { HttpClientService } from '../services/http.service';
import { API } from '../api';
import { ItemDialog } from '../item-dialog/item.dialog';
import { CartItem } from '../models/cart.model';
import { AppService } from'../services/app.service';

@Component({
	selector: 'app-items',
	templateUrl: './items.component.html',
	styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
	private categoryId: number;
	public items: any[] = [];

	constructor(
		private appservice: AppService,
		private activatedRoute: ActivatedRoute,
		private http: HttpClientService,
		private dialog: MatDialog) {
		this.appservice.title = "Товары";
	}

	showMore(item: Item) : void {
		let dialogRef = this.dialog.open(ItemDialog, {
			width: '600px',
			data: { item: item }
	    });
	}

	addtocart(item: Item) : void {
		let cart: CartItem[] = JSON.parse(localStorage.getItem("cart"));
		if(cart == null)
		{
			cart = [];
		}
		let existItem = cart.find(i => i.item.id == item.id);
		if (existItem == null)
		{
			let newItem: CartItem = new CartItem();
			newItem.count = 1;
			newItem.item = item;
			cart.push(newItem);
		}
		else 
		{
			existItem.count++;
		}
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	ngOnInit() {
		this.categoryId = this.activatedRoute.snapshot.queryParams["categoryId"];

		this.http.get(`${API.getItemsFromCategory}${this.categoryId}`).subscribe(
			data => {
				this.items = data;
			},
			error => {
				alert(error.message);
			});
	}
	
}