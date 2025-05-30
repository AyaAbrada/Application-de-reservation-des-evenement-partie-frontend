import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import {SignupRequest} from '../models/signup-request';
import {SignupResponse} from '../models/signup-response';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private readonly API_URL = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}



  doLogin(request: LoginRequest): Observable<LoginResponse> {
    console.log(request.username +"  "+ request.password);
  return this.http.post<LoginResponse>(`${this.API_URL}/login`, request);
  }

  doRegister(request: SignupRequest): Observable<SignupResponse> {
    console.log(request.username +"  "+ request.password);
    return this.http.post<SignupResponse>(`${this.API_URL}/register`, request);
  }


}
