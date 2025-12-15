import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faServer, faMicrochip, faMobileAlt, faBolt, faDollarSign, faLeaf, 
  faMemory, faThermometerHalf, faCamera, faWifi, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

interface HardwareSpec {
  label: string;
  value: string;
  icon: any;
}

interface HardwareItem {
  id: string;
  name: string;
  category: 'servers' | 'processors' | 'sbc_mobo' | 'devices';
  type: string; // e.g., 'x86', 'ARM', 'RISC-V'
  description: string;
  icon: any;
  specs: HardwareSpec[];
  metrics: {
    performance: number; // 0-100
    efficiency: number; // 0-100
    power: number; // 0-100 (Higher is more consumption)
    cost: number; // 0-100
  };
  features: string[];
}

@Component({
  selector: 'app-hardware-showcase',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './hardware-showcase.component.html',
  styleUrls: ['./hardware-showcase.component.scss']
})
export class HardwareShowcaseComponent implements OnInit {
  // Icons
  faServer = faServer;
  faMicrochip = faMicrochip;
  faMobileAlt = faMobileAlt;
  faBolt = faBolt;
  faDollarSign = faDollarSign;
  faLeaf = faLeaf;
  
  categories = [
    { id: 'servers', label: 'Servidores', icon: faServer },
    { id: 'processors', label: 'Processadores & Aceleradores', icon: faMicrochip },
    { id: 'sbc_mobo', label: 'SBCs & Placas-Mãe', icon: faLayerGroup },
    { id: 'devices', label: 'Dispositivos Especiais', icon: faMobileAlt }
  ];

  selectedCategory = 'servers';
  selectedItem: HardwareItem | null = null;

  items: HardwareItem[] = [
    // SERVERS
    {
      id: 'srv-x86',
      name: 'Enterprise x86 Server',
      category: 'servers',
      type: 'x86_64',
      description: 'Servidor de alta performance padrão da indústria. Ideal para cargas de trabalho legadas e virtualização pesada.',
      icon: faServer,
      specs: [
        { label: 'Arquitetura', value: 'x86 CISC', icon: faLayerGroup },
        { label: 'Cores', value: '128 Cores / 256 Threads', icon: faMicrochip },
        { label: 'RAM', value: 'Até 4TB DDR5', icon: faMemory }
      ],
      metrics: { performance: 95, efficiency: 60, power: 90, cost: 85 },
      features: ['Compatibilidade Universal', 'Ecossistema Maduro', 'Alto TDP (350W+)']
    },
    {
      id: 'srv-arm',
      name: 'Cloud Native ARM Server',
      category: 'servers',
      type: 'ARM64',
      description: 'Servidor otimizado para nuvem com alta densidade de núcleos e eficiência energética superior.',
      icon: faServer,
      specs: [
        { label: 'Arquitetura', value: 'ARM RISC', icon: faLayerGroup },
        { label: 'Cores', value: '192 Cores', icon: faMicrochip },
        { label: 'RAM', value: 'Até 2TB LPDDR5', icon: faMemory }
      ],
      metrics: { performance: 85, efficiency: 95, power: 50, cost: 70 },
      features: ['Alta Eficiência/Watt', 'Excelente para Microserviços', 'Baixo Custo Operacional']
    },
    {
      id: 'srv-riscv',
      name: 'Experimental RISC-V Node',
      category: 'servers',
      type: 'RISC-V',
      description: 'Plataforma de hardware aberto. Alta customização e ausência de royalties de licenciamento.',
      icon: faServer,
      specs: [
        { label: 'Arquitetura', value: 'RISC-V Open Source', icon: faLayerGroup },
        { label: 'Cores', value: '64 Cores Custom', icon: faMicrochip },
        { label: 'RAM', value: '512GB DDR4', icon: faMemory }
      ],
      metrics: { performance: 60, efficiency: 85, power: 40, cost: 40 },
      features: ['Hardware Open Source', 'Sem Royalties', 'Altamente Customizável']
    },

    // PROCESSORS
    {
      id: 'proc-mcu',
      name: 'Industrial MCU',
      category: 'processors',
      type: 'Microcontroller',
      description: 'Microcontrolador de ultra-baixo consumo para IoT e controle industrial em tempo real.',
      icon: faMicrochip,
      specs: [
        { label: 'Clock', value: '480 MHz', icon: faBolt },
        { label: 'SRAM', value: '2MB', icon: faMemory },
        { label: 'I/O', value: 'GPIO, I2C, SPI, CAN', icon: faWifi }
      ],
      metrics: { performance: 20, efficiency: 99, power: 5, cost: 10 },
      features: ['Tempo Real (RTOS)', 'Consumo em µW', 'Robusto']
    },
    {
      id: 'proc-gpu',
      name: 'AI Training GPU',
      category: 'processors',
      type: 'GPU',
      description: 'Acelerador gráfico massivamente paralelo focado em treinamento de Deep Learning.',
      icon: faLayerGroup,
      specs: [
        { label: 'VRAM', value: '80GB HBM3', icon: faMemory },
        { label: 'Tensor Cores', value: '512', icon: faMicrochip },
        { label: 'Bandwidth', value: '3.35 TB/s', icon: faBolt }
      ],
      metrics: { performance: 100, efficiency: 40, power: 100, cost: 100 },
      features: ['FP8/FP16 Acceleration', 'NVLink Interconnect', 'Massive Parallelism']
    },
    {
      id: 'proc-tpu',
      name: 'Edge TPU',
      category: 'processors',
      type: 'ASIC',
      description: 'Processador de tensores específico para inferência de IA na borda (Edge AI).',
      icon: faMicrochip,
      specs: [
        { label: 'TOPS', value: '4 TOPS', icon: faBolt },
        { label: 'Power', value: '2 Watts', icon: faLeaf },
        { label: 'Interface', value: 'M.2 / USB', icon: faWifi }
      ],
      metrics: { performance: 40, efficiency: 90, power: 10, cost: 30 },
      features: ['Inferência Local', 'Privacidade de Dados', 'Baixa Latência']
    },

    // SBCs & MOBOs
    {
      id: 'dev-sbc',
      name: 'High-End SBC',
      category: 'sbc_mobo',
      type: 'Single Board',
      description: 'Computador completo em placa única com NPU integrada para robótica e automação.',
      icon: faMicrochip,
      specs: [
        { label: 'CPU', value: 'Octa-core ARM', icon: faMicrochip },
        { label: 'NPU', value: '6 TOPS', icon: faBolt },
        { label: 'Connectivity', value: 'WiFi 6, BT 5.0', icon: faWifi }
      ],
      metrics: { performance: 50, efficiency: 80, power: 20, cost: 25 },
      features: ['GPIO Header', 'Camera Interface (CSI)', 'Formato Compacto']
    },
    {
      id: 'mobo-ws',
      name: 'Workstation Motherboard',
      category: 'sbc_mobo',
      type: 'E-ATX',
      description: 'Placa-mãe de nível entusiasta/profissional com suporte a múltiplos GPUs e expansão massiva.',
      icon: faLayerGroup,
      specs: [
        { label: 'Socket', value: 'LGA 4677', icon: faMicrochip },
        { label: 'PCIe', value: '7x PCIe 5.0 x16', icon: faBolt },
        { label: 'Network', value: 'Dual 10GbE', icon: faWifi }
      ],
      metrics: { performance: 90, efficiency: 50, power: 40, cost: 80 },
      features: ['VRM de 24 Fases', 'Suporte a ECC RAM', 'Remote Management (IPMI)']
    },

    // DEVICES
    {
      id: 'dev-phone-thermal',
      name: 'Rugged Thermal Phone',
      category: 'devices',
      type: 'Mobile',
      description: 'Smartphone robusto com câmera térmica FLIR integrada para inspeção industrial.',
      icon: faMobileAlt,
      specs: [
        { label: 'Sensor', value: 'FLIR Lepton 3.5', icon: faThermometerHalf },
        { label: 'Proteção', value: 'IP68 / MIL-STD-810H', icon: faLayerGroup },
        { label: 'Bateria', value: '6000mAh', icon: faBolt }
      ],
      metrics: { performance: 45, efficiency: 70, power: 15, cost: 60 },
      features: ['Visão Térmica', 'Resistência a Quedas', 'Botões Programáveis']
    },
    {
      id: 'dev-phone-lidar',
      name: 'LiDAR Scanner Phone',
      category: 'devices',
      type: 'Mobile',
      description: 'Dispositivo móvel com sensor LiDAR para mapeamento 3D e realidade aumentada precisa.',
      icon: faCamera,
      specs: [
        { label: 'Scanner', value: 'ToF LiDAR', icon: faLayerGroup },
        { label: 'Range', value: '5 metros', icon: faWifi },
        { label: 'Processamento', value: 'AR Engine', icon: faMicrochip }
      ],
      metrics: { performance: 75, efficiency: 65, power: 25, cost: 90 },
      features: ['Escaneamento 3D', 'Medição de Ambientes', 'AR Avançado']
    },
    {
      id: 'dev-ar-glasses',
      name: 'AR Smart Glasses',
      category: 'devices',
      type: 'Wearable',
      description: 'Óculos de Realidade Aumentada para assistência remota e visualização de dados industriais.',
      icon: faLayerGroup,
      specs: [
        { label: 'Display', value: 'Micro-OLED', icon: faBolt },
        { label: 'FOV', value: '52 Graus', icon: faCamera },
        { label: 'Peso', value: '75g', icon: faLeaf }
      ],
      metrics: { performance: 40, efficiency: 85, power: 10, cost: 95 },
      features: ['Hands-free Operation', 'Comandos de Voz', 'Heads-up Display']
    },
    {
      id: 'dev-tracker',
      name: 'Industrial Asset Tracker',
      category: 'devices',
      type: 'IoT',
      description: 'Rastreador de ativos de ultra-longa duração com conectividade satelital e celular.',
      icon: faWifi,
      specs: [
        { label: 'Rede', value: 'NB-IoT / Satélite', icon: faWifi },
        { label: 'Bateria', value: '5 Anos+', icon: faLeaf },
        { label: 'GPS', value: 'Multi-band GNSS', icon: faLayerGroup }
      ],
      metrics: { performance: 10, efficiency: 100, power: 2, cost: 20 },
      features: ['Global Coverage', 'IP69K Waterproof', 'Motion Detection']
    }
  ];

  constructor() {}

  ngOnInit() {
    this.selectedItem = this.items[0];
  }

  selectCategory(catId: string) {
    this.selectedCategory = catId;
    this.selectedItem = this.items.find(i => i.category === catId) || null;
  }

  get filteredItems() {
    return this.items.filter(i => i.category === this.selectedCategory);
  }

  getMetricColor(value: number, type: 'performance' | 'efficiency' | 'power' | 'cost'): string {
    if (type === 'power' || type === 'cost') {
      // Lower is better (usually, but here high power/cost is red)
      if (value > 75) return 'bg-red-500';
      if (value > 40) return 'bg-yellow-500';
      return 'bg-green-500';
    } else {
      // Higher is better
      if (value > 75) return 'bg-green-500';
      if (value > 40) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  }
}
