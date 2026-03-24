import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mundos-listado',
    loadChildren: () => import('./mundos-listado/mundos-listado.module').then( m => m.MundosListadoPageModule)
  },
  {
    path: 'mundos-detalle/:id',
    loadChildren: () => import('./mundos-detalle/mundos-detalle.module').then( m => m.MundosDetallePageModule)
  },
  {
    path: 'mundos-crear',
    loadChildren: () => import('./mundos-crear/mundos-crear.module').then( m => m.MundosCrearPageModule)
  },
  {
    path: 'jugadores-listado',
    loadChildren: () => import('./jugadores-listado/jugadores-listado.module').then( m => m.JugadoresListadoPageModule)
  },
  {
    path: 'jugadores-detalle/:id',
    loadChildren: () => import('./jugadores-detalle/jugadores-detalle.module').then( m => m.JugadoresDetallePageModule)
  },
  {
    path: 'jugadores-crear',
    loadChildren: () => import('./jugadores-crear/jugadores-crear.module').then( m => m.JugadoresCrearPageModule)
  },
  {
    path: 'inventarios-listado',
    loadChildren: () => import('./inventarios-listado/inventarios-listado.module').then( m => m.InventariosListadoPageModule)
  },
  {
    path: 'inventarios-detalle/:id',
    loadChildren: () => import('./inventarios-detalle/inventarios-detalle.module').then( m => m.InventariosDetallePageModule)
  },
  {
    path: 'inventarios-crear',
    loadChildren: () => import('./inventarios-crear/inventarios-crear.module').then( m => m.InventariosCrearPageModule)
  },
  {
    path: 'items-listado',
    loadChildren: () => import('./items-listado/items-listado.module').then( m => m.ItemsListadoPageModule)
  },
  {
    path: 'items-detalle/:id',
    loadChildren: () => import('./items-detalle/items-detalle.module').then( m => m.ItemsDetallePageModule)
  },
  {
    path: 'items-crear',
    loadChildren: () => import('./items-crear/items-crear.module').then( m => m.ItemsCrearPageModule)
  },
  {
    path: 'biomas-listado',
    loadChildren: () => import('./biomas-listado/biomas-listado.module').then( m => m.BiomasListadoPageModule)
  },
  {
    path: 'biomas-detalle/:id',
    loadChildren: () => import('./biomas-detalle/biomas-detalle.module').then( m => m.BiomasDetallePageModule)
  },
  {
    path: 'biomas-crear',
    loadChildren: () => import('./biomas-crear/biomas-crear.module').then( m => m.BiomasCrearPageModule)
  },
  {
    path: 'mobs-listado',
    loadChildren: () => import('./mobs-listado/mobs-listado.module').then( m => m.MobsListadoPageModule)
  },
  {
    path: 'mobs-detalle/:id',
    loadChildren: () => import('./mobs-detalle/mobs-detalle.module').then( m => m.MobsDetallePageModule)
  },
  {
    path: 'mobs-crear',
    loadChildren: () => import('./mobs-crear/mobs-crear.module').then( m => m.MobsCrearPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
