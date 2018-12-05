var gamecontainer = document.getElementById("game-container");
var title = document.getElementById("title");
var description = document.getElementById("description");
var buttons = document.getElementById("game-buttons");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var inventoryItem = document.getElementById("inventoryItem");
var image;
var inventory = [];
var reactorStatus = ("unprimed");

var background = new Audio("sound/background.mp3");
var steps = new Audio("sound/steps.mp3");
var pickup = new Audio("sound/pickup.mp3")
var death = new Audio("sound/alienscream.wav")
var explosion = new Audio("sound/explosion.wav")
var alarm = new Audio("sound/alarm.ogg")

function start() {
	typeAnimation(title, "Abandoned Ship", 0, 50);
	typeAnimation(description, "Je ontwaakt in een cryopod, geen idee waar je je bevindt en geen idee wie je bent. Je speelt dit spel door keuzes te maken onder aan het scherm.", 0, 10);
	button1.innerHTML="Start";
	button2.style.display="none";
	button3.style.display="none";
	inventoryItem.style.display="none";
	image=document.createElement("img");
	gamecontainer.appendChild(image);
	image.src="images/start.jpg";
	button1.onclick = function() {
		background.loop = true;
		background.play();
		opening();
	}
	inventory.splice(0);
	reactorStatus = ("unprimed")
}

function opening() {
	typeAnimation(title, "Cryo-chamber", 0, 50);
	typeAnimation(description, "Je ziet andere cryopods rond je heen, gevuld met geraamtes, wat is je eerste stap?", 0, 10);
	button1.style.display="inline-block";
	button2.style.display="inline-block";
	button3.style.display="none";
	button1.innerHTML="Loop naar de gang";
	button2.innerHTML="Kruip terug in de Cryopod";
	image.src="images/cryopod.jpg";
	console.log("Cryo-chamber");
	button1.onclick = function() {
		steps.play();
		corridor1();
	}
	button2.onclick = function() {
		sleepEnd();
	}
}

function sleepEnd() {
	typeAnimation(title, "Sleep Ending", 0, 50);
	typeAnimation(description, "Je kruipt weer terug in je Cryopod, valt in slaap en wordt nooit meer wakker. GAME OVER", 0, 10);
	button1.innerHTML="Restart";
	button2.style.display="none";
	image.src="images/cryopodending.jpeg";
	console.log("Bad End: Sleep Ending")
	button1.onclick = function() {
		image.style.display="none";
		start();
	}
}

function corridor1() {
	typeAnimation(title, "Gang buiten de Cryo-chamber", 0, 50);
	typeAnimation(description, "Je staat buiten de Cryo-chamber, Rechts van je zie je een deur richting een kantoor, en links richting de eetkamer", 0, 10);
	button2.style.display="inline-block";
	button3.style.display="inline-block";
	button1.innerHTML="Eetruimte";
	button2.innerHTML="Kantoor";
	button3.innerHTML="Ga terug naar de vorige kamer"
	image.src="images/hallway2.jpg";
	console.log("Gang buiten de Cryo-chamber");
	button1.onclick = function() {
		steps.play();
		diningArea();
	}
	button2.onclick = function() {
		steps.play();
		office();
	}
	button3.onclick = function() {
		steps.play();
		opening();
	}
}

function office() {
	typeAnimation(title, "Kantoor", 0, 50);
	typeAnimation(description, "Je staat binnen een kantoor, Je merkt de computers staan nog aan en dat er een scanner op de tafel ligt", 0, 10);
	button2.style.display="inline-block";
	button3.style.display="inline-block";
	button1.innerHTML="Gebruik de computer";
	button2.innerHTML="Pak de scanner op";
	button3.innerHTML="Ga terug naar de vorige kamer";
	image.src="images/office.jpg";
	console.log("Kantoor");
	button1.onclick = function() {
		steps.play();
		computerLog();
	}
	button2.onclick = function() {
		pickup.play();
		scanner();
	}
	button3.onclick = function() {
		steps.play();
		corridor1();
	}
	if (inventory == "een Scanner") {
		button2.style.display="none";
	}

}

function scanner() {
	typeAnimation(title, "Scanner", 0, 50);
	typeAnimation(description, "Je pakt de scanner op.", 0, 10);
	button1.innerHTML="Terug";
	button2.style.display="none";
	button3.style.display="none";
	image.src="images/scanner2.jpg";
	inventory.push("een Scanner");
	inventoryItem.src="images/scannerInv.png";
	inventoryItem.style.display="block";
	console.log("Je hebt in de inventaris: " + inventory)
	button1.onclick = function() {
		steps.play();
		office();
	}
}

function computerLog() {
	typeAnimation(title, "Computerscherm", 0, 50);
	typeAnimation(description, "Je loopt naar de computer toe en lees de laatste log", 0, 10);
	button1.innerHTML="Terug";
	button2.style.display="none";
	button3.style.display="none";
	image.src="images/computer.png";
	console.log("Computerscherm")
	button1.onclick = function() {
		steps.play();
		office();
	}
}


function diningArea() {
	typeAnimation(title, "Eetruimte", 0, 50);
	typeAnimation(description, "Op de tafel zie je eten en drinken, maar voor de rest is alles verlaten, alsof iedereen in een haast wegmoest.", 0, 10);
	button3.style.display="inline-block";
	button1.innerHTML="Ga door de deur recht voor je";
	button2.innerHTML="Ga door de deur links";
	button3.innerHTML="Ga terug naar de vorige kamer";
	image.src="images/diningarea.jpg";
	console.log("Eetruimte");
	if (inventory == "een Scanner") {
		button1.onclick = function() {
			steps.play();
			scannerHelp1();
		}
	}
	else {
		button1.onclick = function() {
			death.play();
			alienBiteNoScanner();
		}
	}
	button2.onclick = function() {
		steps.play();
		corridor2();
	}
	button3.onclick = function() {
		steps.play();
		corridor1();
	}
}

function alienBiteNoScanner() {
	typeAnimation(title, "Te laat", 0, 50);
	typeAnimation(description, "Je wordt van achter gegrepen, je draait je om en kijk recht tegenover Het Wezen, Het bijt je en je sterft een pijnlijke dood. GAME OVER", 0, 10);
	button2.style.display="none";
	button3.style.display="none";
	button1.innerHTML="Restart";
	image.src="images/alienbite.jpg";
	console.log("Bad Ending: Alien Encounter");
	button1.onclick = function() {
		image.style.display="none";
		start();
	}

}

function scannerHelp1() {
	typeAnimation(title, "Iets levends?", 0, 50);
	typeAnimation(description, "Je scanner pakt iets op in de verte! Ga je er naartoe of keer je je om?", 0, 10);
	button2.style.display="inline-block";
	button3.style.display="none";
	button1.innerHTML="Verken";
	button2.innerHTML="Ga terug";
	image.src="images/scanned.jpg";
	console.log("Iets levends?")
	button1.onclick = function() {
		steps.play();
		alienEncounter();
	}
	button2.onclick = function() {
		steps.play();
		diningArea();
	}
}

function alienEncounter() {
	typeAnimation(title, "Het Wezen", 0, 50);
	typeAnimation(description, "Je loopt verder door de hal en je ziet iets bewegen in de verte, langzaam kom het op je af en je ziet iets uit je ergste nachtmerries, alleen de bewegingen van wat Het ook is geven je al angst.", 0, 10);
	button2.style.display="inline-block";
	button3.style.display="none";
	button1.innerHTML="Probeer het monster te vechten";
	button2.innerHTML="Ren weg";
	image.src="images/alienEncounter2.jpg";
	console.log("Het Wezen")
	button1.onclick = function() {
		death.play();
		alienBiteScanner();
	}
	button2.onclick = function() {
		steps.play();
		diningArea();
	}
}

function alienBiteScanner() {
	typeAnimation(title, "Te laat", 0, 50);
	typeAnimation(description,"Je probeert tegen het Wezen te vechten maar het is veelste snel voor je, Het bijt je en je sterft een pijnlijke dood. GAME OVER", 0, 10);
	button2.style.display="none";
	button3.style.display="none";
	button1.innerHTML="Restart";
	image.src="images/alienbite.jpg";
	console.log("Bad Ending: Alien Encounter");
	button1.onclick = function() {
		image.style.display="none";
		start();
	}
}

function corridor2() {
	typeAnimation(title, "Hal buiten de Eetruimte", 0, 50);
	typeAnimation(description,"Je loopt door de deur links van de eetruimte, het is duister en je voelt je ongerust. Links van je zie je de deur naar de escapepods, en rechts van je naar de Kernreactor", 0, 10);
	button1.style.display="inline-block";
	button2.style.display="inline-block";
	button3.style.display="inline-block";
	button1.innerHTML="Naar de Escape-Pods";
	button2.innerHTML="Naar de Kernreactor";
	image.src="images/corridor2.jpg";
	console.log("Hal buiten de Eetruimte")
	button1.onclick = function() {
		escapePods();
	}
	if (inventory == "een Scanner") {
			button2.onclick = function() {
				steps.play();
				reactorCore();
			}
		}
		else {
			button2.onclick = function() {
				death.play();
				alienBiteNoScanner();
			}
		}
	button3.onclick = function() {
		steps.play();
		diningArea();
	}
}

function reactorCore() {
	typeAnimation(title, "In de Kernreactor", 0, 50);
	typeAnimation(description,"Je loopt door de deur rechts van de hal, je bevindt je in de kernreactor van het schip, voor je zie je een computer om het schip te vernietigen en van Het Wezen af te zijn.", 0, 10);
	button1.innerHTML="Activeer de zelf-vernietiging protocol";
	button2.innerHTML="Ga terug naar de vorige kamer.";
	button2.style.display="inline-block";
	button3.style.display="none";
	image.src="images/engineroom.jpg";
	console.log("In de Kernreactor")
	button1.onclick = function() {
		alarm.loop = true;
		alarm.play();
		reactorPrimed();
	}

	button2.onclick = function() {
		steps.play();
		corridor2();
	}

	if (reactorStatus == "primed") {
		button1.style.display="none";
	}
}

function reactorPrimed() {
	typeAnimation(title, "Reactor Terminal", 0, 50);
	typeAnimation(description,"Je activeert de computer en zet de zelf-vernietiging van het schip aan, om je heen gaan alarmen af.", 0, 10);
	button1.innerHTML="Terug";
	button2.style.display="none";
	reactorStatus = ("primed")
	image.src="images/reactorTerminal.png";
	console.log("Reactor Terminal")
	button1.onclick= function() {
		reactorCore();
	}
}

function escapePods() {
	typeAnimation(title, "Escape Pods", 0, 50);
	typeAnimation(description,"Je loopt door de deur links van de hal, Je vindt de Escape Pods en je kans om te ontsnappen van dit schip!", 0, 10);
	button2.style.display="inline-block";
	button3.style.display="none";
	button1.innerHTML="Klim in een Escape-Pod";
	button2.innerHTML="Ga terug naar de vorige kamer";
	image.src="images/escapepods.jpg";
	console.log("Escape Pods")
	if (reactorStatus == "primed") {
		button1.onclick = function() {
			goodEnding();
		}
	}
	else {
		button1.onclick = function() {
			death.play();
			badEnding();
		}
	}
	button2.onclick = function() {
		steps.play();
		corridor2();
	}
	console.log(reactorStatus)
}

function badEnding() {
	typeAnimation(title, "Ontsnapt...", 0, 50);
	typeAnimation(description,"Je klimt in een van de Escape-Pods, je start de launch procedure totdat je opeens van achter wordt gegrepen, een verschikkelijk monster staat recht voor je ogen, de angst die je voelt is het laatste wat door je heengaat voordat Het je doodt. GAME OVER", 0, 10);
	button2.style.display="none";
	button3.style.display="none";
	button1.innerHTML="Restart";
	image.src="images/BadEnding.jpg";
	console.log("Bad Ending: Alien Encounter");
	button1.onclick = function() {
		image.style.display="none";
		start();
	}
}

function goodEnding() {
	typeAnimation(title, "Ontsnapt!", 0, 50);
	typeAnimation(description,"Je klimt in een van de Escape-Pods, voordat je de deur sluit zie je Het Wezen proberen aanboord te komen. maar net voordat Het kan wordt het naar achteren geblazen door een explosie, je kan net de deur sluiten en de Escape-Pod lanceren.", 0, 10);
	button2.style.display="none";
	button3.style.display="none";
	image.src="images/AlienGoodEnd.jpg";
	console.log("Good Ending")
	button1.innerHTML="Volgende";
	button1.onclick = function() {
		explosion.play();
		alarm.loop = false;
		epilogue();
	}
}

function epilogue() {
	typeAnimation(title, "Epilogue", 0, 50);
	typeAnimation(description,"de Escape-Pod wordt van het schip gelanceerd, buiten het vizier kan je zien hoe het schip opblaast. Jij als enige overlevende van wat er plaatsvondt.", 0, 10);
	image.src="images/goodend.jpg"
	button1.style.display="inline-block";
	button2.style.display="none";
	button3.style.display="none";
	button1.innerHTML="New Game/Restart"
	console.log("Epilogue")
	button1.onclick = function() {
		image.style.display="none";
		start();
	}
}

function typeAnimation(element, text, i, speed) {
	if (i == 0){
		element.innerHTML = null;
	}
	if (i < text.length){
		element.innerHTML += text.charAt(i);
		i++;
		setTimeout(function(){
			typeAnimation(element, text, i, speed);
		}, speed);
	}
}

function buttonAnimate(element1, element2){
}
start();