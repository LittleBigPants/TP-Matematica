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
	let funcion = prompt("Ingrese la función booleana:");

	let tablaDeVerdad = generarTablaDeVerdad(funcion);


	console.log("Tabla de verdad:");
	console.log(tablaDeVerdad);
}

function evaluarExpresion(expresion, variables) {
	let expresionEvaluada = expresion.replace(
		/[A-Z]/g,
		(variable) => variables[variable]
	);
	return eval(expresionEvaluada);
}

function generarTablaDeVerdad(expresion) {
	let variables = expresion.match(/[A-Z]/g);
	let tablas = [];

	for (let i = 0; i < Math.pow(2, variables.length); i++) {
		let fila = {};
		let binario = i.toString(2).padStart(variables.length, "0");
		for (let j = 0; j < variables.length; j++) {
			fila[variables[j]] = binario[j] === "1";
		}
		fila.expresion = expresion;
		fila.resultado = evaluarExpresion(expresion, fila);
		tablas.push(fila);
	}

	return tablas;
}

evaluarFuncionBooleana();
