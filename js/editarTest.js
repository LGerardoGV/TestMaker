var num = 1

function ponerUsuario(){
	//Solicita nombre del Usuario conectado.
	var nombre = localStorage.getItem("Nombre");
	var divNombre = document.getElementById('username');

	//Valida que se inicie sesión si se quiere acceder a esta página directamente.
	if (nombre == null) {
		alert("Lo sentimos, aún no has iniciado una sesión.")
		location.href='../index.html';
	}
	else{
		//Coloca el nombre de Usuario en un div.
		divNombre.innerHTML = '<div class="titleUser"><p1>Bienvenido</p1><br><p2>'+nombre+'</p2></div>';
	}
}

function cargarTest(){
	//Solicita nombre del Usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Numero de preguntas actuales.
	var numpregstotal = localStorage.getItem("NQ:"+nombre);

	//Extrae el arreglo de preguntas guardados.
	var contenido = JSON.parse(localStorage.getItem('TestQB:'+nombre));

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
			agregarQ.innerHTML += '<div class="questBox" id="questbox'+num+'"><div class="botonEliminar"><input type="submit" name="eliminar:'+num+'" value="X" id="buttonDelete:'+num+'" onclick="deleteQuest(this.id)"></div><div class="questBoxInd"><div class="quest"><input type="text" name="titleQuest" placeholder="Pregunta" id="inputtQuest'+num+'"></div><div class="optionA"><input type="radio" name="answ'+num+'" id="radA'+num+'"><input type="text" name="oneA" placeholder="Opción A" id="inputoneA'+num+'"></div><div class="optionB"><input type="radio" name="answ'+num+'" id="radB'+num+'"><input type="text" name="oneB" placeholder="Opción B" id="inputoneB'+num+'"></div><div class="optionC"><input type="radio" name="answ'+num+'" id="radC'+num+'"><input type="text" name="oneC" placeholder="Opción C" id="inputoneC'+num+'"></div><div class="optionD"><input type="radio" name="answ'+num+'" id="radD'+num+'"><input type="text" name="oneD" placeholder="Opción D" id="inputoneD'+num+'"></div><br><br></div>';
		}
	}

	for (var z = 1; z <=numpregstotal; z++) {
		//console.log("NUMERO DE VECES QUE SE EJECUTA FOR: "+z);

		//Tramo del arreglo que contiene preguntas y respuestas.
		var PR = contenido[z];
		//console.log("Tamaño PR:"+ PR.length);
		//console.log("Pregunta:Respuestas: "+PR);
		
		var contar = 0;
		for (var x = 0; x <= PR.length-1; x++) {
			//Separa preguntas y respuestas a partir del caracter ':'.
			var sepResp = PR.split(':');
	
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
		
		//Selecciona cual fue el radiobutton elejido como respuesta correcta.
		if (sepResp[6] == "rA"+z) {
			document.getElementById('radA'+z).checked = true;
		}

		if (sepResp[6] == "rB"+z) {
			document.getElementById('radB'+z).checked = true;
		}

		if (sepResp[6] == "rC"+z) {
			document.getElementById('radC'+z).checked = true;
		}

		if (sepResp[6] == "rD"+z) {
			document.getElementById('radD'+z).checked = true;
		}	
	}
}

var contando = 0;
function deleteQuest(click){
	//var quest = document.getElementById("questbox"+num);
	//quest.parentNode.removeChild(quest);
	//console.log("questbox"+num);
	//Solicita nombre del usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Solicita el numero de preguntas actuales.
	var preguntasColocadas = localStorage.getItem("NQ:"+nombre);
	//console.log(preguntasColocadas);

	//Obtiene el id del boton eliminar.
	var pos = click;
	//Separa el nombre y el numero identificador.
	var posDel = pos.split(':');
	//Elige el tramo que contiene el numero identificar.
	var posx = posDel[1];
	
	//Si el valor del identificador es distinto al ultimo valor del id del div lo cuenta.
	if (posDel[1] != preguntasColocadas) {
			contando++;
			//console.log(contando);	
	}
	//console.log(posx);
	//console.log("PREGUNTAS ANTES DE ACTUALIZAR:"+preguntasColocadas);

	//Elimina el div perteniciente a una pregunta a partir de su id y el identificador secuncial.
	//O bien si es colocado "preguntasColocadas" eliminara de manera ascendente (de la ultima a la primera).
	document.getElementById('questbox'+preguntasColocadas).remove();
	//Resta la una pregunta de LocalStorage.
	for (var x = 0; x <= 1; x++) {
		num = num-x;
	}

	//console.log("FOR DE ELIMINAR:"+num);

	//Actualiza el LocalStorage con el numero de preguntas despues de la eliminación de una.
	var actualizar = localStorage.setItem("NQ:"+nombre,num);
	//Preguntas actuales.
	//console.log("Numero de Preguntas Removidas:"+preguntasColocadas);
}

function addQuest(){
	//Solicita nombre del usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Solicita el numero de preguntas actuales.
	var preguntasColocadas = localStorage.getItem("NQ:"+nombre);

	//Enumera id's de las preguntas dependendiendo cuantas sean agregadas.
	for (var x = 0; x <= 1; x++) {
		num = num+x;
	}
	//console.log(num);

	//Actualiza el numero de preguntas, a partir de las que sean colocadas.
	localStorage.setItem("NQ:"+nombre,num);

	//Obtiene el numero de preguntas actuales.
	preguntasColocadas = localStorage.getItem("NQ:"+nombre);

	console.log("Numero de Preguntas Colocadas: "+preguntasColocadas);
	//console.log(preguntasColocadas);

	//Si el contador es mayor a 0 entonces genera un numero despues del ultimo identificador colocado.
	/*if (contando >0) {
		for (var x = 0; x <= 1; x=x+1) {
			num = num+x;
		}
		var newnumber = num;
		//Crea un nuevo elemento a partir del id del div tstbox.
		var qb = document.getElementById('tstBox');

		//Crea un nuevo elemento div.
		var x = document.createElement("DIV");
		x.className = "questBox";
		//Se le asigna un id.
	    x.id = "questbox"+newnumber;

	    //Se agrega.
	    qb.appendChild(x);
	    //Agrega una pregunta nueva con un identificador secuencial 'num'.
		var agregarQ = document.getElementById('questbox'+newnumber);
		var pregunta = agregarQ.innerHTML+='<div class="botonEliminar"><input type="submit" name="eliminar:'+preguntasColocadas+'" value="X" id="buttonDelete:'+preguntasColocadas+'" onclick="deleteQuest(this.id)"></div><div class="questBoxInd"><div class="quest"><input type="text" name="titleQuest" placeholder="Pregunta" id="inputtQuest'+preguntasColocadas	+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionA"><input type="radio" name="answ'+preguntasColocadas+'" id="radA'+preguntasColocadas+'"><input type="text" name="oneA" placeholder="Opción A" id="inputoneA'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionB"><input type="radio" name="answ'+preguntasColocadas+'" id="radB'+preguntasColocadas+'"><input type="text" name="oneB" placeholder="Opción B" id="inputoneB'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionC"><input type="radio" name="answ'+preguntasColocadas+'" id="radC'+preguntasColocadas+'"><input type="text" name="oneC" placeholder="Opción C" id="inputoneC'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionD"><input type="radio" name="answ'+preguntasColocadas+'" id="radD'+preguntasColocadas+'"><input type="text" name="oneD" placeholder="Opción D" id="inputoneD'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><br><br>';
	}
	else{*/
		//Crea un nuevo elemento a partir del id del div tstbox.
		var qb = document.getElementById('tstBox');

		//Crea un nuevo elemento div.
		var x = document.createElement("DIV");
		x.className = "questBox";
		//Se le asigna un id.
	    x.id = "questbox"+preguntasColocadas;

	    //Se agrega.
	    qb.appendChild(x);
	    //Agrega una pregunta nueva con un identificador secuencial 'num'.
		var agregarQ = document.getElementById('questbox'+preguntasColocadas);
		var pregunta = agregarQ.innerHTML+='<div class="botonEliminar"><input type="submit" name="eliminar:'+preguntasColocadas+'" value="X" id="buttonDelete:'+preguntasColocadas+'" onclick="deleteQuest(this.id)"></div><div class="questBoxInd"><div class="quest"><input type="text" name="titleQuest" placeholder="Pregunta" id="inputtQuest'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionA"><input type="radio" name="answ'+preguntasColocadas+'" id="radA'+preguntasColocadas+'"><input type="text" name="oneA" placeholder="Opción A" id="inputoneA'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionB"><input type="radio" name="answ'+preguntasColocadas+'" id="radB'+preguntasColocadas+'"><input type="text" name="oneB" placeholder="Opción B" id="inputoneB'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionC"><input type="radio" name="answ'+preguntasColocadas+'" id="radC'+preguntasColocadas+'"><input type="text" name="oneC" placeholder="Opción C" id="inputoneC'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><div class="optionD"><input type="radio" name="answ'+preguntasColocadas+'" id="radD'+preguntasColocadas+'"><input type="text" name="oneD" placeholder="Opción D" id="inputoneD'+preguntasColocadas+'" required onkeypress="return letrasynumeros(event);" onKeyUp="this.value"></div><br><br>';
	//}
}

function guardarTest(){
	//Solicita nombre del usuario conectado.
	var nombre = localStorage.getItem("Nombre");

	//Actualiza numero de preguntas que hay.
	localStorage.setItem("NQ:"+nombre,num);

	//Solicita el numero de preguntas actuales.
	var numpregstotal = localStorage.getItem("NQ:"+nombre);

	//console.log("Numero Actual de Preguntas en Local:"+numpregstotal);
	var arreglo = new Array();

	//Obtiene el nombre del titulo del Test.
	var titulo = document.getElementById('inputtTest').value;
	
	//Valida que no se introduzcan 'whitespaces' en titulo al Terminar.
	var count = 0;
	//Recorre la cadena de texto
	for (var a = 0; a <=titulo.length; a++) {
		//Si en la primera posición se coloca un espacio.
		if (titulo.charAt(0)==' ') {
			//Se recorre todo el texto, si hay elementos diferente al espacio (' ') los cuenta.
			if (titulo.charAt(a) !=' ') {
				count++;
			}
		}
	}

	
	//console.log(count);
	//Si el contador es igual a uno (significa que hay un espacio).
	if (count ==1){
		alert("Lo sentimos. El titulo del tu test no pueden ser espacios.");
		return false;
	}
	
	//Coloca el titulo del Test en un arreglo.
	arreglo.push(titulo.trim());

	//Introduce información de las preguntas a LocalStorage.
	for (var x = 1; x <= numpregstotal; x++) {
		//Declara variables de cada uno de los radiobuttons.
		var a = document.getElementById("radA"+x).checked;
		var b = document.getElementById("radB"+x).checked;
		var c = document.getElementById("radC"+x).checked;
	    var d = document.getElementById("radD"+x).checked;

		//Declara variables de cada uno de los inputs.
		pregunta = document.getElementById('inputtQuest'+x).value;
		opa =  document.getElementById('inputoneA'+x).value;
		opb = document.getElementById('inputoneB'+x).value;
		opc = document.getElementById('inputoneC'+x).value;
		opd = document.getElementById('inputoneD'+x).value;

		//Validando radio button seleccionado.
		if (a == true) {
			//Declara el conjunto de elementos que esta formado por la información obtenido de los inputs,
			//de manera que al final se repite la respuesta correcta y se incluye el radiobutton seleccionado.
			var Q1 = pregunta+":"+opa.trim()+":"+opb.trim()+":"+opc.trim()+":"+opd.trim()+":"+opa.trim()+":rA"+x;
			arreglo.push(Q1);
		}

		if (b == true) {
			var Q1 = pregunta+":"+opa.trim()+":"+opb.trim()+":"+opc.trim()+":"+opd.trim()+":"+opb.trim()+":rB"+x;
			arreglo.push(Q1);
		}

		if (c == true) {
		var Q1 = pregunta+":"+opa.trim()+":"+opb.trim()+":"+opc.trim()+":"+opd.trim()+":"+opc.trim()+":rC"+x;
		arreglo.push(Q1);

		}

		if (d == true) {
		var Q1 = pregunta+":"+opa.trim()+":"+opb.trim()+":"+opc.trim()+":"+opd.trim()+":"+opd.trim()+":rD"+x;
		arreglo.push(Q1);

		}

	    //Valida que no se introduzcan 'whitespaces' en pregunta al Terminar.
		var count2 = 0;
		for (var r = 0; r <=pregunta.length; r++) {
			if (pregunta.charAt(0)==' ') {
				if (pregunta.charAt(r) !=' ') {
					count2++;
				}
			}
		}

		//Valida que no se introduzcan 'whitespaces' en respuesta1 al Terminar.
		var count3 = 0;
		for (var r1 = 0; r1 <=opa.length; r1++) {
			if (opa.charAt(0)==' ') {
				if (opa.charAt(r1) !=' ') {
					count3++;
				}
			}
		}

			//Valida que no se introduzcan 'whitespaces' en respuesta2 al Terminar.
		var count4 = 0;
		for (var r2 = 0; r2 <=opb.length; r2++) {
			if (opb.charAt(0)==' ') {
				if (opb.charAt(r2) !=' ') {
					count4++;
				}
			}
		}

		//Valida que no se introduzcan 'whitespaces' en respuesta3 al Terminar.
		var count5 = 0;
		for (var r3 = 0; r3 <=opc.length; r3++) {
			if (opc.charAt(0)==' ') {
				if (opc.charAt(r3) !=' ') {
					count5++;
				}
			}
		}

		//Valida que no se introduzcan 'whitespaces' en respuesta4 al Terminar.
		var count6 = 0;
		for (var r4 = 0; r4 <=opd.length; r4++) {
			if (opd.charAt(0)==' ') {
				if (opd.charAt(r4) !=' ') {
					count6++;
				}
			}
		}
		//console.log(pregunta.length);
		//Valida que no se introduzcan espacios en las respuestas o en preguntas.
		if (count2 ==1 || count3 == 1 ||count4 == 1 ||count5 == 1 ||count6 == 1 ){
			alert("Lo sentimos.\nEstas intentando poner como pregunta o respuesta espacios.");
			return false;
		}

		//Valida que se selecciona una respuesta correcta.
		if (a != true && b != true && c != true && d !=true) {
			alert("Lo sentimos. Debes seleccionar tu respuesta correcta.");
			return false;
		}

		//Valida que no se introduzcan campos vacios.
		if (titulo.length==0 || pregunta.length == 0 || opa.length == 0 ||opb.length == 0 ||opc.length == 0 ||opd.length == 0) {
			alert("Por favor no dejes campos vacíos.");
			return false;

		}

	}

	//Se ingresan los datos a LocalStorage.
	localStorage.setItem('TestQB:'+nombre,JSON.stringify(arreglo));
	alert("Test guardado exitosamente.");
	//Se redirecciona al menú.
	location.href='../views/menuTest.html';

}

function moveScroll(){
	//Declara el conenido del formulario (test).
	var contQuest = document.getElementById("tstBox");
	//scrollTop mide el tamaño del 'div' con el 'scroll' de manera vertical
	//scrollHeight mide el total del 'div' de manera vertical
	var top = contQuest.scrollTop;
	var height = contQuest.scrollHeight;
	//console.log("top: " + top + " height: "+height)

	//Posiciona el 'scroll' a la 'altura' que tiene el 'div' actualmente
	contQuest.scrollTop = contQuest.scrollHeight;
}

function letrasynumeros(escribir){
	//Se declara key que indicara cuándo se presione una tecla por el usuario.
    key = escribir.keyCode || escribir.which;
    //Obtiene el caracter presionado por el usuario y lo convierte en minúscula.
    tecla = String.fromCharCode(key).toLowerCase();
    //Establece los caracteres admitidos.
    letrasnums = " áéíóúabcdefghijklmnñopqrstuvwxyz0123456789¿?+*-/.\"\"<>!¡=";
	//Códigos pertenecientes a backspace-leftarrow-rightarrow-delete-question.
	especiales = "8-37-39-46-63";

	//Busca si ésta la tecla presionada por usuario.
	teclaEspecial = false
    for(var z in especiales){
        if(key == especiales[z]){
            teclaEspecial = true;
            break;
        }
   	}
    //Si no encuentra teclas admitidas indexOf es igual a -1 y teclaEspecial es false.
   	if(letrasnums.indexOf(tecla)==-1 && !teclaEspecial){
        return false;
    }
}



