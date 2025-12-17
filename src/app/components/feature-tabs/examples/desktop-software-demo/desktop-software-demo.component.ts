import { Component, Input, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWidgetComponent } from '../../../chat-widget/chat-widget.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faWindowMinimize, faWindowMaximize, faTimes, faDesktop, faWifi, faVolumeUp, faBatteryFull,
  faSearch, faThLarge, faCog, faFolder, faTerminal, faCode, faGlobe, faBrain
} from '@fortawesome/free-solid-svg-icons';
import { faMicrosoft, faApple, faUbuntu } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-desktop-software-demo',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ChatWidgetComponent],
  templateUrl: './desktop-software-demo.component.html',
  styleUrls: ['./desktop-software-demo.component.scss']
})
export class DesktopSoftwareDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() os: 'windows' | 'macos' | 'linux' = 'windows';
  @ViewChild('monitorContainer') monitorContainer!: ElementRef;

  activeTab: string = 'dashboard';

  config = {
    notifications: true,
    updates: false
  };

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  toggleConfig(key: keyof typeof this.config) {
    this.config[key] = !this.config[key];
  }

  scaleFactor: number = 1;
  containerHeight: number = 0;
  baseWidth: number = 1600;
  baseHeight: number = 900; // 16:9 of 1600px

  constructor(private el: ElementRef) { }

  isWindowOpen: boolean = true;
  isMaximized: boolean = false;
  isMinimized: boolean = false;
  currentTime: string = '';
  currentDate: string = '';

  // Icons
  faWindowMinimize = faWindowMinimize;
  faWindowMaximize = faWindowMaximize;
  faTimes = faTimes;
  faDesktop = faDesktop;
  faWifi = faWifi;
  faVolumeUp = faVolumeUp;
  faBatteryFull = faBatteryFull;
  faSearch = faSearch;
  faThLarge = faThLarge;
  faCog = faCog;
  faFolder = faFolder;
  faTerminal = faTerminal;
  faCode = faCode;
  faGlobe = faGlobe;
  faBrain = faBrain;

  // Brand Icons
  faWindowsBrand = faMicrosoft;
  faAppleBrand = faApple;
  faLinuxBrand = faUbuntu;

  showCtrlBImage: boolean = false;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      this.showCtrlBImage = !this.showCtrlBImage;
    }
  }

  // Window State
  windowPosition = { x: 100, y: 50 }; // Slightly left to center 1400 on 1600
  windowSize = { width: 1400, height: 800 };
  isDragging = false;
  dragStart = { x: 0, y: 0 };
  initialWindowPosition = { x: 0, y: 0 };

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit() {
    this.initResizeObserver();
  }

  initResizeObserver() {
    if (!this.monitorContainer) return;

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.updateScale(entry.contentRect.width);
      }
    });

    if (this.monitorContainer.nativeElement.parentElement) {
      this.resizeObserver.observe(this.monitorContainer.nativeElement.parentElement);
    } else {
      this.resizeObserver.observe(this.monitorContainer.nativeElement);
    }

    // Initial call just in case
    setTimeout(() => this.updateScale(), 0);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateScale(width?: number) {
    if (!this.monitorContainer) return;

    let containerWidth: number = width ?? 0;

    // Fallbacks
    if (containerWidth === 0) {
      // Use parent offsetWidth to avoid reading the stretched child width
      containerWidth = this.monitorContainer.nativeElement.parentElement?.offsetWidth || this.monitorContainer.nativeElement.offsetWidth;

      // If container is 0 (hidden), try window fallback
      if (!containerWidth) {
        containerWidth = window.innerWidth < 800 ? window.innerWidth - 40 : 800; // conservative fallback
      }
    }

    // Safety check for zero width
    if (containerWidth === 0) {
      containerWidth = this.el.nativeElement.offsetWidth || (window.innerWidth > 0 ? window.innerWidth : 400);
    }

    // Now that grid is fixed with minmax(0, 1fr), the host element width is TRUTH.
    // We should trust it, but apply a safety buffer to avoid pixel rounding cutoffs.

    // Safety buffer: subtract 2px to ensure borders aren't clipped by rounding errors
    const availableWidth = containerWidth - 2;

    this.scaleFactor = Math.min(availableWidth / this.baseWidth, 1.0);

    // Min scale cap
    if (this.scaleFactor <= 0.1) this.scaleFactor = 0.1;

    this.containerHeight = this.baseHeight * this.scaleFactor;
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  // Drag Handlers
  startDrag(event: MouseEvent) {
    if (this.isMaximized) return;
    this.isDragging = true;
    this.dragStart = { x: event.clientX, y: event.clientY };
    this.initialWindowPosition = { ...this.windowPosition };
    event.preventDefault(); // Prevent text selection
  }

  @HostListener('window:mousemove', ['$event'])
  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.dragStart.x;
    const dy = event.clientY - this.dragStart.y;
    this.windowPosition = {
      x: this.initialWindowPosition.x + dx,
      y: this.initialWindowPosition.y + dy
    };
  }

  @HostListener('window:mouseup')
  endDrag() {
    this.isDragging = false;
  }

  closeWindow() {
    this.isWindowOpen = false;
    this.isMaximized = false;
    this.isMinimized = false;
  }

  openWindow() {
    this.isWindowOpen = true;
    this.isMinimized = false;
  }

  minimizeWindow() {
    this.isMinimized = true;
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }

  restoreWindow() {
    if (this.isMinimized) {
      this.isMinimized = false;
    } else {
      this.isWindowOpen = true;
    }
  }
}
