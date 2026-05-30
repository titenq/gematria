const letterValues = {
  "א": 1,
  "ב": 2,
  "ג": 3,
  "ד": 4,
  "ה": 5,
  "ו": 6,
  "ז": 7,
  "ח": 8,
  "ט": 9,
  "י": 10,
  "כ": 20,
  "ך": 20,
  "ל": 30,
  "מ": 40,
  "ם": 40,
  "נ": 50,
  "ן": 50,
  "ס": 60,
  "ע": 70,
  "פ": 80,
  "ף": 80,
  "צ": 90,
  "ץ": 90,
  "ק": 100,
  "ר": 200,
  "ש": 300,
  "ת": 400
};

const keyboardLayout = {
  default: [
    ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"],
    ["ט", "י", "כ", "ל", "מ", "נ", "ס", "ע"],
    ["פ", "צ", "ק", "ר", "ש", "ת"],
    ["{space}", "{bksp}"]
  ],
};

const finalForms = {
  "כ": "ך",
  "מ": "ם",
  "נ": "ן",
  "פ": "ף",
  "צ": "ץ"
};

const regularForms = Object.fromEntries(
  Object.entries(finalForms).map(([regular, final]) => [final, regular])
);

const keyLabels = {
  "{enter}": "Enter",
  "{bksp}": "Backspace",
  "{tab}": "Tab",
  "{shift}": "Shift",
  "{space}": "Space",
  "{lock}": "Caps Lock"
};

const input = document.getElementById("palavra");
const calcularBtn = document.getElementById("calcular");
const keyboardRoot = document.getElementById("keyboard");
const resultadoBox = document.querySelector(".box-resultado");
const linhaHebraico = document.getElementById("linha-hebraico");
const linhaValores = document.getElementById("linha-valores");
const resultadoValor = document.getElementById("resultado-valor");
const resultadoRaiz = document.getElementById("resultado-raiz");

let layoutName = "default";
let capsLock = false;

function digitalRoot(number) {
  let root = number;
  while (root >= 10) {
    root = String(root)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return root;
}

function normalizeHebrew(word) {
  return word.replace(/[\u0591-\u05C7\u05BE\u05C0\u05C3\s]/g, "");
}

function isHebrewLetter(letter) {
  return /^[\u05D0-\u05EA]$/.test(letter);
}

function normalizeFinalForms(value) {
  const letters = [...value].map((letter) => regularForms[letter] || letter);

  return letters
    .map((letter, index) => {
      if (!finalForms[letter]) return letter;

      const nextLetter = letters[index + 1];
      return isHebrewLetter(nextLetter) ? letter : finalForms[letter];
    })
    .join("");
}

function updateInputValue(value, cursorPosition) {
  input.value = normalizeFinalForms(value);
  input.setSelectionRange(cursorPosition, cursorPosition);
  input.focus();
}

function renderRows(letters, values) {
  linhaHebraico.innerHTML = "";
  linhaValores.innerHTML = "";

  letters.forEach((letter) => {
    const letterEl = document.createElement("div");
    letterEl.className = "hebraico";
    letterEl.textContent = letter;
    linhaHebraico.appendChild(letterEl);
  });

  values.forEach((value) => {
    const valueEl = document.createElement("div");
    valueEl.className = "valorNumerico";
    valueEl.textContent = String(value);
    linhaValores.appendChild(valueEl);
  });
}

function setResultadoVisible(isVisible) {
  resultadoBox.classList.toggle("box-resultado-empty", !isVisible);
}

function calcularGematria(word) {
  const valorNumerico = [...word].reduce(
    (acc, letter) => acc + (letterValues[letter] || 0),
    0
  );

  const cleanedWord = normalizeHebrew(word);
  const letrasHebraico = [...cleanedWord];
  const letrasValor = letrasHebraico.map((letter) => letterValues[letter] || "");

  renderRows(letrasHebraico, letrasValor);
  setResultadoVisible(valorNumerico > 0);

  if (valorNumerico > 0) {
    resultadoValor.textContent = `Valor Numérico: ${valorNumerico}`;
    resultadoRaiz.textContent = `Raiz: ${digitalRoot(valorNumerico)}`;
  } else {
    resultadoValor.textContent = "";
    resultadoRaiz.textContent = "";
  }

  input.value = "";
}

function insertAtCursor(text) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const value = input.value.slice(0, start) + text + input.value.slice(end);
  const pos = start + text.length;
  updateInputValue(value, pos);
}

function removeAtCursor() {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;

  if (start !== end) {
    updateInputValue(input.value.slice(0, start) + input.value.slice(end), start);
    return;
  }

  if (start > 0) {
    updateInputValue(input.value.slice(0, start - 1) + input.value.slice(end), start - 1);
  }
}

function setLayoutFromCaps() {
  layoutName = capsLock ? "shift" : "default";
  renderKeyboard();
}

function toggleShift() {
  layoutName = layoutName === "default" ? "shift" : "default";
  renderKeyboard();
}

function handleKeyPress(key) {
  if (key === "{bksp}") {
    removeAtCursor();
    return;
  }

  if (key === "{space}") {
    insertAtCursor(" ");
    return;
  }

  if (key === "{tab}") {
    insertAtCursor("\t");
    return;
  }

  if (key === "{enter}") {
    calcularGematria(input.value);
    return;
  }

  if (key === "{lock}") {
    capsLock = !capsLock;
    setLayoutFromCaps();
    return;
  }

  if (key === "{shift}") {
    toggleShift();
    return;
  }

  insertAtCursor(key);

  if (!capsLock && layoutName === "shift") {
    layoutName = "default";
    renderKeyboard();
  }
}

function keyClass(key) {
  if (key === "{space}") return "keyboard-key space";
  if (key.startsWith("{")) return "keyboard-key wide";
  return "keyboard-key";
}

function renderKeyboard() {
  keyboardRoot.innerHTML = "";

  keyboardLayout[layoutName].forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "keyboard-row";

    row.forEach((key) => {
      const keyEl = document.createElement("button");
      keyEl.type = "button";
      keyEl.className = keyClass(key);
      keyEl.textContent = keyLabels[key] || key;
      keyEl.addEventListener("click", () => handleKeyPress(key));
      rowEl.appendChild(keyEl);
    });

    keyboardRoot.appendChild(rowEl);
  });
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calcularGematria(input.value);
  }
});

input.addEventListener("input", () => {
  const cursorPosition = input.selectionStart ?? input.value.length;
  updateInputValue(input.value, cursorPosition);
});

calcularBtn.addEventListener("click", () => {
  calcularGematria(input.value);
});

renderKeyboard();
setResultadoVisible(false);
