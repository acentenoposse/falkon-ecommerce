
import { Component, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Navbar } from '../../../shared/componentes/navbar/navbar';
import { Footer } from '../../../shared/componentes/footer/footer';

@Component({
  selector: 'fw-checkout-ok-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe, Navbar, Footer],
  templateUrl: './checkout-ok.page.html',
  styleUrl: './checkout-ok.page.scss',
})
export class CheckoutOkPage {

  protected readonly ordenId = signal<string>('FW-0000');
  protected readonly orden = signal<any | null>(null);

  protected readonly total = computed(() => this.orden()?.total ?? 0);

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.queryParamMap.get('id');
    if (id) this.ordenId.set(id);

    try {
      const raw = localStorage.getItem('falkon_ultima_orden');
      if (raw) this.orden.set(JSON.parse(raw));
    } catch {}
  }
}
