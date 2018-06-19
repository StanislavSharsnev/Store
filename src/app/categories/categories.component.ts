import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../models/category.model';
import { HttpClientService } from '../services/http.service';
import { API } from '../api';
import { AppService } from'../services/app.service';
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
	public categories: Category[] = [];

	constructor(
		private appservice: AppService,
		private http: HttpClientService,
		private router: Router) {
		this.appservice.title = "Категории";
		this.http.get(API.getAllCategories).subscribe(
			data => {
				this.categories = data;
			},
			error => {
				alert(error.message);
			});
	}

	goToCategory(category: Category) : void {
		this.router.navigate(['/items'], { queryParams: { categoryId: category.id } });
	}
}