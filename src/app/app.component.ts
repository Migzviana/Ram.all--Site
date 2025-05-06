import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private titleService: Title, private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('login')) {
        this.titleService.setTitle('Ram.all - Login');
      } else if (currentRoute.includes('signup')) {
        this.titleService.setTitle('Ram.all - Cadastro');
      } else if (currentRoute.includes('home')) {
        this.titleService.setTitle('Ram.all - Ramais');
      }
    });
  }
}