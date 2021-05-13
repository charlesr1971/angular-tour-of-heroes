import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from '../../routes';
import reducer from '../../reducers';
import { EffectsModule } from '@ngrx/effects';

import { loadHeroesReducer } from '../../reducers/hero-list.reducer';
import { HeroService } from '../../services/hero';
import { HeroEffects } from '../../effects';
import { HttpService } from '../../services/http.service';

import { DashboardComponent } from './dashboard.component';
import { HeroesModule } from '../../components';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let testHttpService = HttpService;

  beforeEach( () => {
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
        routing,
        HttpClientModule,
        HttpClientJsonpModule,
        HeroesModule,
      ],
      declarations: [
        DashboardComponent,
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        },
        HeroService,
        HttpService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
    testHttpService = TestBed.get(HttpService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "Top Heroes"', () => {
    const matcardDe: DebugElement = fixture.debugElement;
    const matcardEl: HTMLElement = matcardDe.nativeElement;
    const matcard = matcardEl.querySelector('.field-switcher-container');
    expect(matcard.textContent).toEqual('Top Heroes');
  });

  it('should create one mat-list-item for each hero', (done: DoneFn) => {
    inject([HttpService], (injectService: HttpService) => {
      injectService.readHero(1,0).subscribe(
        (heroes) => {
          if(heroes){
            const length = heroes.length;
            expect(length).toBe(heroes.length);
            done();
          }
        }
      )
    })();
  });

});
