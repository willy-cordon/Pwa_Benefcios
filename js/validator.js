/* -------------------- Obtener los datos del formulario -------------------- */


function validar(){
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email == '') {
        toastr.error('Complete los campos requeridos!');
    }
    if (password == '') {
        toastr.error('Complete los campos requeridos!');
    }

    if (email != '' && password != '') {

        fetch('https://beneficios.dev.nextarsoft.com/api/session/',
        {
            method:'POST',
            mode: 'cors',
            body:'{"username":"'+email+'", "password":"'+password+'"}'
        }
        )
        .then(rta => rta.json())
        .then(rta =>{
/* --------------------- Validamos los datos ingresados --------------------- */
            console.log(rta);
            if (rta.message == 'SUCCESS:SUCCESS') {
                //Guardamos los datos en las sessiones 
                sessionStorage.setItem('token', rta.token      );
                sessionStorage.setItem('user', rta.username_id );
                location.href="index.html";

            }else{
                // console.log(rta.message);
                toastr.error('Datos Incorrectos!')
                
            }

        })
    }
   
}