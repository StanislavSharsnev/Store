import { Component } from '@angular/core';
import { AppService } from'./services/app.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private appservice:AppService){}
	public get title():string{
		return this.appservice.title;
	}
isuserlogin():boolean{
	return localStorage.getItem('token')!=null;

	}
logout(){
	localStorage.removeItem('token');
}	
}