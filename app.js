"use strict";

/*
=====================================
SCADENZE SMART GDO ENTERPRISE
APP
=====================================
*/

document.addEventListener("DOMContentLoaded", avvia);

 async function avvia() {

    console.log("✅ Scadenze Smart GDO Enterprise avviato");
    console.log("VERSIONE APP 16 LUGLIO");
    // Carica i prodotti salvati

    const { data, error } = await window.supabaseClient
    .from("prodotti")
    .select("*");

if (!error && data) {
    Prodotti.carica(data);
}
  
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
   salvaProdotto.onclick = async () => {
   console.log("CLICK SALVA");
   console.log("prodottoInModifica =", window.prodottoInModifica);
    
    const prodotto = {

        codice: document.getElementById("codice").value,

        descrizione: document.getElementById("descrizione").value,

        reparto: document.getElementById("categoria").value,

        scadenza: document.getElementById("scadenza").value,

        giorni: 0

    };

    if (window.prodottoInModifica !== undefined) {

    Prodotti.lista[window.prodottoInModifica] = prodotto;

    Storage.salva(Prodotti.lista);

    window.prodottoInModifica = undefined;

} else {

     console.log("Sto salvando su Supabase");
    const { error } = await window.supabaseClient
        .from("prodotti")
        .insert([{
         
            codice: prodotto.codice,
            descrizione: prodotto.descrizione,
            reparto: prodotto.reparto,
            scadenza: prodotto.scadenza,
            giorni: prodotto.giorni,
            quantita: "",
            prezzo: "",
            note: "",
            supermercato: "San Cesareo"
        }]);
       console.log("Errore:", error);
     
    if (error) {
        console.error(error);
        alert("Errore durante il salvataggio su Supabase");
        return;
    }

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

        Storage.salva(Prodotti.lista);
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

function trovaReparto(descrizione) {

    const d = descrizione.toUpperCase();

    if (d.includes("BOV") || d.includes("VITEL") || d.includes("POLLO") ||
        d.includes("TACCH") || d.includes("SUINO") ||
        d.includes("HAMBURGER") || d.includes("SALSICC"))
        return "Macelleria";

    if (d.includes("PROSCIUTTO") || d.includes("SALAME") ||
        d.includes("MORTADELLA") || d.includes("BRESAOLA") ||
        d.includes("SPECK"))
        return "Gastronomia";

    if (d.includes("LATTE") || d.includes("YOGURT") ||
        d.includes("YOMINO") || d.includes("VALLELATA") ||
        d.includes("MOZZARELLA") || d.includes("BURRO"))
        return "Latticini";

    if (d.includes("GELATO") || d.includes("CORAYA"))
        return "Surgelati";

    if (d.includes("TONNO") || d.includes("SALMONE") ||
        d.includes("MERLUZZO") || d.includes("ORATA"))
        return "Pescheria";

    if (d.includes("MELA") || d.includes("PERA") ||
        d.includes("BANANA") || d.includes("INSALATA") ||
        d.includes("POMODOR"))
        return "Ortofrutta";

    return "Altro";
}

reader.onload = function(event) {
    console.log("CSV letto");
   const testo = event.target.result;
   console.log("Lunghezza:", testo.length);
console.log(testo.substring(0, 200));
   const righe = testo.trim().split(/\r\n|\n|\r/);
    console.log("Numero righe:", righe.length);
    const prodotti = [];

    const oggi = new Date();
    oggi.setHours(0,0,0,0);

    for(let i=1;i<righe.length;i++){

        if(!righe[i].trim()) continue;

        const campi = righe[i].split(";");
        console.log(campi);
        console.log("Riga", i, campi);
        console.log(campi);
        const codice = campi[0].trim();
        const descrizione = campi[1].trim();
        const data = campi[2].trim();

        const parti = data.split("/");

        const scadenza = new Date(
            parti[2],
            parti[1]-1,
            parti[0]
        );

        scadenza.setHours(0,0,0,0);

        const giorni = Math.ceil(
            (scadenza - oggi) / (1000*60*60*24)
        );

        prodotti.push({

            codice: codice,
            descrizione: descrizione,
            reparto: trovaReparto(descrizione),
            scadenza: `${parti[2]}-${parti[1]}-${parti[0]}`,
            giorni: giorni,
            quantita: "",
            prezzo: "",
            note: ""

        });

    }

    Prodotti.carica(prodotti);

    Storage.salva(Prodotti.tutti());

    renderTabella();

    Dashboard.aggiorna();

    alert("Importati " + prodotti.length + " prodotti");

};

reader.readAsText(file);
    };

}


