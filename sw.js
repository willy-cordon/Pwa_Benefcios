/**
 * Sw Js
 */
    
 const STATIC_CACHE = 'static-v0.2';
 const DYNAMIC_CACHE = 'dynamic-v0.2';
 const INMUTABLE_CACHE = 'inmutable-v0.2';
 //Limite en mb
 const CACHE_DYNAMIC_LIMIT = 5;
//Si  el cache llega al maximo permitido se borra y refresca
 function limpiarCache( cacheName, numeroItems ) {

    caches.open( cacheName )
        .then( cache => {

            return cache.keys()
                .then( keys => {
                    
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });

            
        });
}
//Archivos indispensables [Pueden ser editados]
 const APP_SHELL = [
     '/',
     'login.html',
     'styles/style.css',
     'styles/framework.css',
     'js/user.js',
     'js/app.js',
     'images/error/pagerror1.jpg'

 ];
 //Archivos fijos por lo Grl. son librerias
 const APP_SHELL_INMUTABLE=[
     
     'scripts/jquery.js',
     'scripts/plugins.js',
     'fonts/css/fontawesome-all.min.css',
     'https://fonts.googleapis.com/css?family=Poppins:200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Roboto:300,300i,400,400i,500,500i,700,700i,900,900i&display=swap" rel="stylesheet',
     'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css',
     'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js'
    



 ];

 //Instalamos el cache de nuestra app
 self.addEventListener('install', e =>{
    const cacheStatic=caches.open(STATIC_CACHE).then(cache=>cache.addAll(APP_SHELL));
    const cacheInmutable=caches.open(INMUTABLE_CACHE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

//Activamos la cache del storage
 self.addEventListener('activate', e => {

     const respuesta = caches.keys().then( keys => {

         keys.forEach( key => {

             if (  key !== STATIC_CACHE && key.includes('static') ) {
                 return caches.delete(key);
             }
             if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                 return caches.delete(key);
             }
         });

     });

     e.waitUntil( respuesta );


 });


 //Network with cache fallback
 self.addEventListener('fetch', e =>{

    if(e.request.method === 'POST' || e.request.method === 'PUT'){
        
        return fetch(e.request);
 
     }else{


        const respuesta = caches.match( e.request )
         .then( res => {

             if ( res ) return res;

             // No existe el archivo
             // tengo que ir a la web
            //  console.log('No existe', e.request.url );
           
             return fetch( e.request ).then( newResp => {

                 caches.open( DYNAMIC_CACHE )
                     .then( cache => {
                         cache.put( e.request, newResp );
                         limpiarCache( DYNAMIC_CACHE, CACHE_DYNAMIC_LIMIT );
                         limpiarCache( STATIC_CACHE, CACHE_DYNAMIC_LIMIT );

                     });

                 return newResp.clone();
             })
             .catch(err=>{
                 if(e.request.headers.get('accept').includes('text/html')){
                     console.log('la pagina pedida fue un html');
                     return caches.match('/views/error.html');
                 }
             })


         });




     e.respondWith( respuesta );

      }


  
    });


//Mostramos el prompt de instalacion forzada
    self.addEventListener('message', (event) => {
        console.log(event);
        if (!event.data){
          return;
        }
        
        switch (event.data) {
          case 'force-activate':
            self.skipWaiting();
            self.clients.claim();
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => client.postMessage('reload-window'));
            });
            break;
          default:
            // NOOP
            break;
        }
      });






