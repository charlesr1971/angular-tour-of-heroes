import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { of, defer } from 'rxjs';

import { HttpService } from './http.service';

import { Hero } from '../models';

describe('HttpService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let httpService: HttpService;

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpService = new HttpService(httpClientSpy as any, null);
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] =
      [{ id: 56, name: 'Poison Ivy' }, { id: 57, name: 'Mr Jumbo' }];

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    httpService.readHero(1,0).subscribe(
      heroes => expect(heroes).toEqual(jasmine.arrayContaining(expectedHeroes), 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

});

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
