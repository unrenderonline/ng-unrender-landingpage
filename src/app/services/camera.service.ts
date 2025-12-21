import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private streamSubject = new BehaviorSubject<MediaStream | null>(null);
  public stream$ = this.streamSubject.asObservable();
  private stream: MediaStream | null = null;
  private subscribers = 0;

  constructor() { }

  async startCamera(): Promise<MediaStream> {
    this.subscribers++;

    if (this.stream && this.stream.active) {
      console.log(`[CameraService] Returning existing stream. Subscribers: ${this.subscribers}`);
      return this.stream;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Camera API not available. This feature requires a Secure Context (HTTPS or localhost).');
      throw new Error('Camera API not available (Secure Context required)');
    }

    try {
      console.log('[CameraService] Requesting new camera stream...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false // We don't need audio for these use cases
      });

      this.stream = stream;
      this.streamSubject.next(stream);

      // Handle stream checking when tracks end unexpectedly
      stream.getVideoTracks()[0].onended = () => {
        console.warn('[CameraService] Stream ended unexpectedly');
        this.handleStreamEnd();
      };

      return stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
      this.subscribers--;
      throw err;
    }
  }

  stopCamera() {
    this.subscribers--;
    console.log(`[CameraService] stopCamera called. Subscribers: ${this.subscribers}`);

    if (this.subscribers <= 0) {
      this.forceStopCamera();
    }
  }

  private forceStopCamera() {
    console.log('[CameraService] Stopping camera stream completely.');
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.streamSubject.next(null);
    }
    this.subscribers = 0;
  }

  private handleStreamEnd() {
    this.stream = null;
    this.streamSubject.next(null);
    this.subscribers = 0;
  }

  getStream(): MediaStream | null {
    return this.stream;
  }
}
