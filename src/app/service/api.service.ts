import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.local';
import {ApiServiceInterface} from './ApiServiceInterface';

@Injectable({
    providedIn: 'root',
})
export class ApiService implements ApiServiceInterface {
    private httpClient: HttpClient;

    private apiUrl: string = environment.apiUrl;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    get = <T>(url: string) =>
        this.httpClient.get<T>(`${this.apiUrl}${url}`);

    post = <T>(url: string, data: any) =>
        this.httpClient.post<T>(`${this.apiUrl}${url}`, data);
}
