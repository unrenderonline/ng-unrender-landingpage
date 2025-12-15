import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPrint, faDesktop, faReceipt, faShoppingCart, faBarcode, faMoneyBillWave, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-commercial-automation',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './commercial-automation.component.html',
  styleUrls: ['./commercial-automation.component.scss']
})
export class CommercialAutomationComponent implements OnInit, OnDestroy {
  faPrint = faPrint;
  faDesktop = faDesktop;
  faReceipt = faReceipt;
  faShoppingCart = faShoppingCart;
  faBarcode = faBarcode;
  faMoneyBillWave = faMoneyBillWave;
  faTrash = faTrash;

  currentDate = new Date();
  private timeInterval: any;

  isPrinting = false;
  receipts: any[] = [];

  products = [
    { name: 'Café Expresso', price: 5.50, icon: '☕' },
    { name: 'Pão de Queijo', price: 4.00, icon: '🧀' },
    { name: 'Suco de Laranja', price: 8.00, icon: '🍊' },
    { name: 'Sanduíche', price: 12.50, icon: '🥪' },
    { name: 'Bolo de Cenoura', price: 6.00, icon: '🍰' },
    { name: 'Água Mineral', price: 3.00, icon: '💧' }
  ];

  cart: any[] = [];
  total = 0;

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  addToCart(product: any) {
    // Clear previous receipts when starting a new order/adding items
    if (this.receipts.length > 0) {
      this.receipts = [];
    }

    this.cart.push({ ...product, id: Date.now() }); // Unique ID for trackBy if needed
    this.calculateTotal();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.price, 0);
  }

  printReceipt() {
    if (this.cart.length === 0 || this.isPrinting) return;

    this.isPrinting = true;

    // Simulate printing process
    setTimeout(() => {
      const newReceipt = {
        id: Date.now(),
        items: [...this.cart],
        total: this.total,
        date: new Date()
      };

      // Add to receipts list (simulating the paper coming out)
      this.receipts.unshift(newReceipt);

      // Clear cart
      this.cart = [];
      this.total = 0;
      this.isPrinting = false;
    }, 2000); // 2 seconds printing time
  }
}
