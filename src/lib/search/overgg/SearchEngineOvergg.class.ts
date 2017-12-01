namespace search.overgg {
    export class SearchEngineOvergg implements search.SearchEngine{
        readonly id: string = 'overgg';
        readonly name: string = 'Over.gg';
        readonly game = GameList.getGameByShortName('ow');

        private currentSite: CurrentSite;
        private url: string = 'https://www.over.gg';

        constructor(currentSite: CurrentSite){
            this.currentSite = currentSite;
        }

        search(query: string){
            let currentSite: CurrentSite = this.currentSite,
                url: string = this.url;

            return new Promise<SearchResult[]>(function(resolve, reject){
                let trimText = function(text: string): string{
                    return text.replace(/(\r?\n|\r)/gm, '').replace(/( +)|(\t+)/g, ' ').trim();
                };

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: (url + '/search/?q=') + encodeURI(query),
                    onerror: function(response){reject(<SearchResult[]>[])},
                    onload: function(response){
                        let html: string = response.responseText,
                            dom: Document = (new DOMParser()).parseFromString(html, "text/html"),
                            searchItems: NodeListOf<HTMLAnchorElement> = (dom.querySelectorAll('#content a.search-item') as NodeListOf<HTMLAnchorElement>),
                            searchItemsIterable: HTMLAnchorElement[] = Array.prototype.slice.call(searchItems, 0),
                            parsedItems: SearchResult[] = [];

                        searchItemsIterable.forEach(function(item: HTMLAnchorElement){
                            var name: HTMLDivElement  = item.querySelector(".search-item-title") as HTMLDivElement,
                                description: HTMLDivElement = item.querySelector(".search-item-desc") as HTMLDivElement,
                                image: HTMLImageElement = item.querySelector("div>img") as HTMLImageElement,
                                type: string = "";

                            if      (item.href.match(/\/team\//))   type = 'team';
                            else if (item.href.match(/\/player\//)) type = 'player';

                            if (currentSite.searchPlayer && type == 'player' || currentSite.searchTeam && type == 'team'){
                                parsedItems.push(<SearchResult>{
                                    name:        (name == null) ? '' : trimText(name.textContent),
                                    description: (description == null) ? '' : trimText(description.textContent),
                                    image:       (image == null) ? '' : image.src,
                                    link:        url + ((new URL(item.href)).pathname),
                                    type:        type
                                });
                            }
                        });
                        resolve(parsedItems);
                    }
                });
            })
        }

        setCurrentSite(currentSite: CurrentSite): void{
            this.currentSite = currentSite;
        }
    }
}