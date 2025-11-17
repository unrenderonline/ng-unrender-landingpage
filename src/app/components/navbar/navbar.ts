import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isScrolled = false;
  isMobileMenuOpen = false;

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
}
