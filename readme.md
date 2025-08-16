# Proyecto de Pruebas Automatizadas para Chatbot Uela

Este repositorio contiene una suite de pruebas automatizadas End-to-End para el chatbot "Uela", construida con Cypress.

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- npm (normalmente se instala con Node.js)

## ⚙️ Instalación

1.  Clona este repositorio en tu máquina local:
    ```bash
    git clone [URL-DE-TU-REPOSITORIO]
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd [NOMBRE-DE-LA-CARPETA]
    ```
3.  Instala todas las dependencias necesarias:
    ```bash
    npm install
    ```

## ▶️ Cómo Ejecutar las Pruebas

Este proyecto incluye scripts para facilitar la ejecución de las pruebas.

### Modo Interactivo (Para desarrollar y depurar)

Abre el Test Runner de Cypress para ejecutar pruebas de forma visual:
```bash
npm run cy:open
```
### Modo por Consola (Para ejecuciones automáticas)

Ejecuta todas las pruebas sin interfaz gráfica (headless).
```bash
npm run cy:run
````
Si se desea ejecutar una prueba específica, se puede hacer de la siguiente manera:
```bash
npm run cy:run -- --spec "cypress/e2e/flujo-reclamos.cy.js"
```

## Estructura del Proyecto

Estrategia modular y Test-Data Driven para facilitar la reutilización y mantenimiento de las pruebas.

- `cypress.config.js`:Archivo de configuración principal de Cypress. Contiene los timeouts, variables de entorno y el navegador por defecto.
- `cypress/e2e/`:Contiene todos los archivos de prueba (.cy.js).
- `cypress/support/commands.js`:Aquí se definen los comandos personalizados reutilizables, como cy.askBot(). y cy.validateMainMenu() junto con otras validaciones reutilizables
- `cypress/support/e2e.js`:Archivo de arranque global. Se usa para importar plugins o definir escuchas de eventos.
- `package.json`: Define las dependencias del proyecto y los scripts de ejecución.
- `cypress/fixtures/`: Contiene datos de prueba (json) que pueden ser utilizados en las pruebas.

## 🧪 Añadiendo un Nuevo Flujo de Prueba
### Para los flujos de prueba existentes, como "Flujo de cotización", "Flujo de reclamos" o "Flujo de preguntas completas Informacion general":
- Estos flujos hacenun recorrido de conversaciones por ende deben seguir el recorrido de pregunta-respuesta y llevar a la ultima pregunta antes de: Desea Continuar? Si, Por favor o No, gracias.
  - Para añadir una nueva prueba (ej: para "Cotizacion"), sigue estos 3 pasos:
    1. Crea un Archivo de Datos `(.json)`:
       En la carpeta cypress/fixtures, crea un nuevo archivo, por ejemplo `flujocotizacion_Preguntasevasivas.json`, con la secuencia de preguntas y respuestas esperadas.

    2. Crea un Archivo de Prueba (`.cy.js`):
       En la carpeta `cypress/e2e`, crea un nuevo archivo, por ejemplo `flujo-cotizacion-preguntas-evasivas.cy.js`. Puedes copiar el contenido de un flujo existente y modificarlo para este caso relacionado con el flujo de cotizacion (`flujo-cotizacion.cy.js`).

    3. Ajusta el Archivo de Prueba:
       Asegúrate de que el script haga clic en el botón correcto al inicio ("Cotizar mi viaje") y que cargue el archivo JSON correcto (`cy.fixture('flujocotizacion_Preguntasevasivas.json')`).
    4. Asegurate que tenga el mismo nombre al array dentro del archivo y modificalo en: 
       ```bash
       datos.flujoCotizacion_Preguntasevasivas.forEach(turno => {
      ```
```json
    {
    "flujoCotizacion_Preguntasevasivas": [
      {
        "pregunta": "Quiero viajar a Cancún",
        "respuestasEsperadas": ["desde", "donde", "Cancun"]
      },
      {
        "pregunta": "voy a salir desde Bogota",
        "respuestasEsperadas": ["fecha", "fechas", "pensado", "cuando"]
      }
    ]
   }
```
### Para preguntas fuera del flujo de cada boton o solo una pregunta en proceso de Informacion General:
- Este proceso crea por cada pregunta un nuevo caso de prueba, por ende cada pregunta agregada en los archivos:`flujoFuera.json` y `flujoInfoGralPorPregunta.json` crea un nuevo caso de prueba.
- Simplemente hay que agregar las preguntas y las palabras esperadas.

## 🛠️ Comandos Personalizados
Este proyecto utiliza comandos personalizados para simplificar las pruebas:

- `cy.askBot(mensaje, [palabrasClave])`: Envía un `mensaje` al bot y verifica que la respuesta contenga al menos una de las `palabrasClave` proporcionadas. Es insensible a mayúsculas y tildes.
- `cy.validateMainMenu()`: Verifica que el bot haya regresado al menú principal, mostrando el mensaje de bienvenida y los botones de opción iniciales.

## Reportes
Los reportes de las ejecuciones las encuentras en:
- `cypress/reports/html/index.html`: Reporte HTML de las pruebas.
- `cypress/screenshots/`: Capturas de pantalla de las pruebas fallidas.