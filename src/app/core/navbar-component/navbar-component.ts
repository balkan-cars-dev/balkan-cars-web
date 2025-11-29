import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})

export class NavbarComponent {

  @Output() sectionChange = new EventEmitter<'vehicles' | 'add' | 'carparts' | 'blog' | 'login'>();

  selected: 'vehicles' | 'add' | 'carparts' | 'blog' | 'login' = 'vehicles';

  select(section: 'vehicles' | 'add' | 'carparts' | 'blog' | 'login') {
    this.selected = section;
    this.sectionChange.emit(section);
  }
}
