# Leaflet Maps Test

Este es un test de la libreria javaScript open source de mapas llamada `leaflet`. En este
repositorio se incluye tanto el backend como en frontend, para ejecutar el test a continuacion
mencionare los requisitos que se deben tener, como mi ambiente de trabajo.

## Ambiente de Trabajo

* Sistema Operativo: Ubuntu 16.04 LTS
* Entorno de Desarrollo: PhpStorm 2016.2.2 (Alternando con Sublime Text)
* Gestor de Base de Datos: mysql

## Librerias

* AngularJS 1.6
* Leaflet Map 1.0.3
* jQuery 3.1.1

## Requisitos

Primeramente necesitas tener instalado `php 7` aunque con la version `5.6`. Lo importante de esto,
es que tengas instalado el `cli` de php para levantar un servidor statico.

## How to use

Lo primero que debes hacer es ejecutar el script `db.sql` en mysql para crear la base de datos
con la cual podras probar el ejemplo, deberia crearte una base de datos llamada `maps_test`. Luego,
renombra el archivo de la carpeta `backend` llamado `.env.example.php` por `.env.php` (Nota: Si usas
alguna distro de GNU/Linux puede que el archivo este oculto, visualizalo abriendo la carpeta de proyecto
con el editor o IDE de tu preferencia). Una vez renombrado, modifica los valores de `user`, `hostname` y 
`password` con tus propios valores.

Una vez hecha esta configuracion previa, abre una `terminal o consola` y ve a la ruta de la carpeta del
proyecto. Una vez dentro, ejecuta el siguiente comando:

`$ php -S 127.0.0.1:8000`

Esto permitira que puedas ir a la ruta `http://localhost:8000` en tu browser para probar el test, sin embargo,
debes inicializar el backend tambien.

De la misma forma en una nueva terminal, y esta vez te ubicaras en la carpeta llamada `backend` dentro del
proyecto. Luego ejecutaras el siguiente comando:

`$ php -S 127.0.0.1:9000`

Una vez hecho esto podras testear tambien el backend

## NOTA

```
Primero debes iniciar el backend y luego el frontend, sino habra conflicto con el frontend, recuerda
que tambien debes contar con conexion a internet usar el backend ya que utiliza librarias como jQuery
que utilizan CDN, por tanto asegurate de contar con Internet.
```