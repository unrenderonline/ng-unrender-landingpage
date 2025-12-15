import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faSearch, faServer, faDesktop, faNetworkWired, faMicrochip, faCheck, faShoppingCart, faHeadset, faTools
} from '@fortawesome/free-solid-svg-icons';

interface HardwareItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  image: string;
  priceRange: string;
  readyToUse: boolean;
}

@Component({
  selector: 'app-hardware-consulting',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './hardware-consulting.component.html',
  styleUrls: ['./hardware-consulting.component.scss']
})
export class HardwareConsultingComponent implements OnInit {
  // Icons
  faSearch = faSearch;
  faServer = faServer;
  faDesktop = faDesktop;
  faNetworkWired = faNetworkWired;
  faMicrochip = faMicrochip;
  faCheck = faCheck;
  faShoppingCart = faShoppingCart;
  faHeadset = faHeadset;
  faTools = faTools;

  categories = [
    { id: 'all', name: 'Todos', icon: faSearch },
    { id: 'servers', name: 'Servidores', icon: faServer },
    { id: 'workstations', name: 'Workstations', icon: faDesktop },
    { id: 'networking', name: 'Redes', icon: faNetworkWired },
    { id: 'iot', name: 'IoT & Edge', icon: faMicrochip }
  ];

  selectedCategory = 'all';
  searchQuery = '';

  hardwareList: HardwareItem[] = [
    {
      id: 'srv-ai-01',
      name: 'AI Training Server Cluster',
      category: 'servers',
      description: 'Cluster de alta performance pré-configurado para treinamento de LLMs e Visão Computacional.',
      specs: ['4x NVIDIA H100', '2x AMD EPYC 9654', '2TB RAM DDR5', '100GbE Networking'],
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=300&h=200',
      priceRange: 'Sob Consulta',
      readyToUse: true
    },
    {
      id: 'ws-dev-01',
      name: 'DevOps PowerStation',
      category: 'workstations',
      description: 'Workstation otimizada para compilação de código e virtualização pesada.',
      specs: ['Intel Core i9-14900K', '128GB RAM', '4TB NVMe Gen5', 'RTX 4090'],
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300&h=200',
      priceRange: 'R$ 25.000 - R$ 35.000',
      readyToUse: true
    },
    {
      id: 'net-corp-01',
      name: 'Enterprise Network Kit',
      category: 'networking',
      description: 'Solução completa de rede para escritórios de médio porte com segurança avançada.',
      specs: ['Firewall Next-Gen', 'Switch 48p PoE+', 'Wi-Fi 6E APs', 'Gerenciamento Cloud'],
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=300&h=200',
      priceRange: 'R$ 15.000 - R$ 25.000',
      readyToUse: true
    },
    {
      id: 'iot-ind-01',
      name: 'Industrial IoT Gateway',
      category: 'iot',
      description: 'Gateway robusto para coleta de dados em chão de fábrica com suporte a protocolos industriais.',
      specs: ['Fanless Design', 'Dual LAN', '4G/5G Support', 'Modbus/OPC UA'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=200',
      priceRange: 'R$ 3.000 - R$ 5.000',
      readyToUse: false
    },
    {
      id: 'srv-store-01',
      name: 'Storage Server High-Density',
      category: 'servers',
      description: 'Servidor de armazenamento para backup e arquivamento de dados massivos.',
      specs: ['36x HDD Bays', 'Dual Xeon Silver', '256GB RAM', '100TB Raw Storage'],
      image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=300&h=200',
      priceRange: 'Sob Consulta',
      readyToUse: false
    }
  ];

  filteredList: HardwareItem[] = [];

  ngOnInit() {
    this.filterItems();
  }

  selectCategory(catId: string) {
    this.selectedCategory = catId;
    this.filterItems();
  }

  filterItems() {
    this.filteredList = this.hardwareList.filter(item => {
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.filterItems();
  }
}
