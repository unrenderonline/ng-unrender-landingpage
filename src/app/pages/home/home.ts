import { Component } from '@angular/core';
import { HeroCube } from '../../components/hero-cube/hero-cube';
import { FeatureTabs } from '../../components/feature-tabs/feature-tabs';
import { Graphs } from '../../components/graphs/graphs';
import { Contact } from '../../components/contact/contact';
declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroCube, FeatureTabs, Graphs, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  ngAfterViewInit(): void {
    // Procura por todos os elementos com o atributo [data-bs-toggle="tooltip"]
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    // Inicializa cada um deles
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}
