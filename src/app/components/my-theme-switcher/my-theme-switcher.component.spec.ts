import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../material.module';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyThemeSwitcherComponent } from '../my-theme-switcher/my-theme-switcher.component';

describe('MyThemeSwitcherComponent', () => {

  let component: MyThemeSwitcherComponent;
  let fixture: ComponentFixture<MyThemeSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [ MyThemeSwitcherComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should contain "Theme Switcher"', () => {
    const matlabelDe: DebugElement = fixture.debugElement;
    const matlabelEl: HTMLElement = matlabelDe.nativeElement;
    const matlabel = matlabelEl.querySelector('mat-label');
    expect(matlabel.textContent).toEqual('Theme Switcher');
  });

  it('should create one mat-option for each theme', () => {
    fixture.detectChanges();
    const matselectDe: DebugElement = fixture.debugElement;
    const matselectEl: HTMLElement = matselectDe.nativeElement;
    const matselect = matselectDe.query(By.css('.mat-select-trigger'));
    matselect.triggerEventHandler('click', null);
    fixture.detectChanges();
    const matoptionDe: DebugElement = fixture.debugElement;
    const matoptionEl: HTMLElement = matoptionDe.nativeElement;
    const matoption = matoptionDe.queryAll(By.css('.mat-option'));
    expect(matoption.length).toBe(19);
  })

});
