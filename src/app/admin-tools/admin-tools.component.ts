import { Component } from '@angular/core';
import { AppService } from'../services/app.service';
import { HttpClientService } from '../services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from'../models/login.model';
import { API } from'../api';
import { Router } from "@angular/router";
import { Category } from'../models/category.model';
import { MatDialog } from '@angular/material';
import { CategoryEditDialog } from '../category-edit-dialog/category-edit.dialog';
import { Item } from'../models/item.model';
import { ItemEditDialog } from"../item-edit-dialog/item-edit.dialog";
import { OrdersDialog } from"../orders-dialog/orders.dialog";

@Component({
	selector: 'app-admin-tools',
	templateUrl: './admin-tools.component.html',
	styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent {

public items:Item[] = [];
public categories: Category[] = [];
	
	constructor(
		private http: HttpClientService,
		private appservice: AppService,
		private router: Router,
		private dialog: MatDialog){
		this.appservice.title = "Панель управления";
	}

	ngOnInit(){
		this.getcategories();
	}
	addcategory(){
		let dialogRef = this.dialog.open(CategoryEditDialog, {
			width: '600px',
			data: null
	    });
	    dialogRef.afterClosed().subscribe(
	    	result => {
	    		if (result) {this.getcategories();}
	    	});
	}
	getcategories(){
		this.http.get(API.getAllCategories).subscribe(
			data => {
				this.categories = data;
			},
			error => {
				alert(error.message);
			});
	}
	oncategorydelete(category:Category){
		this.http.get(API.DeleteCategory+category.id).subscribe(
			data => {
				const index = this.categories.indexOf(category);
				if (index >= 0)
					this.categories.splice(index, 1);
			},
			error => {
				alert(error.message);
			});
	}

	oncategoryedit(category:Category){
		let dialogRef = this.dialog.open(CategoryEditDialog, {
			width: '600px',
			data: category
	    });
	    dialogRef.afterClosed().subscribe(
	    	result => {
	    		if (result) {this.getcategories();}
	    	});
	}
	loaditems(category:Category){
		this.http.get(API.getItemsFromCategory+category.id).subscribe(
			data => {
				this.items = data;

			},
			error => {
				alert(error.message);
			});
	}
	onitemedit(item:Item){
		let dialogRef = this.dialog.open(ItemEditDialog, {
			width: '600px',
			data: { item: item, categories: this.categories }
	    });
	    dialogRef.afterClosed().subscribe(
	    	result => {
	    		if (result) {this.getcategories();}
	    	});
	}
	additem(){
		let dialogRef = this.dialog.open(ItemEditDialog, {
			width: '600px',
			data: { item: null, categories: this.categories }
	    });
	    dialogRef.afterClosed().subscribe(
	    	result => {
	    		if (result) {this.getcategories();}
	    	});
	}
	onitemdelete(item:Item){
		this.http.get(API.DeleteItem+item.id).subscribe(
			data => {
				const index = this.items.indexOf(item);
				if (index >= 0)
					this.items.splice(index, 1);
			},
			error => {
				alert(error.message);
			});
	}
	showorders(){
		let dialogRef = this.dialog.open(OrdersDialog, {
			width: '800px',
	    });
	    
	}
}