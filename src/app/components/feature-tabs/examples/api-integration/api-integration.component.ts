import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCreditCard, faCar, faServer, faDatabase, faPlug, faExchangeAlt, faCheckCircle, faUtensils, faCube, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faWhatsapp, faFacebook, faInstagram, faLinkedin
} from '@fortawesome/free-brands-svg-icons';

interface IntegrationNode {
  id: string;
  name: string;
  icon: any;
  color: string;
  category: 'social' | 'payment' | 'delivery' | 'erp' | 'other';
  x?: number;
  y?: number;
  connected: boolean;
  syncing: boolean;
}

@Component({
  selector: 'app-api-integration',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.scss']
})
export class ApiIntegrationComponent implements OnInit, OnDestroy {
  // Icons
  faExchangeAlt = faExchangeAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPlug = faPlug;

  integrations: IntegrationNode[] = [
    { id: 'whatsapp', name: 'WhatsApp', icon: faWhatsapp, color: '#25D366', category: 'social', connected: true, syncing: false },
    { id: 'stripe', name: 'Pagamentos', icon: faCreditCard, color: '#635BFF', category: 'payment', connected: true, syncing: false },
    { id: 'ifood', name: 'iFood', icon: faUtensils, color: '#EA1D2C', category: 'delivery', connected: false, syncing: false },
    { id: 'uber', name: 'Uber / 99', icon: faCar, color: 'black', category: 'delivery', connected: false, syncing: false },
    { id: 'totvs', name: 'TOTVS', icon: faServer, color: '#0068B3', category: 'erp', connected: true, syncing: false },
    { id: 'sap', name: 'SAP', icon: faDatabase, color: '#008FD3', category: 'erp', connected: true, syncing: false },
    { id: 'instagram', name: 'Instagram', icon: faInstagram, color: '#E1306C', category: 'social', connected: false, syncing: false },
    { id: 'facebook', name: 'Facebook', icon: faFacebook, color: '#1877F2', category: 'social', connected: false, syncing: false },
    { id: 'linkedin', name: 'LinkedIn', icon: faLinkedin, color: '#0A66C2', category: 'social', connected: false, syncing: false },
    { id: 'custom', name: 'Custom API', icon: faCube, color: '#FF9900', category: 'other', connected: true, syncing: false }
  ];

  intervalId: any;
  autoToggleIntervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.calculatePositions();
    this.startSimulation();
    this.startAutoToggle();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.autoToggleIntervalId) clearInterval(this.autoToggleIntervalId);
  }

  calculatePositions() {
    const count = this.integrations.length;
    // Use elliptical layout to maximize space
    const radiusX = 42; 
    const radiusY = 42; // Increased vertical radius since we have more height
    const startAngle = -90; 

    this.integrations.forEach((node, index) => {
      const angle = startAngle + (index * (360 / count));
      const radian = (angle * Math.PI) / 180;
      
      // Calculate position as percentage (50% is center)
      node.x = 50 + (radiusX * Math.cos(radian));
      node.y = 50 + (radiusY * Math.sin(radian));
    });
  }

  toggleConnection(node: IntegrationNode) {
    node.connected = !node.connected;
    if (!node.connected) {
      node.syncing = false;
    } else {
      // Trigger a sync immediately for feedback
      node.syncing = true;
      setTimeout(() => {
        node.syncing = false;
        this.cdr.detectChanges();
      }, 1500);
    }
    this.cdr.detectChanges();
  }

  startAutoToggle() {
    this.autoToggleIntervalId = setInterval(() => {
      // Pick 1 or 2 random nodes to toggle
      const countToToggle = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < countToToggle; i++) {
        const randomIndex = Math.floor(Math.random() * this.integrations.length);
        const node = this.integrations[randomIndex];
        this.toggleConnection(node);
      }
      this.cdr.detectChanges();
    }, 5000);
  }

  startSimulation() {
    // Simulate random data activity
    this.intervalId = setInterval(() => {
      const connectedNodes = this.integrations.filter(n => n.connected);
      if (connectedNodes.length === 0) return;

      // Pick 1 to 3 random nodes to sync
      const countToSync = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < countToSync; i++) {
        const randomIndex = Math.floor(Math.random() * connectedNodes.length);
        const node = connectedNodes[randomIndex];
        
        if (!node.syncing) {
            node.syncing = true;
            setTimeout(() => {
                node.syncing = false;
                this.cdr.detectChanges();
            }, 1500 + (Math.random() * 500)); // Random duration
        }
      }
      this.cdr.detectChanges();
    }, 800); // More frequent updates
  }
}
