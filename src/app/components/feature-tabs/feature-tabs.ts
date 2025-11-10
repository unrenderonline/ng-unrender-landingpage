import { NgSwitch } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

// Interface para definir a estrutura de um item do menu
interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  parallaxTitle?: string;
}

@Component({
  selector: 'app-feature-tabs',
  standalone: true,
  imports: [],
  templateUrl: './feature-tabs.html',
  styleUrls: ['./feature-tabs.scss', './ar-parallax.scss'],
})
export class FeatureTabs implements OnInit {
  ngOnInit(): void {}
  activeTab: string = 'design';

  // Parallax properties
  handTransform: string = 'translate(0px, 0px)';
  sofaTransform: string = 'translate(0px, 0px)';
  sofaPosition = { x: 377, y: 420 };
  handPosition = { x: 400, y: 450 };
  mouseX: number = 0;
  mouseY: number = 0;
  deviceOrientation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };

  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  // Menu items para Desenvolvimento de Software
  developmentMenuItems: MenuItem[] = [
    {
      id: 'web-mobile',
      title: 'Web e Mobile',
      subtitle: 'Aplicações Modernas',
      description: 'Desenvolvemos aplicações web e mobile responsivas com foco na experiência do usuário.',
    },
    {
      id: 'ai-solutions',
      title: 'Soluções com IA',
      subtitle: 'Inteligência Artificial',
      description: 'Implementamos soluções avançadas com inteligência artificial para automação e controle.',
    },
    {
      id: 'custom-systems',
      title: 'Sistemas Customizados',
      subtitle: 'Soluções Sob Medida',
      description: 'Criamos sistemas personalizados para atender às necessidades específicas do seu negócio.',
    },
  ];

  // Menu items para Infraestrutura On-Premise
  infrastructureMenuItems: MenuItem[] = [
    {
      id: 'planning',
      title: 'Planejamento',
      subtitle: 'Análise e Estruturação',
      description: 'Analisamos suas necessidades e planejamos a infraestrutura ideal para seu ambiente.',
    },
    {
      id: 'implementation',
      title: 'Implementação',
      subtitle: 'Instalação e Configuração',
      description: 'Implementamos e configuramos toda a infraestrutura de forma segura e eficiente.',
    },
    {
      id: 'maintenance',
      title: 'Manutenção',
      subtitle: 'Suporte Contínuo',
      description: 'Oferecemos suporte e manutenção contínua para garantir a estabilidade do sistema.',
    },
  ];

  // Menu items para Soluções 3D e Games
  designMenuItems: MenuItem[] = [
    {
      id: 'augmented-reality',
      title: 'Realidade Aumentada',
      subtitle: 'Integração Digital',
      description:
        'Integramos o mundo digital ao real, criando experiências interativas e imersivas para seus clientes.',
      imageUrl:
        'https://images.unsplash.com/photo-1584984711535-6b6a5a3a0b17?q=80&w=1998&auto=format&fit=crop',
    },
    {
      id: 'virtual-reality',
      title: 'Realidade Virtual',
      subtitle: 'Imersão Total',
      description:
        'Transporte seus usuários para universos virtuais completos com nossos tours 360° e simulações.',
      parallaxTitle: 'Experiência Imersiva',
    },
    {
      id: '3d-modeling',
      title: 'Modelagem 3D',
      subtitle: 'Criação Digital',
      description:
        'Criamos objetos e personagens 3D de alta fidelidade para jogos, animações e visualizações de produtos.',
    },
    {
      id: 'gamification',
      title: 'Gamificação',
      subtitle: 'Engajamento Interativo',
      description:
        'Aplicamos mecânicas de jogos para engajar usuários e motivar ações de forma lúdica e eficiente.',
      imageUrl:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 'productions',
      title: 'Produções',
      subtitle: 'Vídeos e Drones',
      description:
        'Produzimos conteúdo audiovisual de alto impacto, incluindo filmagens aéreas com drones.',
      parallaxTitle: 'Visão Aérea',
    },
  ];

  // Armazena os itens do menu atualmente selecionados para cada tab
  selectedDevelopmentItem: MenuItem = this.developmentMenuItems[0];
  selectedInfrastructureItem: MenuItem = this.infrastructureMenuItems[0];
  selectedDesignItem: MenuItem = this.designMenuItems[0];

  selectDevelopmentContent(item: MenuItem): void {
    this.selectedDevelopmentItem = item;
  }

  selectInfrastructureContent(item: MenuItem): void {
    this.selectedInfrastructureItem = item;
  }

  selectDesignContent(item: MenuItem): void {
    this.selectedDesignItem = item;
  }

  @HostListener('window:deviceorientation', ['$event'])
  onWindowDeviceOrientation(event: DeviceOrientationEvent): void {
    this.onDeviceOrientation(event);
  }

  // Parallax methods
  onMouseMove(event: MouseEvent): void {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    this.mouseX = (event.clientX - rect.left - centerX) / centerX;
    this.mouseY = (event.clientY - rect.top - centerY) / centerY;

    this.updateParallax();
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const container = event.currentTarget as HTMLElement;
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      this.mouseX = (event.touches[0].clientX - rect.left - centerX) / centerX;
      this.mouseY = (event.touches[0].clientY - rect.top - centerY) / centerY;

      this.updateParallax();
    }
  }

  onDeviceOrientation(event: DeviceOrientationEvent): void {
    if (event.gamma !== null && event.beta !== null) {
      this.deviceOrientation.x = event.gamma / 90; // -1 to 1
      this.deviceOrientation.y = event.beta / 90; // -1 to 1
      this.deviceOrientation.z = event.alpha ? event.alpha / 360 : 0;

      this.updateParallax();
    }
  }

  private updateParallax(): void {
    // Hand parallax - subtle movement
    const handOffsetX = this.mouseX * 10 + this.deviceOrientation.x * 5;
    const handOffsetY = this.mouseY * 10 + this.deviceOrientation.y * 5;
    this.handTransform = `translate(${handOffsetX}px, ${handOffsetY}px)`;

    // Sofa parallax - more movement but constrained
    const sofaOffsetX = this.mouseX * 15 + this.deviceOrientation.x * 8;
    const sofaOffsetY = this.mouseY * 15 + this.deviceOrientation.y * 8;
    this.sofaTransform = `translate(${sofaOffsetX}px, ${sofaOffsetY}px)`;
  }
}
