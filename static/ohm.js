// Poniższe opisy dotyczą dalszego wykorzystania zmiennych.
// Element canvas z pliku index.html.
var canvas;
// context wyciągnięty z powyższego canvas.
var kontekst;
// Element select z pliku index.html. Reprezentuje wybór skali amperomierza.
var wyborI;
// Element select z pliku index.html. Reprezentuje wybór skali woltomierza.
var wyborU;
// Element button z pliku index.html, który zwiększa wartość rezystancji R.
var wiecejR;
// Element button z pliku index.html, który zmniejsza wartość rezystancji R.
var mniejR;
// Element button z pliku index.html, który zwiększa wartość napięcia U.
var wiecejU;
// Element button z pliku index.html, który zmniejsza wartość napięcia U.
var mniejU;
// Element span z pliku index.html. Wyświetla aktualną wartość napięcia U.
var wartoscU;
// Element span z pliku index.html. Wyświetla aktualną wartość rezystancji R.
var wartoscR;
// Liczba pomocnicza rezystancji R. Pozwala na zmianę wartości rezystancji w skali logarytmicznej.
var rezystancja_pomoc;
// Aktualna wartość napięcia U.
var napiecie;
// Aktualna wartość natężenia I.
var natezenie;
// Aktualna wartość rezystancji R.
var rezystancja;

// Funkcja inicjalizująca symulację. Wykonuje się po wczytaniu elementu body pliku index.html.
function inicjalizuj() {
    // -----   Inicjalizacja zmiennych   -----
    canvas = document.getElementById("cv");
    kontekst = canvas.getContext("2d");
    wyborI = document.getElementById("wyborI");
    wyborU = document.getElementById("wyborU");
    wiecejR = document.getElementById("wiecejR");
    mniejR = document.getElementById("mniejR");
    wiecejU = document.getElementById("wiecejU");
    mniejU = document.getElementById("mniejU");
    wartoscU = document.getElementById("wartoscU");
    wartoscR = document.getElementById("wartoscR");
    // -----   Wartości początkowe   -----
    rezystancja_pomoc = 17;
    napiecie = Number(wyborU.value);
    plusR();
}

// Funkcja obsługująca zwiększenie wartości rezystancji R, wywołana po wciśnięciu przycisku wiecejR.
function plusR() {
    rezystancja_pomoc++;
    rezystancja = (rezystancja_pomoc % 9 + 1) * Math.pow(10, Math.floor(rezystancja_pomoc / 9));
    aktualizuj();
}

// Funkcja obsługująca zmniejszenie wartości rezystancji R, wywołana po wciśnięciu przycisku mniejR.
function minusR() {
    rezystancja_pomoc--;
    rezystancja = (rezystancja_pomoc % 9 + 1) * Math.pow(10, Math.floor(rezystancja_pomoc / 9));
    aktualizuj();
}

// Funkcja obsługująca zwiększenie wartości napięcia U, wywołana po wciśnięciu przycisku wiecejU.
function plusU() {
    napiecie += Number(wyborU.value) / 10;
    aktualizuj();
}

// Funkcja obsługująca zmniejszenie wartości napięcia U, wywołana po wciśnięciu przycisku mniejU.
function minusU() {
    napiecie -= Number(wyborU.value) / 10;
    aktualizuj();
}

// Funkcja wykonywana po prawie każdej innej funkcji.  
function aktualizuj() {
    // Zastosowanie Prawa Ohma
    natezenie = napiecie / rezystancja;
    // Blokowanie przycisków do zmiany rezystancji R po przekroczeniu przedziału.
    wiecejR.disabled = (rezystancja >= 100000);
    mniejR.disabled = (rezystancja <= 1);
    // Blokowanie przycisków do zmiany napięcia U po przekroczeniu przedziału.
    wiecejU.disabled = (napiecie >= 10000);
    mniejU.disabled = (napiecie <= -10000);
    // Rysowanie schematu.
    rysuj();
    // Wyświetlenie aktualnych wartości rezystancji R oraz napięcia U wewnątrz panelu.
    wartoscR.innerHTML = "R" + " = " + rezystancja + " \u03A9";
    wartoscU.innerHTML = "U" + " = " + +parseFloat(napiecie).toFixed(6) + " V";
}

// Funkcja odświeżająca context oraz ustawiająca biały kolor linii oraz ich grubość.
function reset_kontekstu() {
    kontekst.beginPath();
    kontekst.strokeStyle = "#ffffff";
    kontekst.lineWidth = 2;
}

// Funkcja rysująca koło o środku w punkcie (x, y), promieniu r oraz wnętrzu barwy kolor. Wykorzystana do rysowania węzłów.
function kolo(x, y, r, kolor) {
    reset_kontekstu();
    kontekst.arc(x, y, r, 0, 2 * Math.PI);
    kontekst.fillStyle = kolor;
    kontekst.fill();
    kontekst.stroke();
}

// Funkcja rysująca wszystkie przewody w obwodzie, wraz z odpowiednimi węzłami.
function przewody() {
    reset_kontekstu();
    kontekst.moveTo(225, 525);
    kontekst.lineTo(50, 525);
    kontekst.lineTo(50, 75);
    kontekst.lineTo(295, 75);
    kontekst.moveTo(305, 75);
    kontekst.lineTo(550, 75);
    kontekst.lineTo(550, 525);
    kontekst.lineTo(375, 525);
    kontekst.moveTo(50, 300);
    kontekst.lineTo(100, 300);
    kontekst.moveTo(250, 300);
    kontekst.lineTo(380, 300);
    kontekst.moveTo(500, 300);
    kontekst.lineTo(550, 300);
    kontekst.stroke();
    kolo(50, 300, 2.5, "#ffffff");
    kolo(550, 300, 2.5, "#ffffff");
}

// Funkcja rysująca źródło napięcia U. 
function zrodlo() {
    reset_kontekstu();
    kontekst.strokeStyle = 'cyan';
    kontekst.moveTo(305, 25);
    kontekst.lineTo(305, 125);
    kontekst.moveTo(315, 60);
    kontekst.lineTo(325, 60);
    kontekst.moveTo(320, 55);
    kontekst.lineTo(320, 65);
    kontekst.moveTo(275, 60);
    kontekst.lineTo(285, 60);
    kontekst.stroke();
    reset_kontekstu();
    kontekst.strokeStyle = 'cyan';
    kontekst.lineWidth = 5;
    kontekst.moveTo(295, 50);
    kontekst.lineTo(295, 100);
    kontekst.stroke();
    kontekst.font = "bold 35px sans-serif";
    kontekst.fillStyle = 'cyan';
    kontekst.textAlign = "center";
    kontekst.fillText("U", 325, 120);
}

function prostokat(x, y, w, h, kolor) {
    reset_kontekstu();
    if (kolor) {
        kontekst.strokeStyle = kolor;
    }
    kontekst.strokeRect(x, y, w, h);
}

function rezystor() {
    prostokat(380, 260, 120, 80, 'green');
    kontekst.font = "bold 35px sans-serif";
    kontekst.fillStyle = 'green';
    kontekst.textAlign = "center";
    kontekst.fillText("R", 440, 310);
}

function miernik(x, y, typ) {
    var wartosc;
    var skala;
    var znak;
    var jednostka;
    var kolor;
    if (typ == "woltomierz") {
        wartosc = napiecie / Number(wyborU.value);
        skala = Number(wyborU.value);
        kolor = "red";
        znak = "V";
        jednostka = "[V]";
    } else {
        wartosc = natezenie / Number(wyborI.value);
        skala = Number(wyborI.value);
        kolor = "yellow";
        znak = "I";
        jednostka = "[A]";
    }
    kontekst.fillStyle = kolor;
    kontekst.fillRect(x, y, 150, 120);
    kontekst.fillStyle = 'gray';
    kontekst.fillRect(x + 5, y + 5, 140, 50);
    kontekst.fillStyle = 'black';
    kontekst.textAlign = "center";
    kontekst.font = "bold 12px sans-serif";
    kontekst.fillText(typ, x + 75, y + 70);
    kontekst.font = "bold 20px sans-serif";
    kontekst.fillText(znak + " x" + skala + jednostka, x + 75, y + 110);
    reset_kontekstu();
    kontekst.strokeStyle = kolor;
    kontekst.moveTo(x + 160, y + 45);
    kontekst.lineTo(x + 170, y + 45);
    kontekst.moveTo(x + 165, y + 40);
    kontekst.lineTo(x + 165, y + 50);
    kontekst.moveTo(x - 20, y + 45);
    kontekst.lineTo(x - 10, y + 45);
    kontekst.stroke();
    if (wartosc > 1 || wartosc < -1) {
        kontekst.fillText("ERROR", x + 75, y + 35);
    } else {
        kontekst.fillText(+parseFloat(wartosc).toFixed(6), x + 75, y + 35);
    }
}

// Funkcja rysująca na obiekcie canvas.
function rysuj() {
    // Wyczyszczenie rysunku.
    kontekst.fillStyle = "#000000";
    kontekst.fillRect(0, 0, canvas.width, canvas.height);
    // Rysowanie poszczególnych elementów.
    przewody();
    zrodlo();
    rezystor();
    miernik(225, 465, "woltomierz");
    miernik(100, 240, "amperomierz");
}