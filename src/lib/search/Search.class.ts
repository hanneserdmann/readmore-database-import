namespace search {
    export class Search {
        private searchEngine: SearchEngine;
        private searchEngines: SearchEngine[];
        private currentSite: CurrentSite;

        private urlAddPlayer: string = '/de/readmore/objects/edb/players/add';
        private urlAddTeam: string = '/de/readmore/objects/edb/teams/add';
        private domPrefix: string = 'rmimport_';

        private button: HTMLButtonElement;
        private select: HTMLSelectElement;
        private resultWrapper: HTMLDivElement;

        constructor(currentSite: CurrentSite, searchEngines: SearchEngine[]) {
            this.currentSite = currentSite;
            this.searchEngines = searchEngines;
        }

        search(query: string): void {
            if (this.searchEngine != null) {
                this.searchEngine.search(query.trim()).then(function (items: SearchResult[]) {
                    this.displayResults(items);
                }.bind(this));
            }
        }

        displayControls() {
            this.button = document.createElement('button');
            this.button.type = 'button';
            this.button.className = 'btn btn-warning';
            this.button.textContent = 'Search on';

            this.select = document.createElement('select');
            this.select.add(this.createElementWithText('option', '-- select source --') as HTMLOptionElement);

            this.searchEngines.forEach(function (engine: SearchEngine) {
                let option: HTMLOptionElement = this.createElementWithText('option', engine.name) as HTMLOptionElement;
                option.value = engine.id;
                this.select.add(option);
            }.bind(this));

            this.button.addEventListener('click', function () {
                this.search((document.getElementById('list_search') as HTMLInputElement).value);
            }.bind(this));

            this.select.addEventListener('change', function () {
                this.searchEngines.forEach(function (engine: SearchEngine) {
                    if (this.select.value == engine.id) {
                        this.searchEngine = engine;
                        return;
                    }
                }.bind(this));
            }.bind(this));

            document.querySelector('#list_search_form .input-append').appendChild(this.button);
            document.querySelector('#list_search_form .input-append').appendChild(this.select);
        }

        displayResults(items: SearchResult[]) {
            if (this.resultWrapper != null && typeof this.resultWrapper != 'undefined') {
                this.resultWrapper.remove();
                this.resultWrapper = null;
            }

            this.resultWrapper = document.createElement('div');
            this.resultWrapper.id = this.domPrefix + 'searchResults';

            let insertAfterNode: HTMLElement = document.querySelector('.container.freakms > .row-fluid') as HTMLElement,
                table: HTMLTableElement = document.createElement('table'),
                headRow: HTMLTableRowElement = document.createElement('tr');

            headRow.appendChild(this.createElementWithText('th', 'Type'));
            headRow.appendChild(this.createElementWithText('th', 'Name'));
            headRow.appendChild(this.createElementWithText('th', 'Description'));
            headRow.appendChild(this.createElementWithText('th', 'Link'));
            headRow.appendChild(this.createElementWithText('th', ''));

            table.className = 'table table-condensed';
            table.appendChild(headRow);

            items.forEach(function (item: SearchResult) {
                var row: HTMLTableRowElement = document.createElement('tr'),
                    linkExtern: HTMLAnchorElement = this.createElementWithText('a', 'Visit source') as HTMLAnchorElement,
                    linkIntern: HTMLAnchorElement = this.createElementWithText('a', 'Add') as HTMLAnchorElement;

                linkExtern.target = '_blank';
                linkExtern.href = item.link;

                linkIntern.href = this.currentSite.searchPlayer ? this.urlAddPlayer : (this.currentSite.searchTeam ? this.urlAddTeam : '');
                linkIntern.href = linkIntern.href + '?' + this.domPrefix + 'engine=' + encodeURI(this.searchEngine.id) + '&' + this.domPrefix + 'link=' + encodeURI(item.link);
                linkIntern.className = 'btn btn-success btn-mini right';

                row.appendChild(this.createElementWithText('td', item.type.toUpperCase()));
                row.appendChild(this.createElementWithText('td', item.name));
                row.appendChild(this.createElementWithText('td', item.description));
                row.appendChild(this.createElementWithChild('td', linkExtern));
                row.appendChild(this.createElementWithChild('td', linkIntern));
                table.appendChild(row);
            }.bind(this));

            this.resultWrapper.appendChild(table);
            insertAfterNode.parentNode.insertBefore(this.resultWrapper, insertAfterNode.nextSibling);
        }

        private createElementWithText(type: string, value: string): HTMLElement {
            var element = document.createElement(type);
            element.textContent = value;
            return element;
        }

        private createElementWithChild(type: string, child: HTMLElement): HTMLElement {
            var element = document.createElement(type);
            element.appendChild(child);
            return element;
        }
    }
}