"use strict";

/*
=====================================
SCADENZE SMART GDO ENTERPRISE
APP
=====================================
*/

document.addEventListener("DOMContentLoaded", avvia);

function avvia() {

    console.log("✅ Scadenze Smart GDO Enterprise avviato");

    // Carica i prodotti salvati
    Prodotti.carica(Storage.carica());
    if (Prodotti.tutti().length === 0) {

    Prodotti.aggiungi({
        codice: "10001",
        descrizione: "Bistecca di Manzo",
        reparto: "Macelleria",
        scadenza: "17/07/2026",
        giorni: 1
    });

    Prodotti.aggiungi({
        codice: "10002",
        descrizione: "Fettine di Pollo",
        reparto: "Macelleria",
        scadenza: "19/07/2026",
        giorni: 3
    });

    Prodotti.aggiungi({
        codice: "10003",
        descrizione: "Hamburger Scottona",
        reparto: "Macelleria",
        scadenza: "22/07/2026",
        giorni: 6
    });

}

    // Disegna la tabella
    renderTabella();

    // Aggiorna i contatori dashboard
    Dashboard.aggiorna();

}
function formattaData(data) {

    if (!data) return "";

    const [anno, mese, giorno] = data.split("-");

   return `${giorno}/${mese}/${anno}`;

}function renderTabella() {
    console.log("Render tabella", Prodotti.tutti());

    const tbody = document.getElementById("productTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    const lista = Prodotti.tutti();

    lista.forEach((p, index) => {

        tbody.innerHTML += `
        <tr>
            <td>${p.codice}</td>
            <td>${p.descrizione}</td>
            <td>${p.reparto}</td>
            <td>${formattaData(p.scadenza)}</td>
            <td>${p.giorni}</td>
           <td>
   <button class="btn-edit" onclick="modificaProdotto(${index})">
    <i class="fa-solid fa-pen-to-square"></i>
</button>

<button class="btn-delete" onclick="eliminaProdotto(${index})">
    <i class="fa-solid fa-trash"></i>
</button>
</td>
        </tr>
        `;

    });

}
// ===== MODALE NUOVO PRODOTTO =====

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("productModal");
    console.log("Modal:", modal);
    const nuovoProdottoBtn = document.getElementById("newProduct");
    console.log("Pulsante:", nuovoProdottoBtn);
    const chiudiModal = document.getElementById("closeModal");
    const salvaProdotto = document.getElementById("saveProduct");
    console.log("Salva:", salvaProdotto);
    console.log(modal);
    console.log(nuovoProdottoBtn);

    nuovoProdottoBtn.onclick = () => {
        modal.style.display = "flex";
    };

    chiudiModal.onclick = () => {
        modal.style.display = "none";
    };
   salvaProdotto.onclick = () => {

    const prodotto = {

        codice: document.getElementById("codice").value,

        descrizione: document.getElementById("descrizione").value,

        reparto: document.getElementById("categoria").value,

        scadenza: document.getElementById("scadenza").value,

        giorni: 0

    };

    if (window.prodottoInModifica !== undefined) {

    Prodotti.tutti()[window.prodottoInModifica] = prodotto;

    localStorage.setItem(
        "prodotti",
        JSON.stringify(Prodotti.tutti())
    );

    window.prodottoInModifica = undefined;

} else {

    Prodotti.aggiungi(prodotto);

}

    renderTabella();

    Dashboard.aggiorna();

    modal.style.display = "none";

};
});
function modificaProdotto(index) {

    const p = Prodotti.tutti()[index];

    document.getElementById("codice").value = p.codice || "";
    document.getElementById("descrizione").value = p.descrizione || "";
    document.getElementById("categoria").value = p.reparto || "";
    document.getElementById("scadenza").value = p.scadenza || "";
    document.getElementById("quantita").value = p.quantita || "";
    document.getElementById("prezzo").value = p.prezzo || "";
    document.getElementById("note").value = p.note || "";

    window.prodottoInModifica = index;

    document.getElementById("productModal").style.display = "flex";
}
function eliminaProdotto(index){

    if(confirm("Eliminare questo prodotto?")){

        Prodotti.tutti().splice(index,1);

        localStorage.setItem(
            "prodotti",
            JSON.stringify(Prodotti.tutti())
        );
       
        renderTabella();
        Dashboard.aggiorna();
    }
}
const importCSVBtn = document.getElementById("importCSV");
const csvFile = document.getElementById("csvFile");

if (importCSVBtn && csvFile) {

    importCSVBtn.onclick = () => {
        csvFile.click();
    };

    csvFile.onchange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(event) {

    const testo = event.target.result;

    const righe = testo.trim().split(/\r?\n/);

    const prodotti = [];
function trovaReparto(descrizione) {

    const testo = descrizione.toUpperCase();

    if (testo.includes("LATTE") || testo.includes("YOGURT") || testo.includes("MOZZARELLA") || testo.includes("BURRO") || testo.includes("FORMAGGIO") || testo.includes("RICOTTA"))
        return "Latticini";

    if (testo.includes("BISTECCA") || testo.includes("POLLO") || testo.includes("SUINO") || testo.includes("MANZO") || testo.includes("SALSICCIA"))
        return "Macelleria";

    if (testo.includes("SALMONE") || testo.includes("TONNO") || testo.includes("MERLUZZO") || testo.includes("ORATA"))
        return "Pescheria";

    if (testo.includes("MELA") || testo.includes("BANANA") || testo.includes("INSALATA") || testo.includes("POMODORO"))
        return "Ortofrutta";

    if (testo.includes("SURGEL"))
        return "Surgelati";

    return "Altro";
}
console.log("Numero righe:", righe.length);
            
for (let i = 1; i < righe.length; i++) {

    console.log(righe[i]);
console.log(righe[i].split(";"));
    
    if (!righe[i].trim()) continue;

    const campi = righe[i].split(";");
    console.log("CAMPI:", campi);

    const parti = campi[2].trim().split("/");

const scadenza = new Date(
    Number(parti[2]),
    Number(parti[1]) - 1,
    Number(parti[0])
);

const oggi = new Date();

oggi.setHours(0,0,0,0);
scadenza.setHours(0,0,0,0);

const giorni = Math.ceil((scadenza - oggi) / (1000 * 60 * 60 * 24));

prodotti.push({
    codice: campi[0],
    descrizione: campi[1],
    reparto: "",
    scadenza: `${parti[2]}-${parti[1]}-${parti[0]}`,
    giorni: giorni,
    quantita: "",
    prezzo: "",
    note: ""
});
}

localStorage.setItem("prodotti", JSON.stringify(prodotti));

Prodotti.lista = prodotti;
            
renderTabella();
Dashboard.aggiorna();

alert("Importati " + prodotti.length + " prodotti");

};
        reader.readAsText(file);
    };

}


