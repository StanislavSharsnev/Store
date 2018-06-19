import {
	Component,
	Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-item-dialog',
	templateUrl: './item.dialog.html',
	styleUrls: ['./item.dialog.scss']
})
export class ItemDialog {

  constructor(
  	private dialogRef: MatDialogRef<ItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

 /*onNoClick(): void {
    this.dialogRef.close();
  }*/
}