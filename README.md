# MeLi Scrapper

Web Scrapper diseñado para recorrer las primeras 5 paginas de búsqueda de un producto en Mercado Libre, analizar cuantos items únicos hay publicados y generar un reporte.

## Tabla de Contenido

1. Requerimientos
2. Instalación
3. Uso
   - Scrapper
   - Analyzer
   - Reporte
4. Librerías 

### 1 Requerimientos

- NodeJS 12.14 LTS + 
- Windows 10/ Linux/ macOS 10.10+

### 2 Instalación

Clonar el repositorio en una carpeta local
```
git clone https://github.com/kmorope/MeLiScrapper.git
```
En la raíz del repositorio ejecutar el siguiente comando

**npm**:
```
npm install
```

### 3 Uso

### Scrapper

Iniciar el scrapper 

**Terminal**
```
node index.js
```
- Al iniciar el scrapper se solicitara la url para analizar, en el ejemplo se uso 
"https://listado.mercadolibre.com.ar/xiaomi#D[A:xiaomi]" pero cualquier URL de listado de Mercado Libre es valida, si no pertenece al dominio sera rechazada por el scrapper.



