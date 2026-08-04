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
                <button>✏️</button>
                <button>🗑️</button>
            </td>
        </tr>`;

    });

});
