import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { PreloaderService } from './services/preloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuizApp';

  constructor(private router: Router, private preloaderService: PreloaderService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.preloaderService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.preloaderService.hide();
      }
    });
  }
}
