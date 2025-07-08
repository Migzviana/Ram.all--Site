import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() onLogout = new EventEmitter<void>()
  @Output() viewChange = new EventEmitter<'all' | 'available' | 'range' | 'unavailable'>();

  constructor(private router: Router) {}

  switchView(view: 'all' | 'available' |'unavailable' | 'range' ) {
    this.viewChange.emit(view);
  }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.onLogout.emit();
  }
}
