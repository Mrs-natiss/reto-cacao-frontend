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
  preciosPaginados: Precio[] = [];
  cargando = true;
  error = false;
  paginaActual = 1;
  itemsPorPagina = 4;
  totalPaginas = 1;
  paginas: number[] = [];

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
        this.totalPaginas = Math.ceil(this.precios.length / this.itemsPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
        this.actualizarPagina();
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

  actualizarPagina() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.preciosPaginados = this.precios.slice(inicio, fin);
    this.cdr.detectChanges();
  }

  irAPagina(pagina: number) {
    this.paginaActual = pagina;
    this.actualizarPagina();
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPagina();
    }
  }

  eliminar(id: number) {
    if (confirm('¿Estás segura de que quieres eliminar este precio?')) {
      this.precioService.deletePrecio(id).subscribe({
        next: () => {
          this.precios = this.precios.filter(p => p.id !== id);
          this.totalPaginas = Math.ceil(this.precios.length / this.itemsPorPagina);
          this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
          if (this.paginaActual > this.totalPaginas) this.paginaActual = this.totalPaginas;
          this.actualizarPagina();
        },
        error: () => {
          alert('Error al eliminar el precio');
        }
      });
    }
  }
}