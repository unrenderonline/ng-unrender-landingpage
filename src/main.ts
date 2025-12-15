import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app-module';

// Polyfills for browser environment
(window as any).global = window;
(window as any).process = { env: { DEBUG: undefined }, version: '' };
(window as any).__dirname = '/';
(window as any).Buffer = (window as any).Buffer || [];

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
