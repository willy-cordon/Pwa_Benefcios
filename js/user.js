/* -------------------------------------------------------------------------- */
/*                       Cargamos los datos del usuario                       */
/* -------------------------------------------------------------------------- */

let userid = sessionStorage.getItem('user');


fetch('/api/developer/users/?apikey=MBLO123&&id='+userid)
.then(rta => rta.text())
.then(rta => {
    console.log(rta.id);
})
