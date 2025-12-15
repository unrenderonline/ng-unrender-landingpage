import { Component, HostListener, inject, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isScrolled = false;
  isMobileMenuOpen = false;
  protected readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // A transição acontece quando passa da seção hero-cube estendida
    // A seção agora vai até o título (100vh + 80px de extensão - 100px do título sobreposto)
    // Navbar muda quando passa do título branco
    const heroSectionHeight = window.innerHeight + 80 - 100; // calc(100vh + 80px - 100px)
    this.isScrolled = window.scrollY > heroSectionHeight;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  handleNavigation(event: Event, path: string, fragment?: string) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const urlTree = this.router.createUrlTree([path]);
    const isActive = this.router.isActive(urlTree, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });

    if (isActive) {
      this.router.navigate([path], { fragment });
      return;
    }

    this.loadingService.startNavigation();
    this.cdr.detectChanges();

    // Allow two frames for the spinner to paint before navigation begins.
    // First rAF: schedule after current event; second rAF: ensure paint; then navigate.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.router.navigate([path], { fragment })
          .then(() => {
            // Ensure spinner is turned off if navigation finishes or is skipped (e.g. same URL)
            this.loadingService.endNavigation();
          })
          .catch(() => {
            this.loadingService.endNavigation();
          });
      });
    });
  }
}
