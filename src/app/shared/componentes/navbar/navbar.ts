import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fw-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Output() buscar = new EventEmitter<string>();
  protected readonly q = signal('');

  onInput(value: string) {
    this.q.set(value);
    this.buscar.emit(value);
  }
}
