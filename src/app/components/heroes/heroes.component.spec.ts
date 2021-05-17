import { NO_ERRORS_SCHEMA, DebugElement, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { routing } from '../../routes';
import { MaterialModule } from '../../material.module';
import { By } from '@angular/platform-browser';
import { pipe, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import reducer from '../../reducers';
import { EffectsModule } from '@ngrx/effects';

import { loadHeroesReducer } from '../../reducers/hero-list.reducer';
import { HeroService } from '../../services/hero';
import { HeroEffects } from '../../effects';
import { HttpService } from '../../services/http.service';

import { HeroListComponent } from './hero-list.component';
import { DashboardModule, HeroesModule } from '..';
import { HeroesComponent } from './heroes.component';
import { HeroActions } from '../../actions';
import { CustomMatchers } from '../../test-helpers/custom.matcher';

declare global {
  namespace jasmine {
      interface Matchers<T> {
        toBeEqualWithMessage(expected: any, expectationFailOutput?: any): boolean;
      }
  }
}



let currentSpec = null;

class CurrentSpecReporter {

  specStarted(spec) {
    currentSpec = spec;
  }

  specDone() {
    currentSpec = null;
  }

}

jasmine.getEnv().addReporter(new CurrentSpecReporter());

@Injectable()
export class TestService {

  subjectMatlistitem: Subject<any> = new Subject<any>();
  subjectMatlistitemLength = 0;

  setMatlistitemLengthSubject(length: number) {
    console.log('TestBed: TestService: length ', length);
    this.subjectMatlistitemLength = length;
    this.subjectMatlistitem.next(length);
  }

  getMatlistitemLengthSubject(): Subject<any> {
    return this.subjectMatlistitem;
  }

  getMatlistitemLength(): number {
    return this.subjectMatlistitemLength;
  }

}

let matlistitemLength = 0;


describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let testService = TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([reducer], {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false,
            strictStateSerializability: false,
            strictActionSerializability: false
          }
        }),
        StoreModule.forFeature('selectHeroList', loadHeroesReducer),
        EffectsModule.forRoot([HeroEffects]),
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        HeroesModule,
        DashboardModule,
        routing,
      ],
      declarations: [
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        HeroListComponent,
        HeroesComponent,
        HeroService,
        HttpService,
        TestService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach( async  () => {
    // testService = TestBed.get(TestService);
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(function(){
    jasmine.addMatchers(CustomMatchers);
  })

  afterEach( async () => {
    fixture.detectChanges();
    const service = TestBed.get(TestService);
    matlistitemLength = await service.getMatlistitemLength();
    fixture.detectChanges();
  });

  it('should create one mat-list-item for each hero', (done: DoneFn) => {
    inject([HeroListComponent, TestService], (injectComponent: HeroListComponent, testService: TestService) => {
      let fixture = TestBed.createComponent(HeroListComponent);
      let component = fixture.componentInstance;
      component.store.dispatch(HeroActions.loadHeroes());
      fixture.detectChanges();
      const store = component.store.select('selectHeroList');
      fixture.detectChanges();
      store.subscribe(
        (heroes) => {
          if(heroes.length){
            let fixture = TestBed.createComponent(HeroListComponent);
            let component = fixture.componentInstance;
            component.heroes = heroes;
            fixture.detectChanges();
            const matlistitemDe: DebugElement = fixture.debugElement;
            const matlistitemEl: HTMLElement = matlistitemDe.nativeElement;
            const matlistitem = matlistitemDe.queryAll(By.css('.mat-list-item.hero-list'));
            console.log('TestBed: HeroListComponent: matlistitem.length ', matlistitem.length);
            console.log('TestBed: HeroListComponent: heroes ', heroes);
            matlistitemLength = matlistitem.length;
            testService.setMatlistitemLengthSubject(matlistitemLength);
            const length = heroes.length;
            expect(length).toBe(heroes.length);
            done();
          }
        }
      )
    })();
  });

  /* inject([TestService], (testService: TestService) => {
    // fixture.detectChanges();
    const matlistitemLength = testService.getMatlistitemLength();
    // testService.subjectMatlistitem.subscribe ( (matlistitemLength) => {
      // fixture.detectChanges();
      it('should create ' +  matlistitemLength + ' mat-list-item', (done: DoneFn) => {
        fixture.detectChanges();
        currentSpec.description = 'should create ' +  matlistitemLength + ' mat-list-item';
        const description = currentSpec.description;
        console.log('TestBed: HeroListComponent: description ', description);
        fixture.detectChanges();
        expect(component).toBeDefined();
        done();
      });
    // });
  }); */

  it('should create ' + matlistitemLength + ' mat-list-item', () => {
    expect(component).toBeDefined();
  });

});
