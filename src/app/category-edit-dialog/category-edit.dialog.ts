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
import { HttpClientService, HttpFormEncodingCodec } from'../services/http.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-category-edit-dialog',
	templateUrl: './category-edit.dialog.html',
	styleUrls: ['./category-edit.dialog.scss']
})
export class CategoryEditDialog {
	public CategoryForm: FormGroup = null;
	public category: Category = new Category();
	public nameControl: FormControl = null;
	public descriptionControl: FormControl = null;
	public submit: boolean= false;
	public uploader:FileUploader;

  constructor(
  	private dialogRef: MatDialogRef<CategoryEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Http : HttpClientService,
    private fb: FormBuilder) {
  	if(data!=null){
  		this.category = data;
  		this.uploader = new FileUploader({url: API.EditCategory});
  	}
  	else {
  		this.uploader = new FileUploader({url: API.AddCategory});
  	}
  }

  ngOnInit() {
		this.nameControl = new FormControl('', Validators.required);
		this.descriptionControl = new FormControl('', Validators.nullValidator);

		this.CategoryForm = this.fb.group({
			name: this.nameControl,
			description: this.descriptionControl
		});

		this.uploader.onAfterAddingFile = (item) => {
			item.method = "POST";
			item.withCredentials = false;
		};
	}

	onSubmit() : void {
		if (!this.CategoryForm.valid)
			return;
		this.submit = true;
		this.nameControl.disable();
		this.descriptionControl.disable();

		if(this.uploader.queue.length > 0) {
			this.uploader.onBuildItemForm = (item, form) => {
				form.append("category", JSON.stringify(this.category));
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
		        .append('category', JSON.stringify(this.category))
		        .toString();

			this.Http.post(this.category.id > 0 ? API.EditCategory : API.AddCategory, body,
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
}