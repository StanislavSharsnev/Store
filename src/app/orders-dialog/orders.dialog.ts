import {
	Component,
	Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA } from '@angular/material';
import { API } from'../api';
import { HttpClientService } from'../services/http.service';
import { Order } from'../models/order.model';

@Component({
	selector: 'app-orders-dialog',
	templateUrl: './orders.dialog.html',
	styleUrls: ['./orders.dialog.scss']
})
export class OrdersDialog {
	public datefrom: Date = null;
	public dateto: Date = null;
	public orders: Order[] = [];

  constructor(
  	private dialogRef: MatDialogRef<OrdersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Http: HttpClientService) {
  	
  }

  fromDateChange(event: any) {
  	this.datefrom = event.value;
  }
  toDateChange(event: any) {
  	this.dateto = event.value;
  }
  getorders() {
  	this.Http.get(`${API.GetOrders}datefrom=${this.datefrom.getTime() / 1000}&dateto=${this.dateto.getTime() / 1000}`)
  		.subscribe(
  		 	response => {
  		 		this.orders = response;

  		 		console.log(this.orders);
  		 	},
  			error => {
  				alert(error.message);
  			});
  }

  print(){
  	let innerContents = document.getElementById("orders").innerHTML;
    let popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</body></html>');
    popupWinindow.document.close();
  }
}