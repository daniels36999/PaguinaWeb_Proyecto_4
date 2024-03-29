//CODIGO JS
document.addEventListener( 'DOMContentLoaded', function(){
    iniciarApp();

} );

function iniciarApp(){
    crearGaleria();
    scrolNav();
    navegacionFija();//HOLA---
}


//NavegacionFija--
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll',function(){
        if (sobreFestival.getBoundingClientRect().bottom<0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    })

}

//SCROL
function scrolNav(){
    const enlaces = document.querySelectorAll('navegacion-principal a') ;

    enlaces.forEach( enlace => {
        enlace.addEventListener('click',function(e){
            //e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});

        });


    });

}

function crearGaleria(){
    const galeria=document.querySelector('.galeria-imagenes'); //.galeria-imagenes --ASI SE LLAMA A UNA CLASS DE HTML

    for(let i=1; i<=12; i++){

        const imagen = document.createElement('picture');

        imagen.innerHTML =`
        <source srcset="/build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="/build/img/thumb/${i}.webp" type="image/webp">
        <img  loading="lazy" width="200" height="300" src="/build/img/thumb/${i}.jpg" alt="Imagen Galería">
        `;
        imagen.onclick = function(){ //EScucha la accion al precionar y es callback para q no se ejecute todo
            mostrarImagen(i)
        }

    
        galeria.appendChild(imagen);
    }
};

function mostrarImagen(imgPresiona){

    const imagen = document.createElement('picture');

    imagen.innerHTML =`
        <source srcset="/build/img/grande/${imgPresiona}.avif" type="image/avif">
        <source srcset="/build/img/grande/${imgPresiona}.webp" type="image/webp">
        <img  loading="lazy" width="200" height="300" src="/build/img/grande/${imgPresiona}.jpg" alt="Imagen Galería">
        `;

    //CREA EL OVERLAY CON LA IMAGEN
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

      //CIERRA LA IMAGEN A NIVEL DEL OVERLAY
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove()
    }

    //BOTON PARA CERRAR LA VENTANA MOdaL
    const cerraVentana = document.createElement('P');
    cerraVentana.textContent = 'X';
    cerraVentana.classList.add('btn-cerrar');
    
    //CIERRA LA IMAGEN y ACTIVA EL SCROLL CON EL BOTON
    cerraVentana.onclick = function(){
       
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerraVentana);


    //AÑDE AL HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}