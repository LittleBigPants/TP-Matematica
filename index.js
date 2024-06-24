let input = document.getElementById("input");
let button = document.getElementById("button");
let fnc = document.getElementById("c");
let fnd = document.getElementById("d");

fnc.style.display = "none";
fnd.style.display = "none";

button.addEventListener("click", evaluarFuncionBooleana);

function evaluarFuncionBooleana() {
	// Solicitar al usuario que ingrese la función booleana
	let funcion = input.value;

	// Generar la tabla de verdad
	let tablaDeVerdad = generarTablaDeVerdad(funcion);

	// Generar el HTML para la tabla de verdad
	let htmlTabla = generarHTMLTablaDeVerdad(tablaDeVerdad);

	// Mostrar los resultados en el HTML
	document.getElementById("tabla").innerHTML = htmlTabla;
	//calcular FND
	calcularFND(tablaDeVerdad);
	//calcular FNC
	calcularFNC(tablaDeVerdad);

	fnc.style.display = "block";
	fnd.style.display = "block";

	console.log(tablaDeVerdad);
}

function evaluarExpresion(expresion, variables) {
	// Reemplazar las variables por sus valores booleanos
	let expresionEvaluada = expresion.replace(
		/[A-Z]/g,
		(variable) => variables[variable]
	)
	// Evaluar la expresión booleana
	return eval(expresionEvaluada);
}

// Función para generar la tabla de verdad
function generarTablaDeVerdad(expresion) {
	let variables = expresion.match(/[A-Z]/g);
	let tablas = [];



	// Generar todas las combinaciones posibles de valores para las variables
	for (let i = 0; i < Math.pow(2, variables.length); i++) {
		let fila = {};
		let binario = i.toString(2).padStart(variables.length, "0");
		for (let j = 0; j < variables.length; j++) {
			fila[variables[j]] = binario[j] === "1";
		}
		fila.expresion = expresion;
		// Usar la función personalizada para evaluar la expresión
		fila.resultado = evaluarExpresion(expresion, fila);
		tablas.push(fila);
	}

	return tablas;
}

function calcularFND(tablaDeVerdad) {
	let fnd = "";

	// Iterar sobre cada fila de la tabla de verdad
	for (let fila of tablaDeVerdad) {
		// Verificar si el resultado es true
		if (fila.resultado) {
			let termino = "";
			for (let variable in fila) {
				// Ignorar las propiedades 'expresion' y 'resultado'
				if (variable !== "expresion" && variable !== "resultado") {
					// Agregar la variable o su negación al término
					termino += fila[variable] ? `${variable} * ` : `! ${variable} * `;
				}
			}
			// Remover el último ' AND '
			termino = termino.slice(0, -3);
			// Agregar el término a la FND
			fnd += `(${termino}) + `;
		}
	}
	// Remover el último ' OR '
	fnd = fnd.slice(0, -2);

	document.getElementById("fnd").innerHTML = fnd;
}

function calcularFNC(tablaDeVerdad) {
	let fnc = "";

	// Iterar sobre cada fila de la tabla de verdad
	for (let fila of tablaDeVerdad) {
		// Verificar si el resultado es true
		if (!fila.resultado) {
			let termino = "";
			for (let variable in fila) {
				// Ignorar las propiedades 'expresion' y 'resultado'
				if (variable !== "expresion" && variable !== "resultado") {
					// Agregar la variable o su negación al término
					termino += fila[variable] ? `! ${variable} + ` : ` ${variable} + `;
				}
			}
			// Remover el último ' AND '
			termino = termino.slice(0, -3);
			// Agregar el término a la fnc
			fnc += `(${termino}) * `;
		}
	}
	// Remover el último ' OR '
	fnc = fnc.slice(0, -2);

	document.getElementById("fnc").innerHTML = fnc;
}

function generarHTMLTablaDeVerdad(tablaDeVerdad) {
	let html = '<table border="1"><tr>';

	// Agregar los encabezados de las columnas
	for (let variable in tablaDeVerdad[0]) {
		html += `<th>${variable}</th>`;
	}
	html += "</tr>";

	// Agregar las filas de la tabla
	for (let fila of tablaDeVerdad) {
		html += "<tr>";
		for (let valor in fila) {
			// Verificar si la propiedad actual es 'expresion'
			if (valor === "expresion") {
				html += `<td>${fila[valor]}</td>`;
			} else {
				// Usar operador ternario para mostrar 1 o 0
				html += `<td>${fila[valor] ? "1" : "0"}</td>`;
			}
		}
		html += "</tr>";
	}

	html += "</table>";
	return html;
}

// Uso de la función
let htmlTabla = generarHTMLTablaDeVerdad(tablaDeVerdad);
document.getElementById("tabla").innerHTML = htmlTabla;
