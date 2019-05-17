function cargarCalificacion(){
	//Solicita nombre del Usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Solicita el numero de preguntas guardadas.
	var numQ = localStorage.getItem("NQ:"+nombre);
	//Solicita el numero preguntadas que fueron contestadas correctamente.
	var cal = localStorage.getItem('TestQBC:'+nombre);
	
	//Valida que no se acceda a esta página sin una sesión iniciada.
	if (nombre == null) {
		alert("Lo sentimos, aún no has iniciado una sesión.")
		location.href='../index.html';
	}
	else{
		//Agrega califación.
		var agregarC = document.getElementById('calbox');
		agregarC.innerHTML += '<div class="titleBox"><p>Estimado '+nombre+', obtuviste:</p></div><div class="cal"><p>'+cal+'/<span style="color:white">'+numQ+'</span></p></div><div class="franja"><p>Preguntas Correctas.</p></div>	';
	}
}