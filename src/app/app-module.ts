import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { HeroCube } from './components/hero-cube/hero-cube';
import { FeatureTabs } from './components/feature-tabs/feature-tabs';
import { Graphs } from './components/graphs/graphs';
import { Contact } from './components/contact/contact';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Sobre } from './pages/sobre/sobre';
import { Ecosistema } from './pages/ecosistema/ecosistema';

@NgModule({
  declarations: [App, Navbar],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeroCube,
    Home,
    FeatureTabs,
    Graphs,
    Contact,
    FontAwesomeModule,
    Sobre,
    Ecosistema
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
