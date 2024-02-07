//COMANDOS:
// CMD 1: npx gulp dev
// CMD 2: npm rum dev


//SRC=IDENTIFICA  DEST=ALMACENA
const{src, dest, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


function css(callback){

    src('src/scss/**/*.scss')       //IDENTIFICAR EL ARCHIVO DE SASS - (ACTUALIZA MULTIPLES ARCHIVOS SCSS)
    src('src/scss/app.scss')       //IDENTIFICAR EL ARCHIVO DE SASS - (UN SOLO ARCHIVO SCSS ACTUALIZA)
        .pipe(plumber())           //PARA QUE NO SE BLOQUEE SI HAY ERROR
        .pipe(sass())              //DESPUES COMPILAR EL ARCHIVO
        .pipe(dest('build/css'));  //ALMACENAR EN EL DISCO

    callback(); //INDICA AL GULP QUE FINALIZO
}

exports.css = css;

function dev(callback){

    //watch('src/scss/app.scss',css)
    watch('src/scss/**/*.scss',css)
    callback();
}


exports.dev = dev;