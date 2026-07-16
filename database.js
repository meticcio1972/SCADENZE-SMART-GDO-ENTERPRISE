"use strict";

async function caricaProdottiDB() {

    const { data, error } = await window.supabaseClient
        .from("prodotti")
        .select("*")
        .order("scadenza", { ascending: true });

    if (error) {
        console.error("Errore caricamento:", error);
        return Storage.carica();
    }

    Storage.salva(data);

    return data;
}

async function salvaProdottoDB(prodotto) {

    const { error } = await window.supabaseClient
        .from("prodotti")
        .insert([prodotto]);

    if (error) {
        console.error("Errore salvataggio:", error);
        return false;
    }

    return true;
}
