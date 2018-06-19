import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpClientService {

	constructor(private http: HttpClient) {}

	public get(url: string) : Observable<any> {
		return this.http.get(url);
	}

	public post(url: string, body: any = null, headers: HttpHeaders = null) : Observable<any> {
		const options = {
			headers: headers
		};

		return this.http.post(url, body, options);
	}
}