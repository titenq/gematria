const wordInput = document.getElementById("word-input");
const calculateButton = document.getElementById("calculate-button");
const keyboardRoot = document.getElementById("keyboard");
const resultBox = document.getElementById("result-box");
const hebrewRow = document.getElementById("hebrew-row");
const valuesRow = document.getElementById("values-row");
const resultValue = document.getElementById("result-value");
const resultRoot = document.getElementById("result-root");

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
  "ת": 400,
};

const keyboardLayout = {
  default: [
    ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י"],
    ["כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר"],
    ["ש", "ת", "ך", "ם", "ן", "ף", "ץ"],
    ["{space}", "{bksp}", "{reset}"],
  ],
};

const keyLabels = {
  "{bksp}": "Backspace",
  "{space}": "Space",
  "{reset}": "Reset",
};

const letterNames = {
  "א": "Alef",
  "ב": "Bet",
  "ג": "Guimel",
  "ד": "Dalet",
  "ה": "He",
  "ו": "Vav",
  "ז": "Zayin",
  "ח": "Chet",
  "ט": "Tet",
  "י": "Yod",
  "כ": "Kaf",
  "ך": "Kaf sofit",
  "ל": "Lamed",
  "מ": "Mem",
  "ם": "Mem sofit",
  "נ": "Nun",
  "ן": "Nun sofit",
  "ס": "Samekh",
  "ע": "Ayin",
  "פ": "Pe",
  "ף": "Pe sofit",
  "צ": "Tsadi",
  "ץ": "Tsadi sofit",
  "ק": "Qof",
  "ר": "Resh",
  "ש": "Shin",
  "ת": "Tav",
};

const finalLetterMap = {
  "כ": "ך",
  "מ": "ם",
  "נ": "ן",
  "פ": "ף",
  "צ": "ץ",
};

const reverseFinalLetterMap = Object.fromEntries(
  Object.entries(finalLetterMap).map(([regularLetter, finalForm]) => [finalForm, regularLetter])
);

const digitalRoot = (number) => {
  let root = number;

  while (root >= 10) {
    root = String(root)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  }

  return root;
};

const normalizeHebrew = (word) => word.replace(/[\u0591-\u05C7\u05BE\u05C0\u05C3]/g, "");

const applyFinalLetters = (text) => {
  const words = text.split(" ");

  return words
    .map((word) => {
      if (!word) {
        return "";
      }

      const letters = [...word].map((letter, index, array) => {
        if (index < array.length - 1) {
          return reverseFinalLetterMap[letter] || letter;
        }

        return finalLetterMap[letter] || letter;
      });

      return letters.join("");
    })
    .join(" ");
};

const normalizeInputValue = (value) => applyFinalLetters(normalizeHebrew(value));

const updateInputValue = (value, cursorPosition = value.length) => {
  const normalizedValue = normalizeInputValue(value);

  wordInput.value = normalizedValue;

  const safePosition = Math.min(cursorPosition, normalizedValue.length);

  wordInput.setSelectionRange(safePosition, safePosition);
  wordInput.focus();

  return normalizedValue;
};

const renderRows = (letters, values) => {
  hebrewRow.innerHTML = "";
  valuesRow.innerHTML = "";

  letters.forEach((letter) => {
    const letterEl = document.createElement("div");

    letterEl.className = "hebraico";
    letterEl.textContent = letter;
    hebrewRow.appendChild(letterEl);
  });

  values.forEach((value) => {
    const valueEl = document.createElement("div");

    valueEl.className = "valorNumerico";
    valueEl.textContent = String(value);
    valuesRow.appendChild(valueEl);
  });
};

const resetCalculator = () => {
  wordInput.value = "";
  resultBox.hidden = true;
  hebrewRow.innerHTML = "";
  valuesRow.innerHTML = "";
  resultValue.textContent = "";
  resultRoot.textContent = "";
  wordInput.focus();
};

const calculateGematria = (word) => {
  const cleanedWord = normalizeInputValue(word);

  const numericValue = [...cleanedWord].reduce(
    (acc, letter) => acc + (letterValues[letter] || 0),
    0
  );

  const hebrewLetters = [...cleanedWord];
  const letterValuesRow = hebrewLetters.map((letter) => letterValues[letter] || "");

  renderRows(hebrewLetters, letterValuesRow);
  updateInputValue(cleanedWord);

  if (numericValue > 0) {
    resultBox.hidden = false;
    resultValue.textContent = `Valor Numérico: ${numericValue}`;
    resultRoot.textContent = `Raiz: ${digitalRoot(numericValue)}`;
  } else {
    resetCalculator();
  }
};

const insertAtCursor = (text) => {
  const start = wordInput.selectionStart ?? wordInput.value.length;
  const end = wordInput.selectionEnd ?? wordInput.value.length;
  const nextValue = wordInput.value.slice(0, start) + text + wordInput.value.slice(end);
  const pos = start + text.length;

  updateInputValue(nextValue, pos);
};

const removeAtCursor = () => {
  const start = wordInput.selectionStart ?? wordInput.value.length;
  const end = wordInput.selectionEnd ?? wordInput.value.length;

  if (start !== end) {
    updateInputValue(wordInput.value.slice(0, start) + wordInput.value.slice(end), start);

    return;
  }

  if (start > 0) {
    updateInputValue(wordInput.value.slice(0, start - 1) + wordInput.value.slice(end), start - 1);
  }
};

const handleKeyPress = (key) => {
  if (key === "{bksp}") {
    removeAtCursor();

    return;
  }

  if (key === "{space}") {
    insertAtCursor(" ");

    return;
  }

  if (key === "{reset}") {
    resetCalculator();

    return;
  }

  insertAtCursor(key);
};

const getKeyClass = (key) => {
  if (key === "{space}") {
    return "keyboard-key space";
  }

  if (key.startsWith("{")) {
    return "keyboard-key wide";
  }

  return "keyboard-key";
};

const renderKeyboard = () => {
  keyboardRoot.innerHTML = "";

  keyboardLayout.default.forEach((row) => {
    const rowEl = document.createElement("div");
  
    rowEl.className = "keyboard-row";

    row.forEach((key) => {
      const keyEl = document.createElement("button");

      keyEl.type = "button";
      keyEl.className = getKeyClass(key);
      keyEl.textContent = keyLabels[key] || key;
      keyEl.title = letterNames[key] || "";
      keyEl.addEventListener("mousedown", (event) => event.preventDefault());
      keyEl.addEventListener("click", () => handleKeyPress(key));
      rowEl.appendChild(keyEl);
    });

    keyboardRoot.appendChild(rowEl);
  });
};

wordInput.addEventListener("input", () => {
  const start = wordInput.selectionStart ?? wordInput.value.length;

  updateInputValue(wordInput.value, start);
});

calculateButton.addEventListener("click", () => {
  calculateGematria(wordInput.value);
});

renderKeyboard();
