import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {


  apiUrl = '';
  restApiUrl = '';
  useRestApi = false;
  restApiURLReWrite = false;
  restApiUrlEndpoint = '/index.cfm';
  isSafari1 = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && navigator.userAgent.indexOf('CriOS') === -1 && navigator.userAgent.indexOf('FxiOS') === -1;
  isSafari2 = /webkit/.test(navigator.userAgent.toLowerCase());


  debug = false;

  constructor(private http: HttpClient,
    private httpBackend: HttpBackend) {

    this.useRestApi = environment.useRestApi;
    this.restApiURLReWrite = environment.restApiURLReWrite;

    if (this.restApiURLReWrite) {
      this.restApiUrlEndpoint = '';
    }

    this.apiUrl = environment.apiEndpointUrl;
    this.restApiUrl = environment.apiEndpointUrl;

    this.restApiUrlEndpoint =  environment.apiEndpointUrl;

  }


  // POST/PUT

  createHero(data: any): Observable<any> {
    if (this.debug) {
      console.log('HttpService.service: createHero: data ', data);
    }
    let url = null;
    let headers = null;
    const id = 'id' in data && data.id > 0 ? data.id : 0;

    if (id === 0) {
      headers = {
        reportProgress: false,
        headers: new HttpHeaders({
          'name': data.name || '',
          'content': data.content || ''
        })
      };
      url = this.restApiUrlEndpoint + '/hero/0/1';
      if (this.debug) {
        console.log('HttpService.service: createHero: post: headers ', headers);
      }
      if (this.debug) {
        console.log('HttpService.service: createHero: post: url: ', url);
      }
      return this.http.post(url, '', headers).pipe(
        tap( (data) => data ),
        catchError(this.handleError)
      );
    }
    else {
      headers = {
        reportProgress: false,
        headers: new HttpHeaders({
          'name': data.name || '',
          'content': data.content || '',
          'X-HTTP-METHOD-OVERRIDE': 'PUT',
        })
      };
      url = this.restApiUrlEndpoint + '/hero/' + id + '/1';
      if (this.debug) {
        console.log('HttpService.service: createHero: put: headers ', headers);
      }
      if (this.debug) {
        console.log('HttpService.service: createHero: put: url: ', url);
      }
      return this.http.post(url, '', headers).pipe(
        tap( (data: any) => data ),
        catchError(this.handleError)
      );
    }
  }

  // GET

  readHero = (page: number = 1, heroid: number = 0): Observable<any> => {
    let url = null;
    const sortby = 'Submission_date';
    const sortmethod = 'DESC';
    const herobatch = 10;
    if (heroid > 0) {
      url = this.restApiUrlEndpoint + '/hero/' + heroid + '/0';
    }
    else {
      url = this.restApiUrlEndpoint + '/heros/' +  page + '/' +  sortby + '/' +  sortmethod + '/' +  herobatch;
    }
    if (this.debug) {
      console.log('HttpService.service: readHero: url: ', url);
    }
    return this.http.get(url).pipe(
      tap( (data) => data ),
      catchError(this.handleError)
    );
  }

  // DELETE

  deleteHero(data: any): Observable<any> {
    if (this.debug) {
      console.log('HttpService.service: createHero: data ', data);
    }
    let url = null;
    let headers = null;
    const id = 'id' in data && data.id > 0 ? data.id : 0;
    if (id > 0) {
      headers = {
        reportProgress: false,
        headers: new HttpHeaders({
          'X-HTTP-METHOD-OVERRIDE': 'DELETE',
        })
      };
      url = this.restApiUrlEndpoint + '/hero/' + id + '/1';
      if (this.debug) {
        console.log('HttpService.service: deleteHero: put: headers ', headers);
      }
      if (this.debug) {
        console.log('HttpService.service: deleteHero: put: url: ', url);
      }
      return this.http.post(url, '', headers).pipe(
        tap( (data: any) => data ),
        catchError(this.handleError)
      );
    }
  }

  // error handling

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An client-side or network error occurred: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened. Please try again later...');
  }


}
