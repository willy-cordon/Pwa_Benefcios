
/**
 * Author: Willy Cordon
 * Year: 2020
 * 
 */


/* -------------------------------------------------------------------------- */
/*                                   LOGOUT                                   */
/* -------------------------------------------------------------------------- */

 function cerrar(){
/* ----------------- Vaciamos las crendenciales del usuario ----------------- */
    localStorage.removeItem('token');
    localStorage.removeItem('user');

/* --------------------- redirigimos al usuario al login -------------------- */
    location.href="login.html";
 }

