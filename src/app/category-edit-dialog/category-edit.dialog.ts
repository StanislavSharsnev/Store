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
	public uploader:FileUploader = new FileUploader({url: API.AddCategory});

  constructor(
  	private dialogRef: MatDialogRef<CategoryEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {}

  ngOnInit() {
		this.nameControl = new FormControl('', Validators.required);
		this.descriptionControl = new FormControl('', Validators.required);

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
}