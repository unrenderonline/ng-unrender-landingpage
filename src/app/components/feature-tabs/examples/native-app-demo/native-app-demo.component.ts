import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCalendarAlt, faRocket, faUsers, faChartBar, faFolder, faBars, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

interface Activity {
  title: string;
  subtitle: string;
  icon: any;
  colorClass: string;
  completed: boolean;
}

@Component({
  selector: 'app-native-app-demo',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './native-app-demo.component.html',
  styleUrls: ['./native-app-demo.component.scss']
})
export class NativeAppDemoComponent implements OnInit {
  @Input() platform: 'android' | 'ios' = 'android';
  
  currentTime: string = '';

  // FontAwesome icons
  faUser = faUser;
  faCalendarAlt = faCalendarAlt;
  faRocket = faRocket;
  faUsers = faUsers;
  faChartBar = faChartBar;
  faFolder = faFolder;
  faBars = faBars;
  faPlus = faPlus;
  faCheck = faCheck;

  activities: Activity[] = [
    {
      title: 'Revisão de Design',
      subtitle: '10:00 • Sincronização da Equipe',
      icon: faCalendarAlt,
      colorClass: 'icon-blue',
      completed: false
    },
    {
      title: 'Lançamento do Projeto',
      subtitle: 'Ontem • Marketing',
      icon: faRocket,
      colorClass: 'icon-purple',
      completed: false
    },
    {
      title: 'Reunião com Cliente',
      subtitle: 'Seg • Vendas',
      icon: faUsers,
      colorClass: 'icon-green',
      completed: false
    }
  ];

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  toggleActivity(activity: Activity) {
    activity.completed = !activity.completed;
  }

  addActivity() {
    const newActivity: Activity = {
      title: 'Nova Tarefa',
      subtitle: 'Agora • Geral',
      icon: this.faCalendarAlt,
      colorClass: 'icon-blue',
      completed: false
    };
    this.activities.unshift(newActivity);
  }
}
