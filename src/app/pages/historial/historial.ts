import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrecioService, Precio } from '../../services/precio';

@Component({
  selector: 'app-historial',
  imports: [CommonModule, RouterLink],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class HistorialComponent implements OnInit {
  precios: Precio[] = [];
  cargando = true;
  error = false;

  constructor(
    private precioService: PrecioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarPrecios();
  }

  cargarPrecios() {
    this.precioService.getPrecios().subscribe({
      next: (data) => {
        this.precios = data;
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

  eliminar(id: number) {
    if (confirm('¿Estás segura de que quieres eliminar este precio?')) {
      this.precioService.deletePrecio(id).subscribe({
        next: () => {
          this.precios = this.precios.filter(p => p.id !== id);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Error al eliminar el precio');
        }
      });
    }
  }
}