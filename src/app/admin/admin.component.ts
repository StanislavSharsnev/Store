import { Component } from '@angular/core';
import { AppService } from'../services/app.service';
import { HttpClientService } from '../services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from'../models/login.model';
import { API } from'../api';
import { Router } from "@angular/router";

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

	public loginForm: FormGroup = null;
	public login: Login = new Login();
	public loginControl: FormControl = null;
	public passwordControl: FormControl = null;
	public submit: boolean= false;

	constructor(
		private fb: FormBuilder,
		private Http: HttpClientService,
		private appservice: AppService,
		private router: Router){
		this.appservice.title = "Администратор";
	}

	ngOnInit() {
		this.loginControl = new FormControl('', Validators.required);
		this.passwordControl = new FormControl('', Validators.required);

		this.loginForm = this.fb.group({
			login: this.loginControl,
			password: this.passwordControl
		});
	}

	onSubmit() : void {
		if (!this.loginForm.valid)
			return;
		this.submit = true;
		this.loginControl.disable();
		this.passwordControl.disable();
		this.Http.post(API.login+"admin", JSON.stringify(this.login)).subscribe(
			result => {
				if("error" in result){
					alert(result.error);
					this.submit = false;
					this.loginControl.enable();
					this.passwordControl.enable();
					return;
				}

				localStorage.setItem("token", result.data);

				this.router.navigate(['/admin-tools']);
			},
			error => {
				alert(error.message);
				this.submit = false;
				this.loginControl.enable();
				this.passwordControl.enable();
			});
	}
}