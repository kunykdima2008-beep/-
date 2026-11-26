document.addEventListener("DOMContentLoaded", () => {
  const LABS = [
    {
      id: "lab07",
      badge: "ЛР №7",
      title: "Застосунок №7",
      description: "Опис функціоналу сьомої лабораторної роботи та основних елементів інтерфейсу.",
      url: "лр7 фронтенд/index.html",
      tags: "лр 7 фронтенд лабораторна 7 інтерфейс події"
    },
    {
      id: "lab08",
      badge: "ЛР №8",
      title: "Застосунок №8",
      description: "Опис функціоналу восьмої лабораторної роботи та обробки даних.",
      url: "лр8 фронтенд/index.html",
      tags: "лр 8 фронтенд лабораторна 8 дані обробка"
    },
    {
      id: "lab09",
      badge: "ЛР №9",
      title: "Застосунок №9",
      description: "Опис функціоналу дев'ятої лабораторної роботи та взаємодії з користувачем.",
      url: "лр9 фронтенд/index.html",
      tags: "лр 9 фронтенд лабораторна 9 взаємодія логіка"
    },
    {
      id: "lab10",
      badge: "ЛР №10",
      title: "Застосунок №10",
      description: "Опис функціоналу десятої лабораторної роботи та підсумкових можливостей.",
      url: "лр10 фронтенд/index.html",
      tags: "лр 10 фронтенд лабораторна 10 підсумок застосунок"
    }
  ];

  const labsGrid = document.getElementById("labsGrid");
  const labSelect = document.getElementById("labSelect");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const form = document.getElementById("labAccessForm");
  const userNameInput = document.getElementById("userName");
  const userEmailInput = document.getElementById("userEmail");
  const resetBtn = document.getElementById("resetBtn");
  const statusBox = document.getElementById("statusBox");

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderLabs(items) {
    labsGrid.innerHTML = items
      .map(
        (lab) => `
        <div class="col lab-item" data-search="${escapeHtml(`${lab.badge} ${lab.title} ${lab.description} ${lab.tags}`.toLowerCase())}">
          <div class="card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <span class="badge text-bg-primary align-self-start mb-2">${escapeHtml(lab.badge)}</span>
              <h2 class="h5 card-title">${escapeHtml(lab.title)}</h2>
              <p class="card-text text-muted small flex-grow-1">${escapeHtml(lab.description)}</p>
              <a href="${escapeHtml(lab.url)}" class="btn btn-outline-primary w-100 mt-3">Відкрити</a>
            </div>
          </div>
        </div>
      `
      )
      .join("");
  }

  function populateSelect(items) {
    items.forEach((lab) => {
      const option = document.createElement("option");
      option.value = lab.url;
      option.textContent = `${lab.badge} — ${lab.title}`;
      labSelect.appendChild(option);
    });
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = labsGrid.querySelectorAll(".lab-item");
    let visibleCount = 0;

    cards.forEach((card) => {
      const haystack = card.dataset.search || "";
      const matches = !query || haystack.includes(query);
      card.classList.toggle("d-none", !matches);
      if (matches) visibleCount += 1;
    });

    noResults.classList.toggle("d-none", visibleCount > 0);
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute("required") && value.length === 0) {
      isValid = false;
    }

    const minLength = Number(field.getAttribute("minlength"));
    if (isValid && minLength > 0 && value.length > 0 && value.length < minLength) {
      isValid = false;
    }

    const maxLength = Number(field.getAttribute("maxlength"));
    if (isValid && maxLength > 0 && value.length > maxLength) {
      isValid = false;
    }

    if (isValid && field.type === "email" && value.length > 0) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      isValid = emailPattern.test(value);
    }

    field.classList.toggle("is-invalid", !isValid);
    field.classList.toggle("is-valid", isValid && value.length > 0);
    return isValid;
  }

  const fieldsToValidate = [userNameInput, labSelect, userEmailInput];

  fieldsToValidate.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = fieldsToValidate.map((field) => validateField(field));
    const allValid = results.every(Boolean);

    if (!allValid) {
      statusBox.classList.add("d-none");
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const payload = {
      userName: userNameInput.value.trim(),
      userEmail: userEmailInput.value.trim(),
      targetUrl: labSelect.value,
      openedAt: new Date().toISOString()
    };

    sessionStorage.setItem("labPortalUser", JSON.stringify(payload));

    statusBox.classList.remove("d-none");
    statusBox.textContent = `Дані валідні. Перехід на ${labSelect.options[labSelect.selectedIndex].text}...`;

    window.location.href = labSelect.value;
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    fieldsToValidate.forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });
    statusBox.classList.add("d-none");
  });

  renderLabs(LABS);
  populateSelect(LABS);
});