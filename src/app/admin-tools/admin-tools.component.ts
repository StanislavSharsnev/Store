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


@Component({
	selector: 'app-admin-tools',
	templateUrl: './admin-tools.component.html',
	styleUrls: ['./admin-tools.component.scss']
})
export class AdminToolsComponent {

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
	oncategoryedit(category:Category){}
}