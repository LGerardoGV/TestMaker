//Verifica que localStorage no este vacio.
if (localStorage.length == 0) {
		var first = ["LGerardoGV:elcreador"];
		localStorage.setItem('UserPass',JSON.stringify(first));
}

function validarS(){
	var nombre = localStorage.getItem("Nombre");
	if (nombre != null) {
		alert("Lo sentimos, debes cerrar sesión antes.")
		location.href='../views/menuTest.html';
	}
}

function registrar(){
	//Adquisición de datos.
	var usuario = document.getElementById('user').value;
	var contra =  document.getElementById('pass').value;
	var contraC = document.getElementById('passC').value;

	//Valida que no se introduzcan 'whitespaces' al mandar a LocalStorage
	var count = 0;
	//Recorre la cadena de texto
	for (var i = 0; i <=usuario.length; i++) {
		//Si en la primera posición se coloca un espacio
		if (usuario.charAt(0)==' ') {
			//Se recorre todo el texto, si hay elementos diferente al espacio (' ') los cuenta
			if (usuario.charAt(i) !=' ') {
				count++;
			}
		}
	}
	
	//console.log(count);
	//Si el contador es igual a uno (significa que hay un espacio)
	if (count ==1){
		alert("Lo sentimos, pero tu nombre de usuario no pueden ser espacios.")
		return false;
	}

	//Valida que no se introduzcan campos vacios.
	if (usuario.length==0 || contra.length == 0 || contraC == 0) {
		alert("Por favor no dejes campos vacios.");
		return false;

	}

	else
	{
		//Validaciones
		if (contra!=contraC) {
			alert("Tus contraseñas no coinciden. Intenta introducirlas de nuevo.");
		}
		else{
			//Guarda en una variable el contenido de localStorage.
			var contenido = JSON.parse(localStorage.getItem('UserPass'));
			console.log("Extracción Arreglo JSON ANTERIOR");
			console.log(contenido);

			//Valida que no se repitan nombres de Usuario.
			var contar = 0;
			for (var x = 0; x <= contenido.length-1; x++) {
			var cuenta = contenido[x];
			var sep = cuenta.split(':');
			//console.log("SEP[0]:"+sep[0]);
			//console.log("USUARIO:"+usuario)
			if (usuario == sep[0]) {
					contar++;
				}
			}

			//console.log("CONTADOR:"+contar);
			if (contar ==0){

				//Define que arreglo será igual al contenido.
				arreglo = contenido;
				console.log("Arreglo antes de insertar los datos nuevos:");
				console.log(arreglo);
				
				//Introduce el usuario y contraseña al arreglo conservando los datos anteriores.
				arreglo.push(usuario.trim()+":"+contra.trim());
				var ver = localStorage.setItem('UserPass',JSON.stringify(arreglo));
				console.log(arreglo);

				localStorage.setItem("Nombre",usuario.trim());

				alert("Registro Exitoso. Comencemos.");
				location.href='../views/menuTest.html';
			}
			else
			{
				alert("El nombre de usuario ya existe. Prueba con otro.");
			}
		}
	}
}

function letrasynumeros(escribir){
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

function lym_sinespacio(escribir){
	//Se declara key que indicara cuándo se presione una tecla por el usuario.
    key = escribir.keyCode || escribir.which;
    //Obtiene el caracter presionado por el usuario y lo convierte en minúscula.
    tecla = String.fromCharCode(key).toLowerCase();
    //Establece los caracteres admitidos.
    letrasnums = "áéíóúabcdefghijklmnñopqrstuvwxyz0123456789";
	//backspace-leftarrow-rightarrow-delete.
	especiales = "37-39-46";

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