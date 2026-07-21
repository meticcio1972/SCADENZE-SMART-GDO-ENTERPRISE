"use strict";

/*
=====================================
DASHBOARD
Scadenze Smart GDO Enterprise
=====================================
*/

const Dashboard = {

    dati: {

        scaduti: 0,
        entro3: 0,
        entro7: 0,
        entro10: 0,
        entro15: 0,
        totale: 0

    },
aggiorna() {

    const prodotti = Prodotti.tutti();

    this.dati.totale = prodotti.length;

    this.dati.scaduti = prodotti.filter(p => p.giorni < 0).length;

this.dati.entro3 = prodotti.filter(p =>
    p.giorni >= 0 && p.giorni <= 3
).length;

this.dati.entro7 = prodotti.filter(p =>
    p.giorni >= 4 && p.giorni <= 7
).length;

this.dati.entro10 = prodotti.filter(p =>
    p.giorni >= 8 && p.giorni <= 10
).length;

this.dati.entro15 = prodotti.filter(p =>
    p.giorni >= 11 && p.giorni <= 15
).length;

    const cards = document.querySelectorAll(".card h2");

    if (cards.length >= 6) {
        
    }

    console.table(this.dati);
   
document.getElementById("scaduti").textContent = this.dati.scaduti;
document.getElementById("entro3").textContent = this.dati.entro3;
document.getElementById("entro7").textContent = this.dati.entro7;
document.getElementById("entro10").textContent = this.dati.entro10;
document.getElementById("entro15").textContent = this.dati.entro15;
document.getElementById("totale").textContent = this.dati.totale;
}
    

};


function filtraDashboard(tipo) {

    let lista = Prodotti.tutti();

    switch (tipo) {

        case "scaduti":
            lista = lista.filter(p => p.giorni < 0);
            break;

        case "entro3":
            lista = lista.filter(p => p.giorni >= 0 && p.giorni <= 3);
            break;

        case "entro7":
            lista = lista.filter(p => p.giorni >= 4 && p.giorni <= 7);
            break;

        case "entro10":
            lista = lista.filter(p => p.giorni >= 8 && p.giorni <= 10);
            break;

        case "entro15":
            lista = lista.filter(p => p.giorni >= 11 && p.giorni <= 15);
            break;

        case "totale":
            lista = Prodotti.tutti();
            break;
    }

    renderTabella(lista);
}
document.addEventListener("DOMContentLoaded", () => {

    const cardScaduti = document.getElementById("cardScaduti");

    if (!cardScaduti) return;

    document.getElementById("cardScaduti").onclick = () =>
        apriScadenze("scaduti");

    document.getElementById("cardEntro3").onclick = () =>
        apriScadenze("entro3");

    document.getElementById("cardEntro7").onclick = () =>
        apriScadenze("entro7");

    document.getElementById("cardEntro10").onclick = () =>
        apriScadenze("entro10");

    document.getElementById("cardEntro15").onclick = () =>
        apriScadenze("entro15");

    document.getElementById("cardTotale").onclick = () =>
        apriScadenze("totale");

});
function apriScadenze(tipo){

    window.location.href =
        `scadenze.html?tipo=${tipo}`;

}
