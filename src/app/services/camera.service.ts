import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private streamSubject = new BehaviorSubject<MediaStream | null>(null);
  public stream$ = this.streamSubject.asObservable();
  private stream: MediaStream | null = null;

  constructor() { }

  async startCamera(): Promise<MediaStream> {
    if (this.stream) {
      return this.stream;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Camera API not available. This feature requires a Secure Context (HTTPS or localhost).');
      throw new Error('Camera API not available (Secure Context required)');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.stream = stream;
      this.streamSubject.next(stream);
      return stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
      throw err;
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.streamSubject.next(null);
    }
  }

  getStream(): MediaStream | null {
    return this.stream;
  }
}
