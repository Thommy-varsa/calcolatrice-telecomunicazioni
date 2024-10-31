let currentCalculation = '';

// Funzione per aprire la calcolatrice con input appropriati
function openCalculator(type) {
    currentCalculation = type;
    const modal = document.getElementById("calculatorModal");
    const title = document.getElementById("calculatorTitle");
    const instruction = document.getElementById("calculatorInstruction");
    const inputsContainer = document.getElementById("inputsContainer");

    inputsContainer.innerHTML = ''; // Pulisce il contenitore degli input

    switch (type) {
        case 'resistance':
            title.innerText = 'Calcola Resistenza';
            instruction.innerText = 'Inserisci Voltaggio (V) e Corrente (I):';
            inputsContainer.innerHTML = `
                <input type="number" id="voltage" placeholder="Voltaggio (V)" class="form-control mt-2">
                <input type="number" id="current" placeholder="Corrente (I)" class="form-control mt-2">
            `;
            break;
        case 'voltage':
            title.innerText = 'Calcola Voltaggio';
            instruction.innerText = 'Inserisci Corrente (I) e Resistenza (R):';
            inputsContainer.innerHTML = `
                <input type="number" id="current" placeholder="Corrente (I)" class="form-control mt-2">
                <input type="number" id="resistance" placeholder="Resistenza (R)" class="form-control mt-2">
            `;
            break;
        case 'current':
            title.innerText = 'Calcola Corrente';
            instruction.innerText = 'Inserisci Voltaggio (V) e Resistenza (R):';
            inputsContainer.innerHTML = `
                <input type="number" id="voltage" placeholder="Voltaggio (V)" class="form-control mt-2">
                <input type="number" id="resistance" placeholder="Resistenza (R)" class="form-control mt-2">
            `;
            break;
        case 'series':
            title.innerText = 'Calcola Resistenza in Serie';
            instruction.innerText = 'Inserisci le resistenze in serie separate da virgola:';
            inputsContainer.innerHTML = `
                <input type="text" id="resistancesSeries" placeholder="Es. 10,20,30" class="form-control mt-2">
            `;
            break;
        case 'parallel':
            title.innerText = 'Calcola Resistenza in Parallelo';
            instruction.innerText = 'Inserisci le resistenze in parallelo separate da virgola:';
            inputsContainer.innerHTML = `
                <input type="text" id="resistancesParallel" placeholder="Es. 10,20,30" class="form-control mt-2">
            `;
            break;
    }

    modal.style.display = "block";
}

// Funzione per chiudere la calcolatrice
function closeCalculator() {
    document.getElementById("calculatorModal").style.display = "none";
    document.getElementById("result").innerHTML = '';
}

// Funzione per eseguire il calcolo
function performCalculation() {
    let result = '';
    
    switch (currentCalculation) {
        case 'resistance':
            const voltageR = parseFloat(document.getElementById("voltage").value);
            const currentR = parseFloat(document.getElementById("current").value);
            result = currentR ? `Resistenza = ${(voltageR / currentR).toFixed(2)} Ω` : 'Errore nei dati.';
            break;
        case 'voltage':
            const currentV = parseFloat(document.getElementById("current").value);
            const resistanceV = parseFloat(document.getElementById("resistance").value);
            result = resistanceV ? `Voltaggio = ${(currentV * resistanceV).toFixed(2)} V` : 'Errore nei dati.';
            break;
        case 'current':
            const voltageC = parseFloat(document.getElementById("voltage").value);
            const resistanceC = parseFloat(document.getElementById("resistance").value);
            result = resistanceC ? `Corrente = ${(voltageC / resistanceC).toFixed(2)} A` : 'Errore nei dati.';
            break;
        case 'series':
            const resistancesSeries = document.getElementById("resistancesSeries").value.split(',').map(Number);
            if (resistancesSeries.every(r => r >= 0)) {
                const totalResistance = resistancesSeries.reduce((acc, r) => acc + r, 0);
                result = `Resistenza Totale in Serie = ${totalResistance.toFixed(2)} Ω`;
            } else {
                result = 'Per favore, inserisci valori positivi per le resistenze.';
            }
            break;
        case 'parallel':
            const resistancesParallel = document.getElementById("resistancesParallel").value.split(',').map(Number);
            if (resistancesParallel.every(r => r > 0)) {
                const totalReciprocal = resistancesParallel.reduce((acc, r) => acc + (1 / r), 0);
                result = `Resistenza Totale in Parallelo = ${(1 / totalReciprocal).toFixed(2)} Ω`;
            } else {
                result = 'Per favore, inserisci valori positivi per le resistenze.';
            }
            break;
    }

    document.getElementById("result").innerHTML = result;
}
