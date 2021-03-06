/* -------------------- Obtener los datos del formulario -------------------- */

/* ------------------- Funcion para validad formato email ------------------- */

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validar() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const validateEmailResult = validateEmail(email);

  if (!validateEmailResult) {
    toastr.error("Ingrese un email Valido!");
    
  }
  if (email == "") {
    toastr.error("Complete los campos requeridos!");
  }
  if (password == "") {
    toastr.error("Complete los campos requeridos!");
  }

  if (email != "" && password != "" && validateEmailResult) {
    fetch("https://beneficios.dev.nextarsoft.com/api/session/", {
      method: "POST",
      mode: "cors",
      body: '{"username":"' + email + '", "password":"' + password + '"}'
    })
      .then(rta => rta.json())
      .then(rta => {
        /* --------------------- Validamos los datos ingresados --------------------- */
        console.log(rta);
        if (rta.message == "SUCCESS:SUCCESS") {
          //Guardamos los datos en las sessiones
          localStorage.setItem("token", rta.token);
          localStorage.setItem("user", rta.username_id);
          location.href = "index.html";
        } else {
          // console.log(rta.message);
          toastr.error("Datos Incorrectos!");
        }
      });
  }
}
