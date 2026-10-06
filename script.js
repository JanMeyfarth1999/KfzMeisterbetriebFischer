const menueButton = document.querySelector(".menue-button");
const navigation = document.querySelector("#hauptnavigation");

if (menueButton && navigation) {
    document.documentElement.classList.add("menue-bereit");

    function setzeManueStatus(istOffen) {
        navigation.classList.toggle("ist-offen", istOffen);
        menueButton.setAttribute("aria-expanded", String(istOffen));
        menueButton.textContent = istOffen ? "Schließen" : "Menü";
    }
    menueButton.addEventListener("click", () => {
        const istOffen = navigation.classList.contains("ist-Offen");
        setzeManueStatus(!istOffen);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setzeManueStatus(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" &&
            navigation.classList.contains("ist-offen")

        ) {
            setzeManueStatus(false);
            menueButton.focus();
        }
    });
}