/* function convertirBase(numero, baseInicial, baseFinal) {
    var numeroDecimal = parseInt(numero, baseInicial);
    return numeroDecimal.toString(baseFinal);
  }
  
  let numero = prompt("ingrese el numero en la base deseada:");
  let baseInicial = prompt("ingrese la base del numero ingresado:");
  let opciones = ["Decimal", "Binario", "Octal", "Hexadecimal"];
  let opcion = prompt("Seleccione la opción de conversión: " + opciones.join(", "));
  
  switch (opcion) {
    case "10":
      console.log(convertirBase(numero, baseInicial, 10));
      break;
    case "2":
      console.log(convertirBase(numero, baseInicial, 2));
      break;
    case "8":
      console.log(convertirBase(numero, baseInicial, 8));
      break;
    case "16":
        console.log(convertirBase(numero, baseInicial, 16));
      break;
    default:
      console.log("Opción no válida.");
  } */

function evaluarFuncionBooleana() {
	// Solicitar al usuario que ingrese la función booleana
	let funcion = prompt("Ingrese la función booleana:");

	// Generar la tabla de verdad
	let tablaDeVerdad = generarTablaDeVerdad(funcion);

	// Calcular FND y FNC
	let resultado = calcularFNDFNC(tablaDeVerdad);

	// Mostrar los resultados
	console.log("Tabla de verdad:");
	console.log(tablaDeVerdad);
	console.log("FND:", resultado.fnd.join(" + "));
	console.log("FNC:", resultado.fnc.join(" * "));
}

function evaluarExpresion(expresion, variables) {
	// Reemplazar las variables por sus valores booleanos
	let expresionEvaluada = expresion.replace(
		/[A-Z]/g,
		(variable) => variables[variable]
	);
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

// Función para calcular FND y FNC
function calcularFNDFNC(tablaDeVerdad) {
	// Inicializar las variables para FND y FNC
	let fnd = [];
	let fnc = [];

	// Calcular FND
	for (let i = 0; i < tablaDeVerdad.length; i++) {
		if (tablaDeVerdad[i].resultado) {
			fnd.push(tablaDeVerdad[i].expresion);
		}
	}

	// Calcular FNC
	for (let i = 0; i < tablaDeVerdad.length; i++) {
		if (!tablaDeVerdad[i].resultado) {
			fnc.push(tablaDeVerdad[i].expresion);
		}
	}

	return { fnd, fnc };
}

// Ejemplo de uso
evaluarFuncionBooleana();
