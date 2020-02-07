/* -------------------- Obtener los datos del formulario -------------------- */


function validar(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const body = '{"username":'+email+', "password":'+password+'}';
    console.log(body);
    fetch('/api/session/',
        {
            method:'POST',
            body:'{"username":"'+email+'", "password":"'+password+'"}'
        }
        )
        .then(rta => rta.text())
        .then(rta =>{
            console.log(rta)
            // console.log(rta.message)
            // let test = document.getElementById('list');
            // test.innerHTML=rta;
        })
}