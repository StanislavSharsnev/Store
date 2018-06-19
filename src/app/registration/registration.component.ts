import { Component } from '@angular/core';
import { AppService } from'../services/app.service';
import { HttpClientService } from '../services/http.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { API } from'../api';
import { Registration } from'../models/registration.model';
import { Router } from "@angular/router";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{
	constructor(
		private fb: FormBuilder,
		private Http: HttpClientService,
		private appservice: AppService,
		private router: Router){
		this.appservice.title = "Регистрация";
	}
public regForm: FormGroup = null;
	public reg: Registration = new Registration();
	public nameControl: FormControl = null;
	public loginControl: FormControl = null;
	public passwordControl: FormControl = null;
	public reppasswordControl: FormControl = null;
	public submit: boolean= false;
	public reppassword:string;


	ngOnInit() {
		this.loginControl = new FormControl('', Validators.required);
		this.passwordControl = new FormControl('', Validators.required);
		this.reppasswordControl = new FormControl('', Validators.required);
		this.nameControl = new FormControl('', Validators.required);

		this.regForm = this.fb.group({
			login: this.loginControl,
			password: this.passwordControl,
			reppassword: this.reppasswordControl,
			name: this.nameControl
		});
	}

	onSubmit() : void {
		if (!this.regForm.valid)
			return;
		if (this.reppassword!==this.reg.password) {
			alert("Пароли не совпадают");
			return;
		}

		this.submit = true;
		this.loginControl.disable();
		this.passwordControl.disable();
		this.nameControl.disable();
		this.reppasswordControl.disable();
		this.Http.post(API.reg, JSON.stringify(this.reg)).subscribe(
			result => {
				if("error" in result){
					alert(result.error);
					this.submit = false;
					this.loginControl.enable();
					this.passwordControl.enable();
					this.nameControl.enable();
					this.reppasswordControl.enable();
					return;
				}

				localStorage.setItem("token", result.data);

				this.router.navigate(['/']);
			},
			error => {
				alert(error.message);
				this.submit = false;
				this.loginControl.enable();
				this.passwordControl.enable();
				this.nameControl.enable();
				this.reppasswordControl.enable();
			});
	}	
}