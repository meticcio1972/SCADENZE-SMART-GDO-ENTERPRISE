document.addEventListener("DOMContentLoaded", async () => {

    const tbody = document.getElementById("tabellaOfferte");

    const { data, error } = await window.supabaseClient
    .from("prodotti")
    .select("*")
    .eq("offerta", true)
    .order("descrizione"); 

    if (error) {
        alert("Errore nel caricamento delle offerte");
        return;
    }

    tbody.innerHTML = "";

    data.forEach(p => {

        tbody.innerHTML += `
        <tr>
            <td>${p.codice}</td>
            <td>${p.descrizione}</td>
            <td>${p.reparto}</td>
            <td>${p.prezzo}</td>
            <td>${p.pezzi_offerta}</td>
            <td>
            <button onclick="modificaOfferta(${p.id})">✏️</button>
            <button onclick="eliminaOfferta(${p.id})">🗑️</button>
            </td>
        </tr>`;

    });

});
async function modificaOfferta(id) {

    const { data, error } = await window.supabaseClient
        .from("prodotti")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        alert("Errore nel caricamento del prodotto");
        return;
    }

    document.getElementById("codice").value = data.codice;
    document.getElementById("descrizione").value = data.descrizione;
    document.getElementById("categoria").value = data.reparto;
    document.getElementById("prezzo").value = data.prezzo;
    document.getElementById("offerta").checked = data.offerta;
    document.getElementById("pezzi_offerta").value = data.pezzi_offerta || 0;

    document.getElementById("productModal").style.display = "flex";

    window.idProdottoInModifica = id;
}


async function eliminaOfferta(id) {

    if (!confirm("Rimuovere il prodotto dalle offerte?"))
        return;

    const { error } = await window.supabaseClient
        .from("prodotti")
        .update({
            offerta: false,
            pezzi_offerta: 0
        })
        .eq("id", id);

    if (error) {
        alert("Errore");
        return;
    }

    location.reload();
}
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("productModal").style.display = "none";
});
document.getElementById("saveOfferta").addEventListener("click", async () => {

    const { error } = await window.supabaseClient
        .from("prodotti")
        .update({
            prezzo: document.getElementById("prezzo").value,
            offerta: document.getElementById("offerta").checked,
            pezzi_offerta: parseInt(document.getElementById("pezzi_offerta").value) || 0
        })
        .eq("id", window.idProdottoInModifica);

    if (error) {
        alert("Errore durante il salvataggio");
        return;
    }

    document.getElementById("productModal").style.display = "none";

    location.reload();

});
