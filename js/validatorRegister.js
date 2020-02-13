/* -------------------- Obtener los datos del formulario -------------------- */


function registerval(){
    const firstname = document.getElementById('firstname').value;
    const lastname  = document.getElementById('lastname') .value;
    const dni       = document.getElementById('DNI')      .value;
    const username  = document.getElementById('username') .value;
    const password  = document.getElementById('password') .value;

/* --------------- Verificamos que los campos no esten vacios --------------- */

    if (firstname == '') {
        toastr.error('Complete los campos requeridos!');
    }
    if (lastname == '') {
        toastr.error('Complete los campos requeridos!');
    }
    if (dni == '') {
        toastr.error('Complete los campos requeridos!');
    }
    if (username == '') {
        toastr.error('Complete los campos requeridos!');
    }
    if (password == '') {
        toastr.error('Complete los campos requeridos!');
    }

/* ---------------------------------Si no estan vacios los campos Registramos al usuario --------------------------------------- */
    if (firstname != '' && lastname != '' && dni != '' && username != '' && password != '' ) {

        fetch('https://beneficios.dev.nextarsoft.com/api/users/',
        {
            method:'POST',
            mode: 'cors',
            body:'{"firstname":"'+firstname+'", "lastname":"'+lastname+'", "DNI":"'+dni+'", "username":"'+username+'", "password":"'+password+'"}'
        }
        )
        .then(rta => rta.json())
        .then(rta =>{
/* --------------------- Validamos los datos ingresados --------------------- */
            console.log(rta);
            if (rta.message == 'SUCCESS:SUCCESS') {
                
                location.href="login.html";

            }else{
                // console.log(rta.message);
                toastr.error('Algo salio mal :(')
                
            }

        })
    }
   
}