import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpHeaders,
	HttpParameterCodec } from '@angular/common/http';
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

export class HttpFormEncodingCodec implements HttpParameterCodec {
    encodeKey(k: string): string { return encodeURIComponent(k).replace(/%20/g, '+'); }

    encodeValue(v: string): string { return encodeURIComponent(v).replace(/%20/g, '+'); }

    decodeKey(k: string): string { return decodeURIComponent(k.replace(/\+/g, ' ')); }

    decodeValue(v: string) { return decodeURIComponent(v.replace(/\+/g, ' ')); }
}