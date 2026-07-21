"use strict";

document.addEventListener("DOMContentLoaded", avvia);

async function avvia() {

    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo") || "totale";

    const { data, error } = await window.supabaseClient
        .from("prodotti")
        .select("*")
        .order("giorni", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    let lista = data;

    switch (tipo) {

        case "scaduti":
            document.getElementById("titoloPagina").textContent = "Prodotti Scaduti";
            lista = data.filter(p => p.giorni < 0);
            break;

        case "entro3":
            document.getElementById("titoloPagina").textContent = "Entro 3 giorni";
            lista = data.filter(p => p.giorni >= 0 && p.giorni <= 3);
            break;

        case "entro7":
            document.getElementById("titoloPagina").textContent = "Entro 7 giorni";
            lista = data.filter(p => p.giorni >= 4 && p.giorni <= 7);
            break;

        case "entro10":
            document.getElementById("titoloPagina").textContent = "Entro 10 giorni";
            lista = data.filter(p => p.giorni >= 8 && p.giorni <= 10);
            break;

        case "entro15":
            document.getElementById("titoloPagina").textContent = "Entro 15 giorni";
            lista = data.filter(p => p.giorni >= 11 && p.giorni <= 15);
            break;

        default:
            document.getElementById("titoloPagina").textContent = "Tutte le Referenze";
    }

    disegnaTabella(lista);

    document.getElementById("ricerca").addEventListener("input", e => {

        const testo = e.target.value.toLowerCase();

        const filtrati = lista.filter(p =>
            p.codice.toLowerCase().includes(testo) ||
            p.descrizione.toLowerCase().includes(testo) ||
            p.reparto.toLowerCase().includes(testo)
        );

        disegnaTabella(filtrati);

    });

}

<tr>
    <td>${p.codice}</td>
    <td>${p.descrizione}</td>
    <td>${p.reparto}</td>
    <td>${p.scadenza}</td>
    <td>${p.giorni}</td>

    <td>

        <button class="btn-edit"
                onclick="modificaProdotto('${p.id}')">

            <i class="fa-solid fa-pen-to-square"></i>

        </button>

    </td>

</tr>
        `;

    });

}
