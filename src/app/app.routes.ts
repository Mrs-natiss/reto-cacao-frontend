import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { HistorialComponent } from './pages/historial/historial';
import { FormularioComponent } from './pages/formulario/formulario';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario/:id', component: FormularioComponent },
];