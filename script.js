// Funzione per aprire la calcolatrice specifica
function openCalculator(type) {
    const modal = document.getElementById("calculatorModal");
    const title = document.getElementById("calculatorTitle");
    const content = document.getElementById("calculatorContent");
    const result = document.getElementById("result");

    // Pulizia dei contenuti della modale
    content.innerHTML = '';
    result.innerHTML = '';

    // Assegnazione titolo e contenuto dinamico
    switch (type) {
        case 'resistance':
            title.textContent = "Calcola Resistenza";
            content.innerHTML = `
                <label for="current">Corrente (I in A):</label>
                <input type="number" id="current" placeholder="Inserisci corrente">
                <label for="voltage">Voltaggio (V in V):</label>
                <input type="number" id="voltage" placeholder="Inserisci voltaggio">
                <button onclick="calculateResistance()">Calcola</button>
            `;
            break;
        case 'voltage':
            title.textContent = "Calcola Voltaggio";
            content.innerHTML = `
                <label for="current">Corrente (I in A):</label>
                <input type="number" id="current" placeholder="Inserisci corrente">
                <label for="resistance">Resistenza (R in Ω):</label>
                <input type="number" id="resistance" placeholder="Inserisci resistenza">
                <button onclick="calculateVoltage()">Calcola</button>
            `;
            break;
        case 'current':
            title.textContent = "Calcola Corrente";
            content.innerHTML = `
                <label for="voltage">Voltaggio (V in V):</label>
                <input type="number" id="voltage" placeholder="Inserisci voltaggio">
                <label for="resistance">Resistenza (R in Ω):</label>
                <input type="number" id="resistance" placeholder="Inserisci resistenza">
                <button onclick="calculateCurrent()">Calcola</button>
            `;
            break;
        case 'series':
            title.textContent = "Resistenza in Serie";
            content.innerHTML = `
                <label for="resistance1">Resistenza 1 (R₁ in Ω):</label>
                <input type="number" id="resistance1" placeholder="Inserisci resistenza 1">
                <label for="resistance2">Resistenza 2 (R₂ in Ω):</label>
                <input type="number" id="resistance2" placeholder="Inserisci resistenza 2">
                <button onclick="calculateSeriesResistance()">Calcola</button>
            `;
            break;
        case 'parallel':
            title.textContent = "Resistenza in Parallelo";
            content.innerHTML = `
                <label for="resistance1">Resistenza 1 (R₁ in Ω):</label>
                <input type="number" id="resistance1" placeholder="Inserisci resistenza 1">
                <label for="resistance2">Resistenza 2 (R₂ in Ω):</label>
                <input type="number" id="resistance2" placeholder="Inserisci resistenza 2">
                <button onclick="calculateParallelResistance()">Calcola</button>
            `;
            break;
    }

    modal.style.display = "block";
}

// Funzione per chiudere la calcolatrice
function closeCalculator() {
    const modal = document.getElementById("calculatorModal");
    modal.style.display = "none";
}

// Funzioni di calcolo con controllo resistenza negativa
function calculateResistance() {
    const current = parseFloat(document.getElementById("current").value);
    const voltage = parseFloat(document.getElementById("voltage").value);
    const result = document.getElementById("result");

    if (current <= 0) {
        result.innerHTML = "Errore: la corrente deve essere positiva.";
        return;
    }

    const resistance = voltage / current;
    result.innerHTML = `Resistenza = ${resistance.toFixed(2)} Ω`;
}

function calculateVoltage() {
    const current = parseFloat(document.getElementById("current").value);
    const resistance = parseFloat(document.getElementById("resistance").value);
    const result = document.getElementById("result");

    if (resistance < 0) {
        result.innerHTML = "Errore: la resistenza non può essere negativa.";
        return;
    }

    const voltage = current * resistance;
    result.innerHTML = `Voltaggio = ${voltage.toFixed(2)} V`;
}

function calculateCurrent() {
    const voltage = parseFloat(document.getElementById("voltage").value);
    const resistance = parseFloat(document.getElementById("resistance").value);
    const result = document.getElementById("result");

    if (resistance < 0) {
        result.innerHTML = "Errore: la resistenza non può essere negativa.";
        return;
    }

    const current = voltage / resistance;
    result.innerHTML = `Corrente = ${current.toFixed(2)} A`;
}

function calculateSeriesResistance() {
    const resistance1 = parseFloat(document.getElementById("resistance1").value);
    const resistance2 = parseFloat(document.getElementById("resistance2").value);
    const result = document.getElementById("result");

    if (resistance1 < 0 || resistance2 < 0) {
        result.innerHTML = "Errore: le resistenze non possono essere negative.";
        return;
    }

    const totalResistance = resistance1 + resistance2;
    result.innerHTML = `Resistenza in Serie = ${totalResistance.toFixed(2)} Ω`;
}

function calculateParallelResistance() {
    const resistance1 = parseFloat(document.getElementById("resistance1").value);
    const resistance2 = parseFloat(document.getElementById("resistance2").value);
    const result = document.getElementById("result");

    if (resistance1 < 0 || resistance2 < 0) {
        result.innerHTML = "Errore: le resistenze non possono essere negative.";
        return;
    }

    const totalResistance = 1 / ((1 / resistance1) + (1 / resistance2));
    result.innerHTML = `Resistenza in Parallelo = ${totalResistance.toFixed(2)} Ω`;
}
