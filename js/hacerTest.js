//Declara variable que será usada como identificador.
var num = 1
//Solicita nombre del usuario conectado.
var nombre = localStorage.getItem("Nombre");
function ponerUsuario(){
	var divNombre = document.getElementById('username');

	//Valida que no se acceda a esta página sin una sesión iniciada.
	if (nombre == null) {
		alert("Lo sentimos, aún no has iniciado una sesión.")
		location.href='../index.html';
	}
	else{
		//Coloca el nombre de usuario en un div.
		divNombre.innerHTML = '<p1>Bienvenido</p1><br><p2>'+nombre+'</p2>';
	}
}

function cargarTest(){

	//Solicita nombre del usuario conectado.
	nombre = localStorage.getItem("Nombre");

	//Numero de preguntas actuales.
	var numpregstotal = localStorage.getItem("NQ:"+nombre);

	//Extrae el arreglo de preguntas guardados.
	var contenido = JSON.parse(localStorage.getItem('TestQB:'+nombre));
	//Valida que no se acceda a esta página sin antes haber creado un test.
	if (contenido == null && nombre != null) {
		alert("Aún no tienes un test creado.\nPor favor selecciona la opción \"Crear/Editar Test\" para hacer uno.")
		location.href='../views/menuTest.html';
	}
	else{
		//console.log("Arreglo EXTRAIDO de LocalStorage");
		//console.log(contenido);
		//console.log("Titulo TEST: "+contenido[0]);

		//Coloca el titulo del test.
		document.getElementById('inputtTest').value = contenido[0];

		//Agrega el numero de preguntas que el usuario coloco al inicio de crear el Test.
		for (var w = 1; w <=numpregstotal-1; w++) {

			for (var x = 1; x <= 1; x++) {
					//Agrega una pregunta nueva con un identificador secuencial.
					var agregarQ = document.getElementById('tstBox');
					num = num+x;
					//Agrega la pregunta.
					agregarQ.innerHTML += '<div class="questBox" id="questbox'+num+'"><div class="questBoxInd"><div class="quest"><input type="text" name="titleQuest" placeholder="Pregunta" id="inputtQuest'+num+'" readonly="readonly"></div><div class="optionA"><input type="radio" name="answ'+num+'" id="radA'+num+'"><input type="text" name="oneA" placeholder="Opción A" id="inputoneA'+num+'" readonly="readonly"></div><div class="optionB"><input type="radio" name="answ'+num+'" id="radB'+num+'"><input type="text" name="oneB" placeholder="Opción B" id="inputoneB'+num+'" readonly="readonly"></div><div class="optionC"><input type="radio" name="answ'+num+'" id="radC'+num+'"><input type="text" name="oneC" placeholder="Opción C" id="inputoneC'+num+'" readonly="readonly"></div><div class="optionD"><input type="radio" name="answ'+num+'" id="radD'+num+'"><input type="text" name="oneD" placeholder="Opción D" id="inputoneD'+num+'" readonly="readonly"></div><br><br></div>';
				}
		}

		for (var z = 1; z <=numpregstotal; z++) {

			//Tramo del arreglo que contiene preguntas y respuestas.
			var PR = contenido[z];
			//console.log("Tamaño PR:"+ PR.length);
			//console.log("Pregunta:Respuestas: "+PR);
			
			var contar = 0;
			for (var x = 0; x <= PR.length-1; x++) {
				var PreRes = PR;
				//Separa preguntas y respuestas a partir del caracter ':'.
				var sepResp = PreRes.split(':')
			}

			//console.log(z+"PREGUNTA"+sepResp[0]);
			//console.log(z+"RESPUESTA1: "+sepResp[1]);
			//console.log(z+"RESPUESTA2: "+sepResp[2]);
			//console.log(z+"RESPUESTA3: "+sepResp[3]);
			//console.log(z+"RESPUESTA4: "+sepResp[4]);
			//console.log(z+"RESPUESTA CORRECTA: "+ sepResp[5]);
			//console.log("RADIOBUTTON:"+sepResp[6]);

			//Coloca el contenido correspondiente a cada input a partir de su id.
			document.getElementById('inputtQuest'+z).value = sepResp[0];
			document.getElementById('inputoneA'+z).value = sepResp[1];
			document.getElementById('inputoneB'+z).value = sepResp[2];
			document.getElementById('inputoneC'+z).value = sepResp[3];
			document.getElementById('inputoneD'+z).value = sepResp[4];
			
		}
	}
}

function calificarTest(){

	//Solicita nombre del usuario conectado.
	nombre = localStorage.getItem("Nombre");

	//Actualiza numero de preguntas que hay.
	localStorage.setItem("NQ:"+nombre,num);

	//Numero de preguntas actuales.
	var numpregstotal = localStorage.getItem("NQ:"+nombre);

	//Extrae el arreglo de preguntas guardados.
	var contenido = JSON.parse(localStorage.getItem('TestQB:'+nombre));

	//console.log("Numero Actual de Preguntas en Local:"+numpregstotal);
	var contando=0;

	//Introduce información de las preguntas a LocalStorage.
	for (var x = 1; x <= numpregstotal; x++) {

		var PR = contenido[x];
		
		var contar = 0;
		for (var z = 0; z <= PR.length-1; z++) {
			var PreRes = PR;
			//Separa preguntas y respuestas a partir del caracter ':'.
			var sepResp = PreRes.split(':')
		}

		//Declara los radiobuttons.
		var rA = document.getElementById('radA'+x).checked;
		var rB = document.getElementById('radB'+x).checked;
		var rC = document.getElementById('radC'+x).checked;
		var rD = document.getElementById('radD'+x).checked;

		//Declara los inputs.
		var opa =  document.getElementById('inputoneA'+x).value;
		var opb = document.getElementById('inputoneB'+x).value;
		var opc = document.getElementById('inputoneC'+x).value;
		var opd = document.getElementById('inputoneD'+x).value;

		//Respuestas Correctas
		if (rA == true) {
			if (opa == sepResp[5]) {
				//Cuenta si la respuesta guardada en el arreglo es igual al valor que tiene el input.
				contando++;
			}
		}

		if (rB == true) {
			if (opb == sepResp[5]) {
				contando++;
			}
		}

		if (rC == true) {
			if (opc == sepResp[5]) {
				contando++;
			}
		}

		if (rD == true) {
			if (opd == sepResp[5]) {
				contando++;
			}
		}

		//Valida que se seleccione un radiobutton.
		if (rA != true && rB != true && rC != true && rD !=true) {
			alert("Debes elegir una opción para cada pregunta.");
			return false;
		}
	}
	//Agrega las respuestas correctas.
	localStorage.setItem('TestQBC:'+nombre,contando);
	location.href='../views/calificarTest.html';

}