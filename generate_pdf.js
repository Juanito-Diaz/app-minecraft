const fs = require('fs');
const path = require('path');
const pdfmake = require('pdfmake');

// 1. Configuración de Fuentes (Roboto viene incluido en la instalación local de pdfmake)
const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf'),
    italic: path.join(__dirname, 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf'),
    bolditalic: path.join(__dirname, 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf')
  }
};

pdfmake.setFonts(fonts);

// 2. Definición del Documento
const docDefinition = {
  pageSize: 'A4',
  pageMargins: [40, 60, 40, 60],
  
  // Encabezado dinámico para todas las páginas excepto la portada
  header: function(currentPage, pageCount, pageSize) {
    if (currentPage === 1) return null;
    return {
      text: 'MINECRAFT MANAGER - MANUAL DE DOCUMENTACIÓN TÉCNICA Y DEFENSA',
      alignment: 'right',
      fontSize: 8,
      color: '#166534',
      margin: [40, 30, 40, 0],
      bold: true
    };
  },

  // Pie de página dinámico para todas las páginas
  footer: function(currentPage, pageCount) {
    if (currentPage === 1) return null;
    return {
      columns: [
        { text: 'Estudio y Preparación Académica', fontSize: 8, color: '#6b7280' },
        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'right', fontSize: 8, color: '#6b7280' }
      ],
      margin: [40, 0, 40, 30]
    };
  },

  content: [
    // --- PORTADA (Página 1) ---
    { text: '\n\n\n\n', fontSize: 20 },
    { text: 'MINECRAFT MANAGER', style: 'coverTitle' },
    { text: 'SISTEMA DE ADMINISTRACIÓN DE MUNDOS Y JUGADORES', style: 'coverSubtitle' },
    
    { text: '\n\n', fontSize: 20 },
    {
      canvas: [
        { type: 'rect', x: 0, y: 0, w: 515, h: 4, color: '#4ade80' }
      ]
    },
    { text: '\n\n', fontSize: 20 },
    
    { text: 'MANUAL COMPLETO DE DOCUMENTACIÓN TÉCNICA Y GUÍA DE DEFENSA ACADÉMICA', style: 'coverDesc' },
    
    { text: '\n\n\n\n\n\n', fontSize: 20 },
    {
      columns: [
        {
          width: '*',
          text: [
            { text: 'TECNOLOGÍAS PRINCIPALES:\n', bold: true, color: '#166534', fontSize: 9 },
            { text: '• Backend: Yii 2 REST API (PHP)\n• Frontend: Ionic 8 + Angular 20\n• Base de Datos: MySQL\n• Empaquetado: Capacitor 8', fontSize: 9, color: '#374151' }
          ]
        },
        {
          width: 'auto',
          alignment: 'right',
          text: [
            { text: 'ESTUDIANTE / AUTOR:\n', bold: true, color: '#166534', fontSize: 9 },
            { text: 'Juanito Díaz\n', fontSize: 9, color: '#374151' },
            { text: 'FECHA DE PRESENTACIÓN:\n', bold: true, color: '#166534', fontSize: 9 },
            { text: 'Mayo, 2026\n', fontSize: 9, color: '#374151' }
          ]
        }
      ]
    },
    
    // --- ÍNDICE (Página 2) ---
    { text: '', pageBreak: 'after' },
    { text: 'TABLA DE CONTENIDOS', style: 'sectionHeader' },
    { text: '\n', fontSize: 10 },
    
    {
      columns: [
        { text: '1. Introducción y Contexto del Proyecto', style: 'indexText' },
        { text: 'Pág. 3', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '2. Arquitectura y Stack Tecnológico', style: 'indexText' },
        { text: 'Pág. 3', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '3. Estructura General del Proyecto', style: 'indexText' },
        { text: 'Pág. 4', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '4. Análisis Comparado con la Rúbrica del Profesor', style: 'indexText' },
        { text: 'Pág. 4', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '5. Explicación Detallada del Código por Capas', style: 'indexText' },
        { text: 'Pág. 5', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '6. Problemas Técnicos Clave y Soluciones', style: 'indexText' },
        { text: 'Pág. 7', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '7. Simulador de Preguntas y Respuestas para la Defensa Oral', style: 'indexText' },
        { text: 'Pág. 8', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '8. Estrategia de Exposición y Estructura de la Presentación', style: 'indexText' },
        { text: 'Pág. 9', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '9. Conclusiones y Trabajo Futuro', style: 'indexText' },
        { text: 'Pág. 10', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },
    
    {
      columns: [
        { text: '10. Glosario Técnico Académico', style: 'indexText' },
        { text: 'Pág. 10', style: 'indexPage' }
      ]
    },
    { text: '..........................................................................................................................................................................', color: '#d1d5db', margin: [0, 2, 0, 8] },

    // --- SECCIÓN 1 Y 2 (Página 3) ---
    { text: '', pageBreak: 'after' },
    { text: '1. INTRODUCCIÓN Y CONTEXTO DEL PROYECTO', style: 'sectionHeader' },
    {
      text: 'El proyecto Minecraft Manager es una aplicación de nivel profesional para la administración de servidores y datos del videojuego Minecraft. Permite centralizar la gestión de las entidades básicas del universo de juego: Mundos (dimensiones y parámetros físicos), Jugadores (usuarios conectados y su progreso), Inventarios (artículos asignados), Items (catálogo de objetos utilizables), Biomas (entornos de generación de terreno) y Mobs (criaturas con sus atributos correspondientes).',
      style: 'bodyText'
    },
    {
      text: 'Este proyecto resuelve la dificultad de auditar o modificar el estado del servidor directamente sobre archivos binarios o mediante consola in-game. Provee una interfaz móvil intuitiva que interactúa con una base de datos relacional para que cualquier administrador o jugador verifique estadísticas, modifique niveles de experiencia y controle inventarios irregulares de forma remota.',
      style: 'bodyText'
    },
    
    { text: '2. ARQUITECTURA Y STACK TECNOLÓGICO', style: 'sectionHeader' },
    {
      text: 'El sistema adopta una arquitectura desacoplada Cliente-Servidor de tipo stateless (sin estado) para garantizar flexibilidad, seguridad y adaptabilidad multi-plataforma:',
      style: 'bodyText'
    },
    {
      ul: [
        { text: 'Backend RESTful API: Desarrollado en PHP bajo el Framework Yii 2, aprovechando el mapeo relacional de base de datos Active Record.', style: 'listText' },
        { text: 'Seguridad Stateless: El servidor no maneja cookies ni sesiones en memoria. En su lugar, utiliza tokens Bearer (Authorization: Bearer <token>) validados en base de datos para cada consulta HTTP.', style: 'listText' },
        { text: 'Frontend Móvil: Implementado en Ionic 8 y Angular 20, permitiendo empaquetar código web como aplicación nativa mediante Capacitor 8.', style: 'listText' },
        { text: 'Cliente de Conectividad HTTP: Se seleccionó la librería Axios encapsulada dentro de Servicios de Angular que devuelven Observables reactivos.', style: 'listText' }
      ],
      margin: [0, 0, 0, 15]
    },

    // --- SECCIÓN 3 Y 4 (Página 4) ---
    { text: '', pageBreak: 'after' },
    { text: '3. ESTRUCTURA GENERAL DEL PROYECTO', style: 'sectionHeader' },
    {
      text: 'La estructura de archivos organiza limpiamente las capas de la aplicación:',
      style: 'bodyText'
    },
    {
      ul: [
        { text: 'proyecto/controllers/: Controladores REST encargados de recibir las peticiones HTTP y devolver datos JSON.', style: 'listText' },
        { text: 'proyecto/models/: Modelos Active Record que manejan las reglas de validación en base de datos y relaciones foráneas.', style: 'listText' },
        { text: 'proyecto/config/web.php: Configuración central del backend, mapeo de rutas y desactivación del almacenamiento de sesión.', style: 'listText' },
        { text: 'movil/src/app/services/: Servicios de datos para comunicación HTTP parametrizados con Axios.', style: 'listText' },
        { text: 'movil/src/app/guard/permiso-guard.ts: Guardia que intercepta la navegación para impedir acceso a secciones según rol.', style: 'listText' },
        { text: 'movil/src/global.scss: Capa de diseño estilizada que aplica colores y fuentes visuales inspiradas en Minecraft.', style: 'listText' }
      ],
      margin: [0, 0, 0, 15]
    },

    { text: '4. ANÁLISIS COMPARADO CON LA RÚBRICA DEL PROFESOR', style: 'sectionHeader' },
    {
      text: 'Se realizó un mapeo de las guías de clase para certificar el cumplimiento estricto de las rúbricas establecidas:',
      style: 'bodyText'
    },
    {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: [100, 295, 80],
        body: [
          [
            { text: 'Guía / Requisito', style: 'tableHeader' },
            { text: 'Implementación del Proyecto', style: 'tableHeader' },
            { text: 'Estado', style: 'tableHeader' }
          ],
          [
            { text: '01. Listados', style: 'tableCellBold' },
            { text: 'Filtro CORS activo en Yii2. Renderizado con *ngFor y Axios.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '02. Detalle', style: 'tableCellBold' },
            { text: 'Navegación parametrizada por clave primaria con ActivatedRoute.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '03. Crear', style: 'tableCellBold' },
            { text: 'Formularios Reactivos, sesión desactivada (stateless), Token Bearer POST.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '04. Modificar', style: 'tableCellBold' },
            { text: 'Paso de ID en modal, patchValue para auto-completar y Axios PUT.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '05. Eliminar', style: 'tableCellBold' },
            { text: 'Alerta de confirmación de borrado físico / desvinculación asíncrona.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '08. Paginación', style: 'tableCellBold' },
            { text: 'Contenedor Swiper interactivo y llamadas a endpoint /total en API.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ],
          [
            { text: '11. Servicios', style: 'tableCellBold' },
            { text: 'Llamadas HTTP encapsuladas en Observables inyectables de Angular.', style: 'tableCell' },
            { text: 'COMPLETO', style: 'tableCellGreen' }
          ]
        ]
      }
    },

    // --- SECCIÓN 5 (Páginas 5 y 6) ---
    { text: '', pageBreak: 'after' },
    { text: '5. EXPLICACIÓN DETALLADA DEL CÓDIGO POR CAPAS', style: 'sectionHeader' },
    { text: '5.1 Base de Datos y Modelos Active Record (Yii 2)', style: 'subsectionHeader' },
    {
      text: 'Los modelos PHP representan las entidades relacionales de la base de datos usando el patrón Active Record de Yii 2:',
      style: 'bodyText'
    },
    {
      text: '• Mundos.php: Administra la tabla "mundos". Expone relaciones "hasMany" hacia "Biomas" y "JugadoresMundos". Además, redefine la función "beforeDelete" para eliminar en cascada los biomas y las relaciones intermedias con jugadores.',
      style: 'bodyText'
    },
    {
      text: '• Jugadores.php: Además de representar la tabla, implementa la interfaz IdentityInterface. Esto permite integrar al jugador con el gestor de autenticación nativo mediante su access_token:',
      style: 'bodyText'
    },
    {
      text: [
        'public static function findIdentityByAccessToken($token, $type = null) {\n',
        '    return static::findOne([\'access_token\' => $token]);\n',
        '}'
      ],
      style: 'codeBlock'
    },
    
    { text: '5.2 Controladores REST y Políticas de Acceso (Yii 2)', style: 'subsectionHeader' },
    {
      text: 'Los controladores REST heredan de yii\\rest\\ActiveController. Configuramos la seguridad stateless y las directivas CORS modificando el método behaviors():',
      style: 'bodyText'
    },
    {
      text: [
        'public function behaviors() {\n',
        '    $behaviors = parent::behaviors();\n',
        '    unset($behaviors[\'authenticator\']);\n',
        '    $behaviors[\'corsFilter\'] = [\n',
        '        \'class\' => \\yii\\filters\\Cors::class,\n',
        '        \'cors\' => [\'Origin\' => [\'http://localhost:8100\'], ...]\n',
        '    ];\n',
        '    $behaviors[\'authenticator\'] = [\n',
        '        \'class\' => CompositeAuth::class,\n',
        '        \'authMethods\' => [HttpBearerAuth::class],\n',
        '        \'except\' => [\'options\']\n',
        '    ];\n',
        '    return $behaviors;\n',
        '}'
      ],
      style: 'codeBlock'
    },
    {
      text: 'Adicionalmente, redefinimos index para filtrar datos: si el usuario es un "jugador", sólo puede visualizar los mundos e inventarios asociados a su propio identificador.',
      style: 'bodyText'
    },

    { text: '', pageBreak: 'after' },
    { text: '5.3 Servicios de Comunicación HTTP (Ionic/Angular)', style: 'subsectionHeader' },
    {
      text: 'En lugar de usar peticiones Axios directas en las páginas, encapsulamos las llamadas en servicios de Angular para mantener el desacoplamiento de código. Los métodos devuelven un Observable sobre el cual los componentes se suscriben de manera reactiva:',
      style: 'bodyText'
    },
    {
      text: [
        'listado(extra: string = \'\', busqueda: string = \'\'): Observable<any> {\n',
        '    let url = busqueda === \'\' ? this.url : `${this.url}/buscar/${busqueda}`;\n',
        '    return new Observable(observer => {\n',
        '        axios.get(url, { withCredentials: true, headers: this.getHeaders() })\n',
        '        .then(response => {\n',
        '            observer.next(response.data);\n',
        '            observer.complete();\n',
        '        }).catch(err => observer.error(err));\n',
        '    });\n',
        '}'
      ],
      style: 'codeBlock'
    },

    { text: '5.4 Flujos de Autenticación, Registro y Guards (Ionic/Angular)', style: 'subsectionHeader' },
    {
      text: 'El login del usuario envía las credenciales en formato JSON al endpoint /jugadores/login. Si son válidas, el backend devuelve el access_token, el cual es almacenado localmente en el dispositivo. La protección de rutas críticas se realiza mediante un Route Guard (permisoGuard) que intercepta la navegación y verifica si el rol guardado en localStorage cuenta con permisos de acceso registrados en base de datos. De lo contrario, impide la navegación y redirige.',
      style: 'bodyText'
    },

    { text: '5.5 Formularios Reactivos y Carga de Archivos (Ionic/Angular)', style: 'subsectionHeader' },
    {
      text: 'En la creación de jugadores, se maneja una colección dinámica de mundos mediante un FormArray de Angular. Para la carga de imágenes, capturamos el archivo binario del evento change y lo enviamos empaquetado en un objeto FormData con cabeceras multipart/form-data:',
      style: 'bodyText'
    },
    {
      text: [
        'const formData = new FormData();\n',
        'formData.append(\'foto\', this.archivoSeleccionado);\n',
        'await axios.post(this.baseUrl + \'/subir-foto/\' + id, formData, {\n',
        '    headers: { \'Authorization\': \'Bearer \' + localStorage.getItem(\'token\') }\n',
        '});'
      ],
      style: 'codeBlock'
    },

    // --- SECCIÓN 6 (Página 7) ---
    { text: '', pageBreak: 'after' },
    { text: '6. PROBLEMAS TÉCNICOS CLAVE Y SOLUCIONES', style: 'sectionHeader' },
    
    { text: '6.1 Desincronización de Relaciones Muchos a Muchos', style: 'subsectionHeader' },
    {
      text: 'El Problema: La relación entre jugadores y mundos se gestiona en la tabla intermedia "jugadores_mundos". Al modificar un jugador existente en la aplicación móvil, si deseleccionamos mundos del formulario dinámico (FormArray), las peticiones POST de guardado de la app sólo registraban las nuevas selecciones pero no eliminaban los mundos desvinculados, causando datos huérfanos o duplicidades.',
      style: 'bodyText'
    },
    {
      text: 'La Solución: Implementar un paso de desvinculación previo que vacía las relaciones antiguas antes de persistir la nueva lista, garantizando la consistencia relacional atómica del modelo.',
      style: 'bodyText'
    },

    { text: '6.2 Integridad Referencial y Borrado en Cascada en Backend', style: 'subsectionHeader' },
    {
      text: 'El Problema: Eliminar un mundo causaba fallos de servidor (Error 500) debido a la existencia de claves foráneas con las tablas de biomas y jugadores. MySQL bloqueaba el borrado físico del registro para prevenir inconsistencias.',
      style: 'bodyText'
    },
    {
      text: 'La Solución: Sobreescribir el método beforeDelete() en el modelo Mundos.php de Yii 2 para estructurar un borrado lógico ordenado jerárquicamente:',
      style: 'bodyText'
    },
    {
      text: [
        'public function beforeDelete() {\n',
        '    if (!parent::beforeDelete()) { return false; }\n',
        '    // 1. Elimina las relaciones intermedia con jugadores\n',
        '    JugadoresMundos::deleteAll([\'id_mundo\' => $this->id]);\n',
        '    // 2. Borra secuencialmente mobs y biomas asociados\n',
        '    foreach ($this->biomas as $bioma) {\n',
        '        Mobs::deleteAll([\'id_bioma\' => $bioma->id]);\n',
        '        $bioma->delete();\n',
        '    }\n',
        '    return true;\n',
        '}'
      ],
      style: 'codeBlock'
    },

    { text: '6.3 CORS e Interceptor Global de Axios', style: 'subsectionHeader' },
    {
      text: 'El Problema: Inyectar el token Bearer en cada llamada de Axios duplicaba código y propiciaba fallos de autorización si algún programador olvidaba incluir la cabecera en nuevos desarrollos.',
      style: 'bodyText'
    },
    {
      text: 'La Solución: Definir un interceptor en AppComponent.ts que captura de forma automática toda petición saliente de Axios e inserta el token Bearer en las cabeceras de autorización de manera centralizada.',
      style: 'bodyText'
    },

    { text: '6.4 Problema del Buscador con Campos Nulos (CONCAT vs CONCAT_WS)', style: 'subsectionHeader' },
    {
      text: 'El Problema: Al realizar búsquedas en los listados (como buscar al jugador "jumo_10" o buscar mobs/mundos con datos nulos), el buscador no devolvía resultados. Esto ocurría porque en SQL la expresión CONCAT(col1, \' \', col2) retorna NULL si alguno de los campos concatenados es NULL. En consecuencia, si un jugador no tenía registrada una fecha de unión o un mundo no tenía semilla/dificultad, la fila completa era excluida de la búsqueda.',
      style: 'bodyText'
    },
    {
      text: 'La Solución: Cambiamos la función CONCAT por CONCAT_WS(\' \', col1, col2, ...) (Concatenate With Separator). CONCAT_WS ignora automáticamente los valores NULL sin invalidar toda la cadena de texto, permitiendo realizar búsquedas correctas sobre cualquier registro.',
      style: 'bodyText'
    },

    { text: '6.5 Falta del Componente Buscador en Vista de Mundos y Accesibilidad', style: 'subsectionHeader' },
    {
      text: 'El Problema: La vista de Mundos carecía del componente <ion-searchbar> en el archivo HTML, impidiendo realizar búsquedas en este módulo tanto a administradores como a usuarios estándar. Además, se requería etiquetar el buscador con un atributo aria-label="serch text" para el lector de pantalla / scripts de pruebas automatizadas del profesor.',
      style: 'bodyText'
    },
    {
      text: 'La Solución: Agregamos el componente <ion-searchbar> en mundos-listado.page.html e inyectamos el atributo aria-label="serch text" en todos los buscadores del proyecto.',
      style: 'bodyText'
    },

    // --- SECCIÓN 7 (Página 8) ---
    { text: '', pageBreak: 'after' },
    { text: '7. SIMULADOR DE PREGUNTAS Y RESPUESTAS (DEFENSA ORAL)', style: 'sectionHeader' },
    {
      text: 'A continuación se presentan las preguntas técnicas complejas que podría realizar el jurado y las respuestas profesionales estructuradas para el estudiante:',
      style: 'bodyText'
    },
    
    { text: 'P1: ¿Por qué decidieron utilizar autenticación sin estado (stateless) en lugar de sesiones tradicionales de PHP en Yii 2?', style: 'questionText' },
    {
      text: 'Respuesta: "El cliente móvil es una aplicación desacoplada (SPA) empaquetada para celulares. Las sesiones de PHP tradicionales basadas en cookies de sesión no son viables ni escalables entre dominios diferentes. Al desactivar las sesiones tradicionales (enableSession = false) y validar las consultas con tokens Bearer en cada petición HTTP, logramos una arquitectura stateless ideal para móviles, permitiendo al servidor procesar peticiones independientes y reduciendo el consumo de memoria en backend."',
      style: 'answerText'
    },
    
    { text: 'P2: ¿Cómo funciona el flujo de validación de permisos y qué seguridad real aporta?', style: 'questionText' },
    {
      text: 'Respuesta: "En la app móvil, el Route Guard (permisoGuard) lee del localStorage las vistas permitidas y restringe la navegación para brindar una experiencia de usuario fluida y coherente. Sin embargo, la seguridad final y robusta se ejecuta en el backend: cada endpoint REST de Yii 2 ejecuta checkAccess() antes de persistir datos, comparando el rol de base de datos asociado al access_token y arrojando una excepción HTTP 403 (Acceso Denegado) si el usuario no tiene permisos válidos."',
      style: 'answerText'
    },

    { text: 'P3: Si la base de datos arrojaba un error de Foreign Key Constraint al eliminar un mundo, ¿por qué no desactivar las restricciones de llaves foráneas en MySQL en vez de programar un beforeDelete en PHP?', style: 'questionText' },
    {
      text: 'Respuesta: "Desactivar las llaves foráneas rompería las reglas fundamentales de consistencia relacional de base de datos y provocaría la existencia de registros huérfanos (por ejemplo, biomas sin mundos o mobs apuntando a zonas inexistentes). Al programar beforeDelete() en PHP garantizamos que el sistema elimine de forma jerárquica y transaccional los registros dependientes de forma controlada y segura."',
      style: 'answerText'
    },

    { text: 'P4: ¿Cuál es el beneficio de inyectar las cabeceras HTTP mediante un interceptor global de Axios en lugar de hacerlo en cada petición de los servicios?', style: 'questionText' },
    {
      text: 'Respuesta: "El interceptor global proporciona mantenibilidad y centralización. Garantiza que cualquier petición HTTP saliente cuente de forma transparente con el token de autorización actualizado de localStorage, eliminando la duplicación de código en todos nuestros servicios de Angular y previniendo errores por omisión humana en futuras expansiones."',
      style: 'answerText'
    },

    // --- SECCIÓN 8 Y 9 (Página 9) ---
    { text: '', pageBreak: 'after' },
    { text: '8. ESTRATEGIA DE EXPOSICIÓN Y ESTRUCTURA DE LA PRESENTACIÓN', style: 'sectionHeader' },
    {
      text: 'Sigue esta secuencia ordenada durante tu tiempo de exposición para transmitir seguridad y dominio técnico:',
      style: 'bodyText'
    },
    {
      ol: [
        { text: 'Introducción del Proyecto (2 minutos): Saludo formal, explicar que Minecraft Manager es un administrador centralizado para servidores de juego que separa backend REST de frontend móvil híbrido.', style: 'listText' },
        { text: 'Demostración de Funcionalidad y UI (4 minutos): Iniciar sesión como administrador. Mostrar las listas e interactuar con el componente de paginación Swiper y la barra de búsqueda (explicar que el debounce evita saturar al servidor).', style: 'listText' },
        { text: 'Demostración de Creación y Seguridad (3 minutos): Registrar un jugador agregando foto y asociando mundos. Explicar el funcionamiento de FormArray y FormData. Luego ingresar con el rol del jugador creado para demostrar cómo la app oculta accesos y cómo el backend filtra automáticamente la información (seguridad stateless).', style: 'listText' },
        { text: 'Conclusión y Cierre (1 minuto): Resaltar la robustez y escalabilidad de la arquitectura desacoplada y dar la palabra al jurado para preguntas.', style: 'listText' }
      ],
      margin: [0, 0, 0, 15]
    },

    { text: '9. CONCLUSIONES Y TRABAJO FUTURO', style: 'sectionHeader' },
    {
      text: 'Conclusiones:',
      bold: true,
      fontSize: 10,
      margin: [0, 10, 0, 5],
      color: '#166534'
    },
    {
      text: 'La integración exitosa de Yii 2 REST API y un cliente Ionic/Angular modularizado demuestra que las tecnologías desacopladas son el estándar moderno para el desarrollo de software seguro y multiplataforma. La desactivación de sesiones y la validación por tokens Bearer certifica un diseño backend escalable y moderno.',
      style: 'bodyText'
    },
    {
      text: 'Posibles Mejoras Futuras:',
      bold: true,
      fontSize: 10,
      margin: [0, 10, 0, 5],
      color: '#166534'
    },
    {
      ul: [
        { text: 'Websockets en vivo: Sincronizar en tiempo real las coordenadas de los jugadores activos dentro de los mundos.', style: 'listText' },
        { text: 'Conexión RCON: Permitir que la app móvil envíe comandos directos a la consola de un servidor oficial de Minecraft.', style: 'listText' },
        { text: 'Caché Redis: Almacenar temporalmente consultas recurrentes de biomas y mobs en el servidor para reducir latencias.', style: 'listText' }
      ]
    },

    // --- SECCIÓN 10 (Página 10) ---
    { text: '', pageBreak: 'after' },
    { text: '10. GLOSARIO TÉCNICO ACADÉMICO', style: 'sectionHeader' },
    {
      text: '• API RESTful: Interfaz de software que utiliza peticiones HTTP para transferir representaciones de datos entre sistemas independientes en formato JSON.',
      style: 'bodyText'
    },
    {
      text: '• Active Record: Patrón donde una clase de programación representa una tabla de base de datos y una instancia de dicha clase representa una fila específica.',
      style: 'bodyText'
    },
    {
      text: '• Stateless (Sin Estado): Principio arquitectónico donde cada solicitud HTTP del cliente contiene toda la información necesaria para procesarse, sin depender de sesiones almacenadas en memoria del servidor.',
      style: 'bodyText'
    },
    {
      text: '• CORS (Cross-Origin Resource Sharing): Mecanismo que utiliza cabeceras HTTP adicionales para permitir que un navegador web obtenga recursos de un origen distinto al de la página actual.',
      style: 'bodyText'
    },
    {
      text: '• Route Guard: Elemento de seguridad frontend que intercepta e inspecciona las peticiones de navegación de pantalla, bloqueándolas en caso de no cumplir criterios de autenticación o rol.',
      style: 'bodyText'
    },
    {
      text: '• Debounce: Técnica de desarrollo web que pospone la ejecución de un proceso de búsqueda asíncrona hasta que el usuario haya dejado de escribir por un lapso breve, reduciendo la carga del servidor.',
      style: 'bodyText'
    },
    {
      text: '• FormArray: Estructura reactiva de Angular para gestionar una cantidad variable de controles del formulario (inputs) de forma dinámica.',
      style: 'bodyText'
    },
    {
      text: '• Integridad Referencial: Regla de base de datos que garantiza que cada clave externa apunte a una clave primaria existente, previniendo inconsistencias lógicas en tablas dependientes.',
      style: 'bodyText'
    }
  ],

  // Estilos del Documento PDF
  styles: {
    coverTitle: {
      fontSize: 32,
      bold: true,
      alignment: 'center',
      color: '#166534',
      font: 'Roboto'
    },
    coverSubtitle: {
      fontSize: 14,
      alignment: 'center',
      color: '#4b5563',
      margin: [0, 10, 0, 0]
    },
    coverDesc: {
      fontSize: 12,
      alignment: 'center',
      color: '#1f2937',
      italic: true,
      margin: [20, 20, 20, 20]
    },
    sectionHeader: {
      fontSize: 14,
      bold: true,
      color: '#166534',
      margin: [0, 20, 0, 10],
      borderBottomWidth: 2
    },
    subsectionHeader: {
      fontSize: 11,
      bold: true,
      color: '#b45309',
      margin: [0, 15, 0, 5]
    },
    bodyText: {
      fontSize: 9.5,
      color: '#374151',
      margin: [0, 0, 0, 10],
      lineHeight: 1.4
    },
    listText: {
      fontSize: 9,
      color: '#374151',
      margin: [0, 2, 0, 2]
    },
    indexText: {
      fontSize: 10,
      bold: true,
      color: '#374151'
    },
    indexPage: {
      fontSize: 10,
      bold: true,
      color: '#166534'
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 9,
      color: 'white',
      fillColor: '#166534',
      alignment: 'center'
    },
    tableCell: {
      fontSize: 8.5,
      color: '#374151'
    },
    tableCellBold: {
      fontSize: 8.5,
      bold: true,
      color: '#111827'
    },
    tableCellGreen: {
      fontSize: 8.5,
      bold: true,
      color: '#166534',
      alignment: 'center'
    },
    codeBlock: {
      fontSize: 8,
      color: '#111827',
      fillColor: '#f3f4f6',
      margin: [0, 5, 0, 12],
      padding: 10
    },
    questionText: {
      fontSize: 9.5,
      bold: true,
      color: '#b45309',
      margin: [0, 8, 0, 4]
    },
    answerText: {
      fontSize: 9,
      color: '#374151',
      italic: true,
      margin: [10, 0, 0, 10],
      lineHeight: 1.3
    }
  }
};

// 3. Generación física del archivo PDF
console.log('Compilando PDF...');
(async () => {
  try {
    const outputPath = path.join(__dirname, 'Documentacion_Minecraft_Manager.pdf');
    const doc = pdfmake.createPdf(docDefinition);
    await doc.write(outputPath);
    console.log('PDF generado exitosamente en: ' + outputPath);
    process.exit(0);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    process.exit(1);
  }
})();
