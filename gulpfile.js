//COMANDOS:
// CMD 1: npx gulp dev
// CMD 2: npm rum dev


//SRC=IDENTIFICA  DEST=ALMACENA
const{src, dest, watch, parallel} = require("gulp");           //PROPIEDADES DE GULP
const sass = require('gulp-sass')(require('sass'));  //SASS
const plumber = require('gulp-plumber');             //AUTOMATIZAR

//IMAGENES
const cache = require('gulp-cache');
const  imagemin = require('gulp-imagemin'); // LIB IMAGENES WEB
const  webp = require('gulp-webp'); // LIB IMAGENES WEB
const  avif = require('gulp-avif'); // LIB IMAGENES WEB


//FUNCION PARA EJECUTAR SASS
function css(callback){

    src('src/scss/**/*.scss')       //IDENTIFICAR EL ARCHIVO DE SASS - (ACTUALIZA MULTIPLES ARCHIVOS SCSS)
    src('src/scss/app.scss')       //IDENTIFICAR EL ARCHIVO DE SASS - (UN SOLO ARCHIVO SCSS ACTUALIZA)
        .pipe(plumber())           //PARA QUE NO SE BLOQUEE SI HAY ERROR
        .pipe(sass())              //DESPUES COMPILAR EL ARCHIVO
        .pipe(dest('build/css'));  //ALMACENAR EN EL DISCO

    callback(); //INDICA AL GULP QUE FINALIZO
}


//FUNCION PARA COMPRIMIR IMAGENES
function comprimirImagen(callback){

    const opciones = {
        optimizationLevel: 3
    };

    src('src/img/**/*.{png,jpg}') //RUTA: ** TODAS las carpetas
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))

    callback(); //INDICA AL GULP QUE FINALIZO
}

//FUNCION PARA CONVERTIR IMAGENES A WEBP
function convertirWebp(callback){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //RUTA: ** TODAS las carpetas
    .pipe(webp(opciones))
    .pipe(dest('build/img'));

    callback(); //INDICA AL GULP QUE FINALIZO
}

//FUNCION PARA CONVERTIR IMAGENES A AVIF
function convertirAvif(callback){

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}') //RUTA: ** TODAS las carpetas
    .pipe(avif(opciones))
    .pipe(dest('build/img'));

    callback(); //INDICA AL GULP QUE FINALIZO
}

//EJECUTAR JAVASCRIPT
function runJava(callback){

    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    callback();
}

//AUTOMATIZA  SASS
function dev(callback){

    //watch('src/scss/app.scss',css)
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',runJava);
    callback();
}

exports.css = css;
exports.runJava = runJava;
exports.dev = dev;
exports.convertirWebp = convertirWebp;
exports.comprimirImagen = comprimirImagen;
exports.convertirAvif = convertirAvif;

//EJECUTA PARALELAMENTE 
//exports.dev = parallel(comprimirImagen, convertirWebp, dev);
//exports.comprimirImagen = parallel(comprimirImagen, convertirWebp, convertirAvif);

