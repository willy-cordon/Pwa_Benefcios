/**
 * Procedemos a instalar el sw con el comando navigator.serviceWorker.register
 * 
 * Integramos el service worker de One signal a nuestro sw
 * 
 * 
 */
var url = window.location.href;
var swLocation = 'Pwa_Benefcios/sw.js';
var swReg;

let test=url.includes('localhost');

if ( navigator.serviceWorker ) {
    
    
    if ( url.includes('localhost') ) {
        swLocation = 'Pwa_Benefcios/sw.js';
    }


    window.addEventListener('load', function() {
        console.log(swLocation);
        navigator.serviceWorker.register( swLocation );

    });

}