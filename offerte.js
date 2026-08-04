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
function modificaOfferta(id) {
    window.location.href = "index.html?id=" + id;
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
