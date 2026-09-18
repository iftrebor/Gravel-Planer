# Gravel-Planer

Eine mobile PWA zur Vorbereitung von Gravel-Touren. Der Planer berechnet auf Basis von Distanz, Geschwindigkeit und persönlichen Zielwerten einen Trink-, Kohlenhydrat- und Natriumplan und erstellt zusätzlich eine Snack- und Packstrategie.

## Funktionen

- Trink-, Kohlenhydrat- und Natriumplanung pro Stunde
- Hitze-Modus mit erhöhtem Flüssigkeits- und Natriumziel
- Berechnung von Flaschenmengen, Nachfüllungen und Drink-Rezept
- Snack-Strategie und stündlicher Ablaufplan
- Persistente Einstellungen und Packliste im Browser
- Dark-/Light-Mode
- Druck- und PDF-Ansicht
- Installierbare PWA mit Offline-App-Shell

## Verwendung

Die Anwendung kann direkt über GitHub Pages geöffnet werden. Alternativ reicht ein beliebiger statischer Webserver im Projektverzeichnis, zum Beispiel:

```bash
python3 -m http.server 8000
```

Danach ist die Anwendung unter `http://localhost:8000` erreichbar. Für Service Worker und PWA-Funktionen muss sie über HTTPS oder `localhost` ausgeliefert werden.

## Hinweise zu den Berechnungen

Die Werte sind Planungs- und Startwerte, keine medizinische Beratung. Trink-, Kohlenhydrat- und Salz-Ziele sollten während des Trainings getestet und an Körpergewicht, Intensität, Temperatur, Schweißrate und individuelle Verträglichkeit angepasst werden. Es gibt keinen allgemein passenden Salz-Stundenwert; Schweißmenge und Salzverlust unterscheiden sich stark. Bei gesundheitlichen Problemen oder Unsicherheit sollte fachlicher Rat eingeholt werden.

Die App rechnet mit Kochsalz: 1 g Salz entspricht ungefähr 393 mg Natrium. Als persönliche Startwerte sind 500 mg Salz pro Stunde normal und 850 mg Salz pro Stunde im Hitze-Modus hinterlegt. Die tatsächlichen Bedürfnisse können davon abweichen.

Für das reine Gel-Konzentrat aus Maltodextrin, Fruktose, Salz und Wasser rechnet die App mit 0,7 g beziehungsweise ungefähr 0,7 ml Wasser pro Gramm Kohlenhydrate. Die Wassermenge ist ein praxisorientierter Startwert für die Konsistenz und kann je nach Pulver, Temperatur und gewünschter Dosierbarkeit angepasst werden.

## Entwicklung

Die Anwendung besteht aus statischen HTML-, CSS- und JavaScript-Dateien und benötigt derzeit keinen Build-Schritt. Änderungen können direkt im Browser getestet werden. Nach Änderungen am Service Worker sollte die Cache-Version in `sw.js` erhöht werden, damit bereits installierte PWAs die neue App-Shell erhalten.

## Lizenz

Für dieses Projekt ist derzeit keine Lizenz hinterlegt. Ergänze eine Lizenzdatei, wenn der Code zur Weiterverwendung freigegeben werden soll.
