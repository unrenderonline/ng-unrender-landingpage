
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faHandPointer,
    faHamburger,
    faPizzaSlice,
    faIceCream,
    faCoffee,
    faShoppingCart,
    faTimes,
    faCheckCircle,
    faCreditCard,
    faReceipt,
    faArrowLeft,
    faUtensils,
    faCamera,
    faDownload,
    faRedo,
    faSync
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-self-service-kiosk',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './self-service-kiosk.component.html',
    styleUrls: ['./self-service-kiosk.component.scss']
})
export class SelfServiceKioskComponent implements OnInit, OnDestroy {
    // Icons
    faHandPointer = faHandPointer;
    faHamburger = faHamburger;
    faPizzaSlice = faPizzaSlice;
    faIceCream = faIceCream;
    faCoffee = faCoffee;
    faShoppingCart = faShoppingCart;
    faTimes = faTimes;
    faCheckCircle = faCheckCircle;
    faCreditCard = faCreditCard;
    faReceipt = faReceipt;
    faArrowLeft = faArrowLeft;
    faUtensils = faUtensils;
    faCamera = faCamera;
    faDownload = faDownload;
    faRedo = faRedo;
    faSync = faSync;

    // View Children
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

    // State
    kioskMode: 'food' | 'photo' = 'food';
    state: 'idle' | 'menu' | 'cart' | 'processing' | 'success' = 'idle';

    // Photo Cabin State
    photoState: 'idle' | 'countdown' | 'captured' | 'printing' = 'idle';
    countdownValue: number = 3;
    capturedImage: string | null = null;
    stream: MediaStream | null = null;
    flashActive: boolean = false;

    selectedCategory: string = 'burgers';

    cart: any[] = [];
    total: number = 0;
    orderNumber: number = 0;

    // Data
    categories = [
        { id: 'burgers', name: 'Burgers', icon: faHamburger },
        { id: 'pizza', name: 'Pizza', icon: faPizzaSlice },
        { id: 'drinks', name: 'Bebidas', icon: faCoffee },
        { id: 'desserts', name: 'Sobremesas', icon: faIceCream }
    ];

    products: any = {
        burgers: [
            { id: 1, name: 'X-Bacon', price: 25.90, img: '🍔', desc: 'Bacon crocante, queijo, salada' },
            { id: 2, name: 'Double Cheddar', price: 28.50, img: '🥩', desc: 'Dois hambúrgueres e muito cheddar' },
            { id: 3, name: 'Classic Vegan', price: 24.00, img: '🥗', desc: 'Hambúrguer de grão de bico' },
            { id: 4, name: 'Chicken Supreme', price: 22.90, img: '🍗', desc: 'Frango empanado crocante' }
        ],
        pizza: [
            { id: 5, name: 'Pepperoni', price: 35.00, img: '🍕', desc: 'Mussarela e pepperoni' },
            { id: 6, name: 'Margherita', price: 32.00, img: '🧀', desc: 'Tomate, manjericão e mussarela' }
        ],
        drinks: [
            { id: 7, name: 'Refrigerante', price: 6.00, img: '🥤', desc: 'Lata 350ml' },
            { id: 8, name: 'Suco Natural', price: 8.00, img: '🍊', desc: 'Laranja ou Limão' },
            { id: 9, name: 'Milkshake', price: 15.00, img: '🥛', desc: 'Chocolate ou Morango' }
        ],
        desserts: [
            { id: 10, name: 'Sundae', price: 12.00, img: '🍨', desc: 'Baunilha com calda' },
            { id: 11, name: 'Brownie', price: 14.50, img: '🍫', desc: 'Com nozes' }
        ]
    };

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.stopCamera();
    }

    // --- MODE SWITCHING ---
    setMode(mode: 'food' | 'photo') {
        this.kioskMode = mode;
        if (mode === 'photo') {
            this.initCamera();
            this.photoState = 'idle';
            this.capturedImage = null;
        } else {
            this.stopCamera();
        }
    }

    // --- PHOTO CABIN LOGIC ---
    async initCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720, facingMode: 'user' }
            });
            // Wait for view to update
            setTimeout(() => {
                if (this.videoElement && this.videoElement.nativeElement) {
                    this.videoElement.nativeElement.srcObject = this.stream;
                }
            }, 100);
        } catch (err) {
            console.error("Error accessing camera:", err);
            // Fallback or error state could be handled here
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    }

    startCountdown() {
        this.photoState = 'countdown';
        this.countdownValue = 3;
        this.cdr.detectChanges(); // Force update to show 3

        const interval = setInterval(() => {
            this.countdownValue--;
            this.cdr.detectChanges(); // Force update on decrement

            if (this.countdownValue <= 0) {
                clearInterval(interval);
                this.capturePhoto();
            }
        }, 1000);
    }

    capturePhoto() {
        this.flashActive = true;
        this.cdr.detectChanges(); // Flash On

        setTimeout(() => {
            this.flashActive = false;
            this.cdr.detectChanges(); // Flash Off
        }, 200);

        if (this.videoElement && this.canvasElement) {
            const video = this.videoElement.nativeElement;
            const canvas = this.canvasElement.nativeElement;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Flip horizontally for mirror effect
                context.translate(canvas.width, 0);
                context.scale(-1, 1);

                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Add branding overlay
                context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.font = 'bold 24px Arial';
                context.fillText('Unrender PhotoBooth', 20, canvas.height - 20);

                this.capturedImage = canvas.toDataURL('image/png');

                // Simulate Printing
                this.photoState = 'printing';
                this.cdr.detectChanges(); // Show Printer

                setTimeout(() => {
                    this.photoState = 'captured';
                    this.cdr.detectChanges(); // Show Result
                }, 3000);
            }
        } else {
            console.error('Camera or Canvas element not found');
            this.photoState = 'idle';
            this.cdr.detectChanges();
        }
    }

    retakePhoto() {
        this.capturedImage = null;
        this.photoState = 'idle';
        this.cdr.detectChanges();
    }

    savePhoto() {
        if (this.capturedImage) {
            const link = document.createElement('a');
            link.href = this.capturedImage;
            link.download = `kiosk-photo-${Date.now()}.png`;
            link.click();
        }
    }

    startOrder() {
        this.state = 'menu';
        this.selectedCategory = 'burgers';
        this.cart = [];
        this.total = 0;
    }

    selectCategory(categoryId: string) {
        this.selectedCategory = categoryId;
    }

    addToCart(product: any) {
        this.cart.push({ ...product, cartId: Date.now() });
        this.calculateTotal();
    }

    removeFromCart(index: number, event: Event) {
        event.stopPropagation();
        this.cart.splice(index, 1);
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
    }

    viewCart() {
        if (this.cart.length > 0) {
            this.state = 'cart';
        }
    }

    backToMenu() {
        this.state = 'menu';
    }

    checkout() {
        if (this.cart.length === 0) return;

        this.state = 'processing';

        setTimeout(() => {
            this.orderNumber = Math.floor(Math.random() * 1000) + 1000;
            this.state = 'success';

            // Auto reset after success
            setTimeout(() => {
                this.cart = [];
                this.total = 0;
                this.state = 'idle';
            }, 5000);
        }, 2000);
    }

    get currentProducts() {
        return this.products[this.selectedCategory] || [];
    }
}
