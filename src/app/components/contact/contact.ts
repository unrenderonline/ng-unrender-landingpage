import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importações do Leaflet e OpenRouteService
import * as L from 'leaflet';

// 2. Import the Leaflet Routing Machine plugin
import 'leaflet-routing-machine';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  contactName: string = '';
  contactInfo: string = '';
  contactMessage: string = '';

  detectAndFormatContactInfo(event: any) {
    let value = event.target.value;
    // Remove non-numeric characters to check if it's a phone number
    const numericValue = value.replace(/\D/g, '');

    // Simple heuristic: if it starts with a number or '(', treat as phone
    if (value.length > 0 && (/^\d/.test(value) || value.startsWith('('))) {
      
      // Format as (XX) XXXXX-XXXX
      let formatted = numericValue;
      if (numericValue.length > 0) {
        formatted = `(${numericValue.substring(0, 2)}`;
      }
      if (numericValue.length > 2) {
        formatted = `(${numericValue.substring(0, 2)}) ${numericValue.substring(2)}`;
      }
      if (numericValue.length > 7) {
         // Check if it is 8 or 9 digits
         if (numericValue.length > 10) { // 11 digits (mobile)
             formatted = `(${numericValue.substring(0, 2)}) ${numericValue.substring(2, 7)}-${numericValue.substring(7, 11)}`;
         } else { // 10 digits (landline)
             formatted = `(${numericValue.substring(0, 2)}) ${numericValue.substring(2, 6)}-${numericValue.substring(6, 10)}`;
         }
      }
      
      // Update the model directly if needed, but ngModel handles it. 
      // However, for formatting on type, we need to update the bound variable.
      this.contactInfo = formatted;
    } else {
      // It's likely an email, just update the value
      this.contactInfo = value;
    }
  }

  sendMessage() {
    if (this.contactName && this.contactInfo && this.contactMessage) {
      console.log('Sending message:', {
        name: this.contactName,
        contact: this.contactInfo,
        message: this.contactMessage
      });
      alert('Mensagem enviada com sucesso!');
      // Reset form
      this.contactName = '';
      this.contactInfo = '';
      this.contactMessage = '';
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  private map: L.Map | undefined;
  private destinationCoords: L.LatLngTuple = [-15.587887, -56.080988];
  private locationRetryCount = 0;
  private maxRetries = 2;

  // Custom icon for the destination marker
  private destinationIcon = L.icon({
    iconUrl: 'gps.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  ngAfterViewInit(): void {
    // Check if running on HTTPS (required for geolocation in production)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      console.warn('Geolocation requires HTTPS in production. Current protocol:', location.protocol);
    }

    // Initialize map based on user's location
    this.getUserLocation();
  }

  private initMap(center: L.LatLngTuple): void {
    if (this.map) return; // Prevent re-initialization

    this.map = L.map('map', {
      center: center,
      zoom: 15,
      zoomControl: false, // Optional: removes the + and - buttons
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      // Add timeout and enable high accuracy for better results
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds timeout
        maximumAge: 300000 // 5 minutes cache
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: L.LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          console.log('User location obtained:', userCoords);

          // Initialize the map centered on the destination
          this.initMap(this.destinationCoords);
          this.createRoute(userCoords);
        },
        (error) => {
          console.error('Error getting location: ', error);
          this.handleLocationError(error);
        },
        options
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.initMap(this.destinationCoords);
      this.addDestinationMarkerOnly();
    }
  }

  private handleLocationError(error: GeolocationPositionError): void {
    let errorMessage = 'Não foi possível obter sua localização. ';
    let shouldRetry = false;

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage += 'Permissão de localização negada. Por favor, permita o acesso à localização nas configurações do seu navegador.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage += 'Localização indisponível. Verifique se o GPS está ativado.';
        shouldRetry = true;
        break;
      case error.TIMEOUT:
        errorMessage += 'Tempo limite excedido.';
        shouldRetry = true;
        break;
      default:
        errorMessage += 'Erro desconhecido.';
        shouldRetry = true;
        break;
    }

    console.error(errorMessage);

    // Try to retry if appropriate and we haven't exceeded max retries
    if (shouldRetry && this.locationRetryCount < this.maxRetries) {
      this.locationRetryCount++;
      console.log(`Retrying location request (${this.locationRetryCount}/${this.maxRetries})`);
      setTimeout(() => {
        this.getUserLocation();
      }, 2000); // Wait 2 seconds before retry
      return;
    }

    // Initialize map with destination only
    this.initMap(this.destinationCoords);
    this.addDestinationMarkerOnly();

    // Log error for debugging (no user interruption)
    console.warn('Location access failed, showing destination only:', errorMessage);
  }
  private createRoute(userCoords: L.LatLngTuple): void {
    if (!this.map) return;

    try {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(userCoords), L.latLng(this.destinationCoords)],
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        createMarker: (i: number, waypoint: L.Routing.Waypoint, n: number) => {
          const markerOptions = {
            draggable: true,
            icon: this.destinationIcon,
          };
          const marker = L.marker(waypoint.latLng, markerOptions);
          const popupText =
            i === 0
              ? '<b>Você está aqui</b>'
              : '<b>UNRENDER</b><br>R. da Cereja, 11';
          marker.bindPopup(popupText);
          return marker;
        },
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`,
        }),
        // Add error handling for routing
        onError: (error: any) => {
          console.error('Routing error:', error);
          // Fallback: just show markers without route
          this.addMarkersOnly(userCoords);
        }
      } as any);

      routingControl.addTo(this.map);

      // Add event listener for routing errors
      routingControl.on('routingerror', (e: any) => {
        console.error('Routing failed:', e.error);
        this.addMarkersOnly(userCoords);
      });

    } catch (error) {
      console.error('Error creating route:', error);
      // Fallback: just show markers without route
      this.addMarkersOnly(userCoords);
    }
  }

  private addMarkersOnly(userCoords: L.LatLngTuple): void {
    if (!this.map) return;

    // Add user location marker
    const userIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
    });

    L.marker(userCoords, { icon: userIcon })
      .addTo(this.map)
      .bindPopup('<b>Você está aqui</b>');

    // Add destination marker
    L.marker(this.destinationCoords, { icon: this.destinationIcon })
      .addTo(this.map)
      .bindPopup('<b>UNRENDER</b><br>R. da Cereja, 11');

    // Draw a simple line between the points
    L.polyline([userCoords, this.destinationCoords], {
      color: 'blue',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(this.map);
  }

  private addDestinationMarkerOnly(): void {
    if (!this.map) return;
    L.marker(this.destinationCoords, { icon: this.destinationIcon })
      .addTo(this.map)
      .bindPopup('<b>UNRENDER</b><br>R. da Cereja, 11');
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
