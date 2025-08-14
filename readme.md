# Proyecto de Pruebas Automatizadas para Chatbot Uela

Este repositorio contiene una suite de pruebas automatizadas End-to-End para el chatbot "Uela DeV", construida con Cypress.

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
npm run cy:open
```
## Estructura del Proyecto

- `cypress.config.js`:Archivo de configuración principal de Cypress. Contiene los timeouts, variables de entorno y el navegador por defecto.
- `cypress/e2e/`:Contiene todos los archivos de prueba (.cy.js).
- `cypress/support/commands.js`:Aquí se definen los comandos personalizados reutilizables, como cy.askBot().
- `cypress/support/e2e.js`:Archivo de arranque global. Se usa para importar plugins o definir escuchas de eventos.
- `package.json`: Define las dependencias del proyecto y los scripts de ejecución.