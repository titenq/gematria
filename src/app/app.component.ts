import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';

import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    '../../node_modules/simple-keyboard/build/css/index.css',
    './app.component.css'
  ]
})
export class AppComponent implements AfterViewInit {
  gematria: string = '';
  valorNumerico: number;
  raiz: number;
  hebraico: string = '';

  letrasHebraico = [];
  letrasValor = [];

  value = '';
  keyboard: Keyboard;
  hebrew = {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} / \' \u05e7 \u05e8 \u05d0 \u05d8 \u05d5 \u05df \u05dd \u05e4 ] [ \\',
      '{lock} \u05e9 \u05d3 \u05d2 \u05db \u05e2 \u05d9 \u05d7 \u05dc \u05da \u05e3 , {enter}',
      '{shift} \u05d6 \u05e1 \u05d1 \u05d4 \u05e0 \u05de \u05e6 \u05ea \u05e5 . {shift}',
      '.com @ {space}'
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '.com @ {space}'
    ]
  };

  calcularGematria(palavra: string) {
    this.valorNumerico = 0;
    this.raiz = 0;

    for (let i = 0; i < palavra.length; i++) {

      if (palavra[i] == 'א') {
        this.valorNumerico += 1;
      } else if (palavra[i] == 'ב') {
        this.valorNumerico += 2;
      } else if (palavra[i] == 'ג') {
        this.valorNumerico += 3;
      } else if (palavra[i] == 'ד') {
        this.valorNumerico += 4;
      } else if (palavra[i] == 'ה') {
        this.valorNumerico += 5;
      } else if (palavra[i] == 'ו') {
        this.valorNumerico += 6;
      } else if (palavra[i] == 'ז') {
        this.valorNumerico += 7;
      } else if (palavra[i] == 'ח') {
        this.valorNumerico += 8;
      } else if (palavra[i] == 'ט') {
        this.valorNumerico += 9;
      } else if (palavra[i] == 'י') {
        this.valorNumerico += 10;
      } else if (palavra[i] == 'כ' || palavra[i] == 'ך') {
        this.valorNumerico += 20;
      } else if (palavra[i] == 'ל') {
        this.valorNumerico += 30;
      } else if (palavra[i] == 'מ' || palavra[i] == 'ם') {
        this.valorNumerico += 40;
      } else if (palavra[i] == 'נ' || palavra[i] == 'ן') {
        this.valorNumerico += 50;
      } else if (palavra[i] == 'ס') {
        this.valorNumerico += 60;
      } else if (palavra[i] == 'ע') {
        this.valorNumerico += 70;
      } else if (palavra[i] == 'פ' || palavra[i] == 'ף') {
        this.valorNumerico += 80;
      } else if (palavra[i] == 'צ' || palavra[i] == 'ץ') {
        this.valorNumerico += 90;
      } else if (palavra[i] == 'ק') {
        this.valorNumerico += 100;
      } else if (palavra[i] == 'ר') {
        this.valorNumerico += 200;
      } else if (palavra[i] == 'ש') {
        this.valorNumerico += 300;
      } else if (palavra[i] == 'ת') {
        this.valorNumerico += 400;
      }
    }

    this.convertNumberToString(this.valorNumerico);

    this.convertLetrasHebraico(palavra);

    this.convertValorLetras(this.letrasHebraico);

    this.gematria = '';
    this.keyboard.clearInput();
  }

  private convertNumberToString(num) {
    let somarRaiz = num.toString();

    for (let i = 0; i < somarRaiz.length; i++) {
      this.raiz += Number(somarRaiz[i]);
    }

    while (this.raiz >= 10) {
      let reduzirRaiz = this.raiz.toString();
      this.raiz = 0;
      for (let i = 0; i < reduzirRaiz.length; i++) {
        this.raiz += Number(reduzirRaiz[i]);
      }
    }
  }

  private convertLetrasHebraico(palavra: string) {
    palavra = palavra.replace(' ', '');
    palavra = palavra.replace('ּ', '');
    palavra = palavra.replace('ָ', '');
    palavra = palavra.replace('ֵ', '');
    palavra = palavra.replace('ִ', '');
    palavra = palavra.replace('ֹ', '');
    palavra = palavra.replace('ַ', '');
    palavra = palavra.replace('ֶ', '');
    palavra = palavra.replace('ֻ', '');
    palavra = palavra.replace('ֲ', '');
    palavra = palavra.replace('ְ', '');
    palavra = palavra.replace('ֱ', '');
    palavra = palavra.replace('ֳ', '');
    palavra = palavra.replace('־', '');
    palavra = palavra.replace('ׁ', '');
    palavra = palavra.replace('֖', '');
    palavra = palavra.replace('֣', '');
    palavra = palavra.replace('ָ', '');
    palavra = palavra.replace('֑', '');
    palavra = palavra.replace('֥', '');
    palavra = palavra.replace('ַ', '');
    palavra = palavra.replace('ֽ', '');
    palavra = palavra.replace('׃', '');
    palavra = palavra.replace('֗', '');
    palavra = palavra.replace('֙', '');
    palavra = palavra.replace('֨', '');
    palavra = palavra.replace('֔', '');
    palavra = palavra.replace('ְ', '');
    palavra = palavra.replace('ֶ', '');
    palavra = palavra.replace('ֽ', '');
    palavra = palavra.replace('֧', '');
    palavra = palavra.replace('֛', '');
    palavra = palavra.replace('ּ', '');
    palavra = palavra.replace('׀', '');
    palavra = palavra.replace('֤', '');
    palavra = palavra.replace('ֹ', '');
    palavra = palavra.replace('ִ', '');
    palavra = palavra.replace('ׂ', '');
    palavra = palavra.replace('ַ', '');
    palavra = palavra.replace('֮', '');
    palavra = palavra.replace('֒', '');
    palavra = palavra.replace('֞', '');
    palavra = palavra.replace('֕', '');
    palavra = palavra.replace('֡', '');
    palavra = palavra.replace('֩', '');
    palavra = palavra.replace('֠', '');

    for (let i = 0; i < palavra.length; i++) {
      this.letrasHebraico = [...palavra];
    }
  }

  private convertValorLetras(letrasHebraico) {
    this.letrasValor = [];
    for (let i = 0; i < letrasHebraico.length; i++) {
      if (letrasHebraico[i] == 'א') {
        this.letrasValor.push(1);
      } else if (letrasHebraico[i] == 'ב') {
        this.letrasValor.push(2);
      } else if (letrasHebraico[i] == 'ג') {
        this.letrasValor.push(3);
      } else if (letrasHebraico[i] == 'ד') {
        this.letrasValor.push(4);
      } else if (letrasHebraico[i] == 'ה') {
        this.letrasValor.push(5);
      } else if (letrasHebraico[i] == 'ו') {
        this.letrasValor.push(6);
      } else if (letrasHebraico[i] == 'ז') {
        this.letrasValor.push(7);
      } else if (letrasHebraico[i] == 'ח') {
        this.letrasValor.push(8);
      } else if (letrasHebraico[i] == 'ט') {
        this.letrasValor.push(9);
      } else if (letrasHebraico[i] == 'י') {
        this.letrasValor.push(10);
      } else if (letrasHebraico[i] == 'כ' || letrasHebraico[i] == 'ך') {
        this.letrasValor.push(20);
      } else if (letrasHebraico[i] == 'ל') {
        this.letrasValor.push(30);
      } else if (letrasHebraico[i] == 'מ' || letrasHebraico[i] == 'ם') {
        this.letrasValor.push(40);
      } else if (letrasHebraico[i] == 'נ' || letrasHebraico[i] == 'ן') {
        this.letrasValor.push(50);
      } else if (letrasHebraico[i] == 'ס') {
        this.letrasValor.push(60);
      } else if (letrasHebraico[i] == 'ע') {
        this.letrasValor.push(70);
      } else if (letrasHebraico[i] == 'פ' || letrasHebraico[i] == 'ף') {
        this.letrasValor.push(80);
      } else if (letrasHebraico[i] == 'צ' || letrasHebraico[i] == 'ץ') {
        this.letrasValor.push(90);
      } else if (letrasHebraico[i] == 'ק') {
        this.letrasValor.push(100);
      } else if (letrasHebraico[i] == 'ר') {
        this.letrasValor.push(200);
      } else if (letrasHebraico[i] == 'ש') {
        this.letrasValor.push(300);
      } else if (letrasHebraico[i] == 'ת') {
        this.letrasValor.push(400);
      }
    }
  }

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default myTheme1",
      layout: this.hebrew,
      display: {
        '{enter}': 'Enter',
        '{bksp}': 'Backspace',
        '{tab}': 'Tab',
        '{shift}': 'Shift',
        '{space}': 'Space',
        '{lock}': 'Caps Lock'
      }
    });
  }

  onChange = (input: string) => {
    this.gematria = input;
    // console.log("Input changed", input);
  }

  onKeyPress = (button: string) => {
    // console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  }

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  }

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }
}
