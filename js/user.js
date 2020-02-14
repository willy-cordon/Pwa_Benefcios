/* -------------------------------------------------------------------------- */
/*                       Cargamos los datos del usuario                       */
/* -------------------------------------------------------------------------- */

let userid = localStorage.getItem('user');
console.log(userid);
//Traemos los datos de usuario logueado
fetch('https://beneficios.dev.nextarsoft.com/api/developer/users?id='+userid)
.then(rta => rta.json())
.then(rta => {
    console.log(rta);
    // JSON con distintos valores para utilizar en la demo
//var json = {'valor1': 1, 'valor2': [1, 2, 3, 4], 'valor3': '3'};
     
// Obteniendo todas las claves del JSON
for(f=0;f<rta[0].id.length;f++){

}
})
