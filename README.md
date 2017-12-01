# Readmore Database Import Userscript

Einfaches Userscript um Spieler und Teams in die Readmore Datenbank zu importieren. Aktuell ist nur der Over.gg Import umgesetzt, 
weitere Quellen können aber einfach hinzugefügt werden. Dazu das PlayerImporterEngine, TeamImporterEngine beziehungsweise
SearchEngine Interface implementieren und in der ReadmoreDatabaseImport Klasse registrieren.

## Installation

Um das Userscript benutzen zu können wird [Tampermonkey (Chrome)](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=de)
beziehungsweise [Greasemonkey (Firefox)](https://addons.mozilla.org/de/firefox/addon/greasemonkey/) vorausgesetzt.

## Entwickeln

Das Readmore Database Import Userscript wird in [Typescript](https://www.typescriptlang.org/) entwickelt und benutzt
[Node.js](https://nodejs.org/en/) sowie [Gulp](https://gulpjs.com/).

1. Node installieren
2. Shell öffnen und in das entsprechende Verzeichnis mit dem Quelltext wechseln
3. ```npm install``` ausführen
4. ```gulp``` baut das Userscript, es wird im dist/ Ordner gespeichert
5. ```gulp watch``` überwacht den Quelltext und baut bei Änderungen automatisch