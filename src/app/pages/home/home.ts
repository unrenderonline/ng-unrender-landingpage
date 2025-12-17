import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { HeroCube } from '../../components/hero-cube/hero-cube';
import { FeatureTabs } from '../../components/feature-tabs/feature-tabs';
import { Contact } from '../../components/contact/contact';
declare var bootstrap: any;


export interface SoftwareItem {
  id: string;
  name: string;
  description: string;
  logo: string[];
  link: string;
  carouselImages: { src: string; label: string; title?: string; description?: string }[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroCube, FeatureTabs, Contact, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnDestroy {
  softwareItems: SoftwareItem[] = [
    {
      id: 'landing-page',
      name: 'Landing Page',
      description:
        'Criação de landing pages personalizadas, rápidas, responsivas, design criativo e único, não somos a casa de software média, somos os melhores.',
      logo: ['landingpage-png.png'],
      link: '#',
      carouselImages: [
        {
          src: 'landingpage-png.png',
          label: 'Design Responsivo',
          description: 'Design criativo e único que se adapta perfeitamente a todos os dispositivos e tamanhos de tela.'
        },
        {
          src: 'landingpage-png.png',
          label: 'Experiência Única',
          description: 'Criação personalizada focada em proporcionar a melhor experiência para seus usuários.'
        },
        {
          src: 'landingpage-png.png',
          label: 'Performance Alta',
          description: 'Landing pages rápidas e otimizadas para máximo desempenho e conversão.'
        },
      ],
    },
    {
      id: 'controlb',
      name: 'Control B',
      description:
        'ERP completo para gestão empresarial end-to-end. Otimize seus processos e controle suas operações com total eficiência.',
      logo: ['controlb-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'controlb-logo.png',
          label: 'Dashboard Principal',
          description: 'Visão completa e em tempo real de todas as operações da sua empresa em um só lugar.'
        },
        {
          src: 'controlb-logo.png',
          label: 'Relatórios Financeiros',
          description: 'Análises financeiras detalhadas para tomada de decisões estratégicas.'
        },
        {
          src: 'controlb-logo.png',
          label: 'Gestão de Estoque',
          description: 'Controle completo de entradas, saídas e inventário com alertas automáticos.'
        },
        {
          src: 'controlb-logo.png',
          label: 'Controle de Vendas',
          description: 'Gerencie todo o processo de vendas, desde o orçamento até o faturamento.'
        },
      ],
    },
    {
      id: 'pequi-chat',
      name: 'Pequi.chat',
      description:
        'Chat interno seguro para trabalhadores da empresa conversarem, agendarem reuniões e compartilharem arquivos com segurança.',
      logo: ['pequi-png.png'],
      link: '#',
      carouselImages: [
        {
          src: 'pequi-png.png',
          label: 'Chat Seguro',
          description: 'Comunicação interna criptografada e segura entre colaboradores da empresa.'
        },
        {
          src: 'pequi-png.png',
          label: 'Agendamento de Reuniões',
          description: 'Agende e organize reuniões facilmente com notificações automáticas.'
        },
        {
          src: 'pequi-png.png',
          label: 'Compartilhamento de Arquivos',
          description: 'Compartilhe documentos e arquivos com total segurança e controle de acesso.'
        },
      ],
    },
    {
      id: 'papiro-email',
      name: 'Papiro.email',
      description:
        'Cliente de email seguro com apps nativos para web, desktop, Android e iOS.',
      logo: ['papiro-png.png'],
      link: '#',
      carouselImages: [
        {
          src: 'papiro-png.png',
          label: 'Cliente de Email Seguro',
          description: 'Plataforma de email com segurança e criptografia de dados, sem anúncios e super rápido.'
        },
        {
          src: 'papiro-png.png',
          label: 'Organização com IA',
          description: 'IA organiza emails automaticamente por categorias, destacando os mais relevantes como um assistente.'
        },
        {
          src: 'papiro-png.png',
          label: 'Apps Multiplataforma',
          description: 'Aplicativos nativos para web, desktop, Android e iOS com sincronização em tempo real.'
        },
        {
          src: 'papiro-png.png',
          label: 'Notificações Inteligentes',
          description: 'Receba alertas de emails importantes via WhatsApp ou Pequi.chat automaticamente.'
        },
      ],
    },
    {
      id: 'nanee',
      name: 'Nanee',
      description:
        'Software de atendimento WhatsApp + IA para respostas automáticas para SAC ou vendas.',
      logo: ['nanee.png'],
      link: '#',
      carouselImages: [
        {
          src: 'nanee.png',
          label: 'Atendente Virtual',
          description: 'Atendimento automático com IA para responder clientes 24/7 de forma natural e eficiente.'
        },
        {
          src: 'nanee.png',
          label: 'Automação de Vendas',
          description: 'Vendedores virtuais que auxiliam no processo de vendas e fechamento de negócios.'
        },
        {
          src: 'nanee.png',
          label: 'Respostas SAC',
          description: 'Sistema de atendimento ao cliente automatizado com respostas inteligentes e precisas.'
        },
      ],
    },
    {
      id: 'cronos',
      name: 'Cronos',
      description:
        'Plataforma RH completa para gerenciamento de pessoas, tempo e processos de contratação.',
      logo: ['cronos-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'cronos-logo.png',
          label: 'Gerenciamento de Tempo',
          description: 'Controle de ponto com reconhecimento facial, impressão digital ou senha, banco de horas automático.'
        },
        {
          src: 'cronos-logo.png',
          label: 'Plataforma de Contratação',
          description: 'Gerencie todo processo seletivo, desde a criação de vagas até a contratação final.'
        },
        {
          src: 'cronos-logo.png',
          label: 'Integração Social',
          description: 'Publique vagas automaticamente em redes sociais e LinkedIn, sem depender de outras plataformas.'
        },
      ],
    },
    {
      id: 'qotar',
      name: 'Qotar',
      description:
        'Sistema de busca e compras com IA e capacidade de negociação automática.',
      logo: ['qotar-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'qotar-logo.png',
          label: 'Busca com IA',
          description: 'Encontre produtos rapidamente com busca inteligente alimentada por inteligência artificial.'
        },
        {
          src: 'qotar-logo.png',
          label: 'Negociação Automática',
          description: 'Sistema de negociação automática que busca os melhores preços e condições para você.'
        },
        {
          src: 'qotar-logo.png',
          label: 'Sistema de Compras',
          description: 'Plataforma completa de compras com integração com fornecedores e gestão de pedidos.'
        },
      ],
    },
    {
      id: 'hermes',
      name: 'Hermes',
      description:
        'Software completo para entrega de produtos com rastreamento em tempo real e IA.',
      logo: ['hermes-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'hermes-logo.png',
          label: 'Rastreamento em Tempo Real',
          description: 'Acompanhe entregas e motoristas em tempo real com câmeras e GPS integrados.'
        },
        {
          src: 'hermes-logo.png',
          label: 'Monitoramento com IA',
          description: 'IA detecta sinais de perigo, sonolência, mudança de rota e comportamentos suspeitos.'
        },
        {
          src: 'hermes-logo.png',
          label: 'Verificação Segura',
          description: 'Sistema de verificação com fotos, código dinâmico e confirmação de identidade do destinatário.'
        },
        {
          src: 'hermes-logo.png',
          label: 'Suporte em Tempo Real',
          description: 'Altere destinatário ou instruções durante a entrega com termos de responsabilidade.'
        },
      ],
    },
    {
      id: 'hefestos',
      name: 'Hefestos',
      description:
        'Software para empresas de construção com integração Qotar e Hermes.',
      logo: ['hefesto-png.png'],
      link: '#',
      carouselImages: [
        {
          src: 'hefesto-png.png',
          label: 'Solicitação de Produtos',
          description: 'Engenheiros solicitam materiais com integração ao Qotar para compra rápida e negociação.'
        },
        {
          src: 'hefesto-png.png',
          label: 'Planejamento de Obras',
          description: 'Configure e planeje edificações com cronograma, etapas e recursos necessários.'
        },
        {
          src: 'hefesto-png.png',
          label: 'Gestão de Tarefas',
          description: 'Gerenciamento completo de tarefas e rastreamento de produtividade da equipe.'
        },
        {
          src: 'hefesto-png.png',
          label: 'Entrega Integrada',
          description: 'Integração com Hermes para rastreamento seguro de entregas de materiais na obra.'
        },
      ],
    },
    {
      id: 'janus',
      name: 'Janus',
      description:
        'Software de segurança com câmeras em tempo real e monitoramento com IA.',
      logo: ['janus-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'janus-logo.png',
          label: 'Monitoramento em Tempo Real',
          description: 'Visualize múltiplas câmeras simultaneamente, configure TVs e monitores para vigilância 24/7.'
        },
        {
          src: 'janus-logo.png',
          label: 'Detecção de Perigo com IA',
          description: 'IA analisa imagens em tempo real detectando sinais de perigo e comportamentos suspeitos.'
        },
        {
          src: 'janus-logo.png',
          label: 'Alertas Automatizados',
          description: 'Sistema aciona automaticamente polícia, alarmes e notifica equipe de segurança.'
        },
        {
          src: 'janus-logo.png',
          label: 'Gestão de Equipe',
          description: 'Gerencie trabalhadores e guardas de segurança com controle de acesso e relatórios.'
        },
      ],
    },
    {
      id: 'higia',
      name: 'Higia',
      description:
        'Sistema de gestão para clínicas médicas. Agendamentos, prontuários eletrônicos e faturamento simplificados.',
      logo: ['higia-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'higia-logo.png',
          label: 'Agenda Médica',
          description: 'Sistema completo de agendamentos com confirmações automáticas e lembretes aos pacientes.'
        },
        {
          src: 'higia-logo.png',
          label: 'Prontuário Eletrônico',
          description: 'Prontuários digitais seguros com histórico completo de consultas, exames e tratamentos.'
        },
        {
          src: 'higia-logo.png',
          label: 'Faturamento',
          description: 'Gestão financeira com faturamento automático de consultas e convênios médicos.'
        },
        {
          src: 'higia-logo.png',
          label: 'Gestão de Pacientes',
          description: 'Cadastro completo de pacientes com histórico médico e acompanhamento de tratamentos.'
        },
      ],
    },
    {
      id: 'freya',
      name: 'Freya',
      description:
        'Solução completa para pet shops e clínicas veterinárias. Gerencie agendamentos, histórico dos pets, vendas e vacinas.',
      logo: ['freya-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'freya-logo.png',
          label: 'Agendamento Pet',
          description: 'Sistema de agendamentos para banho, tosa e consultas veterinárias com lembretes automáticos.'
        },
        {
          src: 'freya-logo.png',
          label: 'Histórico Clínico',
          description: 'Prontuário completo dos pets com histórico de consultas, cirurgias e tratamentos.'
        },
        {
          src: 'freya-logo.png',
          label: 'Controle de Vacinas',
          description: 'Calendário de vacinação com alertas de vencimento e histórico completo de imunizações.'
        },
        {
          src: 'freya-logo.png',
          label: 'Vendas e Produtos',
          description: 'Gestão de vendas de produtos, ração, acessórios e controle de estoque integrado.'
        },
      ],
    },
    {
      id: 'mimir',
      name: 'Mimir',
      description:
        'Plataforma escolar completa com gestão de alunos, professores e IA educacional.',
      logo: ['mimir-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'mimir-logo.png',
          label: 'Gerenciamento Escolar',
          description: 'Gestão completa de alunos, notas, frequência e desempenho de professores.'
        },
        {
          src: 'mimir-logo.png',
          label: 'Análise com IA',
          description: 'IA analisa desempenho e sugere abordagens personalizadas para cada estudante.'
        },
        {
          src: 'mimir-logo.png',
          label: 'Aulas de Reforço Online',
          description: 'Plataforma de aulas virtuais e reforço individual alimentado por IA para assuntos específicos.'
        },
        {
          src: 'mimir-logo.png',
          label: 'Testes Seguros',
          description: 'Criação fácil de provas com questões randomizadas, anti-cola e geração para impressão.'
        },
      ],
    },
    {
      id: 'brok',
      name: 'Brok',
      description:
        'Software para oficinas mecânicas. Controle ordens de serviço, estoque de peças e o relacionamento com seus clientes.',
      logo: ['brok-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'brok-logo.png',
          label: 'Ordem de Serviço',
          description: 'Controle completo de ordens de serviço desde o orçamento até a entrega do veículo.'
        },
        {
          src: 'brok-logo.png',
          label: 'Controle de Estoque',
          description: 'Gestão de estoque de peças com alertas de reposição e controle de fornecedores.'
        },
        {
          src: 'brok-logo.png',
          label: 'Gestão de Clientes',
          description: 'Cadastro de clientes com histórico de serviços e veículos para melhor atendimento.'
        },
        {
          src: 'brok-logo.png',
          label: 'Relatórios',
          description: 'Relatórios detalhados de vendas, serviços e performance da oficina.'
        },
      ],
    },
    {
      id: 'dice',
      name: 'Dice.adv.br',
      description:
        'Plataforma para escritórios de advocacia. Tenha total controle sobre processos, prazos e faturamento de honorários.',
      logo: ['dice-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'dice-logo.png',
          label: 'Gestão de Processos',
          description: 'Controle total de processos jurídicos com organização por cliente, fase e tipo.'
        },
        {
          src: 'dice-logo.png',
          label: 'Controle de Prazos',
          description: 'Sistema de alertas automáticos para prazos processuais e audiências.'
        },
        {
          src: 'dice-logo.png',
          label: 'Faturamento',
          description: 'Gestão de honorários com controle de recebimentos e emissão de notas fiscais.'
        },
        {
          src: 'dice-logo.png',
          label: 'Documentos',
          description: 'Armazenamento seguro e organizado de petições, contratos e documentos jurídicos.'
        },
      ],
    },
    {
      id: 'kardapio',
      name: 'Kardapio.Delivery',
      description:
        'Sistema de cardápio digital e gestão de pedidos para restaurantes. Aumente suas vendas e facilite a vida dos clientes.',
      logo: ['kardapio-logo.png'],
      link: '#',
      carouselImages: [
        {
          src: 'kardapio-logo.png',
          label: 'Cardápio Digital',
          description: 'Cardápio online interativo com fotos, descrições e valores atualizados em tempo real.'
        },
        {
          src: 'kardapio-logo.png',
          label: 'Gestão de Pedidos',
          description: 'Controle completo de pedidos desde a cozinha até a entrega, com status em tempo real.'
        },
        {
          src: 'kardapio-logo.png',
          label: 'Delivery',
          description: 'Sistema de delivery integrado com rastreamento de entrega e gestão de entregadores.'
        },
        {
          src: 'kardapio-logo.png',
          label: 'Relatórios de Vendas',
          description: 'Análise de vendas, produtos mais pedidos e performance do restaurante.'
        },
      ],
    },
    {
      id: 'aqui-shopping',
      name: 'Aqui.shopping',
      description:
        'Mercado local com entrega, avaliação fácil de encontrar produtos e pesquisar, para atacado e varejo.',
      logo: ['aqui-shopping-f.png'],
      link: '#',
      carouselImages: [
        {
          src: 'aqui-shopping-f.png',
          label: 'Mercado Local',
          description: 'Marketplace conectando consumidores a comerciantes locais com produtos variados.'
        },
        {
          src: 'aqui-shopping-f.png',
          label: 'Entrega Rápida',
          description: 'Sistema de entrega ágil com opções de atacado e varejo para todos os públicos.'
        },
        {
          src: 'aqui-shopping-f.png',
          label: 'Busca Fácil',
          description: 'Encontre produtos facilmente com sistema de busca inteligente e avaliações de clientes.'
        },
      ],
    },
    {
      id: 'ahlugar',
      name: 'Ahlugar',
      description:
        'Software imobiliário para corretores e proprietários com IA e gestão completa.',
      logo: ['ahlugar.png'],
      link: '#',
      carouselImages: [
        {
          src: 'ahlugar.png',
          label: 'Gerenciamento Imobiliário',
          description: 'Plataforma para corretores gerenciarem imóveis, comissões e também para proprietários venderem diretamente.'
        },
        {
          src: 'ahlugar.png',
          label: 'Assistência com IA',
          description: 'Atendimento automatizado com IA para responder dúvidas sobre imóveis e processos.'
        },
        {
          src: 'ahlugar.png',
          label: 'Documentação Segura',
          description: 'Sistema de fotos e termos antes de alugar/vender, durante e ao devolver o imóvel.'
        },
        {
          src: 'ahlugar.png',
          label: 'Gestão de Contratos',
          description: 'Controle completo de contratos de locação e venda com documentação fotográfica.'
        },
      ],
    },
  ];

  selectedSoftware: SoftwareItem = this.softwareItems[0];
  currentSlideIndex: number = 0;
  private autoplayInterval: any;

  // Modal State
  showSaasModal = false;
  showOnPremiseModal = false;

  openSaasModal() {
    this.showSaasModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeSaasModal() {
    this.showSaasModal = false;
    document.body.style.overflow = ''; // Restore scrolling
  }

  openOnPremiseModal() {
    this.showOnPremiseModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeOnPremiseModal() {
    this.showOnPremiseModal = false;
    document.body.style.overflow = '';
  }

  selectSoftware(item: SoftwareItem) {
    this.selectedSoftware = item;
    this.currentSlideIndex = 0; // Reset to first slide when changing software

    // GSAP Animation
    gsap.fromTo(
      '#software-details-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Reset autoplay timer when user manually selects
    this.resetAutoplay();
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.selectedSoftware.carouselImages.length;
  }

  prevSlide() {
    this.currentSlideIndex = this.currentSlideIndex === 0
      ? this.selectedSoftware.carouselImages.length - 1
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number) {
    this.currentSlideIndex = index;
  }

  getCurrentTitle(): string {
    return this.selectedSoftware.carouselImages[this.currentSlideIndex]?.title || this.selectedSoftware.name;
  }

  getCurrentDescription(): string {
    return this.selectedSoftware.carouselImages[this.currentSlideIndex]?.description || this.selectedSoftware.description;
  }

  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      const currentIndex = this.softwareItems.findIndex(
        item => item.id === this.selectedSoftware.id
      );
      const nextIndex = (currentIndex + 1) % this.softwareItems.length;
      this.selectSoftware(this.softwareItems[nextIndex]);
    }, 5000); // Change every 5 seconds
  }

  private resetAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    this.startAutoplay();
  }

  ngAfterViewInit(): void {
    // Start autoplay
    this.startAutoplay();
    // Procura por todos os elementos com o atributo [data-bs-toggle="tooltip"]
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );

    // Inicializa cada uno de ellos
    tooltipTriggerList.map(function (tooltipTriggerEl: any) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnDestroy(): void {
    // Clean up autoplay interval
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}
