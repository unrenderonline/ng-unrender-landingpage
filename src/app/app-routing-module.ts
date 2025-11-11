import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre').then((m) => m.Sobre),
  },
  {
    path: 'ecossistema ',
    loadComponent: () => import('./pages/ecosistema/ecosistema').then((m) => m.Ecosistema),
  },
  { path: '**', redirectTo: 'inicio' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
