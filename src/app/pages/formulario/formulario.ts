import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PrecioService, PrecioCreate } from '../../services/precio';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioComponent implements OnInit {
  precio: number | null = null;
  unidad: string = '';
  fecha: string = '';
  fuente: string = '';
  region: string = '';
  editando = false;
  idEditar: number | null = null;
  error = false;
  exito = false;
  hoy = new Date().toISOString().split('T')[0];

  constructor(
    private precioService: PrecioService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.idEditar = parseInt(id);
      this.precioService.getPrecios().subscribe({
        next: (precios) => {
          const encontrado = precios.find(p => p.id === this.idEditar);
          if (encontrado) {
            this.precio = encontrado.precio;
            this.unidad = encontrado.unidad;
            this.fecha = encontrado.fecha;
            this.fuente = encontrado.fuente || '';
            this.region = encontrado.region || '';
            this.cdr.detectChanges();
          }
        }
      });
    }
  }

  guardar() {
    if (!this.precio || !this.unidad || !this.fecha) {
      this.error = true;
      return;
    }

    const datos: PrecioCreate = {
      precio: this.precio,
      unidad: this.unidad,
      fecha: this.fecha,
      fuente: this.fuente || undefined,
      region: this.region || undefined
    };

    if (this.editando && this.idEditar) {
      this.precioService.updatePrecio(this.idEditar, datos).subscribe({
        next: () => this.router.navigate(['/historial']),
        error: () => { this.error = true; }
      });
    } else {
      this.precioService.createPrecio(datos).subscribe({
        next: () => this.router.navigate(['/historial']),
        error: () => { this.error = true; }
      });
    }
  }
}