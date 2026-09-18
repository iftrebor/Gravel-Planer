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

Die Werte sind Planungs- und Startwerte, keine medizinische Beratung. Trink-, Kohlenhydrat- und Natriumziele sollten während des Trainings getestet und an Körpergewicht, Intensität, Temperatur, Schweißrate und individuelle Verträglichkeit angepasst werden. Bei gesundheitlichen Problemen oder Unsicherheit sollte fachlicher Rat eingeholt werden.

Der Hitze-Modus setzt für die Berechnung mindestens 800 ml Flüssigkeit und 850 mg Natrium pro Stunde an. Die tatsächlichen Bedürfnisse können davon abweichen.

## Entwicklung

Die Anwendung besteht aus statischen HTML-, CSS- und JavaScript-Dateien und benötigt derzeit keinen Build-Schritt. Änderungen können direkt im Browser getestet werden. Nach Änderungen am Service Worker sollte die Cache-Version in `sw.js` erhöht werden, damit bereits installierte PWAs die neue App-Shell erhalten.

## Lizenz

Für dieses Projekt ist derzeit keine Lizenz hinterlegt. Ergänze eine Lizenzdatei, wenn der Code zur Weiterverwendung freigegeben werden soll.
