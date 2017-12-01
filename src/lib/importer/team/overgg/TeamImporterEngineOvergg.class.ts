namespace importer.team.overgg  {
    export class TeamImporterEngineOvergg implements TeamImporterEngine{
        readonly id: string = 'overgg';

        import(url:string): Promise<Team>{
            return new Promise<Team>(function(resolve, reject){
                let trimText = function(text: string): string{
                    return text.replace(/(\r?\n|\r)/gm, '').replace(/( +)|(\t+)/g, ' ').trim();
                };

                GM_xmlhttpRequest({
                    method: 'GET',
                    url: (url),
                    onerror: function(response){reject(null)},
                    onload: function(response){

                        let team: Team = new Team(),
                            html: string = response.responseText,
                            dom: Document = (new DOMParser()).parseFromString(html, "text/html"),
                            content: HTMLDivElement = <HTMLDivElement>dom.querySelector('#content > div.wf-card > div');

                        if (content != null){
                            let infos: HTMLElement = <HTMLElement>content.children[1],
                                name: string;

                            name = trimText(infos.children[0].textContent);

                            team.game = GameList.getGameByShortName('ow');
                            team.name = name;
                            team.tag = name;

                            for(let i:number = 2; i < infos.children.length; i++){
                                let link: HTMLAnchorElement = infos.children[i].querySelector('a'),
                                    classList: DOMTokenList = infos.children[i].classList;

                                if (link){
                                    if (link.href.match('twitter.com')) team.twitter = link.href;
                                    if (link.href.match('facebook.com')) team.facebook = link.href;
                                }

                                if (classList.contains('team-header-website')) team.homepage = link.href;
                            }
                        }
                        resolve(team);
                    }
                });
            })
        }
    }
}