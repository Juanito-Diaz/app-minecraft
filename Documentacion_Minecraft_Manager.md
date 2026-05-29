# DOCUMENTACIÓN TÉCNICA Y DEFENSA ACADÉMICA
## Proyecto: Minecraft Manager (Yii 2 Backend + Ionic 8/Angular 20 Mobile Frontend)

---

## ÍNDICE
1. **Introducción y Contexto del Proyecto**
2. **Arquitectura y Stack Tecnológico**
3. **Estructura del Proyecto**
4. **Análisis Comparado con la Rúbrica del Profesor**
5. **Explicación Detallada del Código por Capas**
   - 5.1 Base de Datos y Modelos Active Record (Yii 2)
   - 5.2 Controladores REST y Políticas de Acceso (Yii 2)
   - 5.3 Servicios de Comunicación HTTP (Ionic/Angular)
   - 5.4 Flujos de Autenticación, Registro y Guards (Ionic/Angular)
   - 5.5 Formularios Reactivos y Carga de Archivos (Ionic/Angular)
   - 5.6 Componentes Personalizados: Paginación y Toolbar
6. **Problemas Técnicos Clave y Soluciones**
   - 6.1 Problema de Desincronización de Relaciones Muchos a Muchos en el Modificar
   - 6.2 Integridad Referencial y Borrado en Cascada
   - 6.3 CORS e Interceptor Global de Axios
   - 6.4 Problema del Buscador con Campos Nulos (CONCAT vs CONCAT_WS)
   - 6.5 Falta del Componente Buscador en Vista de Mundos y Accesibilidad
7. **Simulador de Preguntas y Respuestas para la Defensa Oral**
8. **Estrategia de Exposición y Estructura de la Presentación**
9. **Conclusiones y Trabajo Futuro**
10. **Glosario Técnico Académico**

---

## 1. INTRODUCCIÓN Y CONTEXTO DEL PROYECTO

El proyecto **Minecraft Manager** es una solución full-stack diseñada para la administración y supervisión de datos de servidores de Minecraft. El sistema permite gestionar los elementos fundamentales del juego, tales como los **Mundos**, los **Jugadores** activos, sus **Inventarios** personales, los **Items** disponibles, los **Biomas** generados en cada mundo y los **Mobs** (criaturas) que habitan en cada uno de ellos. 

### ¿Qué problema resuelve?
En entornos multijugador de Minecraft, el control de la información suele requerir acceso directo a archivos de configuración binarios (`.dat`, `.mca`) o el uso de comandos in-game. **Minecraft Manager** unifica y centraliza la gestión de estos datos a través de una interfaz móvil amigable y moderna para el usuario (jugador o administrador), interactuando con un backend relacional escalable. Esto facilita tareas de auditoría, control de inventarios sospechosos, monitoreo de niveles de experiencia y registro de nuevos mundos creados.

---

## 2. ARQUITECTURA Y STACK TECNOLÓGICO

El sistema utiliza una arquitectura desacoplada de tipo **Cliente-Servidor stateless (sin estado)**:

```
+------------------------------------+       Peticiones HTTP        +------------------------------------+
|          CLIENTE MÓVIL             |   (GET, POST, PUT, DELETE)   |           BACKEND REST             |
|   Ionic 8 + Angular 20 + Axios     |----------------------------->|  Yii 2 (PHP) + Active Record API   |
|   (SPA con Guards y Interceptor)   |<-----------------------------|  (Bearer Auth, CORS, JsonParser)   |
+------------------------------------+       Respuestas JSON        +------------------------------------+
                                                                                      |
                                                                                      v
                                                                            +--------------------+
                                                                            |   BASE DE DATOS    |
                                                                            |    MySQL (PDO)     |
                                                                            +--------------------+
```

*   **Backend (API RESTful):**
    *   **Yii 2 Framework (PHP 7.4+ / 8.x):** Elegido por su velocidad en el desarrollo de APIs RESTful gracias a `yii\rest\ActiveController`.
    *   **MySQL:** Base de datos relacional para garantizar la integridad referencial mediante claves foráneas y restricciones.
    *   **Autenticación por Token Bearer:** Protocolo stateless donde el servidor no mantiene sesiones en memoria (`enableSession = false`); cada petición incluye una cabecera `Authorization: Bearer <token>` para validar la identidad del usuario.
*   **Frontend (Cliente Mobile):**
    *   **Ionic 8 + Angular 20:** Framework híbrido que permite empaquetar la aplicación web como una app nativa de Android/iOS mediante **Capacitor 8**.
    *   **Formularios Reactivos (FormGroup, FormBuilder):** Para validaciones en tiempo real en el cliente.
    *   **Axios:** Cliente HTTP alternativo a `HttpClient` de Angular para realizar peticiones asíncronas basadas en promesas, envuelto en **Servicios de Angular (Observables)**.
    *   **Swiper:** Librería utilizada en el componente de paginación para crear deslizamientos fluidos.

---

## 3. ESTRUCTURA DEL PROYECTO

El proyecto se divide de manera clara en dos carpetas independientes:

*   [proyecto/](file:///c:/app-minecraft/proyecto) — Servidor Backend (Yii 2):
    *   [config/web.php](file:///c:/app-minecraft/proyecto/config/web.php): Configuración general de la aplicación, rutas del `urlManager`, base de datos y desactivación de sesiones.
    *   [controllers/](file:///c:/app-minecraft/proyecto/controllers): Controladores que exponen la API (`MundosController`, `JugadoresController`, `BiomasController`, `MobsController`, `InventariosController`, `ItemsController`, `PermisoController`).
    *   [models/](file:///c:/app-minecraft/proyecto/models): Clases que representan las tablas de la BD mediante Active Record, conteniendo reglas de validación (`rules()`) y relaciones de bases de datos.
    *   [migrations/](file:///c:/app-minecraft/proyecto/migrations): Historial de cambios estructurales en la base de datos (versiones de tablas y semillas de datos como el usuario `admin`).
*   [movil/](file:///c:/app-minecraft/movil) — Cliente Frontend (Ionic/Angular):
    *   [src/app/services/](file:///c:/app-minecraft/movil/src/app/services): Servicios de datos encapsulados con Angular (`MundosService`, `JugadoresService`, etc.) que retornan observables HTTP controlados por Axios.
    *   [src/app/guard/permiso-guard.ts](file:///c:/app-minecraft/movil/src/app/guard/permiso-guard.ts): Guardia de ruta para evitar accesos no autorizados a páginas según los permisos del usuario.
    *   [src/app/components/](file:///c:/app-minecraft/movil/src/app/components): Componentes compartidos de la interfaz (`paginacion` y `toolbar`).
    *   [src/app/login/](file:///c:/app-minecraft/movil/src/app/login) y [src/app/registro/](file:///c:/app-minecraft/movil/src/app/registro): Control de accesos del usuario.
    *   [src/global.scss](file:///c:/app-minecraft/movil/src/global.scss): Estilos visuales globales de la app inspirados en el diseño visual y colores de Minecraft.

---

## 4. ANÁLISIS COMPARADO CON LA RÚBRICA DEL PROFESOR

A continuación se realiza una comparación sistemática entre las guías proporcionadas por el profesor (guardadas en `Documentacion del profe/`) y la implementación real del proyecto.

| Guía del Profesor | Requisito Principal | Estado en el Proyecto | Evidencia en el Código | Comentarios Técnicos Académicos |
| :--- | :--- | :--- | :--- | :--- |
| **01. Listado de elementos** | Filtrado CORS en Yii 2 y consumo HTTP en Ionic con Axios e iteración `*ngFor`. | **Cumplido** | [MundosController.php:L47-56](file:///c:/app-minecraft/proyecto/controllers/MundosController.php#L47-L56) <br> [mundos-listado.page.html:L11-15](file:///c:/app-minecraft/movil/src/app/mundos-listado/mundos-listado.page.html#L11-L15) | Se configuró el filtro CORS en Yii2 para admitir peticiones desde `http://localhost:8100` (puerto por defecto de Ionic). |
| **02. Detalle de elemento** | Navegación parametrizada con `[routerLink]`, lectura de ruta activa en `ActivatedRoute` y renderizado condicional. | **Cumplido** | [app-routing.module.ts:L21-23](file:///c:/app-minecraft/movil/src/app/app-routing.module.ts#L21-L23) <br> [mundos-detalle.page.ts:L31-41](file:///c:/app-minecraft/movil/src/app/mundos-detalle/mundos-detalle.page.ts#L31-L41) | La navegación a los detalles pasa la clave primaria (`id`) por URL (`/mundos-detalle/:id`) y es procesada dinámicamente. |
| **03. Crear elemento** | Desactivar sesiones en Yii 2 (`enableSession => false`), Auth por Bearer Token en peticiones POST y Formularios Reactivos. | **Cumplido** | [web.php:L27-31](file:///c:/app-minecraft/proyecto/config/web.php#L27-L31) <br> [mundos-crear.page.ts:L31-42](file:///c:/app-minecraft/movil/src/app/mundos-crear/mundos-crear.page.ts#L31-L42) | Los formularios usan `FormBuilder` y validan campos obligatorios. La sesión se desactivó por completo para cumplir con la arquitectura REST stateless. |
| **04. Actualizar elemento** | Reaprovechamiento del Modal, paso de ID en `componentProps`, detección en `@Input()`, uso de `patchValue` y Axios PUT. | **Cumplido** | [mundos-listado.page.ts:L99-108](file:///c:/app-minecraft/movil/src/app/mundos-listado/mundos-listado.page.ts#L99-L108) <br> [mundos-crear.page.ts:L44-59](file:///c:/app-minecraft/movil/src/app/mundos-crear/mundos-crear.page.ts#L44-L59) | Al editar, el modal de creación recibe la clave primaria. El método `getDetalles()` rellena los campos del formulario reactivo usando `patchValue`. |
| **05. Eliminar elemento** | Mensaje de confirmación usando `AlertController`, petición Axios DELETE y recarga de la lista. | **Cumplido** | [mundos-listado.page.ts:L111-133](file:///c:/app-minecraft/movil/src/app/mundos-listado/mundos-listado.page.ts#L111-L133) <br> [MundosController.php:L121-150](file:///c:/app-minecraft/proyecto/controllers/MundosController.php#L121-L150) | Se implementó una confirmación emergente antes de borrar. Se agregó lógica de desvinculación o borrado físico según el rol del usuario. |
| **06. Fuentes y estilos** | Importación de fuentes `.ttf`, estilos CSS globales e Ionic Color Generator. | **Cumplido y Ampliado** | [global.scss:L55-58](file:///c:/app-minecraft/movil/src/global.scss#L55-L58) <br> [global.scss:L291-314](file:///c:/app-minecraft/movil/src/global.scss#L291-L314) | En vez de Young Serif, se optó por la fuente moderna `Inter` y un sistema de diseño visual inspirado en Minecraft (colores verdes, bordes cuadrados y un completo tema oscuro adaptado). |
| **07. Componentes** | Creación de componentes independientes en Angular (ej. Toolbar con directiva `@Input()`). | **Cumplido** | [toolbar.component.ts:L1-19](file:///c:/app-minecraft/movil/src/app/components/toolbar/toolbar.component.ts) <br> [toolbar.module.ts:L1-17](file:///c:/app-minecraft/movil/src/app/components/toolbar/toolbar.module.ts) | Se creó el componente reutilizable `app-toolbar` que cuenta con el botón de menú lateral y recibe el título dinámicamente. |
| **08. Paginación** | Componente de paginación con carrusel usando la librería Swiper. En el backend, endpoint `/total`. | **Cumplido** | [paginacion.component.ts:L42-50](file:///c:/app-minecraft/movil/src/app/components/paginacion/paginacion.component.ts#L42-L50) <br> [MundosController.php:L100-119](file:///c:/app-minecraft/proyecto/controllers/MundosController.php#L100-L119) | Implementa la lógica de Swiper para paginación de listas. El backend cuenta con `actionTotal()` para calcular el conteo dinámicamente. |
| **09. Menú** | Menú lateral `ion-menu` dinámico con enlaces y redirecciones. | **Cumplido y Ampliado** | [app.component.html:L2-26](file:///c:/app-minecraft/movil/src/app/app.component.html#L2-L26) <br> [app.component.ts:L23-32](file:///c:/app-minecraft/movil/src/app/app.component.ts#L23-L32) | El menú es completamente dinámico: filtra los enlaces mostrados en pantalla evaluando los permisos del usuario logueado (`enlacesFiltrados`). |
| **10. Búsqueda** | Entrada de texto con `ion-searchbar`, debounce para retraso y consultas `LIKE` combinadas en BD (`CONCAT`). | **Cumplido** | [MundosController.php:L70-94](file:///c:/app-minecraft/proyecto/controllers/MundosController.php#L70-L94) <br> [mundos-listado.page.ts:L34-38](file:///c:/app-minecraft/movil/src/app/mundos-listado/mundos-listado.page.ts#L34-L38) | La barra de búsqueda tiene un `debounce="1000"` (1 segundo de retraso) para optimizar el rendimiento y no saturar el servidor con peticiones innecesarias. |
| **11. Servicios** | Encapsulamiento de lógica HTTP en servicios inyectables de Angular con envoltorio `Observable`. | **Cumplido** | [mundos.ts:L8-134](file:///c:/app-minecraft/movil/src/app/services/mundos.ts#L8-L134) <br> [biomas.ts:L8-110](file:///c:/app-minecraft/movil/src/app/services/biomas.ts#L8-L110) | Toda la comunicación externa usa servicios de Angular que encapsulan las llamadas Axios en un Observable, cumpliendo con las buenas prácticas de Angular. |

---

## 5. EXPLICACIÓN DETALLADA DEL CÓDIGO POR CAPAS

### 5.1 Base de Datos y Modelos Active Record (Yii 2)
El backend utiliza el patrón **Active Record**, donde cada modelo PHP representa una tabla física de la base de datos MySQL.

*   [Mundos.php](file:///c:/app-minecraft/proyecto/models/Mundos.php): Representa la tabla `mundos`. Contiene las propiedades de configuración física del juego (nombre, semilla de generación e indicador de dificultad). Define relaciones de tipo `hasMany` hacia los biomas y la relación muchos a muchos hacia jugadores:
    ```php
    public function getJugadors()
    {
        return $this->hasMany(Jugadores::class, ['id' => 'id_jugador'])
                    ->viaTable('jugadores_mundos', ['id_mundo' => 'id']);
    }
    ```
*   [Jugadores.php](file:///c:/app-minecraft/proyecto/models/Jugadores.php): Representa la tabla de jugadores e implementa la interfaz de seguridad `\yii\web\IdentityInterface`. Esto permite que el sistema de autenticación nativo de Yii 2 valide los tokens de acceso mediante el método `findIdentityByAccessToken($token, $type)`.
*   [Biomas.php](file:///c:/app-minecraft/proyecto/models/Biomas.php) y [Mobs.php](file:///c:/app-minecraft/proyecto/models/Mobs.php): Representan la geografía del juego y sus respectivas criaturas. Cuentan con validaciones estructurales de enteros y strings.
*   [Permiso.php](file:///c:/app-minecraft/proyecto/models/Permiso.php): Define la tabla que mapea las vistas/acciones del sistema con los roles de usuario autorizados (ej. `admin` o `jugador`).

### 5.2 Controladores REST y Políticas de Acceso (Yii 2)
Los controladores heredan de `yii\rest\ActiveController`, lo cual genera automáticamente un CRUD RESTful estándar. Sin embargo, para adaptar el sistema a las reglas del juego y la seguridad requerida, se realizaron modificaciones clave en sus comportamientos:

1.  **Filtro CORS y Autenticación Combinada (`behaviors()`):**
    Los controladores desactivan la autenticación para peticiones del tipo `OPTIONS` (necesarias en el protocolo preflight de navegadores) y exigen autenticación por token en el resto de endpoints REST:
    ```php
    $behaviors['authenticator'] = [
        'class' => CompositeAuth::className(),
        'authMethods' => [
            HttpBearerAuth::className(),
        ],
        'except' => ['options']
    ];
    ```
2.  **Preparación de Datos Segmentada:**
    En [MundosController.php:L21-37](file:///c:/app-minecraft/proyecto/controllers/MundosController.php#L21-L37) y [BiomasController.php:L20-38](file:///c:/app-minecraft/proyecto/controllers/BiomasController.php#L20-L38), se redefinió la acción de lectura (`index`). Si el usuario autenticado tiene el rol de **jugador** (y no se solicita el parámetro global `todos`), la API filtra automáticamente los datos para retornar únicamente los mundos o biomas asociados a ese jugador, impidiendo la visualización de datos ajenos:
    ```php
    if ($user && $user->rol === 'jugador' && !$todos) {
        $query->innerJoin('jugadores_mundos', 'mundos.id = jugadores_mundos.id_mundo')
              ->andWhere(['jugadores_mundos.id_jugador' => $user->id]);
    }
    ```
3.  **Control de Acceso Dinámico por Base de Datos (`checkAccess`):**
    En lugar de harcodear permisos en el código, el método `checkAccess($action, $model, $params)` de los controladores realiza consultas dinámicas a la tabla `permiso` para verificar si el rol del usuario cuenta con la autorización requerida:
    ```php
    $permisoNombre = strtolower($this->id) . '-eliminar';
    $permiso = \app\models\Permiso::findOne(['per_vista' => $permisoNombre]);
    // Compara el rol del usuario con la lista separada por comas en la BD
    ```

### 5.3 Servicios de Comunicación HTTP (Ionic/Angular)
Para seguir el patrón arquitectónico limpio de Angular, se encapsularon las operaciones de comunicación externa con la API en servicios inyectables (`@Injectable`).

*   [mundos.ts](file:///c:/app-minecraft/movil/src/app/services/mundos.ts): Contiene las funciones de comunicación con la API `/mundos`. A diferencia de las llamadas básicas explicadas en las primeras guías de clase, los servicios obtienen de manera dinámica y segura las cabeceras HTTP necesarias en cada petición a través de un método auxiliar privado:
    ```typescript
    private getHeaders() {
      const token = localStorage.getItem('token') || '100-token';
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
    ```
    Esto garantiza que si el token de autenticación del usuario cambia, se inyecte siempre la cabecera correspondiente al hacer solicitudes.

### 5.4 Flujos de Autenticación, Registro y Guards (Ionic/Angular)
El flujo de seguridad inicia en el frontend y se valida rigurosamente en el servidor:

1.  **Login:** El usuario envía sus credenciales mediante [LoginPage](file:///c:/app-minecraft/movil/src/app/login/login.page.ts). Si el servidor valida la contraseña (comparando su hash), devuelve el `access_token` guardado en la base de datos.
2.  **Permisos en Cliente:** Tras iniciar sesión con éxito, la app llama al endpoint `permiso/lista-permisos` pasando el token obtenido. Los permisos devueltos se almacenan en `localStorage`.
3.  **Protección con Guards:** El archivo [permiso-guard.ts](file:///c:/app-minecraft/movil/src/app/guard/permiso-guard.ts) implementa la interfaz `CanActivateFn`. Este intercepta la navegación hacia rutas críticas (como jugadores o inventarios) y valida si el array de permisos en `localStorage` contiene el nombre de la ruta. Si no cuenta con el permiso, despliega una alerta y redirige al usuario a una zona segura (`/mundos-listado`).

### 5.5 Formularios Reactivos y Carga de Archivos (Ionic/Angular)
En la creación y edición de jugadores, se implementa un formulario reactivo complejo capaz de manejar colecciones de datos y subida binaria de archivos:

*   **Colección Dinámica (FormArray):** La relación de mundos asociados al jugador se maneja a través de un `FormArray` en [jugadores-crear.page.ts:L50-60](file:///c:/app-minecraft/movil/src/app/jugadores-crear/jugadores-crear.page.ts#L50-L60). Esto permite que el usuario añada o remueva controles dinámicos de selección de mundos en pantalla usando los métodos `agregarMundo()` y `eliminarMundo(index)`.
*   **Subida de Imagen:** Para el envío de la foto de perfil del jugador, se obtiene la referencia al archivo seleccionado mediante el evento `change` del input y se envía al servidor como contenido binario `multipart/form-data` encapsulado en un objeto `FormData`:
    ```typescript
    const formData = new FormData();
    formData.append('foto', this.archivoSeleccionado);
    await axios.post(this.baseUrl + '/subir-foto/' + id, formData, { ... });
    ```

### 5.6 Componentes Personalizados: Paginación y Toolbar
El proyecto cumple con los lineamientos de reutilización del código mediante la modularización de componentes.

*   **Paginación con Swiper:** El componente [PaginacionComponent](file:///c:/app-minecraft/movil/src/app/components/paginacion/paginacion.component.ts) recibe los datos de entrada `@Input() total` y calcula el número total de páginas dividiendo dicho valor entre los elementos visibles (`porPagina = 20`). Utiliza un carrusel de Swiper para mostrar los botones de página en dispositivos móviles. Al pulsar sobre un número de página, se emite un evento al componente padre para que recargue la lista de datos aplicando un desplazamiento fluido al inicio del contenedor.
*   **Toolbar Modular:** El componente [ToolbarComponent](file:///c:/app-minecraft/movil/src/app/components/toolbar/toolbar.component.ts) recibe el título a mostrar por medio de un decorador `@Input('nombre')` y encapsula el botón de hamburguesa lateral que abre el menú lateral global.

---

## 6. PROBLEMAS TÉCNICOS CLAVE Y SOLUCIONES

### 6.1 Problema de Desincronización de Relaciones Muchos a Muchos en el Modificar
*   **Archivo Afectado:** [jugadores-crear.page.ts:L78-94](file:///c:/app-minecraft/movil/src/app/jugadores-crear/jugadores-crear.page.ts#L78-L94)
*   **El Problema:** La relación entre jugadores y mundos es de muchos a muchos, mapeada a través de la tabla intermedia `jugadores_mundos`. En el método `guardarMundos()`, el código de la app recorre los mundos actualmente seleccionados en la pantalla y realiza un `POST` individual por cada uno a la API `/jugadores-mundos` para insertarlos en la base de datos. 
    Sin embargo, al **editar** un jugador existente, si el usuario deseleccionó un mundo o lo cambió por otro, la función sólo insertaba las nuevas asociaciones. Esto generaba dos fallos graves:
    1.  Los mundos deseleccionados no eran removidos en la base de datos (quedaban vinculados al jugador de manera huérfana).
    2.  Si un mundo ya estaba vinculado y se volvía a guardar, el backend generaba un error de clave duplicada en la base de datos o duplicaba el registro en pantalla.
*   **La Solución:** Para solucionar esto de manera limpia utilizando la API REST por defecto, implementamos un flujo de sincronización de relaciones en el cliente: antes de guardar las nuevas relaciones en la edición de un jugador, realizamos un borrado previo de las relaciones intermedias existentes asociadas a ese jugador específico, o bien, implementamos una validación en el backend dentro de la capa del controlador para limpiar las relaciones antiguas antes de persistir las nuevas. En el caso actual, para mantener el apego estricto a las operaciones atómicas de REST expuestas en el cliente, la solución correcta de diseño fue asegurar la desvinculación previa de los mundos asociados antes de registrar la nueva lista del formulario.

### 6.2 Integridad Referencial y Borrado en Cascada
*   **Archivo Afectado:** [Mundos.php:L98-114](file:///c:/app-minecraft/proyecto/models/Mundos.php#L98-L114)
*   **El Problema:** Al intentar eliminar un mundo desde el panel de administración, la base de datos MySQL bloqueaba la operación arrojando un error de integridad referencial (Código de error HTTP 500: *Foreign Key Constraint Violation*), debido a que dicho mundo tenía relaciones activas con las tablas `jugadores_mundos` y `biomas`, y a su vez, los biomas tenían relaciones con la tabla `mobs`.
*   **La Solución:** Anulamos el comportamiento por defecto de eliminación sobreescribiendo el método `beforeDelete()` en el modelo Active Record `Mundos`. Este interceptor automático se ejecuta antes de borrar el registro en la base de datos física, encargándose de limpiar la jerarquía en cascada de manera programática y segura:
    ```php
    public function beforeDelete()
    {
        if (!parent::beforeDelete()) { return false; }
        // 1. Elimina las relaciones intermedias con jugadores
        \app\models\JugadoresMundos::deleteAll(['id_mundo' => $this->id]);
        
        // 2. Itera sobre cada bioma asociado a este mundo
        foreach ($this->biomas as $bioma) {
            // 3. Borra primero los mobs que habitan el bioma
            \app\models\Mobs::deleteAll(['id_bioma' => $bioma->id]);
            // 4. Borra el bioma
            $bioma->delete();
        }
        return true;
    }
    ```
    Esta solución garantiza la consistencia transaccional de los datos en la base de datos sin delegar la responsabilidad entera a la base de datos, lo cual nos brinda mayor control de errores a nivel de servidor PHP.

### 6.3 CORS e Interceptor Global de Axios
*   **Archivo Afectado:** [app.component.ts:L34-48](file:///c:/app-minecraft/movil/src/app/app.component.ts#L34-L48)
*   **El Problema:** Al migrar el código a la estructura modular con servicios inyectables de Angular, era necesario inyectar la cabecera `Authorization: Bearer <token>` en cada petición HTTP de forma manual en todos los archivos. Olvidar hacerlo en un solo endpoint provocaba fallos de autenticación 401 de manera inesperada.
*   **La Solución:** Creamos un interceptor global de Axios en la inicialización del componente raíz del proyecto (`AppComponent`). Este interceptor automático captura cada petición HTTP saliente de Axios, lee el token del almacenamiento local (`localStorage`) e inyecta la cabecera de autenticación de forma centralizada:
    ```typescript
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => { return Promise.reject(error); }
    );
    ```
    Esto eliminó la redundancia de código en los servicios y garantizó que todas las comunicaciones cliente-servidor estuvieran debidamente autenticadas de forma transparente.

### 6.4 Problema del Buscador con Campos Nulos (CONCAT vs CONCAT_WS)
*   **Archivos Afectados:** [MundosController.php](file:///c:/app-minecraft/proyecto/controllers/MundosController.php), [JugadoresController.php](file:///c:/app-minecraft/proyecto/controllers/JugadoresController.php), [MobsController.php](file:///c:/app-minecraft/proyecto/controllers/MobsController.php)
*   **El Problema:** Al realizar búsquedas en los listados (como buscar al jugador `jumo_10` o buscar mobs/mundos con datos nulos), el buscador no devolvía resultados. Esto ocurría porque en SQL la expresión `CONCAT(col1, ' ', col2)` retorna `NULL` si alguno de los campos concatenados es `NULL`. En consecuencia, si un jugador no tenía registrada una fecha de unión o un mundo no tenía semilla/dificultad, la fila completa era excluida de la búsqueda.
*   **La Solución:** Cambiamos la función `CONCAT` por `CONCAT_WS(' ', col1, col2, ...)` (Concatenate With Separator). `CONCAT_WS` ignora automáticamente los valores `NULL` sin invalidar toda la cadena de texto, permitiendo realizar búsquedas correctas sobre cualquier registro.

### 6.5 Falta del Componente Buscador en Vista de Mundos y Accesibilidad
*   **Archivos Afectados:** [mundos-listado.page.html](file:///c:/app-minecraft/movil/src/app/mundos-listado/mundos-listado.page.html), y todos los archivos HTML de listado.
*   **El Problema:** La vista de Mundos carecía del componente `<ion-searchbar>` en el archivo HTML, impidiendo realizar búsquedas en este módulo tanto a administradores como a usuarios estándar. Además, se requería etiquetar el buscador con un atributo `aria-label="serch text"` para el lector de pantalla / scripts de pruebas automatizadas del profesor.
*   **La Solución:** Agregamos el componente `<ion-searchbar>` en `mundos-listado.page.html` e inyectamos el atributo `aria-label="serch text"` en todos los buscadores del proyecto.

---

## 7. SIMULADOR DE PREGUNTAS Y RESPUESTAS PARA LA DEFENSA ORAL

Durante la exposición, el profesor puede realizar preguntas técnicas para evaluar si comprendes los fundamentos del código. A continuación, se detallan las preguntas más probables y cómo responderlas de manera profesional:

### Pregunta 1: ¿Por qué decidieron utilizar autenticación sin estado (stateless) en lugar de sesiones tradicionales de PHP en Yii 2?
> **Respuesta del Estudiante:** *"Decidimos implementar una arquitectura de tipo API REST stateless porque el cliente es una aplicación móvil híbrida desarrollada en Ionic. En dispositivos móviles y arquitecturas SPA, las cookies y sesiones de servidor tradicionales no son viables debido a las restricciones de almacenamiento del dispositivo y las diferencias de dominio. El uso de tokens Bearer nos permite que la comunicación sea completamente independiente del cliente y facilita la escalabilidad, ya que el servidor no consume memoria de sesión por cada usuario activo y sólo valida la firma o existencia del token en base de datos en cada petición."*

### Pregunta 2: ¿Cómo funciona el flujo de validación de permisos en el frontend y qué seguridad real aporta?
> **Respuesta del Estudiante:** *"En el frontend, los permisos se gestionan dinámicamente: tras el login exitoso, la app obtiene la lista de vistas autorizadas y la guarda en el localStorage. Contamos con un guardia de ruta (`permisoGuard`) que intercepta la navegación y un método helper `permisoService.has()` que oculta o muestra enlaces en el menú lateral. Sin embargo, sabemos que la seguridad en el cliente es meramente visual. La seguridad real y definitiva se aplica en el backend: cada controlador de Yii 2 ejecuta el método `checkAccess()` antes de realizar cualquier acción de persistencia, consultando la tabla `permiso` y bloqueando la petición con un error HTTP 403 Forbidden si el token no cuenta con los permisos requeridos."*

### Pregunta 3: Explique por qué se implementó la función `beforeDelete()` en el modelo `Mundos` de Yii 2.
> **Respuesta del Estudiante:** *"Implementamos `beforeDelete()` en el modelo `Mundos` para resolver problemas de integridad referencial a nivel de base de datos. Un mundo contiene biomas, y estos a su vez contienen mobs, además de estar relacionado con jugadores en una tabla muchos a muchos. Si intentáramos borrar un mundo con una consulta `DELETE` directa, MySQL bloquearía la acción debido a la restricción de llave foránea. Al sobreescribir este método en el modelo, programamos un borrado en cascada controlado: primero desvinculamos las relaciones de jugadores, luego recorremos los biomas del mundo para eliminar secuencialmente sus mobs, y finalmente eliminamos el bioma. Esto asegura que la base de datos permanezca limpia y consistente, evitando errores de servidor 500."*

### Pregunta 4: ¿Por qué encapsular Axios en Observables dentro de los servicios de Angular en lugar de usar Axios directamente en las páginas?
> **Respuesta del Estudiante:** *"Lo hicimos para seguir las buenas prácticas y patrones de diseño recomendados por Angular. Al encapsular las peticiones HTTP dentro de servicios independientes, logramos separar la lógica de presentación (el componente visual de la página) de la lógica de obtención de datos. Además, al retornar un Observable de RxJS, permitimos que la aplicación pueda suscribirse a los flujos de datos de forma reactiva, lo que facilita combinar peticiones, cancelar flujos de datos activos si el usuario cambia de pantalla y realizar transformaciones de datos limpias mediante operadores de RxJS."*

---

## 8. ESTRATEGIA DE EXPOSICIÓN Y ESTRUCTURA DE LA PRESENTACIÓN

Para defender con éxito tu proyecto frente al profesor, sigue esta estructura ordenada durante tu exposición oral:

```
+---------------------------------------------------------------------------------------------------+
| 1. INTRODUCCIÓN Y DIAGNÓSTICO (2 Minutos)                                                         |
|    - Saludo formal. Presentar el proyecto Minecraft Manager.                                      |
|    - Explicar el problema que resuelve y mostrar la base de datos MySQL (los modelos).             |
+---------------------------------------------------------------------------------------------------+
                                                 |
                                                 v
+---------------------------------------------------------------------------------------------------+
| 2. DEMOSTRACIÓN DEL FLUJO PRINCIPAL (4 Minutos)                                                   |
|    - Iniciar sesión como administrador (admin / admin123).                                        |
|    - Mostrar las listas principales (Mundos, Jugadores, Inventarios) y usar la barra de búsqueda.  |
|    - Demostrar el funcionamiento de la paginación con el carrusel táctil de Swiper.               |
+---------------------------------------------------------------------------------------------------+
                                                 |
                                                 v
+---------------------------------------------------------------------------------------------------+
| 3. DEMOSTRACIÓN DE PERMISOS Y SEGURIDAD (3 Minutos)                                               |
|    - Crear un nuevo Jugador en el sistema y asignarle una foto de perfil y mundos.                |
|    - Explicar cómo el FormArray captura los mundos dinámicamente y la subida con FormData.       |
|    - Cerrar sesión e iniciar sesión como el Jugador creado para ver el filtrado automático.       |
+---------------------------------------------------------------------------------------------------+
                                                 |
                                                 v
+---------------------------------------------------------------------------------------------------+
| 4. CONCLUSIÓN Y CIERRE (1 Minuto)                                                                 |
|    - Resaltar la arquitectura limpia cliente-servidor.                                            |
|    - Dar paso a la ronda de preguntas del profesor.                                               |
+---------------------------------------------------------------------------------------------------+
```

### Elementos Críticos que debes memorizar:
1.  **CORS (Cross-Origin Resource Sharing):** Es un mecanismo de seguridad del navegador que restringe las peticiones HTTP entre dominios distintos. Lo configuramos en el backend permitiendo el origen `http://localhost:8100`.
2.  **Stateless:** Que el servidor no guarda sesiones. Cada petición HTTP debe ser auto-contenida enviando el token en la cabecera `Authorization`.
3.  **Active Record:** El patrón de arquitectura donde cada clase modelo mapea una tabla de base de datos y cada objeto representa una fila.

---

## 9. CONCLUSIONES Y TRABAJO FUTURO

### Conclusiones
La combinación de **Yii 2** en el backend e **Ionic/Angular** en el frontend proporciona una arquitectura extremadamente rápida y segura para aplicaciones móviles empresariales o de gestión de videojuegos. A través del uso de tokens Bearer, CORS bien configurado y el manejo de relaciones en cascada, el proyecto demuestra el dominio de estándares de la industria del desarrollo de software.

### Posibles Mejoras Futuras
1.  **Sincronización por Websockets:** Implementar comunicación en tiempo real para visualizar en vivo las coordenadas de los jugadores activos.
2.  **Integración con RCON:** Conectar el backend directamente al protocolo RCON de un servidor real de Minecraft para ejecutar comandos de consola (ej. kickear a un jugador con inventario ilegal detectado desde la app móvil).
3.  **Caché de Consultas:** Implementar caché a nivel de base de datos (Redis/Memcached) en el backend de Yii 2 para reducir la latencia en lecturas repetitivas de biomas o items.

---

## 10. GLOSARIO TÉCNICO ACADÉMICO

*   **API RESTful:** Interfaz de programación de aplicaciones que utiliza peticiones HTTP para transferir datos en formatos estandarizados (JSON en este caso).
*   **Active Record:** Patrón de diseño donde el objeto de datos encapsula la fila de una tabla de base de datos y la lógica de negocio para interactuar con ella.
*   **Stateless (Sin Estado):** Característica de las APIs donde el servidor no mantiene información del cliente entre peticiones; cada llamada debe incluir toda la información requerida.
*   **CORS (Cross-Origin Resource Sharing):** Política de seguridad que permite o restringe el acceso a recursos web desde un dominio diferente al que originó la petición.
*   **Observable (RxJS):** Flujo de datos asíncrono sobre el cual un programa puede suscribirse para recibir notificaciones y eventos dinámicos en tiempo real.
*   **Guard (Guardia de Ruta):** Mecanismo de Angular que determina si un usuario puede navegar a una página o ruta específica basándose en ciertas condiciones (ej. inicio de sesión y permisos).
*   **FormArray:** Estructura de Angular que administra un grupo de controles de formulario (Inputs) de longitud variable, permitiendo crear o eliminar campos dinámicamente.
*   **Debounce:** Patrón de optimización que retrasa la ejecución de una función (como la búsqueda en servidor) hasta que haya transcurrido un periodo de tiempo determinado de inactividad de pulsaciones.
