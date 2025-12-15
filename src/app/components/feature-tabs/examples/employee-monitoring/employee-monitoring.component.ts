import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUser, faBan, faCheckCircle, faExclamationTriangle, faChartLine, 
  faBriefcase, faGamepad, faVideo, faShoppingCart, faComments, faLock
} from '@fortawesome/free-solid-svg-icons';

interface Activity {
  name: string;
  category: 'trabalho' | 'social' | 'streaming' | 'compras' | 'jogos';
  icon: any;
  isProductive: boolean;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'ausente' | 'offline';
  currentActivity: Activity;
  productivityScore: number; // 0-100
  blockedAttempts: number;
  lastBlockedSite?: string;
  screenThumbnail?: string; // Placeholder color or gradient
}

interface Policy {
  id: string;
  name: string;
  category: Activity['category'];
  enabled: boolean;
  icon: any;
}

@Component({
  selector: 'app-employee-monitoring',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './employee-monitoring.component.html',
  styleUrls: ['./employee-monitoring.component.scss']
})
export class EmployeeMonitoringComponent implements OnInit, OnDestroy {
  // Icons
  faUser = faUser;
  faBan = faBan;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  faChartLine = faChartLine;
  faLock = faLock;

  // Data
  employees: Employee[] = [];
  policies: Policy[] = [
    { id: 'p1', name: 'Bloquear Redes Sociais', category: 'social', enabled: true, icon: faComments },
    { id: 'p2', name: 'Bloquear Streaming', category: 'streaming', enabled: true, icon: faVideo },
    { id: 'p3', name: 'Bloquear Compras', category: 'compras', enabled: false, icon: faShoppingCart },
    { id: 'p4', name: 'Bloquear Jogos', category: 'jogos', enabled: true, icon: faGamepad },
  ];

  activities: Activity[] = [
    { name: 'VS Code', category: 'trabalho', icon: faBriefcase, isProductive: true },
    { name: 'Slack', category: 'trabalho', icon: faComments, isProductive: true },
    { name: 'Jira', category: 'trabalho', icon: faBriefcase, isProductive: true },
    { name: 'Outlook', category: 'trabalho', icon: faBriefcase, isProductive: true },
    { name: 'Facebook', category: 'social', icon: faComments, isProductive: false },
    { name: 'Twitter', category: 'social', icon: faComments, isProductive: false },
    { name: 'YouTube', category: 'streaming', icon: faVideo, isProductive: false },
    { name: 'Netflix', category: 'streaming', icon: faVideo, isProductive: false },
    { name: 'Amazon', category: 'compras', icon: faShoppingCart, isProductive: false },
    { name: 'Steam', category: 'jogos', icon: faGamepad, isProductive: false },
  ];

  logs: { time: string, message: string, type: 'info' | 'warning' | 'block' }[] = [];
  
  private simulationInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeEmployees();
    this.startSimulation();
  }

  ngOnDestroy() {
    if (this.simulationInterval) clearInterval(this.simulationInterval);
  }

  initializeEmployees() {
    this.employees = [
      { 
        id: 'e1', name: 'Sarah Connor', role: 'Dev Frontend', avatar: 'SC', 
        status: 'online', currentActivity: this.activities[0], productivityScore: 95, blockedAttempts: 0,
        screenThumbnail: 'bg-slate-700'
      },
      { 
        id: 'e2', name: 'John Smith', role: 'Vendas', avatar: 'JS', 
        status: 'online', currentActivity: this.activities[3], productivityScore: 88, blockedAttempts: 0,
        screenThumbnail: 'bg-blue-900'
      },
      { 
        id: 'e3', name: 'Mike Ross', role: 'Jurídico', avatar: 'MR', 
        status: 'ausente', currentActivity: this.activities[0], productivityScore: 72, blockedAttempts: 2,
        screenThumbnail: 'bg-slate-800'
      },
      { 
        id: 'e4', name: 'Elena Fisher', role: 'Designer', avatar: 'EF', 
        status: 'online', currentActivity: this.activities[1], productivityScore: 91, blockedAttempts: 0,
        screenThumbnail: 'bg-purple-900'
      },
    ];
  }

  startSimulation() {
    this.simulationInterval = setInterval(() => {
      this.simulateActivity();
    }, 2000);
  }

  simulateActivity() {
    // Pick a random employee
    const employee = this.employees[Math.floor(Math.random() * this.employees.length)];
    
    // 30% chance to change activity
    if (Math.random() > 0.7) {
      const newActivity = this.activities[Math.floor(Math.random() * this.activities.length)];
      
      // Check Policy
      const policy = this.policies.find(p => p.category === newActivity.category);
      
      if (policy && policy.enabled && !newActivity.isProductive) {
        // BLOCKED
        employee.blockedAttempts++;
        employee.lastBlockedSite = newActivity.name;
        this.addLog(`${employee.name} tentou acessar ${newActivity.name} (Bloqueado)`, 'block');
        
        // Flash effect or visual feedback could go here
        // They stay on their previous productive app or go to idle
      } else {
        // ALLOWED
        employee.currentActivity = newActivity;
        
        if (!newActivity.isProductive) {
          employee.productivityScore = Math.max(0, employee.productivityScore - 2);
          this.addLog(`${employee.name} acessou ${newActivity.name}`, 'warning');
        } else {
          employee.productivityScore = Math.min(100, employee.productivityScore + 1);
        }
      }
    }
    
    // Randomly update productivity scores slightly
    this.employees.forEach(emp => {
      if (emp.currentActivity.isProductive) {
        emp.productivityScore = Math.min(100, emp.productivityScore + 0.5);
      } else {
        emp.productivityScore = Math.max(0, emp.productivityScore - 0.5);
      }
    });

    this.cdr.detectChanges();
  }

  togglePolicy(policy: Policy) {
    policy.enabled = !policy.enabled;
    this.addLog(`Política atualizada: ${policy.name} agora está ${policy.enabled ? 'ATIVA' : 'DESATIVADA'}`, 'info');
  }

  addLog(message: string, type: 'info' | 'warning' | 'block') {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({ time, message, type });
    if (this.logs.length > 20) this.logs.pop();
  }

  getProductivityColor(score: number): string {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  }
  
  getProgressBarColor(score: number): string {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }
}
