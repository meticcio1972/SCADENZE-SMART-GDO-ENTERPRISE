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

    lista.forEach(p => {

        tbody.innerHTML += `
        <tr>
            <td>${p.codice}</td>
            <td>${p.descrizione}</td>
            <td>${p.reparto}</td>
            <td>${p.scadenza}</td>
            <td>${p.giorni}</td>
            <td>
                ✏️ 🗑️
            </td>
        </tr>
        `;

    });

}
// ===== MODALE NUOVO PRODOTTO =====

const modal = document.getElementById("productModal");
const nuovoProdottoBtn = document.getElementById("newProduct");
const chiudiModal = document.getElementById("closeModal");

if (nuovoProdottoBtn && modal) {
    nuovoProdottoBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
}

if (chiudiModal && modal) {
    chiudiModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
