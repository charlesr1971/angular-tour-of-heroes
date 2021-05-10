import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'rx-hero-list',
    templateUrl: './hero-list.component.html',
    styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent {
    @Input() heroes;
    @Input() selectedHero;

    @Output() selectEvnt = new EventEmitter();
    @Output() deleteEvnt = new EventEmitter();

    delete($event, hero) {
        $event.stopPropagation();
        this.deleteEvnt.emit(hero);
    }
}
