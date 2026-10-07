// Elemente für das aufklappbare Handy-Menü.
const menueButton = document.querySelector(".menue-button");
const navigation = document.querySelector("#hauptnavigation");

if (menueButton && navigation) {
    document.documentElement.classList.add("menue-bereit");

    // Alle Änderungen am Menüzustand werden gemeinsam ausgeführt.
    function setzeMenueStatus(istOffen) {
        navigation.classList.toggle("ist-offen", istOffen);
        menueButton.setAttribute("aria-expanded", String(istOffen));
        menueButton.textContent = istOffen ? "Schließen" : "Menü";
    }

    menueButton.addEventListener("click", () => {
        const istOffen = navigation.classList.contains("ist-offen");
        setzeMenueStatus(!istOffen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setzeMenueStatus(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            navigation.classList.contains("ist-offen")
        ) {
            setzeMenueStatus(false);
            menueButton.focus();
        }
    });
}

// Elemente für die Leistungsauswahl im Terminformular.
const leistungslinks = document.querySelectorAll(".leistungslink");
const leistungsAuswahl = document.querySelector("#leistung");

if (leistungsAuswahl) {
    // Dieselbe Klickfunktion wird für alle Leistungslinks verwendet.
    leistungslinks.forEach((link) => {
        link.addEventListener("click", () => {
            leistungsAuswahl.value = link.dataset.leistung;
        });
    });
}