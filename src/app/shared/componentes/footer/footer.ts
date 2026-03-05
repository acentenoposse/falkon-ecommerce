import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fw-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly anio = new Date().getFullYear();
}