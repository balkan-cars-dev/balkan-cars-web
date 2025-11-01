import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentViewSource = new BehaviorSubject<string>('car');
  currentView$ = this.currentViewSource.asObservable();

  setView(view: string) {
    this.currentViewSource.next(view);
  }
}
