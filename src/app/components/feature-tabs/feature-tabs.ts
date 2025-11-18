import { NgSwitch, NgComponentOutlet, NgClass } from '@angular/common';
import { Component, OnInit, HostListener, AfterViewInit, ElementRef, ViewChild, OnDestroy, Type } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ResponsiveDemoComponent } from '../responsiveDemo/responsive-demo.component';
import { ThreeDAnimationDemoComponent } from '../3d-animation/3d-animation.component';
import { GalagaArcadeComponent } from '../galaga-game/galaga-game.component';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';

// Interface para definir a estrutura de uma feature
interface Feature {
  name: string;
  imageUrl?: string; // Square image
  gifUrl?: string; // Widescreen GIF
  customHtml?: string; // Custom HTML content (pure HTML string)
  customComponent?: Type<any>; // Custom Angular component
  customComponentInputs?: Record<string, any>; // Inputs to pass to the custom component
  iframeUrl?: string; // URL for iframe display
  iframeHeight?: string; // Height for iframe (e.g., '400px', '50vh')
  iframeWidth?: string; // Width for iframe (e.g., '100%', '800px')
}

// Interface for carousel banner images
interface CarouselImage {
  url: string;
  link: string;
  alt: string;
}

// Interface para definir a estrutura de um item do menu
interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  carouselImages?: CarouselImage[]; // Multiple banner images with links
  imageUrl?: string; // Deprecated - kept for backward compatibility
  gifUrl?: string; // Deprecated - kept for backward compatibility
  parallaxTitle?: string;
  features?: Feature[];
}

@Component({
  selector: 'app-feature-tabs',
  standalone: true,
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './feature-tabs.html',
  styleUrls: ['./feature-tabs.scss'],
})
export class FeatureTabs implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contentArea') contentArea!: ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  // Carousel state management
  currentSlideIndex: { [key: string]: number } = {};
  carouselIntervals: { [key: string]: any } = {};

  ngOnInit(): void {
    // Initialize carousel for all menu items
    this.initializeCarousels();
  }

  ngAfterViewInit(): void {
    this.animateContentEntry();
  }

  activeTab: string = 'development';

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

    // Always select the first menu item when switching to a tab
    if (tabId === 'development') {
      this.selectedDevelopmentItem = this.developmentMenuItems[0];
      this.animateContentEntry();
    } else if (tabId === 'infrastructure') {
      this.selectedInfrastructureItem = this.infrastructureMenuItems[0];
      this.animateContentEntry();
    } else if (tabId === 'design') {
      this.selectedDesignItem = this.designMenuItems[0];
      this.animateContentEntry();
    }

    // On mobile, scroll to the tab header smoothly after a short delay to allow content to render
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Find the active tab header
        const activeTabElement = document.querySelector(`.accordion-tab-wrapper .tab-item.active`);
        if (activeTabElement) {
          const headerOffset = 80; // Offset for fixed headers if any
          const elementPosition = activeTabElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  }

  // Menu items para Desenvolvimento de Software
  developmentMenuItems: MenuItem[] = [
    {
      id: 'web-mobile',
      title: 'Landing Pages',
      subtitle: 'ÚNICAS! COMO O SEU NEGÓCIO!',
      description: 'Criamos experiências únicas, criativas e responsivas que levam seu negócio a todos os dispositivos.',
      carouselImages: [
        {
          url: '/webdev.jpg',
          link: 'https://unrender.online',
          alt: 'Desenvolvimento Web e Mobile'
        },
        {
          url: '/mvp-dev.jpg',
          link: 'https://unrender.online',
          alt: 'MVP Development'
        },
        {
          url: '/aqui-shopping-f.png',
          link: 'https://unrender.online',
          alt: 'Aqui Shopping - E-commerce Solution'
        }
      ],
      features: [
        {
          name: 'Gamificação',
          customComponent: GalagaArcadeComponent,
        },
        {
          name: 'Tecnologias de Alta Performance',
          imageUrl: '/stack.gif'
        },
        {
          name: 'Responsividade',
          customComponent: ResponsiveDemoComponent,
        },
        {
          name: 'WebGL & 3D',
        customComponent:  ThreeDAnimationDemoComponent,
        },
        {
          name: 'E-commerce & Landing Pages',
          imageUrl: '/aqui-shopping1.png'
        },
        {
          name: 'Sistemas Web Corporativos',
          imageUrl: '/cronos-png.png'
        }
      ]
    },
    {
      id: 'ai-solutions',
      title: 'Inteligência Artificial',
      subtitle: 'Inteligência Artificial realmente inteligente!',
      description: 'Implementamos soluções avançadas com inteligência artificial para automação e controle.',
      carouselImages: [
        {
          url: '/sobreAI.jpg',
          link: 'https://unrender.online',
          alt: 'Soluções de IA'
        },
        {
          url: '/aiot.jpg',
          link: 'https://unrender.online',
          alt: 'AIoT - AI + Internet of Things'
        },
        {
          url: '/comma4.png',
          link: 'https://unrender.online',
          alt: 'Veículos Autônomos'
        }
      ],
      features: [
        {
          name: 'Chatbot e Assistentes Virtuais com IA. Inteligente de verdade!',
          customComponent: ChatWidgetComponent,
        },
        {
          name: 'Sistemas com ferramentas integradas com IA, de forma útil.',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'Processamento de Linguagem Natural',
          gifUrl: '/PLN.gif'
        },
        {
          name: 'Chatbots e Assistentes Virtuais',
          imageUrl: '/mimir-png.png'
        },
        {
          name: 'Visão Computacional',
          gifUrl: '/opencv.gif'
        },

        {
          name: 'Veículos Autônomos',
          gifUrl: '/commai1.gif'
        },
        {
          name: 'Automação Inteligente',
          imageUrl: '/hermes-png.png'
        }
      ]
    },
    {
      id: 'web-apps',
      title: 'Sistemas Web',
      subtitle: 'Criamos seu Sistemas Web',
      description: 'E-Commerce, Automação, Gerenciamento, Integração com API´s e Sistemas.',
      carouselImages: [
        {
          url: '/sobreERP.jpg',
          link: 'https://unrender.online',
          alt: 'Sistemas ERP'
        },
        {
          url: '/cronos-png.png',
          link: 'https://unrender.online',
          alt: 'Cronos - Sistema Customizado'
        },
        {
          url: '/billdog-png.png',
          link: 'https://unrender.online',
          alt: 'Billdog - Sistema de Gestão'
        }
      ],
      features: [
        {
          name: 'Progressive Web Apps (PWA)',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'Responsividade',
          customComponent: ResponsiveDemoComponent,
        },
        {
          name: 'Progressive Web Apps (PWA)',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'WebAssembly (WASM)',
          imageUrl: '/papiro-png.png'
        }
      ]
    },
    {
      id: 'mobile-apps',
      title: 'Aplicativos Mobile',
      subtitle: 'Soluções Sob Medida',
      description: 'Criamos sistemas personalizados para atender às necessidades específicas do seu negócio.',
      carouselImages: [
        {
          url: '/sobreERP.jpg',
          link: 'https://unrender.online',
          alt: 'Sistemas ERP'
        },
        {
          url: '/cronos-png.png',
          link: 'https://unrender.online',
          alt: 'Cronos - Sistema Customizado'
        },
        {
          url: '/billdog-png.png',
          link: 'https://unrender.online',
          alt: 'Billdog - Sistema de Gestão'
        }
      ],
      features: [
        {
          name: 'Software Desktop',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'Migração de Sistemas',
          imageUrl: '/papiro-png.png'
        }
      ]
    },
    {
      id: 'desktop-apps',
      title: 'Software Desktop',
      subtitle: 'Soluções Sob Medida',
      description: 'Criamos sistemas personalizados para atender às necessidades específicas do seu negócio.',
      carouselImages: [
        {
          url: '/sobreERP.jpg',
          link: 'https://unrender.online',
          alt: 'Sistemas ERP'
        },
        {
          url: '/cronos-png.png',
          link: 'https://unrender.online',
          alt: 'Cronos - Sistema Customizado'
        },
        {
          url: '/billdog-png.png',
          link: 'https://unrender.online',
          alt: 'Billdog - Sistema de Gestão'
        }
      ],
      features: [
        {
          name: 'Software Desktop',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'Migração de Sistemas',
          imageUrl: '/papiro-png.png'
        }
      ]
    },
    {
      id: 'custom-systems',
      title: 'Sistemas Customizados',
      subtitle: 'Soluções Sob Medida',
      description: 'Criamos sistemas personalizados para atender às necessidades específicas do seu negócio.',
      carouselImages: [
        {
          url: '/sobreERP.jpg',
          link: 'https://unrender.online',
          alt: 'Sistemas ERP'
        },
        {
          url: '/cronos-png.png',
          link: 'https://unrender.online',
          alt: 'Cronos - Sistema Customizado'
        },
        {
          url: '/billdog-png.png',
          link: 'https://unrender.online',
          alt: 'Billdog - Sistema de Gestão'
        }
      ],
      features: [
        {
          name: 'Software Desktop',
          imageUrl: '/controlb-png.png'
        },
        {
          name: 'Sistemas ERP/CRM',
          imageUrl: '/cronos-png.png'
        },
        {
          name: 'Integrações API',
          imageUrl: '/hermes-png.png'
        },
        {
          name: 'MVPs Rápidos',
          imageUrl: '/billdog-png.png'
        },
        {
          name: 'Migração de Sistemas',
          imageUrl: '/papiro-png.png'
        }
      ]
    },
  ];

  // Menu items para Infraestrutura On-Premise
  infrastructureMenuItems: MenuItem[] = [
    {
      id: 'hardware-consulting',
      title: 'Consultoria de Hardware',
      subtitle: 'Análise e Assessoria Técnica',
      description: 'Prestamos consultoria especializada, levantamos preços e intermediamos compra e venda de equipamentos.',
      carouselImages: [
        {
          url: '/consulting.jpg',
          link: 'https://unrender.online',
          alt: 'Consultoria de Hardware'
        },
        {
          url: '/server.jpg',
          link: 'https://unrender.online',
          alt: 'Servidores e Infraestrutura'
        },
        {
          url: '/support.jpg',
          link: 'https://unrender.online',
          alt: 'Suporte Técnico'
        }
      ],
      features: [
        {
          name: 'Análise de Necessidades',
          imageUrl: '/consulting.jpg'
        },
        {
          name: 'Levantamento de Preços',
          imageUrl: '/temis-png.png'
        },
        {
          name: 'Intermediação de Compra e Venda',
          customHtml: `
            <div style="display: flex; align-items: center; justify-content: space-around; padding: 2rem;">
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 0.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>
                <div style="font-weight: bold; color: #667eea;">Comprador</div>
              </div>
              <div style="font-size: 2rem; color: #f97316;">⟷</div>
              <div style="text-align: center;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 50%; margin: 0 auto 0.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>
                <div style="font-weight: bold; color: #f5576c;">Vendedor</div>
              </div>
            </div>
          `
        },
        {
          name: 'Especificação Técnica',
          imageUrl: '/server.jpg'
        },
        {
          name: 'Negociação com Fornecedores',
          imageUrl: '/support.jpg'
        }
      ]
    },
    {
      id: 'commercial-automation',
      title: 'Automação Comercial',
      subtitle: 'Soluções para Varejo',
      description: 'Soluções completas de PDV, monitores touchscreen e totens para automação do seu negócio.',
      carouselImages: [
        {
          url: '/sobrePDV.jpg',
          link: 'https://unrender.online',
          alt: 'Sistemas PDV'
        },
        {
          url: '/qotar-png.png',
          link: 'https://unrender.online',
          alt: 'Qotar - Sistema de Vendas'
        },
        {
          url: '/pequi-png.png',
          link: 'https://unrender.online',
          alt: 'Pequi - Automação Comercial'
        }
      ],
      features: [
        {
          name: 'Sistemas PDV (Ponto de Venda)',
          imageUrl: '/qotar-png.png'
        },
        {
          name: 'Monitores Touchscreen',
          gifUrl: '/echoshow feature.gif'
        },
        {
          name: 'Totens de Autoatendimento',
          imageUrl: '/pequi-png.png'
        },
        {
          name: 'Impressoras Fiscais',
          imageUrl: '/sobrePDV.jpg'
        },
        {
          name: 'Leitores de Código de Barras',
          imageUrl: '/gps.png'
        }
      ]
    },
    {
      id: 'ai-servers',
      title: 'Servidores de IA',
      subtitle: 'Treinamento e Inferência',
      description: 'Servidores especializados para treinamento de modelos e inferência de IA, incluindo soluções AI on-device.',
      carouselImages: [
        {
          url: '/server.jpg',
          link: 'https://unrender.online',
          alt: 'Servidores de IA'
        },
        {
          url: '/aiot.jpg',
          link: 'https://unrender.online',
          alt: 'AIoT Solutions'
        },
        {
          url: '/sobreAI.jpg',
          link: 'https://unrender.online',
          alt: 'Inteligência Artificial'
        }
      ],
      features: [
        {
          name: 'Servidores para Treinamento',
          imageUrl: '/server.jpg'
        },
        {
          name: 'Servidores para Inferência',
          imageUrl: '/aiot.jpg'
        },
        {
          name: 'IA Embarcada (AI Embedded)',
          customHtml: `
            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 2rem;">
              <div style="position: relative;">
                <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1rem; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);"></div>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem;">🧠</div>
              </div>
              <div style="font-size: 2rem; color: #f97316;">→</div>
              <div style="position: relative;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 0.5rem; box-shadow: 0 6px 15px rgba(245, 87, 108, 0.4);"></div>
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 2rem;">📱</div>
              </div>
            </div>
          `
        },
        {
          name: 'IA On-Device',
          imageUrl: '/comma4.png'
        },
        {
          name: 'GPUs e TPUs Especializadas',
          imageUrl: '/sobreAI.jpg'
        }
      ]
    },
    {
      id: 'network-infrastructure',
      title: 'Rede e Infraestrutura',
      subtitle: 'Conectividade e Eficiência',
      description: 'Implementação de redes eficientes com switches, roteadores e soluções de conectividade.',
      carouselImages: [
        {
          url: '/server.jpg',
          link: 'https://unrender.online',
          alt: 'Infraestrutura de Rede'
        },
        {
          url: '/support.jpg',
          link: 'https://unrender.online',
          alt: 'Suporte de TI'
        },
        {
          url: '/consulting.jpg',
          link: 'https://unrender.online',
          alt: 'Consultoria de Rede'
        }
      ],
      features: [
        {
          name: 'Switches Gerenciáveis',
          imageUrl: '/server.jpg'
        },
        {
          name: 'Roteadores Corporativos',
          imageUrl: '/support.jpg'
        },
        {
          name: 'Cabeamento Estruturado',
          imageUrl: '/consulting.jpg'
        },
        {
          name: 'Wi-Fi Empresarial',
          gifUrl: '/smarthome.gif'
        },
        {
          name: 'Otimização de Performance',
          imageUrl: '/hermes-png.png'
        }
      ]
    },
    {
      id: 'custom-hardware',
      title: 'Hardware Customizado',
      subtitle: 'Fabricação Própria',
      description: 'Desenvolvemos e fabricamos hardware próprio focado em IA embarcada e soluções especializadas.',
      carouselImages: [
        {
          url: '/3d-scan.jpg',
          link: 'https://unrender.online',
          alt: 'Hardware Customizado'
        },
        {
          url: '/aiot.jpg',
          link: 'https://unrender.online',
          alt: 'AIoT Devices'
        },
        {
          url: '/comma4.png',
          link: 'https://unrender.online',
          alt: 'Dispositivos Inteligentes'
        }
      ],
      features: [
        {
          name: 'Dispositivos IA Embarcada',
          imageUrl: '/aiot.jpg'
        },
        {
          name: 'Edge Computing Devices',
          imageUrl: '/comma4.png'
        },
        {
          name: 'Sensores IoT Personalizados',
          gifUrl: '/smarthome.gif'
        },
        {
          name: 'Soluções AI on-Device',
          gifUrl: '/commaai2.gif'
        },
        {
          name: 'Prototipagem e Produção',
          imageUrl: '/3d-scan.jpg'
        }
      ]
    },
  ];

  // Menu items para Soluções 3D e Games
  designMenuItems: MenuItem[] = [
    {
      id: 'unrender-games',
      title: 'Unrender Games',
      subtitle: 'Nosso Estúdio de Games',
      description: 'Conheça nosso estúdio de desenvolvimento de jogos e experiências interativas.',
      carouselImages: [
        {
          url: '/commai1.gif',
          link: 'https://unrender.games',
          alt: 'Autonomous Driving - AI Gaming'
        },
        {
          url: '/opencv.gif',
          link: 'https://unrender.games',
          alt: 'Computer Vision - Game Development'
        },
        {
          url: '/PLN.gif',
          link: 'https://unrender.games',
          alt: 'AI-Powered Gaming'
        },
        {
          url: '/smarthome.gif',
          link: 'https://unrender.games',
          alt: 'Interactive Gaming Experience'
        },
        {
          url: '/echoshow feature.gif',
          link: 'https://unrender.games',
          alt: 'Game Features Showcase'
        },
        {
          url: '/commaai2.gif',
          link: 'https://unrender.games',
          alt: 'Advanced Game Mechanics'
        }
      ],
      features: [
        { name: 'Desenvolvimento de Games', imageUrl: '/game.jpg' },
        { name: 'Showroom Virtual', imageUrl: '/showroom.jpg' },
        { name: 'Modelagem 3D', imageUrl: '/3d-scan.jpg' },
        { name: 'Realidade Virtual', imageUrl: '/unrender-games.png' },
        { name: 'Realidade Aumentada', imageUrl: '/dice-png.png' }
      ]
    },
  ];

  // Armazena os itens do menu atualmente selecionados para cada tab
  selectedDevelopmentItem: MenuItem = this.developmentMenuItems[0];
  selectedInfrastructureItem: MenuItem = this.infrastructureMenuItems[0];
  selectedDesignItem: MenuItem = this.designMenuItems[0];

  selectDevelopmentContent(item: MenuItem): void {
    this.selectedDevelopmentItem = item;
    this.animateContentEntry();
    this.scrollToContent();
  }

  selectInfrastructureContent(item: MenuItem): void {
    this.selectedInfrastructureItem = item;
    this.animateContentEntry();
    this.scrollToContent();
  }

  selectDesignContent(item: MenuItem): void {
    this.selectedDesignItem = item;
    this.animateContentEntry();
    this.scrollToContent();
  }

  private scrollToContent(): void {
    // On mobile, scroll to the content area when changing sub-menu items
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const contentWrapper = document.querySelector('.modern-content-wrapper');
        if (contentWrapper) {
          const headerOffset = 60;
          const elementPosition = contentWrapper.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 150);
  }

  private animateContentEntry(): void {
    // Wait for next tick to ensure DOM is ready
    setTimeout(() => {
      // Animate main media (image/gif)
      const media = document.querySelector('.animated-media');
      if (media) {
        gsap.fromTo(
          media,
          {
            opacity: 0,
            scale: 0.95,
            y: 30
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
          }
        );
      }

      // Animate feature rows (all types)
      const cards = document.querySelectorAll('.animated-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            x: -50,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }

      // Animate square media images (for image layout)
      const squareMedia = document.querySelectorAll('.feature-media-square img');
      if (squareMedia.length > 0) {
        gsap.fromTo(
          squareMedia,
          {
            scale: 0,
            rotation: -10
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.5)',
            delay: 0.5
          }
        );
      }

      // Animate floating name badges (for gif and custom html layouts)
      const floatingNames = document.querySelectorAll('.feature-name-floating');
      if (floatingNames.length > 0) {
        gsap.fromTo(
          floatingNames,
          {
            opacity: 0,
            x: -30,
            y: -10
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            delay: 0.6
          }
        );
      }

      // Animate wide GIFs (for gif layout)
      const wideGifs = document.querySelectorAll('.feature-media-wide img');
      if (wideGifs.length > 0) {
        gsap.fromTo(
          wideGifs,
          {
            opacity: 0,
            scale: 0.9,
            x: 30
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            delay: 0.7
          }
        );
      }

      // Animate custom HTML content
      const customContent = document.querySelectorAll('.feature-custom-content');
      if (customContent.length > 0) {
        gsap.fromTo(
          customContent,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            delay: 0.7
          }
        );
      }

      // Animate icon placeholders (for text-only layout)
      const iconPlaceholders = document.querySelectorAll('.feature-icon-placeholder');
      if (iconPlaceholders.length > 0) {
        gsap.fromTo(
          iconPlaceholders,
          {
            scale: 0,
            rotation: -180
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.7)',
            delay: 0.5
          }
        );
      }

      // Animate title
      const title = document.querySelector('.animated-title');
      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: -20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
          }
        );
      }
    }, 50);
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

  // Carousel methods
  private initializeCarousels(): void {
    const allMenuItems = [
      ...this.developmentMenuItems,
      ...this.infrastructureMenuItems,
      ...this.designMenuItems
    ];

    allMenuItems.forEach(item => {
      if (item.carouselImages && item.carouselImages.length > 0) {
        this.currentSlideIndex[item.id] = 0;
        this.startCarouselAutoplay(item.id, item.carouselImages.length);
      }
    });
  }

  private startCarouselAutoplay(menuItemId: string, totalSlides: number): void {
    // Clear existing interval if any
    if (this.carouselIntervals[menuItemId]) {
      clearInterval(this.carouselIntervals[menuItemId]);
    }

    // Start autoplay - change slide every 4 seconds
    this.carouselIntervals[menuItemId] = setInterval(() => {
      this.nextSlide(menuItemId, totalSlides);
    }, 4000);
  }

  nextSlide(menuItemId: string, totalSlides: number): void {
    this.currentSlideIndex[menuItemId] = (this.currentSlideIndex[menuItemId] + 1) % totalSlides;
    // Restart autoplay timer
    this.startCarouselAutoplay(menuItemId, totalSlides);
  }

  prevSlide(menuItemId: string, totalSlides: number): void {
    this.currentSlideIndex[menuItemId] =
      (this.currentSlideIndex[menuItemId] - 1 + totalSlides) % totalSlides;
    // Restart autoplay timer
    this.startCarouselAutoplay(menuItemId, totalSlides);
  }

  goToSlide(menuItemId: string, index: number, totalSlides?: number): void {
    this.currentSlideIndex[menuItemId] = index;
    // Restart autoplay timer if totalSlides is provided
    if (totalSlides !== undefined) {
      this.startCarouselAutoplay(menuItemId, totalSlides);
    }
  }

  getCurrentSlideIndex(menuItemId: string): number {
    return this.currentSlideIndex[menuItemId] || 0;
  }

  ngOnDestroy(): void {
    // Clean up all carousel intervals
    Object.keys(this.carouselIntervals).forEach(key => {
      if (this.carouselIntervals[key]) {
        clearInterval(this.carouselIntervals[key]);
      }
    });
  }

  // Sanitize iframe URL for security
  sanitizeIframeUrl(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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

  // Method to get background class for custom component features
  getCustomComponentBackgroundClass(menuItemId: string, featureIndex: number): string {
    // Find the menu item and count custom components before this one
    let customComponentCount = 0;
    const menuItems = [
      ...this.developmentMenuItems,
      ...this.infrastructureMenuItems,
      ...this.designMenuItems
    ];

    const menuItem = menuItems.find(item => item.id === menuItemId);
    if (menuItem && menuItem.features) {
      for (let i = 0; i <= featureIndex; i++) {
        if (menuItem.features[i] && (menuItem.features[i].customComponent || menuItem.features[i].customHtml)) {
          customComponentCount++;
        }
      }
    }

    // Alternate between orange and purple based on count
    return customComponentCount % 2 === 1 ? 'bg-unrender-accent' : 'bg-unrender-purple';
  }
}
