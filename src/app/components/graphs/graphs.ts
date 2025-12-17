import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// Garanta que a biblioteca vis-network esteja importada no seu projeto,
// por exemplo, no array 'scripts' do seu arquivo angular.json.
declare var vis: any;

@Component({
  selector: 'app-graphs',
  standalone: true,
  templateUrl: './graphs.html',
  styleUrl: './graphs.scss',
})
export class Graphs implements AfterViewInit {
  @ViewChild('networkContainer') networkContainer!: ElementRef;

  private network: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.createGraph();
  }

  private createGraph(): void {
    // 1. Definição dos Nós (Sistemas) com logos PNG
    // Usando a lista completa de sistemas e o padrão de imagem que você definiu.
    const nodes = new vis.DataSet([
      // Hubs Centrais e de Suporte
      {
        id: 'controlb',
        label: 'Control B\n(ERP)',
        shape: 'circularImage',
        image: 'controlb-png.png',
        size: 45,
        group: 'hub',
      },
      {
        id: 'norna',
        label: 'Norna\n(Config)',
        shape: 'circularImage',
        image: 'norna-png.png',
        size: 30,
        group: 'infra',
      },
      {
        id: 'mani',
        label: 'Mani\n(Faturamento)',
        shape: 'circularImage',
        image: 'mani-png.png',
        size: 35,
        group: 'finance',
      },
      {
        id: 'seshat',
        label: 'Seshat\n(Comunicação)',
        shape: 'circularImage',
        image: 'seshat-png.png',
        size: 35,
        group: 'comms',
      },
      {
        id: 'tevat',
        label: 'Tevat\n(Drive)',
        shape: 'circularImage',
        image: 'tevat-png.png',
        size: 35,
        group: 'infra',
      },

      // Sistemas Verticais (Clientes Finais)
      {
        id: 'higia',
        label: 'Higia\n(Clínicas)',
        shape: 'circularImage',
        image: 'higia-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'brok',
        label: 'Brok\n(Oficinas)',
        shape: 'circularImage',
        image: 'brok-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'freya',
        label: 'Freya\n(Pet Shops)',
        shape: 'circularImage',
        image: 'freya-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'dice',
        label: 'Dice.adv.br\n(Advocacia)',
        shape: 'circularImage',
        image: 'dice-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'kardapio',
        label: 'Kardapio\n(Delivery)',
        shape: 'circularImage',
        image: 'kardapio-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'odin',
        label: 'Odin\n(Educação)',
        shape: 'circularImage',
        image: 'odin-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'janus',
        label: 'Janus\n(Segurança)',
        shape: 'circularImage',
        image: 'janus-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'hermes',
        label: 'Hermes\n(Logística)',
        shape: 'circularImage',
        image: 'hermes-png.png',
        size: 30,
        group: 'vertical',
      },
      {
        id: 'apolo',
        label: 'Apolo\n(Criação)',
        shape: 'circularImage',
        image: 'apolo-png.png',
        size: 30,
        group: 'vertical',
      },

      // Sistemas Auxiliares e Ferramentas
      {
        id: 'shark',
        label: 'Shark\n(Cobranças)',
        shape: 'circularImage',
        image: 'shark-png.png',
        size: 30,
        group: 'finance',
      },
      {
        id: 'ava',
        label: 'Ava\n(IA Atendente)',
        shape: 'circularImage',
        image: 'ava-png.png',
        size: 30,
        group: 'comms',
      },
      {
        id: 'qotar',
        label: 'Qotar\n(Cotação IA)',
        shape: 'circularImage',
        image: 'qotar-png.png',
        size: 30,
        group: 'tools',
      },
      {
        id: 'courier',
        label: 'Courier\n(Email)',
        shape: 'circularImage',
        image: 'courier-png.png',
        size: 30,
        group: 'tools',
      },
    ]);

    // 2. Definição das Conexões (Arestas)
    // Estrutura completa de conexões entre todos os sistemas.
    const edges = new vis.DataSet([
      { from: 'higia', to: 'controlb', label: 'Dados Clínicos', arrows: 'to' },
      {
        from: 'brok',
        to: 'controlb',
        label: 'Ordens de Serviço',
        arrows: 'to',
      },
      { from: 'freya', to: 'controlb', label: 'Vendas e Pets', arrows: 'to' },
      { from: 'dice', to: 'controlb', label: 'Processos', arrows: 'to' },
      { from: 'kardapio', to: 'controlb', label: 'Pedidos', arrows: 'to' },
      { from: 'odin', to: 'controlb', label: 'Dados Acadêmicos', arrows: 'to' },
      { from: 'janus', to: 'controlb', label: 'Alertas e Logs', arrows: 'to' },
      {
        from: 'hermes',
        to: 'controlb',
        label: 'Entregas e Frotas',
        arrows: 'to',
      },
      { from: 'apolo', to: 'controlb', label: 'Projetos', arrows: 'to' },
      ...[
        'higia',
        'brok',
        'freya',
        'dice',
        'kardapio',
        'odin',
        'janus',
        'hermes',
        'apolo',
      ].flatMap((vertical) => [
        {
          from: vertical,
          to: 'mani',
          label: 'Faturar',
          arrows: 'to',
          dashes: true,
        },
        {
          from: vertical,
          to: 'seshat',
          label: 'Comunicar',
          arrows: 'to',
          dashes: true,
        },
      ]),
      {
        from: 'janus',
        to: 'tevat',
        label: 'Gravações',
        arrows: 'to',
        dashes: true,
      },
      {
        from: 'apolo',
        to: 'tevat',
        label: 'Mídia',
        arrows: 'to',
        dashes: true,
      },
      {
        from: 'higia',
        to: 'tevat',
        label: 'Exames',
        arrows: 'to',
        dashes: true,
      },
      { from: 'shark', to: 'mani', label: 'Cobrar Faturas', arrows: 'to' },
      { from: 'ava', to: 'seshat', label: 'Automatiza', arrows: 'to' },
      { from: 'courier', to: 'seshat', label: 'Envia Emails', arrows: 'to' },
      { from: 'qotar', to: 'brok', label: 'Orçamentos', arrows: 'to' },
      { from: 'qotar', to: 'dice', label: 'Propostas', arrows: 'to' },
      { from: 'controlb', to: 'norna', arrows: 'to', dashes: [5, 5] },
      { from: 'mani', to: 'norna', arrows: 'to', dashes: [5, 5] },
      { from: 'seshat', to: 'norna', arrows: 'to', dashes: [5, 5] },
      { from: 'tevat', to: 'norna', arrows: 'to', dashes: [5, 5] },
    ]);

    const data = { nodes, edges };

    // 3. Configuração de Aparência e Física para TEMA ESCURO
    const options = {
      nodes: {
        borderWidth: 0, // Sem borda nas imagens
        borderWidthSelected: 3,
        color: {
          // Cor da borda quando o nó é selecionado
          border: '#f99126',
          background: 'transparent', // Fundo padrão transparente
          // Garante que o fundo permaneça transparente ao interagir
          highlight: {
            border: '#f99126',
            background: 'transparent',
          },
          hover: {
            border: '#f99126',
            background: 'transparent',
          },
        },
        font: {
          // Cor do texto dos nós
          color: '#FFFFFF',
          size: 14,
          face: 'Inter',
          strokeWidth: 0, // Sem contorno no texto
        },
        // Sombra sutil para destacar as logos
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.5)',
          size: 10,
          x: 3,
          y: 3,
        },
        shapeProperties: {
          useBorderWithImage: true,
        },
      },
      edges: {
        width: 2,
        color: {
          // Cor padrão das linhas e setas
          color: '#FFFFFF',
          // Cor ao passar o mouse ou selecionar
          highlight: '#f99126',
          hover: '#f99126',
          opacity: 0.6,
        },
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: 'arrow' },
        },
        font: {
          // Cor do texto das conexões
          color: '#FFFFFF',
          size: 12,
          face: 'Inter',
          align: 'middle',
          // Fundo transparente para o texto
          background: 'none',
          strokeWidth: 0,
        },
        smooth: { enabled: true, type: 'dynamic', roundness: 0.5 },
      },
      interaction: {
        hover: true,
        dragNodes: true,
        zoomView: true,
        dragView: true,
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -40000,
          centralGravity: 0.1,
          springLength: 250,
          springConstant: 0.03,
          damping: 0.15,
        },
        solver: 'barnesHut',
        stabilization: { iterations: 2000, fit: true },
      },
    };

    // 4. Criação da Rede
    const container = this.networkContainer.nativeElement;
    this.network = new vis.Network(container, data, options);

    // 5. Lógica para Animação Contínua (opcional, mantida do seu código)
    this.network.on('beforeDrawing', () => {
      const allNodeIds = nodes.getIds();
      allNodeIds.forEach((nodeId: any) => {
        const node = this.network.body.nodes[nodeId];
        if (node && !node.isFixed()) {
          const velocityThreshold = 0.05;
          if (
            Math.abs(node.vx) < velocityThreshold &&
            Math.abs(node.vy) < velocityThreshold
          ) {
            node.vx = (Math.random() - 0.5) * 0.3;
            node.vy = (Math.random() - 0.5) * 0.3;
          }
        }
      });
    });
  }
}
