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

function renderTabella() {
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
            <td>${p.scadenza}</td>
            <td>${p.giorni}</td>
           <td>
    <button onclick="modificaProdotto(${index})">✏️</button>
    <button onclick="eliminaProdotto(${index})">🗑️</button>
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

    document.getElementById("codice").value = p.codice;
    document.getElementById("descrizione").value = p.descrizione;
    document.getElementById("categorie").value = p.reparto;
    document.getElementById("scadenza").value = p.scadenza;
    document.getElementById("quantita").value = p.quantita;
    document.getElementById("prezzo").value = p.prezzo;
    document.getElementById("note").value = p.note;

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


