const username = document.getElementById('username');
username.addEventListener('blur',obtenerevento);

/* -------------------- Verificamos si el usuario existe -------------------- */

function obtenerevento() {
    const username  = document.getElementById('username') .value;
    const btnregister  = document.getElementById('btnregister');
  

         fetch('https://beneficios.dev.nextarsoft.com/api/validate/',{
            method:'POST',
            mode: 'cors',
            body:'{"username":"'+username+'"}'
         })
             .then(response=>response.json())
             .then((rta)=>{
                 console.log(rta);
                if (rta.message == "SUCCESS:USER EXIST") {
                    toastr.error('Usuario Existente')
                    console.log(btnregister);
                    btnregister.setAttribute('disabled',true);
                   
                }
                if (rta.message == "ERROR:INVALID_USER") {
                    btnregister.removeAttribute('disabled');
                }

             });
       }


