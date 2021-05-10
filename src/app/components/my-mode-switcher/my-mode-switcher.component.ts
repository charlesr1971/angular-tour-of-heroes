import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeMode } from '../../app-state/actions/modeSwitcher.actions';

interface MaterialMode {
  id: number;
  title: string;
}

@Component({
  selector: 'app-my-mode-switcher',
  templateUrl: './my-mode-switcher.component.html',
  styleUrls: ['./my-mode-switcher.component.css']
})
export class MyModeSwitcherComponent implements OnInit {

  private debug = false;

  private modeSwitch$: Observable<number>;
  title = 'dark';
  materialModes: Array<MaterialMode> = [];
  selectionId  = 1;
  selectionTitle = 'dark';
  selected = 0;

  constructor(private store: Store<{ modeSwitch: number }>) {
    this.modeSwitch$ = store.select('modeSwitch');
    this.materialModes.push({
      id: 1,
      title: 'dark'
    });
    this.materialModes.push({
      id: 2,
      title: 'light'
    });
  }

  changeMode( event: any ): void {
    const id: number = event.value;
    if (this.debug) {
      console.log('my-mode-switcher.component: id: ', id);
    }
    this.store.dispatch(changeMode({ id }));
    this.selectionId = id;
    if (id === 1) {
      this.selectionTitle = 'dark';
    }
    else {
      this.selectionTitle = 'light';
    }
  }

  ngOnInit(): void {
    this.store.select('modeSwitch').subscribe( ( id ) => {
      if (id === 1) {
        this.title = 'dark';
        this.selected = 1;
        this.selectionTitle = 'dark';
        this.selectionId = 1;
      }
      else {
        this.title = 'light';
        this.selected = 2;
        this.selectionTitle = 'light';
        this.selectionId = 2;
      }
    });
  }

}
