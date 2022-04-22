/*
 Najdete :
S:\Ucitele\Kucera\zadání\Zadání programu v JavaScriptu 2018-10-22.docx

Vytvořte v JavaScriptu program, který vykreslí obrázek teploměru
A dle zadání hodnoty teploty z klávesnice se na něm zobrazí zadaná teplota na stupnici i jako číslo.

Tvar teploměru může být 
Tento jako klasický rtuťový teploměr nebo kulatý .
Základ k vytvoření programu je uložen zde :
S:/Ucitele/Kucera/Programování/Jskript/Malování/index.html
Popis jednotlivých funkcí je zde :
https://www.itnetwork.cz/javascript/zaklady/javascript-tutorial-obrazky
nebo zde S:\Ucitele\Kucera\Programování\Jskript\Kreslení v JavaScriptu 2018-10-22.docx
 */
class Teplomer {
  #id = new Date().getTime() + '_' + new Date().getMilliseconds();
  #platno;
  #kontext;
  #input;
  #infoDisplay;
  #x = 25;
  #old_x = 0;
  constructor() {
    this.#platno = document.createElement('canvas');
    this.#platno.id = 'platno' + this.#id;
    this.#platno.height = 350;
    this.#platno.width = 430;
    let center = document.createElement('center');
    center.appendChild(this.#platno);
    document.body.appendChild(center);
    this.#infoDisplay = document.createElement('div');
    this.#infoDisplay.style =
      'border:1px solid black;width:95px;margin:auto;text-align:center;font-size:20px;padding:5px;min-height:24px;';
    this.#infoDisplay.id = 'info_' + this.#id;
    document.body.appendChild(this.#infoDisplay);
    this.#input = document.createElement('input');
    this.#input.id = 'temp_' + this.#id;
    this.#input.type = 'number';
    this.#input.obj = this;
    this.#input.onkeypress = this.readValue;
    document.body.appendChild(this.#input);
    this.#kontext = this.#platno.getContext('2d');

    this.drawTeplomer();
    this.dravLevel();
    this.setTemp(25);
  }
  readValue(event) {
    event = event || window.event;
    if (event.key == 'Enter') {
      event.currentTarget.obj.setTemp(event.currentTarget.value);
    }
  }
  drawTeplomer() {
    // tisk grafiky
    this.#kontext.fillStyle = 'black';
    this.#kontext.beginPath();
    this.#kontext.moveTo(200, 80);
    this.#kontext.lineTo(200, 300);
    this.#kontext.moveTo(222, 80);
    this.#kontext.lineTo(222, 300);
    // čárky na teploměru
    let st = (250 - 91) / 100;
    // 100
    let tt = 100;
    let tx = 100 - tt;

    this.#kontext.moveTo(180, 91 + st * tx);
    this.#kontext.lineTo(195, 91 + st * tx);
    this.#kontext.font = '10px sans-serif';
    this.#kontext.lineTo(241, 91 + st * tx);
    this.#kontext.moveTo(226, 91 + st * tx);
    this.#kontext.fillText(tt, 180, 89 + st * tx);
    this.#kontext.fillText(tt, 225, 89 + st * tx);

    // 50
    tt = 50;
    tx = 100 - tt;
    this.#kontext.moveTo(180, 91 + st * tx);
    this.#kontext.lineTo(195, 91 + st * tx);
    this.#kontext.font = '10px sans-serif';
    this.#kontext.fillText(tt, 180, 89 + st * tx);
    this.#kontext.moveTo(226, 91 + st * tx);
    this.#kontext.lineTo(241, 91 + st * tx);
    this.#kontext.fillText(tt, 225, 89 + st * tx);
    // 75
    tt = 75;
    tx = 100 - tt;
    this.#kontext.moveTo(180, 91 + st * tx);
    this.#kontext.lineTo(195, 91 + st * tx);
    this.#kontext.font = '10px sans-serif';
    this.#kontext.fillText(tt, 180, 89 + st * tx);
    this.#kontext.moveTo(226, 91 + st * tx);
    this.#kontext.lineTo(241, 91 + st * tx);
    this.#kontext.fillText(tt, 225, 89 + st * tx);
    // 25
    tt = 25;
    tx = 100 - tt;
    this.#kontext.moveTo(180, 91 + st * tx);
    this.#kontext.lineTo(195, 91 + st * tx);
    this.#kontext.font = '10px sans-serif';
    this.#kontext.fillText(tt, 180, 89 + st * tx);
    this.#kontext.moveTo(226, 91 + st * tx);
    this.#kontext.lineTo(241, 91 + st * tx);
    this.#kontext.fillText(tt, 225, 89 + st * tx);
    // 0
    this.#kontext.moveTo(180, 250);
    this.#kontext.lineTo(195, 250);
    this.#kontext.fillText('0', 180, 248);
    this.#kontext.moveTo(226, 250);
    this.#kontext.lineTo(241, 250);
    this.#kontext.fillText('0', 238, 248);
    this.#kontext.closePath();
    this.#kontext.stroke();

    //
    this.#kontext.beginPath();
    this.#kontext.fillStyle = 'red';
    this.#kontext.arc(211, 300, 25, 0, Math.PI * 2);
    this.#kontext.closePath();
    this.#kontext.fill();
  }
  setTemp(temp) {
    this.#old_x = this.#x;
    this.#x = temp;
    this.#infoDisplay.innerText = this.#x + ' °C';
    this.clearInfo();
    this.dravLevel();
  }
  clearInfo() {
    this.#kontext.fillStyle = 'white';
    let t = this.#old_x * 1.6 + 1;
    let a = 202; // nemění se je počáteční bod x souřadnice
    let b = 250 - t; // počáteční bod y souřadnice
    let c = 18; // nemění se je šířka
    let d = 60 + t * 1; // je délka
    this.#kontext.fillRect(a, b, c, d);
  }
  dravLevel() {
    this.#kontext.fillStyle = 'red';
    let t = this.#x * 1.6;
    let a = 202; // nemění se je počáteční bod x souřadnice
    let b = 250 - t; // počáteční bod y souřadnice
    let c = 18; // nemění se je šířka
    let d = 60 + t * 1; // je délka
    this.#kontext.fillRect(a, b, c, d);
  }
  updateTextTemp() {}
}

teplomer1 = new Teplomer();

teplomer1.setTemp(50);
