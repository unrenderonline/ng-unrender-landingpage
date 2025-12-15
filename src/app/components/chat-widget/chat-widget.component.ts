import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  SecurityContext
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatbotService } from '../../services/chatbotservice';

// --------------------------------------------------------------------------
// 1. DATA MODEL (Interface)
// --------------------------------------------------------------------------
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// --------------------------------------------------------------------------
// 3. STANDALONE CHAT COMPONENT
// --------------------------------------------------------------------------
@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [
    CommonModule, // For *ngFor, *ngIf
    FormsModule   // For [(ngModel)]
  ],
  template: `
    <div class="w-full">
      
      <!-- Chat bubbles floating above the input -->
      <div class="flex flex-col space-y-4 p-4">
        
        @if (!latestUserMessage && !latestAssistantMessage && !isLoading) {
        <div class="text-center text-gray-500 p-4">
          <p>Olá! Sou a IA da Unrender. Me pergunte algo!</p>
        </div>
        }

        <!-- User bubble on right corner, a bit upper -->
        @if (latestUserMessage) {
        <div class="flex justify-end" style="margin-top: -20px;">
          <div #userBubble class="max-w-[80%] rounded-lg p-3 text-white bg-unrender-accent shadow-md">
            {{ latestUserMessage }}
          </div>
        </div>
        }
        
        <!-- Assistant bubble on left -->
        @if (latestAssistantMessage) {
        <div class="flex justify-start">
          <div #assistantBubble class="chat-bubble max-w-[80%] rounded-lg p-3 text-white bg-unrender-purple shadow-md">
            <div [innerHTML]="parseMarkdown(latestAssistantMessage)"></div>
          </div>
        </div>
        }

        <!-- Loading bubble -->
        @if (isLoading) {
        <div class="flex justify-start">
          <div #loadingBubble class="chat-bubble max-w-[80%] rounded-lg p-3 text-white bg-unrender-purple shadow-md">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        }
      </div>

      <!-- Full width input at bottom -->
      <div class="input-area w-full p-4 bg-transparent border-t border-unrender-purple/20">
        <div class="flex items-center space-x-3">
          <textarea
            #messageInput
            [(ngModel)]="currentMessage"
            (keydown.enter)="onEnterKey($event)"
            (focus)="onInputFocus()"
            (blur)="onInputBlur()"
            placeholder="Como posso ajudar?"
            class="flex-1 bg-white/10 text-unrender-purple rounded-lg p-3 outline-none focus:ring-2 focus:ring-unrender-accent resize-none border border-unrender-purple/30 placeholder-unrender-purple"
            style="max-height: 120px; overflow-y: auto;"
            rows="3"
            [disabled]="isLoading"
          ></textarea>

          <button 
            #sendButton
            (click)="sendMessage()" 
            [disabled]="isLoading || currentMessage.trim() === ''"
            class="p-3 bg-unrender-accent text-white rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0
                   hover:bg-unrender-accent/80
                   focus:outline-none focus:ring-2 focus:ring-unrender-accent
                   disabled:bg-unrender-purple disabled:cursor-not-allowed">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Most styling is done with Tailwind in the template.
      This block is for any complex or dynamic styles.
    */
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    /* Markdown formatting styles */
    .chat-bubble strong {
      font-weight: 700;
      color: #fbbf24; /* unrender-accent color */
    }

    .chat-bubble em {
      font-style: italic;
      color: #e5e7eb;
    }

    .chat-bubble code {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
      color: #fbbf24;
    }

    .chat-bubble pre {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 12px;
      border-radius: 6px;
      margin: 8px 0;
      overflow-x: auto;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.85em;
      color: #e5e7eb;
    }

    .chat-bubble pre code {
      background: none;
      padding: 0;
      border-radius: 0;
    }

    .chat-bubble ul, .chat-bubble ol {
      margin: 8px 0;
      padding-left: 20px;
    }

    .chat-bubble li {
      margin: 4px 0;
      color: #e5e7eb;
    }

    .chat-bubble h1, .chat-bubble h2, .chat-bubble h3 {
      margin: 12px 0 8px 0;
      color: #fbbf24;
      font-weight: 600;
    }

    .chat-bubble h1 {
      font-size: 1.25em;
    }

    .chat-bubble h2 {
      font-size: 1.125em;
    }

    .chat-bubble h3 {
      font-size: 1em;
    }

    .chat-bubble a {
      color: #fbbf24;
      text-decoration: underline;
    }

    .chat-bubble a:hover {
      color: #f59e0b;
    }

    .chat-bubble p {
      margin: 8px 0;
      color: #e5e7eb;
    }

    /* Loading dots animation */
    .loading-dots {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .loading-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #fbbf24; /* unrender-accent */
      animation: loading-dots 1.4s infinite ease-in-out;
    }

    .loading-dots span:nth-child(1) {
      animation-delay: -0.32s;
    }

    .loading-dots span:nth-child(2) {
      animation-delay: -0.16s;
    }

    .loading-dots span:nth-child(3) {
      animation-delay: 0s;
    }

    @keyframes loading-dots {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
  `]
})
export class ChatWidgetComponent implements OnInit, AfterViewInit {

  // --- COMPONENT INPUTS ---
  /**
   * The system message to guide the AI.
   * This can be set from the parent component.
   * e.g: <app-chat-widget [systemMessage]="'You are a pirate.'"></app-chat-widget>
   * 
   * Available predefined system messages:
   * - ChatbotService.SYSTEM_MESSAGES.DEFAULT
   * - ChatbotService.SYSTEM_MESSAGES.FRIENDLY
   * - ChatbotService.SYSTEM_MESSAGES.PROFESSIONAL
   * - ChatbotService.SYSTEM_MESSAGES.TECHNICAL
   * - ChatbotService.SYSTEM_MESSAGES.CREATIVE
   * - ChatbotService.SYSTEM_MESSAGES.EDUCATIONAL
   * - ChatbotService.SYSTEM_MESSAGES.CUSTOMER_SUPPORT
   * - ChatbotService.SYSTEM_MESSAGES.CODE_REVIEWER
   */
  @Input() systemMessage: string = ChatbotService.SYSTEM_MESSAGES.DEFAULT;

  /**
   * The API key for Gemini.
   * This must be set for the chat to work.
   * e.g: <app-chat-widget [apiKey]="'your-api-key'"></app-chat-widget>
   */
  @Input() apiKey: string = '';

  // --- VIEW CHILDREN ---
  @ViewChildren('userBubble') userBubbles!: QueryList<ElementRef>;
  @ViewChildren('assistantBubble') assistantBubbles!: QueryList<ElementRef>;
  @ViewChildren('loadingBubble') loadingBubbles!: QueryList<ElementRef>;
  @ViewChildren('sendButton') sendButtons!: QueryList<ElementRef>;
  @ViewChildren('messageInput') messageInputs!: QueryList<ElementRef>;

  // --- PUBLIC PROPERTIES ---
  public messages: Message[] = [];
  public currentMessage: string = '';
  public isLoading: boolean = false;
  public latestUserMessage: string = '';
  public latestAssistantMessage: string = '';
  public systemMessageTemplates: typeof ChatbotService.SYSTEM_MESSAGES;

  constructor(private chatService: ChatbotService, private sanitizer: DomSanitizer) {
    this.systemMessageTemplates = this.chatService.getSystemMessageTemplates();
  }

  ngOnInit(): void {
    if (this.apiKey) {
      this.chatService.setApiKey(this.apiKey);
    }
  }

  /**
   * Changes the system message to a predefined template.
   * @param key The key of the system message template.
   */
  public setSystemMessage(key: keyof typeof ChatbotService.SYSTEM_MESSAGES): void {
    this.systemMessage = this.chatService.getSystemMessage(key);
  }

  ngAfterViewInit(): void {
    // Animate input area entrance
    const inputArea = document.querySelector('.input-area');
    if (inputArea) {
      gsap.fromTo(inputArea,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    }

    // Animate bubbles when they appear
    this.animateBubbles();

    // Subscribe to changes in bubble queries
    this.userBubbles.changes.subscribe(() => this.animateBubbles());
    this.assistantBubbles.changes.subscribe(() => this.animateBubbles());
    this.loadingBubbles.changes.subscribe(() => this.animateBubbles());
  }

  private animateBubbles(): void {
    // Animate user bubbles (slide from right)
    this.userBubbles.forEach((bubble, index) => {
      gsap.fromTo(bubble.nativeElement,
        {
          opacity: 0,
          x: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: index * 0.1
        }
      );
    });

    // Animate assistant bubbles (slide from left)
    this.assistantBubbles.forEach((bubble, index) => {
      gsap.fromTo(bubble.nativeElement,
        {
          opacity: 0,
          x: -50,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: index * 0.1
        }
      );
    });

    // Animate loading bubbles (fade in with pulse)
    this.loadingBubbles.forEach((bubble, index) => {
      gsap.fromTo(bubble.nativeElement,
        {
          opacity: 0,
          scale: 0.5
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          delay: index * 0.1
        }
      );
    });
  }

  onInputFocus(): void {
    // Focus animation removed to prevent overflow over send button
  }

  onInputBlur(): void {
    // Blur animation removed to prevent overflow over send button
  }

  onEnterKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.shiftKey) {
      // Shift+Enter: Allow new line (don't prevent default)
      return;
    } else {
      // Just Enter: Send message
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }

  /**
   * Parses basic markdown syntax to HTML
   * @param text The markdown text to parse
   * @returns SafeHtml for binding
   */
  parseMarkdown(text: string): SafeHtml {
    if (!text) return '';

    let html = text;

    // Bold: **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text* -> <em>text</em>
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Ordered lists: 1. Item -> <ol><li>Item</li></ol>
    html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<ol><li>$2</li></ol>');

    // Unordered lists: - Item or * Item -> <ul><li>Item</li></ul>
    html = html.replace(/^[-*]\s+(.+)$/gm, '<ul><li>$1</li></ul>');

    // Code blocks: `code` -> <code>code</code>
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Code blocks: ```code``` -> <pre><code>code</code></pre>
    html = html.replace(/```([^```]+)```/g, '<pre><code>$1</code></pre>');

    // Headers: # Text -> <h3>Text</h3> (using h3 for appropriate size)
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Links: [text](url) -> <a href="url">text</a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Line breaks: \n -> <br>
    html = html.replace(/\n/g, '<br>');

    // Clean up multiple consecutive <br> tags
    html = html.replace(/(<br>\s*){3,}/g, '<br><br>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Handles both the "Send" button click and the 'Enter' key press.
   */
  public sendMessage(): void {
    const messageContent = this.currentMessage.trim();
    if (messageContent === '' || this.isLoading) {
      return; // Don't send empty or while loading
    }

    // Animate send button
    this.sendButtons.forEach(button => {
      gsap.to(button.nativeElement, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    });

    // 1. Update UI with new user message (replace previous)
    this.messages = [{ role: 'user', content: messageContent }];
    this.latestUserMessage = messageContent;
    this.latestAssistantMessage = ''; // Clear previous assistant message
    this.currentMessage = ''; // Clear input
    this.isLoading = true;

    // 2. Call the Gemini API
    this.chatService.getGeminiResponse(this.systemMessage, this.messages).subscribe({
      next: (response) => {
        // 3. Add assistant response to UI (replace previous)
        this.messages.push({ role: 'assistant', content: response });
        this.latestAssistantMessage = response;
        this.isLoading = false;
      },
      error: (err) => {
        // 4. Handle errors
        console.error("Chatbot API error:", err);
        this.messages.push({ role: 'assistant', content: "Desculpe, encontrei um erro. Tente novamente." });
        this.latestAssistantMessage = "Desculpe, encontrei um erro. Tente novamente.";
        this.isLoading = false;
      }
    });
  }
}