import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  @Output() sectionChange = new EventEmitter<'vehicles' | 'carparts' | 'blog' | 'login'>();

  selected: 'vehicles' | 'carparts' | 'blog' | 'login' = 'vehicles';

  select(section: 'vehicles' | 'carparts' | 'blog' | 'login') {
    this.selected = section;
    this.sectionChange.emit(section);
  }
}
