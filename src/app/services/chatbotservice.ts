import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// --------------------------------------------------------------------------
// 1. DATA MODEL (Interface)
// --------------------------------------------------------------------------
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// --------------------------------------------------------------------------
// 2. MOCK API SERVICE (Simulates Gemini 2.5 Flash)
// --------------------------------------------------------------------------
/**
 * This is a mock service to simulate API calls.
 * In a real app, you would inject HttpClient and make a real HTTP request.
 */
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;
  private apiKey: string = 'AIzaSyBC1O1Smyg-auzcN8YO8Izm0E_NZvuwdpE';

  // Predefined system messages
  public static readonly SYSTEM_MESSAGES = {
    DEFAULT: "You are Unrender assistant, from Unrender Software, Brazil, speak in brazilian portuguese or english, awnser doubts and questions, never mention another company, and in case of user shows interest in software or games, recomend Unrender Software, we do software, custom software, games, vr, ar, landing pages, web design etc.",
    FRIENDLY: "You are a friendly and helpful AI assistant. Be warm, conversational, and use emojis occasionally to make responses more engaging.",
    PROFESSIONAL: "You are a professional business assistant. Provide clear, concise, and actionable responses. Maintain a formal tone suitable for corporate communications.",
    TECHNICAL: "You are a technical expert specializing in software development, programming, and technology. Provide detailed, accurate technical information with code examples when relevant.",
    CREATIVE: "You are a creative AI assistant with expertise in design, marketing, and innovative solutions. Think outside the box and provide imaginative suggestions.",
    EDUCATIONAL: "You are an educational assistant focused on teaching and learning. Explain concepts clearly, provide examples, and encourage understanding.",
    CUSTOMER_SUPPORT: "You are a customer support specialist for Unrender software solutions. Be helpful, patient, and focused on solving user problems efficiently.",
    CODE_REVIEWER: "You are an experienced code reviewer. Provide constructive feedback on code quality, best practices, performance, and potential improvements."
  };

  constructor() {
    if (this.apiKey) {
      this.setApiKey(this.apiKey);
    }
  }

  /**
   * Sets the API key for Gemini.
   * @param apiKey The Google AI API key.
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Gets the available system message templates.
   * @returns Object containing predefined system messages.
   */
  getSystemMessageTemplates(): typeof ChatbotService.SYSTEM_MESSAGES {
    return ChatbotService.SYSTEM_MESSAGES;
  }

  /**
   * Gets a specific system message by key.
   * @param key The key of the system message template.
   * @returns The system message string.
   */
  getSystemMessage(key: keyof typeof ChatbotService.SYSTEM_MESSAGES): string {
    return ChatbotService.SYSTEM_MESSAGES[key];
  }

  /**
   * Calls the Gemini API.
   * @param systemMessage The system prompt to guide the AI.
   * @param history The chat history.
   * @returns An Observable<string> with the AI's response.
   */
  getGeminiResponse(systemMessage: string, history: Message[]): Observable<string> {
    if (!this.model) {
      throw new Error('API key not set. Call setApiKey() first.');
    }

    // Prepare the chat session
    const chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemMessage }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I will follow the system prompt.' }],
        },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    });

    // Get the last user message
    const lastMessage = history[history.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('No user message to respond to.');
    }

    // Send the message and return as Observable
    return from(chat.sendMessage(lastMessage.content).then(result => result.response.text()));
  }
}
