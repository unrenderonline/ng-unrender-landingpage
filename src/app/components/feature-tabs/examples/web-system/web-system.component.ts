import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faChartLine, faChartPie, faUsers, faDollarSign, faShoppingCart, faSearch, faBell, faEnvelope, 
  faUserCircle, faHome, faBox, faCog, faSignOutAlt, faEllipsisV, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-web-system',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './web-system.component.html',
  styleUrls: ['./web-system.component.scss']
})
export class WebSystemComponent implements OnInit {
  // Icons
  faChartLine = faChartLine;
  faChartPie = faChartPie;
  faUsers = faUsers;
  faDollarSign = faDollarSign;
  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  faBell = faBell;
  faEnvelope = faEnvelope;
  faUserCircle = faUserCircle;
  faHome = faHome;
  faBox = faBox;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faEllipsisV = faEllipsisV;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  // Data
  stats = [
    { label: 'Receita Total', value: 'R$ 54.230', change: '+12%', isPositive: true, icon: faDollarSign, color: 'green' },
    { label: 'Novos Usuários', value: '1,245', change: '+5%', isPositive: true, icon: faUsers, color: 'blue' },
    { label: 'Vendas', value: '890', change: '-2%', isPositive: false, icon: faShoppingCart, color: 'orange' },
    { label: 'Taxa de Conversão', value: '3.45%', change: '+0.5%', isPositive: true, icon: faChartPie, color: 'purple' }
  ];

  recentOrders = [
    { id: '#ORD-001', customer: 'João Silva', product: 'Licença Premium', date: '11 Dez 2025', status: 'Concluído', amount: 'R$ 120,00' },
    { id: '#ORD-002', customer: 'Maria Santos', product: 'Plano Básico', date: '11 Dez 2025', status: 'Pendente', amount: 'R$ 45,00' },
    { id: '#ORD-003', customer: 'Pedro Oliveira', product: 'Consultoria', date: '10 Dez 2025', status: 'Processando', amount: 'R$ 350,00' },
    { id: '#ORD-004', customer: 'Ana Costa', product: 'Licença Enterprise', date: '10 Dez 2025', status: 'Concluído', amount: 'R$ 990,00' },
    { id: '#ORD-005', customer: 'Lucas Pereira', product: 'Suporte Técnico', date: '09 Dez 2025', status: 'Cancelado', amount: 'R$ 80,00' }
  ];

  chartBars = [45, 70, 30, 60, 50, 85, 40, 65, 55, 75, 45, 60];

  ngOnInit() {
  }
}
