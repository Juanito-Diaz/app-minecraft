import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

export const permisoGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const router = inject(Router);
  const alertCtrl = inject(AlertController);

  const permisosStr = localStorage.getItem('permisos');
  const permisos = permisosStr ? JSON.parse(permisosStr) : [];
  const token = localStorage.getItem('token');
  
  // Clean up route path logic - use state.url or route.routeConfig.path
  let vista = route.routeConfig?.path || '';
  if (!vista) {
      vista = state.url.split('/')[1] || '';
  }

  console.log('Validando vista:', vista);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (permisos && vista && permisos.includes(vista)) {
    return true;
  }

  // Permite siempre ir a tabs default si no hay path específico (depende de configuración)
  if (vista === 'tabs' || vista === '') {
      return true;
  }

  const alert = await alertCtrl.create({
    header: 'Acceso denegado',
    message: 'No tienes permiso para entrar a esta sección.',
    buttons: ['OK']
  });

  await alert.present();
  router.navigate(['/mundos-listado']); // Redirigir a la ruta segura de mundos por defecto
  return false;
};
