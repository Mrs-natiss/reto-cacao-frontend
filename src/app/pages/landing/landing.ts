import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrecioService, Precio } from '../../services/precio';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent implements OnInit {
  ultimoPrecio: Precio | null = null;
  cargando = true;
  error = false;

  constructor(
    private precioService: PrecioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.precioService.getUltimoPrecio().subscribe({
      next: (data) => {
        this.ultimoPrecio = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}