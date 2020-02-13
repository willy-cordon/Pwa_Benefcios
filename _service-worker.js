
    
 const STATIC_CACHE = 'static-v1.6';
 const DYNAMIC_CACHE = 'dynamic-v1.6';
 const INMUTABLE_CACHE = 'inmutable-v1.6';
 const CACHE_DYNAMIC_LIMIT = 0;

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

 const APP_SHELL = [
    '/',
     'login.html',
    // 'indexClaro.html',
    // 'indexMovistar.html',
    // 'indexPersonal.html',
    // 'vistas/error.html',
    // 'assets/images/favicon.png',
    // 'assets/images/error3.png' 
    //  'assets/css/style.css',
    //pepe
    //si sirve zzz
    //ASDASD
    //localhost
    //localhost
 ];
 const APP_SHELL_INMUTABLE=[
     
    //   'assets/js/wow.js',
    //  'css/fontaweasome.css',
    //  'https://cdn.jsdelivr.net/npm/sweetalert2@8',
    //  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
    //  'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
    //  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    //  'https://app.goodexperiencelg.com/assets/css/animate.css',
    //  'https://fonts.googleapis.com/css?family=Roboto:400,500',
    //  'https://use.fontawesome.com/releases/v5.2.0/webfonts/fa-solid-900.woff2'



 ];

 self.addEventListener('install', e =>{
    const cacheStatic=caches.open(STATIC_CACHE).then(cache=>cache.addAll(APP_SHELL));
    const cacheInmutable=caches.open(INMUTABLE_CACHE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});


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


 // 3- Network with cache fallback


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
                     return caches.match('/vistas/error.html');
                 }
             })


         });




     e.respondWith( respuesta );

      }


  
    });



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






