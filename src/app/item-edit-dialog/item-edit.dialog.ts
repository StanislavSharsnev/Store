import {
	Component,
	Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from'../models/category.model';
import { FileUploader } from 'ng2-file-upload';
import { API } from'../api';
import { Item } from"../models/item.model";
import { HttpClientService, HttpFormEncodingCodec } from'../services/http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-item-edit-dialog',
	templateUrl: './item-edit.dialog.html',
	styleUrls: ['./item-edit.dialog.scss']
})
export class ItemEditDialog {
	public ItemForm: FormGroup = null;
	public item: Item = new Item();
	public nameControl: FormControl = null;
	public descriptionControl: FormControl = null;
	public priceControl: FormControl = null;
	public submit: boolean= false;
	public uploader:FileUploader;
	public categories:Category[] = [];
	public ids:number[] = [];
	public activeTabIndex: number = 0;

  constructor(
  	private dialogRef: MatDialogRef<ItemEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Http: HttpClientService,
    private fb: FormBuilder) {
  	if(data.item!=null){
  		this.item = data.item;
  		this.uploader = new FileUploader({url: API.EditItem+this.item.id});
  		this.getcategories();
  	}
  	else {
  		this.uploader = new FileUploader({url: API.AddItem});
  	}
  	this.categories = data.categories;
  }

  ngOnInit() {
		this.nameControl = new FormControl('', Validators.required);
		this.descriptionControl = new FormControl('', Validators.nullValidator);
		this.priceControl = new FormControl('', Validators.required);

		this.ItemForm = this.fb.group({
			name: this.nameControl,
			description: this.descriptionControl,
			price: this.priceControl
		});

		this.uploader.onAfterAddingFile = (item) => {
			item.method = "POST";
			item.withCredentials = false;
		};
	}

	onSubmit() : void {
		if (!this.ItemForm.valid)
			return;
		this.nameControl.disable();
		this.descriptionControl.disable();
		this.priceControl.disable();

		if(this.uploader.queue.length > 0) {
			this.uploader.onBuildItemForm = (item, form) => {
				if (!this.submit) {
					form.append("item", JSON.stringify(this.item));
					form.append("categories", JSON.stringify(this.ids));
					this.submit = true;
				}
			};

			this.uploader.onSuccessItem = (item, response, status, headers) => {
				this.dialogRef.close(true);
			}

			this.uploader.onErrorItem = (item, response, status, headers) => {
				this.dialogRef.close(false);
			}

			this.uploader.uploadAll();
		}
		else {
			const body = new HttpParams({ encoder: new HttpFormEncodingCodec() })
		        .append('item', JSON.stringify(this.item))
		        .append("categories", JSON.stringify(this.ids))
		        .toString();

			this.Http.post(this.item.id > 0 ? API.EditItem +this.item.id : API.AddItem, body,
				new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'))
				.subscribe(
					response => {
						this.dialogRef.close(true);
					},
					error => {
						alert(error.message);
					});
		}
	}

	previewPhoto(url: string) {
		window.open(url, '_blank');
	}
	deletephoto(url:string){
		this.Http.post(API.DeletePhoto+this.item.id, url).subscribe(
			result => {
				if(result){
					const index= this.item.photos.indexOf(url);
					this.item.photos.splice(index, 1); 
				}
			},
			error => {
				alert(error.message);
			});
	}
	getcategories(){
		this.Http.get(API.GetCategoriesForItem+this.item.id).subscribe(
			result => {
				this.ids = result;
			},
			error => {
				alert(error.message);
			});
	}
	iscategorychecked(category:Category):boolean {
		return this.ids.indexOf(category.id)>=0;
	}

	categorystatechange(category: Category, event: any) {
		if(event.checked){
			this.ids.push(category.id);
		}
		else {
			const index = this.ids.indexOf(category.id);
			this.ids.splice(index, 1)
		}
	}

	goToFirstTab() : void {
		this.activeTabIndex = 0;
	}
}