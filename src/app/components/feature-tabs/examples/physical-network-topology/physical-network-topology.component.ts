import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCloud, faServer, faNetworkWired, faWifi, faDesktop, faLaptop, faMobileAlt, 
  faShieldAlt, faLock, faPhone, faPrint, faRandom, faHdd
} from '@fortawesome/free-solid-svg-icons';

interface Device {
  id: string;
  name: string;
  type: 'cloud' | 'router' | 'switch' | 'firewall' | 'ap' | 'pc' | 'phone' | 'server' | 'printer';
  x: number; // Percentage
  y: number; // Percentage
  icon: any;
  status: 'online' | 'offline' | 'active';
  ip: string;
  mac: string;
}

interface Cable {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'ethernet' | 'fiber' | 'wireless' | 'vpn';
  active: boolean;
}

interface Packet {
  id: number;
  sourceId: string;
  targetId: string;
  path: string[]; // Array of Device IDs
  currentStep: number;
  progress: number; // 0-100%
  type: 'data' | 'voice' | 'secure';
  color: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-physical-network-topology',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './physical-network-topology.component.html',
  styleUrls: ['./physical-network-topology.component.scss']
})
export class PhysicalNetworkTopologyComponent implements OnInit, OnDestroy {
  // Icons
  faCloud = faCloud;
  faServer = faServer;
  faNetworkWired = faNetworkWired; // Switch
  faWifi = faWifi; // AP
  faDesktop = faDesktop;
  faLaptop = faLaptop;
  faMobileAlt = faMobileAlt;
  faShieldAlt = faShieldAlt; // Firewall
  faLock = faLock; // VPN
  faPhone = faPhone; // VoIP
  faPrint = faPrint;
  faRandom = faRandom; // Router
  faHdd = faHdd; // Modem

  devices: Device[] = [];
  cables: Cable[] = [];
  packets: Packet[] = [];
  
  vpnEnabled = true;
  selectedDevice: Device | null = null;

  private simulationInterval: any;
  private animationFrameId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeTopology();
    this.startSimulation();
  }

  ngOnDestroy() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  initializeTopology() {
    // 1. WAN / Edge
    this.devices.push(
      { id: 'cloud', name: 'Internet', type: 'cloud', x: 50, y: 10, icon: faCloud, status: 'online', ip: '8.8.8.8', mac: '00:00:00:00:00:00' },
      { id: 'modem', name: 'ISP Modem', type: 'router', x: 50, y: 25, icon: faHdd, status: 'online', ip: '203.0.113.10', mac: 'A1:B2:C3:D4:E5:F6' },
      { id: 'firewall', name: 'VPN Gateway', type: 'firewall', x: 50, y: 40, icon: faShieldAlt, status: 'online', ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:FF' }
    );

    // 2. Core / Distribution
    this.devices.push(
      { id: 'switch-core', name: 'Core Switch', type: 'switch', x: 50, y: 55, icon: faNetworkWired, status: 'online', ip: '192.168.1.2', mac: '11:22:33:44:55:66' }
    );

    // 3. Access Layer (Left: Wired, Right: Wireless)
    this.devices.push(
      { id: 'server-file', name: 'File Server', type: 'server', x: 20, y: 55, icon: faServer, status: 'online', ip: '192.168.1.10', mac: 'DD:EE:FF:11:22:33' },
      { id: 'ap-office', name: 'Wi-Fi AP', type: 'ap', x: 80, y: 55, icon: faWifi, status: 'online', ip: '192.168.1.5', mac: 'FF:EE:DD:CC:BB:AA' }
    );

    // 4. End Devices
    this.devices.push(
      { id: 'pc-admin', name: 'Admin PC', type: 'pc', x: 15, y: 80, icon: faDesktop, status: 'online', ip: '192.168.1.101', mac: '00:11:22:33:44:55' },
      { id: 'phone-reception', name: 'VoIP Phone', type: 'phone', x: 35, y: 80, icon: faPhone, status: 'online', ip: '192.168.1.201', mac: '00:AA:BB:CC:DD:EE' },
      { id: 'laptop-user', name: 'User Laptop', type: 'pc', x: 65, y: 80, icon: faLaptop, status: 'online', ip: '192.168.1.102', mac: '11:22:33:AA:BB:CC' },
      { id: 'mobile-guest', name: 'Guest Mobile', type: 'phone', x: 85, y: 80, icon: faMobileAlt, status: 'online', ip: '192.168.1.103', mac: 'AA:11:BB:22:CC:33' }
    );

    // Connections
    this.connect('cloud', 'modem', 'fiber');
    this.connect('modem', 'firewall', 'ethernet');
    this.connect('firewall', 'switch-core', 'ethernet');
    
    this.connect('switch-core', 'server-file', 'ethernet');
    this.connect('switch-core', 'ap-office', 'ethernet');
    this.connect('switch-core', 'pc-admin', 'ethernet');
    this.connect('switch-core', 'phone-reception', 'ethernet');
    
    this.connect('ap-office', 'laptop-user', 'wireless');
    this.connect('ap-office', 'mobile-guest', 'wireless');
  }

  connect(sourceId: string, targetId: string, type: Cable['type']) {
    this.cables.push({
      id: `${sourceId}-${targetId}`,
      sourceId,
      targetId,
      type,
      active: false
    });
  }

  startSimulation() {
    // Traffic Generator
    this.simulationInterval = setInterval(() => {
      this.generateTraffic();
    }, 800);

    // Animation Loop
    const animate = () => {
      this.updatePackets();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  generateTraffic() {
    // Pick random end device
    const endDevices = this.devices.filter(d => ['pc', 'phone', 'server'].includes(d.type));
    const source = endDevices[Math.floor(Math.random() * endDevices.length)];
    
    // Target is usually Cloud or Server
    const targets = [this.getDevice('cloud'), this.getDevice('server-file')];
    const target = targets[Math.floor(Math.random() * targets.length)];

    if (source && target && source.id !== target.id) {
      const path = this.findPath(source.id, target.id);
      if (path.length > 0) {
        const isVoice = source.type === 'phone';
        const isSecure = this.vpnEnabled && (target.id === 'cloud' || source.id === 'cloud');
        
        this.packets.push({
          id: Date.now() + Math.random(),
          sourceId: source.id,
          targetId: target.id,
          path: path,
          currentStep: 0,
          progress: 0,
          type: isVoice ? 'voice' : (isSecure ? 'secure' : 'data'),
          color: isVoice ? '#22c55e' : (isSecure ? '#f59e0b' : '#3b82f6'),
          x: source.x,
          y: source.y
        });
      }
    }
  }

  findPath(startId: string, endId: string): string[] {
    // BFS
    const queue: {id: string, path: string[]}[] = [{id: startId, path: [startId]}];
    const visited = new Set<string>();
    
    while (queue.length > 0) {
      const {id, path} = queue.shift()!;
      if (id === endId) return path;
      
      visited.add(id);
      
      const neighbors = this.cables
        .filter(c => c.sourceId === id || c.targetId === id)
        .map(c => c.sourceId === id ? c.targetId : c.sourceId);
        
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push({id: neighbor, path: [...path, neighbor]});
        }
      }
    }
    return [];
  }

  updatePackets() {
    const speed = 1.5;
    
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const packet = this.packets[i];
      packet.progress += speed;

      if (packet.progress >= 100) {
        packet.progress = 0;
        packet.currentStep++;
        
        // Activate cable
        if (packet.currentStep > 0 && packet.currentStep < packet.path.length) {
            const prev = packet.path[packet.currentStep - 1];
            const curr = packet.path[packet.currentStep];
            const cable = this.cables.find(c => 
                (c.sourceId === prev && c.targetId === curr) || 
                (c.sourceId === curr && c.targetId === prev)
            );
            if (cable) {
                cable.active = true;
                setTimeout(() => cable.active = false, 200);
            }
        }

        if (packet.currentStep >= packet.path.length - 1) {
          this.packets.splice(i, 1);
          continue;
        }
      }

      // Update Position
      const currentDeviceId = packet.path[packet.currentStep];
      const nextDeviceId = packet.path[packet.currentStep + 1];
      
      const startDevice = this.getDevice(currentDeviceId);
      const endDevice = this.getDevice(nextDeviceId);

      if (startDevice && endDevice) {
        packet.x = startDevice.x + (endDevice.x - startDevice.x) * (packet.progress / 100);
        packet.y = startDevice.y + (endDevice.y - startDevice.y) * (packet.progress / 100);
      }
    }
    this.cdr.detectChanges();
  }

  toggleVpn() {
    this.vpnEnabled = !this.vpnEnabled;
  }

  selectDevice(device: Device) {
    this.selectedDevice = device;
  }

  getDevice(id: string) {
    return this.devices.find(d => d.id === id);
  }
}
