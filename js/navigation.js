// Steuert das Menü auf kleinen Bildschirmen.
const menueButton = document.querySelector(".menue-button");
const navigation = document.querySelector("#hauptnavigation");

if (menueButton && navigation) {
    document.documentElement.classList.add("menue-bereit");

    // Aktualisiert Darstellung und Angaben für Screenreader gemeinsam.
    function setzeMenueStatus(istOffen) {
        navigation.classList.toggle("ist-offen", istOffen);
        menueButton.setAttribute("aria-expanded", String(istOffen));
        menueButton.textContent = istOffen ? "Schließen" : "Menü";
    }

    menueButton.addEventListener("click", () => {
        setzeMenueStatus(!navigation.classList.contains("ist-offen"));
    });

    // Nach Auswahl eines Navigationslinks das Menü schließen.
    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setzeMenueStatus(false);
        }
    });

    // Escape schließt das Menü und setzt den Fokus auf den Menüknopf.
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