import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faServer, faNetworkWired, faWifi, faDesktop, faLaptop, faMobileAlt, 
  faShieldAlt, faGlobe, faExchangeAlt, faExclamationTriangle, faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

interface NetworkNode {
  id: string;
  name: string;
  type: 'internet' | 'firewall' | 'core' | 'dist' | 'access' | 'server' | 'client' | 'wifi';
  status: 'online' | 'warning' | 'offline';
  load: number; // 0-100%
  x: number; // Percentage
  y: number; // Percentage
  icon: any;
  ip: string;
}

interface NetworkLink {
  id: string;
  sourceId: string;
  targetId: string;
  load: number; // 0-100%
  active: boolean;
}

interface DataPacket {
  id: number;
  path: string[]; // Array of Node IDs
  currentStep: number; // Index in path
  progress: number; // 0-100% between current and next step
  color: string;
  type: 'http' | 'db' | 'stream' | 'voip';
}

@Component({
  selector: 'app-network-management',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './network-management.component.html',
  styleUrls: ['./network-management.component.scss']
})
export class NetworkManagementComponent implements OnInit, OnDestroy {
  // Icons
  faServer = faServer;
  faNetworkWired = faNetworkWired;
  faWifi = faWifi;
  faDesktop = faDesktop;
  faLaptop = faLaptop;
  faMobileAlt = faMobileAlt;
  faShieldAlt = faShieldAlt;
  faGlobe = faGlobe;
  faExchangeAlt = faExchangeAlt;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;

  nodes: NetworkNode[] = [];
  links: NetworkLink[] = [];
  packets: DataPacket[] = [];
  
  // Stats
  totalBandwidth = 0; // Gbps
  activeConnections = 0;
  avgLatency = 0; // ms
  threatsBlocked = 0;

  private simulationInterval: any;
  private animationFrameId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeNetwork();
    this.startSimulation();
  }

  ngOnDestroy() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  initializeNetwork() {
    // 1. Internet & Core
    this.nodes.push(
      { id: 'internet', name: 'ISP Uplink', type: 'internet', status: 'online', load: 45, x: 50, y: 5, icon: faGlobe, ip: '203.0.113.1' },
      { id: 'firewall', name: 'NG Firewall', type: 'firewall', status: 'online', load: 30, x: 50, y: 15, icon: faShieldAlt, ip: '192.168.1.1' },
      { id: 'core-sw', name: 'Core Switch L3', type: 'core', status: 'online', load: 25, x: 50, y: 25, icon: faExchangeAlt, ip: '192.168.1.2' }
    );

    // 2. Distribution Layer (Left: Servers, Right: Clients)
    this.nodes.push(
      { id: 'dist-sw-1', name: 'Dist. Server Farm', type: 'dist', status: 'online', load: 15, x: 30, y: 40, icon: faNetworkWired, ip: '192.168.10.1' },
      { id: 'dist-sw-2', name: 'Dist. Office LAN', type: 'dist', status: 'online', load: 40, x: 70, y: 40, icon: faNetworkWired, ip: '192.168.20.1' }
    );

    // 3. Access Layer & Devices
    // Server Farm Side
    this.nodes.push(
      { id: 'srv-db', name: 'Database Cluster', type: 'server', status: 'online', load: 60, x: 15, y: 60, icon: faServer, ip: '192.168.10.10' },
      { id: 'srv-app', name: 'App Servers', type: 'server', status: 'online', load: 45, x: 30, y: 60, icon: faServer, ip: '192.168.10.11' },
      { id: 'srv-backup', name: 'Backup NAS', type: 'server', status: 'online', load: 10, x: 45, y: 60, icon: faServer, ip: '192.168.10.12' }
    );

    // Office Side
    this.nodes.push(
      { id: 'acc-sw-1', name: 'Access SW Floor 1', type: 'access', status: 'online', load: 35, x: 60, y: 55, icon: faNetworkWired, ip: '192.168.20.2' },
      { id: 'wifi-ap', name: 'Wi-Fi Controller', type: 'wifi', status: 'online', load: 55, x: 80, y: 55, icon: faWifi, ip: '192.168.30.1' }
    );

    // End Users
    this.nodes.push(
      { id: 'pc-1', name: 'Workstation 01', type: 'client', status: 'online', load: 20, x: 55, y: 75, icon: faDesktop, ip: '192.168.20.101' },
      { id: 'pc-2', name: 'Workstation 02', type: 'client', status: 'online', load: 15, x: 65, y: 75, icon: faDesktop, ip: '192.168.20.102' },
      { id: 'laptop-1', name: 'Laptop User', type: 'client', status: 'online', load: 30, x: 75, y: 75, icon: faLaptop, ip: '192.168.30.50' },
      { id: 'mobile-1', name: 'Mobile Device', type: 'client', status: 'online', load: 10, x: 85, y: 75, icon: faMobileAlt, ip: '192.168.30.51' }
    );

    // Links
    this.createLink('internet', 'firewall');
    this.createLink('firewall', 'core-sw');
    this.createLink('core-sw', 'dist-sw-1');
    this.createLink('core-sw', 'dist-sw-2');
    
    this.createLink('dist-sw-1', 'srv-db');
    this.createLink('dist-sw-1', 'srv-app');
    this.createLink('dist-sw-1', 'srv-backup');

    this.createLink('dist-sw-2', 'acc-sw-1');
    this.createLink('dist-sw-2', 'wifi-ap');

    this.createLink('acc-sw-1', 'pc-1');
    this.createLink('acc-sw-1', 'pc-2');
    this.createLink('wifi-ap', 'laptop-1');
    this.createLink('wifi-ap', 'mobile-1');
  }

  createLink(sourceId: string, targetId: string) {
    this.links.push({
      id: `${sourceId}-${targetId}`,
      sourceId,
      targetId,
      load: 0,
      active: false
    });
  }

  startSimulation() {
    // Logic Loop (Traffic Generation & Stats)
    this.simulationInterval = setInterval(() => {
      this.generateTraffic();
      this.updateStats();
    }, 500);

    // Animation Loop (Packet Movement)
    const animate = () => {
      this.updatePackets();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  generateTraffic() {
    // Randomly create packets from clients to servers or internet
    const clients = this.nodes.filter(n => n.type === 'client');
    const servers = this.nodes.filter(n => n.type === 'server');
    const internet = this.nodes.find(n => n.type === 'internet');

    if (Math.random() > 0.3) { // 70% chance
      const source = clients[Math.floor(Math.random() * clients.length)];
      const isInternetBound = Math.random() > 0.6;
      const target = isInternetBound ? internet : servers[Math.floor(Math.random() * servers.length)];

      if (source && target) {
        const path = this.calculatePath(source.id, target.id);
        if (path.length > 0) {
          const types: DataPacket['type'][] = ['http', 'db', 'stream', 'voip'];
          const type = types[Math.floor(Math.random() * types.length)];
          
          let color = '#60a5fa'; // Blue (HTTP)
          if (type === 'db') color = '#facc15'; // Yellow
          if (type === 'stream') color = '#a78bfa'; // Purple
          if (type === 'voip') color = '#4ade80'; // Green

          this.packets.push({
            id: Date.now() + Math.random(),
            path: path,
            currentStep: 0,
            progress: 0,
            color: color,
            type: type
          });
        }
      }
    }
  }

  calculatePath(startId: string, endId: string): string[] {
    // Simple tree traversal logic since our topology is a tree
    // Find path up to common ancestor then down
    // For this specific topology, we can hardcode or use a simple search
    // Since it's a tree, there's only one path.
    
    // Simplified: Just go up to Core then down? 
    // Or just use a pre-defined map for this demo.
    
    // Let's do a simple BFS for robustness
    const queue: {id: string, path: string[]}[] = [{id: startId, path: [startId]}];
    const visited = new Set<string>();
    
    while (queue.length > 0) {
      const {id, path} = queue.shift()!;
      if (id === endId) return path;
      
      visited.add(id);
      
      // Find neighbors
      const neighbors = this.links
        .filter(l => l.sourceId === id || l.targetId === id)
        .map(l => l.sourceId === id ? l.targetId : l.sourceId);
        
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push({id: neighbor, path: [...path, neighbor]});
        }
      }
    }
    return [];
  }

  updatePackets() {
    const speed = 2; // % per frame
    
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const packet = this.packets[i];
      packet.progress += speed;

      if (packet.progress >= 100) {
        packet.progress = 0;
        packet.currentStep++;
        
        // Pulse the node we just arrived at
        const currentNodeId = packet.path[packet.currentStep];
        const node = this.nodes.find(n => n.id === currentNodeId);
        if (node) {
          node.load = Math.min(100, node.load + 5);
          setTimeout(() => node.load = Math.max(0, node.load - 5), 500);
        }

        // Pulse the link we just traversed
        if (packet.currentStep > 0) {
            const prevNodeId = packet.path[packet.currentStep - 1];
            const link = this.links.find(l => 
                (l.sourceId === prevNodeId && l.targetId === currentNodeId) || 
                (l.sourceId === currentNodeId && l.targetId === prevNodeId)
            );
            if (link) {
                link.load = Math.min(100, link.load + 10);
                link.active = true;
                setTimeout(() => {
                    link.load = Math.max(0, link.load - 10);
                    link.active = false;
                }, 300);
            }
        }

        if (packet.currentStep >= packet.path.length - 1) {
          // Arrived at destination
          this.packets.splice(i, 1);
          this.activeConnections++;
          this.totalBandwidth += Math.random() * 0.5;
        }
      }
    }
    this.cdr.detectChanges();
  }

  updateStats() {
    // Decay stats
    this.totalBandwidth = Math.max(0, this.totalBandwidth * 0.95);
    this.avgLatency = 15 + (this.totalBandwidth * 2) + (Math.random() * 5);
    
    // Random threat simulation
    if (Math.random() > 0.95) {
        this.threatsBlocked++;
        const firewall = this.nodes.find(n => n.id === 'firewall');
        if (firewall) {
            firewall.status = 'warning';
            setTimeout(() => firewall.status = 'online', 1000);
        }
    }
  }

  getNodeById(id: string): NetworkNode | undefined {
    return this.nodes.find(n => n.id === id);
  }
}
