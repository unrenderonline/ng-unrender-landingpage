import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private navLoading = signal(false);
  private requestCount = signal(0);
  
  readonly isLoading = computed(() => this.navLoading() || this.requestCount() > 0);

  // Called by Router and Navbar
  startNavigation() {
    this.navLoading.set(true);
  }

  endNavigation() {
    this.navLoading.set(false);
  }

  // Called by components (e.g. 3D scene)
  show() {
    this.requestCount.update(c => c + 1);
  }

  hide() {
    this.requestCount.update(c => Math.max(0, c - 1));
  }
}
