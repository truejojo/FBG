/* ***************************************************************************
 * Spiel
 *****************************************************************************/

var Spiel = {};



/* ***************************************************************************
 * MODEL
 *****************************************************************************/

Spiel.Model = {};



/* MODEL - SPIELE
******************************************************************************/
Spiel.Model.Spiele = {};


Spiel.Model.Spiele.KZMF = function() {
	return {
		spielen: function() {
			Spiel.Model.Hilfsfunktionen.Zeichenfolge.setZufallsZeichenFolge(
				Spiel.Model.Spieleigenschaften.Silbenlaenge.getSilbenlaenge(),
				Spiel.Model.Zeichen.Silben);
			
			Spiel.View.zeigeSilbenfolge(Spiel.Model.Hilfsfunktionen.
					Zeichenfolge.getZufallsZeichenFolge());
		}
	};
}();



/* MODEL - SPIELER
******************************************************************************/


Spiel.Model.Spieler = function(){
	var zeichenfolge;
	return {
		setZeichenfolge: function(zeichenfolgeAktuell) {
			zeichenfolge = zeichenfolgeAktuell;
		},
		
		getZeichenfolge: function() {
			return zeichenfolge;
		}
	};
}();



/* MODEL - SPIELEIGENSCHAFTEN
******************************************************************************/
Spiel.Model.Spieleigenschaften = {};


Spiel.Model.Spieleigenschaften.Rundenlaenge = function() {
	var rundenlaenge;
	return {
		setRundenlaenge: function(rundenlaengeAktuell) {
			rundenlaenge = rundenlaengeAktuell;
		},
		
		getRundenlaenge: function() {
			return rundenlaenge;
		}
	};  	
}();

Spiel.Model.Spieleigenschaften.Silbenlaenge = function() {
	var silbenlaenge;
	return {
		setSilbenlaenge: function(silbenlaengeAktuell) {
			silbenlaenge = silbenlaengeAktuell;
		},
		getSilbenlaenge: function() {
			return silbenlaenge;
		}
	};  	
}();

Spiel.Model.Spieleigenschaften.Richtigzaehler = function() {
	var richtigzaehler = 0;
	return {
		setzeRichtigzaehler: function() {
			richtigzaehler = 0;
		},
		
		erhoeheRichtigzaehler: function() {
			richtigzaehler += 1;
		},
		
		gebeRichtigzaehler: function() {
			return richtigzaehler;
		}
	};
}();



/* MODEL - AUSGABEN
 *****************************************************************************/
Spiel.Model.Ausgaben = {};

Spiel.Model.Ausgaben.Ausgabe = function() {
	var richtigOderFalschAusgabe;
	return {
		setzeRichtigOderFalschAusgabe: function(spielerEingabe,
												generierteEingabe) {
			if(Spiel.Model.Hilfsfunktionen.ZeichenfolgeVergleich.
				vergleicheZeichenfolgen(spielerEingabe, generierteEingabe)) {
				
				richtigOderFalschAusgabe = "TOLL, das war Richtig!!";
			}else {
				richtigOderFalschAusgabe = "Schade, das war leider Falsch";
			}
		},
		
		gebeRichtigOderFalschAusgabe: function() {
			return richtigOderFalschAusgabe;
		}
	};
}();

Spiel.Model.Ausgaben.Endergebnis = function() {
	var endergebnisAusgabe;
	var SME = Spiel.Model.Spieleigenschaften;
	return {
		setzeEndergebnis: function() {
			endergebnisAusgabe = "Du hast " + 
				Spiel.Model.Spieleigenschaften.Richtigzaehler.
					gebeRichtigzaehler() + 
				" von " + 
				Spiel.Model.Spieleigenschaften.Rundenlaenge.getRundenlaenge() +
				" richtig";
		},
		
		gebeEndergebnisAus: function() {
			return endergebnisAusgabe ;
		}
	
	};
}();



/* MODEL - HILFSFUNKTIONEN
******************************************************************************/
Spiel.Model.Hilfsfunktionen = {};


Spiel.Model.Hilfsfunktionen.Zufallszahl = function() {
	return {
		getZufallszahl: function(zeichenfolge) {
			return Math.round(Math.random() * (zeichenfolge.length -1));
		}
	};
}();

Spiel.Model.Hilfsfunktionen.Zeichenfolge = function() {
	var zufallsfolge;
	return {
		setZufallsZeichenFolge: function(zeichenlaenge, zeichenArt) {
			zufallsfolge = "";
			var i;
			for(i = 0;  i < zeichenlaenge; i++) {
				zufallsfolge += zeichenArt.getZufallsZeichen();
			}
		},
		
		getZufallsZeichenFolge: function() {
			return zufallsfolge;
		}
	};
}();

Spiel.Model.Hilfsfunktionen.ZeichenfolgeVergleich = function() {
	return  {
		vergleicheZeichenfolgen: function(spielerEingabe, generierteEingabe) {
			if(spielerEingabe === generierteEingabe) {
				Spiel.Model.Spieleigenschaften.Richtigzaehler.
					erhoeheRichtigzaehler();
				return true;
			}else {
				return false;
			}
		}
	};
}();



/* MODEL - ZEICHEN
******************************************************************************/
Spiel.Model.Zeichen = {};


Spiel.Model.Zeichen.Vokale = function() {
	var vokale = "AEIOU",
			zufallsZahl;
	return {
		getZufallsVokal: function() {
			zufallsZahl = Spiel.Model.Hilfsfunktionen.Zufallszahl.
							getZufallszahl(vokale);
			return vokale.charAt(zufallsZahl);
		}
	};
}();

Spiel.Model.Zeichen.Konsonanten = function() {
	var konsonanten = "BCDFGHJKLMNPQRSTVWXYZ",
			zufallsZahl;
	return {
		getZufallsKonsonant: function() {
			zufallsZahl = Spiel.Model.Hilfsfunktionen.Zufallszahl.
							getZufallszahl(konsonanten);
			return konsonanten.charAt(zufallsZahl);
		}
	};
}();

Spiel.Model.Zeichen.Silben = function() {
	var silben;
	return {
		getZufallsZeichen: function() {
			silben = Spiel.Model.Zeichen.Konsonanten.getZufallsKonsonant();
			silben += Spiel.Model.Zeichen.Vokale.getZufallsVokal();
			return silben;
		}
	};
}();

Spiel.Model.Zeichen.Zahlen = function() {
	var zahlen = "1234567890",
			zufallsZahl;
	return {
		getZufallsZeichen: function() {
			zufallsZahl = Spiel.Model.Hilfsfunktionen.Zufallszahl.
							getZufallszahl(zahlen);
			return zahlen.charAt(zufallsZahl);
		}
	};
}();



/* ***************************************************************************
 * VIEW
 *****************************************************************************/

Spiel.View = {
    zeigeSilbenfolge: function(silbenfolge) {
		var silbenfolgeAusgabe = document.getElementById("silbenAusgabe");
		silbenfolgeAusgabe.innerHTML = silbenfolge;
	},
	
	zeigeRichtigOderFalschAusgabe: function(message) {
		var messageAusgabe = document.getElementById("richtigFalschAusgabe");
		messageAusgabe.innerHTML = message;
	},
	
	zeigeEndergebnis: function(endergebnis) {
		var endergebnisAusgabe = document.getElementById("endergebnisAusgabe");
		endergebnisAusgabe.innerHTML = endergebnis;
	}
};



/* ***************************************************************************
 * CONTROLLER
 *****************************************************************************/

Spiel.Controller = {
	zaehler: 0,
		
	kontrolliereSpielablauf: function() {
		if(this.zaehler < Spiel.Model.Spieleigenschaften.Rundenlaenge.
						getRundenlaenge()) {
			Spiel.Model.Spiele.KZMF.spielen();
			this.zaehler++;
			
			$("#richtigFalsch").hide();
			$("#zeigeZeichenfolge").show();
			
		}else {
			// Endergebnis ausgaben
			this.zaehler = 0;
			// die Seite mit start-Button wieder angzeigen
			Spiel.Controller.zeigeEndergebnisAn();
			
			$("#zeigeZeichenfolge").hide();
			$("#senden").hide();
			$('#richtigFalsch').hide();
			$('#endergebnis').show();
			
			Spiel.Model.Spieleigenschaften.Richtigzaehler.setzeRichtigzaehler();
		}
	},
	
	zeigeRichtigOderFalschAn: function() {
		Spiel.Model.Ausgaben.Ausgabe.setzeRichtigOderFalschAusgabe(
			Spiel.Model.Spieler.getZeichenfolge(),
			Spiel.Model.Hilfsfunktionen.Zeichenfolge.getZufallsZeichenFolge());
		
		Spiel.View.zeigeRichtigOderFalschAusgabe(Spiel.Model.Ausgaben.
			Ausgabe.gebeRichtigOderFalschAusgabe());
	},
	
	zeigeEndergebnisAn: function() {
		Spiel.Model.Ausgaben.Endergebnis.setzeEndergebnis();
		Spiel.View.zeigeEndergebnis(Spiel.Model.Ausgaben.Endergebnis.
			gebeEndergebnisAus());
	}
};



/* ****************************************************************************
 * EVENT - HANDLER
 *****************************************************************************/

function handlerStartButton() {
	Spiel.Model.Spieleigenschaften.Rundenlaenge.setRundenlaenge
		(rundenanzahl.value);
	Spiel.Model.Spieleigenschaften.Silbenlaenge.setSilbenlaenge
		(silbenlaenge.value);
	
	rundenanzahl.value = 2;
	silbenlaenge.value = 2;
	
	Spiel.Controller.kontrolliereSpielablauf();
	
	$("#einrichten").hide();
	$("#willkommen").hide();
	$("#zeigeZeichenfolge").show();
}

function handlerOkButton() {
	Spiel.View.zeigeSilbenfolge("");
	
	$("#zeigeZeichenfolge").hide();
	$("#senden").show();
	$('#silbenEingabe').focus();
}

function handlerVergleichButton() {
	var silbenEingabe = document.getElementById("silbenEingabe");
	Spiel.Model.Spieler.setZeichenfolge(silbenEingabe.value.toUpperCase());
	
	Spiel.Controller.zeigeRichtigOderFalschAn();
	
	$("#senden").hide();
	$("#richtigFalsch").show();
	
	var silbenEingabe = document.getElementById("silbenEingabe");
	silbenEingabe.value = "";	
}

function handlerWeiterButton() {	
	Spiel.View.zeigeRichtigOderFalschAusgabe("");
	Spiel.Controller.kontrolliereSpielablauf();
}

function handlerNochmalButton() {
	Spiel.Controller.kontrolliereSpielablauf();
	
	$("#endergebnis").hide();
	$("#zeigeZeichenfolge").show();
}

function handlerZurueckButton() {
	$("#endergebnis").hide();
	$("#einrichten").show();
	$("#willkommen").show();
}

function handlerSilbenEingabe(e) {
	var vergleichButton = document.getElementById("vergleichButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		vergleichButton.click();
		return false;
	}
}

function handlerStarteingaben(e) {
	var startButton = document.getElementById("startButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		startButton.click();
		return false;
	}
}



/* ****************************************************************************
 * init
 *****************************************************************************/

window.onload = init;

function init() {
	var rundenanzahl = document.getElementById("rundenanzahl");
	rundenanzahl.onkeypress = handlerStarteingaben;
	
	var silbenlaenge = document.getElementById("silbenlaenge");
	silbenlaenge.onkeypress = handlerStarteingaben;
	
	var startButton = document.getElementById("startButton");
	startButton.onclick = handlerStartButton;	
	
	var silbenEingabe = document.getElementById("silbenEingabe");
	silbenEingabe.onkeypress = handlerSilbenEingabe;
		
	var okButton = document.getElementById("okButton");
	okButton.onclick = handlerOkButton;
	
	var vergleichButton = document.getElementById("vergleichButton");
	vergleichButton.onclick = handlerVergleichButton;	
	
	var weiterButton = document.getElementById("weiterButton");
	weiterButton.onclick = handlerWeiterButton;	
	
	var nochmalButton = document.getElementById("nochmalButton");
	nochmalButton.onclick = handlerNochmalButton;
	
	var zurueckButton = document.getElementById("zurueckButton");
	zurueckButton.onclick = handlerZurueckButton;	
	
	$("#zeigeZeichenfolge").hide();
	$("#senden").hide();
	$('#richtigFalsch').hide();
	$('#endergebnis').hide();
	
	rundenanzahl.value = 2;
	silbenlaenge.value = 2;
}

