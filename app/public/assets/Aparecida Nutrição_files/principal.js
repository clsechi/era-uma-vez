var pacientes = document.querySelectorAll(".paciente");

for (var i = 0; i < pacientes.length; i++) {
	var paciente = pacientes[i];
	var tdPeso = paciente.querySelector(".info-peso");
	var tdAltura = paciente.querySelector(".info-altura");

	var tdImc = paciente.querySelector(".info-imc");

	var peso = tdPeso.textContent;
	var altura = tdAltura.textContent;

	var alturEhValida = validaAltura(altura);
	var pesoEhValido = validaPeso(peso);

	if (!pesoEhValido) {
		console.log("Peso inválido");
		tdImc.textContent = "Peso inválido!";
		pesoEhValido = false;

		paciente.classList.add("paciente-invalido");
	}

	if (!alturEhValida) {
		console.log("Altura inválida");
		tdImc.textContent = "Altura inválida!";
		alturEhValida = false;

		paciente.classList.add("paciente_invalido")
	}

	if (pesoEhValido && alturEhValida) {
		tdImc.textContent = calculaImc(peso, altura);
	}

}

function calculaImc(peso, altura) {
	var imc = 0;
	imc = peso / (altura * altura);
	console.log(imc);
	return imc.toFixed(1);
}

function validaPeso(peso) {
	if (peso > o && peso <= 1000) {
		return true;
	} else {
		return false;
	}
}

function validaAltura(altura) {
	if (altura >= 0 || altura <= 3.00) {
		return true;
	} else {
		return false;
	}
}

