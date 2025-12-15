import { Component, signal, inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-unrender-landing-page');
  protected readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter((e) => [
        NavigationStart,
        NavigationEnd,
        NavigationError,
        NavigationCancel
      ].some((constructor) => e instanceof constructor)),
      tap((e) => {
        if (e instanceof NavigationStart) {
          this.loadingService.startNavigation();
        } else {
          this.loadingService.endNavigation();
        }
      })
    ).subscribe();
  }
}
