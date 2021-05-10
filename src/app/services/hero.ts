import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import {Hero} from '../models';

@Injectable()
export class HeroService {
    constructor(private http: HttpClient) {}

    getHeroes(): Observable<Hero[]> {
        return this.http.get('/api/heroes').pipe(
          tap( (data: Hero[]) => data ),
          catchError(this.handleError)
        );
    }

    getHero(id): Observable<Hero> {
        return this.http.get('/api/heroes' + id).pipe(
          tap( (data: Hero) => data ),
          catchError(this.handleError)
        );
    }

    saveHero(hero) {
        if (hero.id === 0) {
            return this.http.post('/api/heroes', hero).pipe(
              tap( (data) => data ),
              catchError(this.handleError)
            );
        } else {
            return this.http.post('/api/heroes' + hero.id, hero).pipe(
              tap( (data) => data ),
              catchError(this.handleError)
            );
        }
    }

    deleteHero(hero) {
        return this.http.delete('/api/heroes' + hero.id).pipe(
          tap( (data) => data ),
          catchError(this.handleError)
        );
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
