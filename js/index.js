//Verifica que localStorage no este vacio.
if (localStorage.length == 0) {
		var first = ["LGerardoGV:elcreador"];
		localStorage.setItem('UserPass',JSON.stringify(first));
}

function validarSe(){
	//Solicita nombre del usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Valida que no se acceda a esta página sin una sesión iniciada.
	if (nombre != null) {
		alert("Lo sentimos, debes cerrar sesión antes.")
		location.href='views/menuTest.html';
	}
}

function validar(){
	//Adquisición de datos.
	var usuario = document.getElementById('user').value;
	var contra =  document.getElementById('pass').value;

	//Extrae arreglo de las cuentas almacenadas en LocalStorage.	
	var contenido = JSON.parse(localStorage.getItem('UserPass'));
	//console.log("Extracción Arreglo JSON ANTERIOR");
	//console.log(contenido);

	//Valida que no se introduzcan campos vacios.
	if (usuario.length==0 || contra.length == 0) {
		alert("Por favor no dejes campos vacíos.");
		return false;

	}
	else
	{
		var contar = 0;
		for (var x = 0; x <= contenido.length-1; x++) {
		//Recorre el arreglo.
		var cuenta = contenido[x];
		//Separa los usuarios y contraseñas a partir del caracter ':'.
		var sep = cuenta.split(':');
		//console.log(sep);
			//Valida que el usuario y la contraseña ingresador sea igual a lo almacenado en el arreglo.
			if (usuario+","+contra == sep) {
				//Si es igual lo cuenta.
				contar++;
			}
		}

		//Si el contador es mayor a 0 significa que si existe la coincidencia.
		if (contar >0) {

			//Guardamos el nombre en localStorage
			localStorage.setItem("Nombre",usuario);
			alert("Inicio de sesión exitoso.")
			location.href='views/menuTest.html';

		}
		else
		{
			alert("Lo sentimos. Nombre de usuario o contraseña incorrectos.");
		}
	}
}

function letrasynumeros(escribir){
	//Se declara key que indicara cuándo se presione una tecla por el usuario.
    key = escribir.keyCode || escribir.which;
    //Obtiene el caracter presionado por el usuario y lo convierte en minúscula.
    tecla = String.fromCharCode(key).toLowerCase();
    //Establece los caracteres admitidos.
    letrasnums = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789";
	//backspace-leftarrow-rightarrow-delete.
	especiales = "8-37-39-46";

	//Busca si ésta la tecla presionada por usuario.
	teclaEspecial = false
    for(var z in especiales){
        if(key == especiales[z]){
            teclaEspecial = true;
            break;
        }
   	}
    //Si no encuentra teclas admitidas indexOf es igual a -1 y teclaEspecial es false
   	if(letrasnums.indexOf(tecla)==-1 && !teclaEspecial){
        return false;
    }
}
