# MeLi Scrapper

Web Scrapper diseñado para recorrer las primeras 5 paginas de búsqueda de un producto en Mercado Libre, analizar cuantos items únicos hay publicados y generar un reporte.

## Tabla de Contenido

1. Requerimientos
2. Instalación
3. Uso
   - Scrapper
   - Analyzer
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

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/2.png" alt="Terminal" width="750"><br>

El web scrapper empezara a recolectar informacion de la pagina web utilizando [puppeteer]: https://github.com/GoogleChrome/puppeteer, cargando Chromium en modo "headless" y navegando por la estructura DOM de la pagina para extraer los datos de cada item en el listado.

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/4.png" alt="Finalizar scrapping" width="750"><br>

Cuando se finaliza el analisis de la pagina se almacenaran los datos de forma local en un archivo items.json.

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/5.png" alt="Ejemplo de resultado" width="750"><br>

### Analyzer

Iniciar el scrapper 

**Terminal**
```
node analyzer.js
```

El reporte del analisis se puede exportar en formato JSON para reutilizar la data o en formato HTML para mostrar un resumen.

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/6.png" alt="Iniciar Analisis" width="750"><br>

A continuacion se requiere un indice de similitud para agrupar los items obtenidos en el scrapping basados en la similitud del contenido, este indice se encuentra en el rango de 0 - 1, siendo 0 el indice donde se evalua todo el contenido del texto y se determina que un item es igual que otro por algunas palabras clave, en cambio en el indice 1 se evalua la similitud del contenido absoluta, para determinar que un item es igual a otro por todo el contenido del titulo.

Esta agrupacion se realiza utilizando el clustering para agrupar datos basado en el indice de similitud.

Eg.

Xiaomi Redmi Note 9 Dual SIM 128 GB Gris medianoche 4 GB RAM usando el indice 0 puede ser igual considerado un mismo producto que Xiaomi Redmi Note 8 Dual SIM 64 GB Negro espacial 4 GB RAM por las palabras clave Xiaomi, Redmi y Note.

En cambio usando el indice 1, solo los productos que estan escritos exactamente igual se consideran un unico item.

Para efectos del ejemplo se recomienda un indice del 0.99 para descartar errores simples de escritura.

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/7.png" alt="Indice" width="750"><br>

Cuando el reporte finalice puede ver un resumen del analisis directamente en la consola 

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/8.png" alt="Review" width="750"><br>

Si escogio la opcion de visualizar el resumen en HTML obtendra una pagina desarrollada en React JS asi

<img src="https://raw.githubusercontent.com/kmorope/MeLiScrapper/master/Images/9.png" alt="Report" width="750"><br>

### 4 Librerias

- https://github.com/GoogleChrome/puppeteer
- https://github.com/deestan/set-clustering
- https://github.com/facebook/react
- https://github.com/enquirer/enquirer
- https://github.com/qiao/difflib.js
- https://github.com/chalk/chalk
- https://github.com/jashkenas/underscore



