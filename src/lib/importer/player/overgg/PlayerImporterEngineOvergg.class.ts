namespace importer.player.overgg  {
    export class PlayerImporterEngineOvergg implements PlayerImporterEngine{
        readonly id: string = 'overgg';

        import(url:string): Promise<Player>{
            return new Promise<Player>(function(resolve, reject){
                let trimText = function(text: string): string{
                    return text.replace(/(\r?\n|\r)/gm, '').replace(/( +)|(\t+)/g, ' ').trim();
                };

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: (url),
                    onerror: function(response){reject(null)},
                    onload: function(response){
                        let player:Player = new Player(),
                            html: string = response.responseText,
                            dom: Document = (new DOMParser()).parseFromString(html, "text/html"),
                            content: HTMLDivElement = <HTMLDivElement>dom.querySelector('#content > div.wf-card > div');

                        if (content != null){
                            let infos: HTMLElement = <HTMLElement>content.children[1],
                                completeName: string,
                                names: string[];

                            completeName = trimText(infos.children[1].textContent);
                            names = completeName.match(/^(.+) ([^()]+)/);

                            player.game1 = GameList.getGameByShortName('ow');
                            player.nickname = trimText(infos.children[0].textContent);

                            if (names != null){
                                player.firstName = names[1];
                                player.lastName = names[2];
                            }

                            for(let i:number = 2; i < infos.children.length; i++){
                                let link: HTMLAnchorElement = infos.children[i].querySelector('a');

                                if (link){
                                    if (link.href.match('twitter.com')) player.twitter = link.href;
                                    if (link.href.match('facebook.com')) player.facebook = link.href;
                                }
                            }
                        }
                        resolve(player);
                    }
                });
            })
        }
    }
}