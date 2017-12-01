namespace importer.team {
    export class TeamImporter {
        private engineList: TeamImporterEngine[];
        private engine: TeamImporterEngine;

        private domPrefix: string = 'rmimport_';

        constructor(engineList: TeamImporterEngine[]){
            this.engineList = engineList;
        }

        import(): void{
            let url: URL = new URL(window.location.href),
                paramNameEngine: string = this.domPrefix + 'engine',
                paramNameLink: string = this.domPrefix + 'link';

            if (url.searchParams.has(paramNameEngine) && url.searchParams.has(paramNameLink)){
                let engineId: string = url.searchParams.get(paramNameEngine),
                    link: string = url.searchParams.get(paramNameLink);

                this.setEngine(engineId);

                if (this.engine){
                    this.engine.import(link).then(function(team){
                        this.fillMask(team);
                    }.bind(this));
                }
            }
        }

        private fillMask(team: Team){
            let nameElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_name"]'),
                tagElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_short"]'),
                gameElement: HTMLInputElement = <HTMLInputElement> document.querySelector('select[name="game_id"]'),
                homepageElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_homepage"]'),
                twitterElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_social_twitter"]'),
                facebookElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_social_facebook"]'),
                steamElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="team_social_steam"]');

            if (team.name) nameElement.value = team.name;
            if (team.tag) tagElement.value = team.tag;
            if (team.game) gameElement.value = team.game.id.toString();
            if (team.homepage) homepageElement.value = team.homepage;
            if (team.twitter) twitterElement.value = team.twitter;
            if (team.facebook) facebookElement.value = team.facebook;
            if (team.steam) steamElement.value = team.steam;
        }

        private setEngine(id: string){
            this.engineList.forEach(function(engine){
                if (engine.id == id){
                    this.engine = engine;
                    return;
                }
            }.bind(this));
        }
    }
}