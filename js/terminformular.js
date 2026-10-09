// Übernimmt die angeklickte Leistung in die Formularauswahl.
const leistungslinks = document.querySelectorAll(".leistungslink");
const leistungsAuswahl = document.querySelector("#leistung");

if (leistungsAuswahl) {
    leistungslinks.forEach((link) => {
        link.addEventListener("click", () => {
            leistungsAuswahl.value = link.dataset.leistung;
        });
    });
}

// Das ausgewählte Foto wird nur lokal im Browser angezeigt.
const fahrzeugscheinInput = document.querySelector("#fahrzeugschein");
const fahrzeugscheinVorschau = document.querySelector(
    "#fahrzeugschein-vorschau"
);
const fahrzeugscheinStatus = document.querySelector(
    "#fahrzeugschein-status"
);
const fahrzeugscheinEntfernen = document.querySelector(
    "#fahrzeugschein-entfernen"
);

if (
    fahrzeugscheinInput &&
    fahrzeugscheinVorschau &&
    fahrzeugscheinStatus &&
    fahrzeugscheinEntfernen
) {
    let vorschauUrl = null;

    // Gemeinsames Aufräumen bei neuer Auswahl und beim Entfernen.
    function entferneFahrzeugscheinVorschau() {
        fahrzeugscheinVorschau.hidden = true;
        fahrzeugscheinVorschau.removeAttribute("src");
        fahrzeugscheinEntfernen.hidden = true;

        if (vorschauUrl) {
            URL.revokeObjectURL(vorschauUrl);
            vorschauUrl = null;
        }
    }

    fahrzeugscheinInput.addEventListener("change", () => {
        entferneFahrzeugscheinVorschau();
        fahrzeugscheinStatus.textContent = "";

        const datei = fahrzeugscheinInput.files[0];

        if (!datei) {
            return;
        }

        if (!datei.type.startsWith("image/")) {
            fahrzeugscheinStatus.textContent =
                "Bitte wählen Sie eine Bilddatei aus.";
            fahrzeugscheinInput.value = "";
            return;
        }

        // Auch Bilder ohne darstellbare Vorschau lassen sich entfernen.
        fahrzeugscheinEntfernen.hidden = false;
        vorschauUrl = URL.createObjectURL(datei);
        fahrzeugscheinVorschau.src = vorschauUrl;
    });

    fahrzeugscheinVorschau.addEventListener("load", () => {
        if (vorschauUrl) {
            fahrzeugscheinVorschau.hidden = false;
        }
    });

    fahrzeugscheinVorschau.addEventListener("error", () => {
        entferneFahrzeugscheinVorschau();

        if (fahrzeugscheinInput.files.length > 0) {
            fahrzeugscheinEntfernen.hidden = false;
            fahrzeugscheinStatus.textContent =
                "Keine Vorschau möglich. Bitte versuchen Sie ein JPG- oder PNG-Bild.";
        }
    });

    fahrzeugscheinEntfernen.addEventListener("click", () => {
        entferneFahrzeugscheinVorschau();

        // Leert auch die tatsächliche Dateiauswahl.
        fahrzeugscheinInput.value = "";
        fahrzeugscheinStatus.textContent = "Das Bild wurde entfernt.";
        fahrzeugscheinInput.focus();
    });
}

// Frühester Wunschtermin ist das heutige lokale Datum.
const wunschterminInput = document.querySelector("#wunschtermin");

if (wunschterminInput) {
    function aktualisiereFruehestenTermin() {
        const heute = new Date();
        const jahr = heute.getFullYear();
        const monat = String(heute.getMonth() + 1).padStart(2, "0");
        const tag = String(heute.getDate()).padStart(2, "0");

        // Datumsfelder erwarten das Format JJJJ-MM-TT.
        wunschterminInput.min = `${jahr}-${monat}-${tag}`;
    }

    aktualisiereFruehestenTermin();

    // Aktualisiert das Datum auch bei länger geöffneter Seite.
    wunschterminInput.addEventListener(
        "focus",
        aktualisiereFruehestenTermin
    );
}
