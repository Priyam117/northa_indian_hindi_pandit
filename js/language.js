
function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.en;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;

    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      element.placeholder = dictionary[key];
    }
  });

  const currentLanguage = document.getElementById("currentLanguage");

  if (currentLanguage) {
    currentLanguage.textContent = languageNames[lang] || "English";
  }

  localStorage.setItem("preferredLanguage", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("languageButton");
  const languageMenu = document.getElementById("languageMenu");

  const savedLanguage =
    localStorage.getItem("preferredLanguage") || "en";

  applyLanguage(savedLanguage);

  if (!languageButton || !languageMenu) return;

  languageButton.addEventListener("click", event => {
    event.stopPropagation();

    const isOpen = languageMenu.classList.toggle("show");

    languageButton.setAttribute("aria-expanded", String(isOpen));
  });

  languageMenu.querySelectorAll("[data-lang]").forEach(option => {
    option.addEventListener("click", () => {
      applyLanguage(option.dataset.lang);
      languageMenu.classList.remove("show");
      languageButton.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", event => {
    if (
      !languageButton.contains(event.target) &&
      !languageMenu.contains(event.target)
    ) {
      languageMenu.classList.remove("show");
      languageButton.setAttribute("aria-expanded", "false");
    }
  });
});
