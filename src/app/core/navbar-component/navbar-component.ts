import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss'
})
export class NavbarComponent {

  @Output() sectionChange = new EventEmitter<'vehicles' | 'carparts' | 'blog' | 'add'>();

selected: 'vehicles' | 'carparts' | 'blog' | 'add' = 'vehicles';

select(section: 'vehicles' | 'carparts' | 'blog' | 'add') {
  this.selected = section;
  this.sectionChange.emit(section);
}
}
