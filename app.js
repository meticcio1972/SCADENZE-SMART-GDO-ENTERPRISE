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

    // Disegna la tabella
    renderTabella();

    // Aggiorna i contatori dashboard
    Dashboard.aggiorna();

}

function renderTabella() {

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
