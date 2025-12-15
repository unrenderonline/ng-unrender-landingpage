import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faLightbulb, faFan, faTv, faTemperatureHigh, faDoorOpen, faDoorClosed, faVideo, faMusic,
  faRobot, faMicrophone, faPaperPlane, faSearch, faHome, faLock
} from '@fortawesome/free-solid-svg-icons';
import { ChatbotService } from '../../../../services/chatbotservice';

interface Device {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'ac' | 'tv' | 'door' | 'camera' | 'speaker' | 'lock';
  isOn: boolean;
  icon: any;
  room: string;
  value?: number; // For temperature or volume
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

@Component({
  selector: 'app-smart-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './smart-home.component.html',
  styleUrls: ['./smart-home.component.scss']
})
export class SmartHomeComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  private chatbotService = inject(ChatbotService);

  faLightbulb = faLightbulb;
  faFan = faFan;
  faTv = faTv;
  faTemperatureHigh = faTemperatureHigh;
  faDoorOpen = faDoorOpen;
  faDoorClosed = faDoorClosed;
  faVideo = faVideo;
  faMusic = faMusic;
  faRobot = faRobot;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
  faSearch = faSearch;
  faHome = faHome;
  faLock = faLock;

  activeCameraFeed: string | null = null;
  currentMessage: string = '';
  isInputFocused = false;

  rooms = ['Sala de Estar', 'Cozinha', 'Quarto', 'Escritório'];
  
  devices: Device[] = [
    { id: 'l1', name: 'Luz Principal', type: 'light', isOn: false, icon: faLightbulb, room: 'Sala de Estar' },
    { id: 't1', name: 'Smart TV', type: 'tv', isOn: false, icon: faTv, room: 'Sala de Estar' },
    { id: 'a1', name: 'Ar Condicionado', type: 'ac', isOn: false, icon: faTemperatureHigh, room: 'Sala de Estar', value: 24 },
    
    { id: 'l2', name: 'Luz Balcão', type: 'light', isOn: false, icon: faLightbulb, room: 'Cozinha' },
    { id: 'f1', name: 'Exaustor', type: 'fan', isOn: false, icon: faFan, room: 'Cozinha' },
    
    { id: 'l3', name: 'Abajur', type: 'light', isOn: false, icon: faLightbulb, room: 'Quarto' },
    { id: 'a2', name: 'Ar Condicionado', type: 'ac', isOn: false, icon: faTemperatureHigh, room: 'Quarto', value: 22 },
    
    { id: 'l4', name: 'Luz Mesa', type: 'light', isOn: false, icon: faLightbulb, room: 'Escritório' },
    { id: 'c1', name: 'Câmera', type: 'camera', isOn: true, icon: faVideo, room: 'Escritório' },
    { id: 'lock1', name: 'Fechadura', type: 'lock', isOn: true, icon: faLock, room: 'Sala de Estar' } // Added lock
  ];

  // AI Agent State
  messages: Message[] = [
    { sender: 'ai', text: 'Como posso ajudar?', time: 'Agora' }
  ];
  isProcessing = false;
  scanningRoom: string | null = null;
  detectedItem: { x: number, y: number, label: string } | null = null;
  
  // Item location (simulated in Sala de Estar)
  keysLocation = { room: 'Sala de Estar', x: 60, y: 65 }; 

  toggleDevice(device: Device) {
    if (device.type === 'camera') {
      this.activeCameraFeed = device.id;
    } else {
      device.isOn = !device.isOn;
    }
  }

  closeCameraFeed() {
    this.activeCameraFeed = null;
  }

  getDevicesByRoom(room: string) {
    return this.devices.filter(d => d.room === room);
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isProcessing) return;

    const userText = this.currentMessage;
    this.addUserMessage(userText);
    this.currentMessage = '';
    this.isProcessing = true;

    // Construct System Message with Device State
    const deviceState = this.devices.map(d => 
      `- ${d.name} (ID: ${d.id}, Room: ${d.room}, Type: ${d.type}, Status: ${d.isOn ? 'ON' : 'OFF'}${d.value ? ', Value: ' + d.value : ''})`
    ).join('\n');

    const systemMessage = `
      You are a Smart Home Assistant. You have control over the following devices:
      ${deviceState}

      User Input: "${userText}"

      Instructions:
      Analyze the user's request and return a JSON ARRAY containing the actions to perform.
      Do not output any conversational text outside the JSON.
      
      Supported Actions:
      1. Toggle Device: {"action": "toggle", "id": "DEVICE_ID", "state": true/false}
      2. Set Value: {"action": "setValue", "id": "DEVICE_ID", "value": NUMBER}
      3. Find Item: {"action": "find", "item": "ITEM_NAME"}
      4. Scenario: {"action": "scenario", "name": "SCENARIO_NAME"}
      5. General Response: {"action": "response", "text": "Your answer here"}

      Example Response for "Turn on living room lights":
      [{"action": "toggle", "id": "l1", "state": true}]

      Example Response for "Turn off everything":
      [{"action": "toggle", "id": "l1", "state": false}, {"action": "toggle", "id": "l2", "state": false}, ...]

      Example Response for "Hello":
      [{"action": "response", "text": "Hello! How can I help you with your smart home?"}]

      IMPORTANT: Output ONLY the JSON Array. No markdown, no explanations.
    `;

    try {
      // Convert internal message format to service format
      const history = this.messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user' as 'assistant' | 'user',
        content: m.text
      }));

      // Use Gemini 2.0 Flash Experimental for fastest response
      this.chatbotService.getGeminiResponse(systemMessage, history, 'gemini-2.5-flash-lite').subscribe({
        next: (response) => {
          this.handleAiResponse(response);
          this.isProcessing = false;
        },
        error: (err) => {
          console.error('AI Error:', err);
          this.addAiMessage('Desculpe, não consegui processar seu comando.');
          this.isProcessing = false;
        }
      });
    } catch (e) {
      console.error(e);
      this.isProcessing = false;
    }
  }

  async handleAiResponse(response: string) {
    try {
      // Clean up markdown code blocks if present
      const cleanResponse = response.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let commands: any[] = [];

      // Try parsing as a single JSON array or object
      try {
        const parsed = JSON.parse(cleanResponse);
        if (Array.isArray(parsed)) {
          commands = parsed;
        } else {
          commands = [parsed];
        }
      } catch (e) {
        // If standard parsing fails, try to extract JSON objects (handling concatenated JSONs)
        const matches = cleanResponse.match(/\{[^{}]*\}/g);
        if (matches) {
          commands = matches.map(m => {
            try { return JSON.parse(m); } catch { return null; }
          }).filter(c => c !== null);
        }
      }

      if (commands.length > 0) {
        let responseText = '';
        let actionsPerformed = 0;

        for (const cmd of commands) {
          if (cmd.action === 'response') {
            responseText = cmd.text;
          } else {
            const result = await this.executeCommand(cmd);
            if (result) actionsPerformed++;
          }
        }

        // If we performed actions but have no text response, add a generic confirmation
        if (actionsPerformed > 0 && !responseText) {
          this.addAiMessage(`Executei ${actionsPerformed} ações com sucesso.`);
        } else if (responseText) {
          this.addAiMessage(responseText);
        }
      } else {
        // Fallback if no JSON found
        this.addAiMessage(response);
      }
    } catch (e) {
      console.error('Error parsing AI response', e);
      this.addAiMessage(response);
    }
  }

  async executeCommand(command: any): Promise<boolean> {
    if (command.action === 'toggle') {
      const device = this.devices.find(d => d.id === command.id);
      if (device) {
        device.isOn = command.state;
        return true;
      }
    } else if (command.action === 'setValue') {
      const device = this.devices.find(d => d.id === command.id);
      if (device) {
        device.value = command.value;
        device.isOn = true; // Auto turn on
        return true;
      }
    } else if (command.action === 'find') {
      this.addAiMessage(`Procurando por ${command.item}...`);
      await this.simulateScanning();
      if (command.item && command.item.toLowerCase().includes('chave')) {
        this.addAiMessage('Encontrei! Estão no sofá da Sala.');
        this.highlightItem(60, 65, 'Chaves');
      } else {
        this.addAiMessage(`Não encontrei ${command.item} nas câmeras.`);
      }
      return true;
    } else if (command.action === 'scenario') {
      if (command.name === 'good-night') {
        await this.triggerScenario('good-night');
        return true;
      }
    }
    return false;
  }

  // AI Methods
  async triggerScenario(scenario: 'find-keys' | 'good-night') {
    if (this.isProcessing) return;
    this.isProcessing = true;

    if (scenario === 'find-keys') {
      this.addUserMessage('Onde estão minhas chaves?');
      await this.delay(1000);
      this.addAiMessage('Procurando nas câmeras...');
      
      await this.simulateScanning();
      
      this.addAiMessage('Encontrei! Estão no sofá da Sala.');
      // Highlight in Sala de Estar (top left room)
      // Coordinates need to match the visual representation in HTML
      this.highlightItem(60, 65, 'Chaves'); 
    } 
    else if (scenario === 'good-night') {
      this.addUserMessage('Modo Boa Noite');
      await this.delay(800);
      this.addAiMessage('Executando rotina noturna...');
      
      await this.delay(1000);
      // Turn off all lights
      this.devices.filter(d => d.type === 'light').forEach(d => d.isOn = false);
      this.addAiMessage('Luzes desligadas.');
      
      await this.delay(1000);
      // Lock door
      const lock = this.devices.find(d => d.id === 'lock1');
      if (lock) lock.isOn = true; // Locked
      this.addAiMessage('Portas trancadas.');
      
      await this.delay(1000);
      // Adjust AC in Bedroom
      const ac = this.devices.find(d => d.id === 'a2');
      if (ac) {
        ac.isOn = true;
        ac.value = 22;
      }
      this.addAiMessage('Ar do quarto em 22°C. Boa noite!');
    }

    this.isProcessing = false;
  }

  async simulateScanning() {
    const roomsToScan = ['Escritório', 'Cozinha', 'Sala de Estar'];
    for (const room of roomsToScan) {
      this.scanningRoom = room;
      await this.delay(1200);
      if (room === 'Sala de Estar') {
        this.scanningRoom = null;
        return;
      }
    }
    this.scanningRoom = null;
  }

  highlightItem(x: number, y: number, label: string) {
    this.detectedItem = { x, y, label };
    setTimeout(() => {
      this.detectedItem = null;
    }, 5000);
  }

  addUserMessage(text: string) {
    this.messages.push({ sender: 'user', text, time: 'Agora' });
    this.scrollToBottom();
  }

  addAiMessage(text: string) {
    this.messages.push({ sender: 'ai', text, time: 'Agora' });
    this.scrollToBottom();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
