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
    this.dati.entro3 = prodotti.filter(p => p.giorni >= 0 && p.giorni <= 3).length;
    this.dati.entro7 = prodotti.filter(p => p.giorni >= 4 && p.giorni <= 7).length;
    this.dati.entro10 = prodotti.filter(p => p.giorni >= 8 && p.giorni <= 10).length;
    this.dati.entro15 = prodotti.filter(p => p.giorni >= 11 && p.giorni <= 15).length;

    const cards = document.querySelectorAll(".card h2");

    if (cards.length >= 6) {
        cards[0].textContent = this.dati.scaduti;
        cards[1].textContent = this.dati.entro3;
        cards[2].textContent = this.dati.entro7;
        cards[3].textContent = this.dati.entro10;
        cards[4].textContent = this.dati.entro15;
        cards[5].textContent = this.dati.totale;
    }

    console.table(this.dati);

}
    

};
