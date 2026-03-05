
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Navbar } from '../../../shared/componentes/navbar/navbar';
import { Footer } from '../../../shared/componentes/footer/footer';
import { CarritoServicio } from '../../../data/servicios/carrito.servicio';

type MetodoEnvio = 'estandar' | 'express' | 'retiro';

@Component({
  selector: 'fw-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CurrencyPipe,
    Navbar,
    Footer,
  ],
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss',
})
export class CheckoutPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly metodoEnvio = signal<MetodoEnvio>('estandar');
  protected readonly isSubmitting = signal(false);

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(6)]],
    direccion: ['', [Validators.required, Validators.minLength(6)]],
    ciudad: ['', [Validators.required, Validators.minLength(2)]],
    provincia: ['', [Validators.required]],
    cp: ['', [Validators.required, Validators.minLength(3)]],
    notas: [''],
    aceptar: [false, [Validators.requiredTrue]],
  });

  constructor(protected readonly carrito: CarritoServicio) {}

  protected readonly costoEnvio = computed(() => {
    if (this.carrito.items().length === 0) return 0;
    switch (this.metodoEnvio()) {
      case 'express': return 9900;
      case 'retiro': return 0;
      default: return 6500;
    }
  });

  protected readonly total = computed(() => this.carrito.subtotal() + this.costoEnvio());

  invalid(name: keyof CheckoutPage['form']['value']) {
    const c = this.form.get(name as string);
    return !!c && c.touched && c.invalid;
  }

  async confirmar() {
    if (this.carrito.items().length === 0) return;

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.isSubmitting.set(true);

    const ordenId = 'FW-' + Math.floor(1000 + Math.random() * 9000);
    const payload = {
      ordenId,
      envio: this.metodoEnvio(),
      costoEnvio: this.costoEnvio(),
      subtotal: this.carrito.subtotal(),
      total: this.total(),
      items: this.carrito.items(),
      cliente: this.form.getRawValue(),
      fecha: new Date().toISOString(),
    };

    try {
      localStorage.setItem('falkon_ultima_orden', JSON.stringify(payload));
    } catch {}

    this.carrito.clear();
    this.isSubmitting.set(false);
    this.router.navigate(['/checkout/ok'], { queryParams: { id: ordenId } });
  }
}
