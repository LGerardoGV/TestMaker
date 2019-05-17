function ponerNombre(){

	var nombre = localStorage.getItem("Nombre");
	var divNombre = document.getElementById('username');
	if (nombre == null) {
		alert("Lo sentimos, aún no has iniciado una sesión.")
		location.href='../index.html';
	}
	else{
		divNombre.innerHTML = '<p1>Bienvenido.</p1><br><p2>'+nombre+'</p2>';
	}
}

function cerrarS(){
	localStorage.removeItem("Nombre");
	location.href='../index.html';
}

function obtenerDatos(){
	//Numero de preguntas actuales.
	var nombre = localStorage.getItem("Nombre");
	var numpreg = localStorage.getItem("NQ:"+nombre);
	var contenido = JSON.parse(localStorage.getItem('TestQB:'+nombre));
	var titulo = contenido[0];

	var agregarDatos = document.getElementById('infotest');
	agregarDatos.innerHTML += '<p>Test Actual: <br>'+titulo+'<br><br>Núm. Preguntas: <br>'+numpreg+'</p>';
	
}