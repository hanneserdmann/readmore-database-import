namespace importer.player {
    export class PlayerImporter {
        private engineList: PlayerImporterEngine[];
        private engine: PlayerImporterEngine;

        private domPrefix: string = 'rmimport_';

        constructor(engineList: PlayerImporterEngine[]){
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
                    this.engine.import(link).then(function(player){
                        this.fillMask(player);
                    }.bind(this));
                }
            }
        }

        private fillMask(player: Player){
            let nickNameElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="player_nickname"]'),
                firstNameElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="player_firstname"]'),
                lastNameElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="player_lastname"]'),
                twitterElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="player_social_twitter"]'),
                facebookElement: HTMLInputElement = <HTMLInputElement> document.querySelector('input[name="player_social_facebook"]'),
                game1Element: HTMLSelectElement = <HTMLSelectElement> document.querySelector('select[name="game_id"]');

            if (player.nickname) nickNameElement.value = player.nickname;
            if (player.firstName) firstNameElement.value = player.firstName;
            if (player.lastName) lastNameElement.value = player.lastName;
            if (player.twitter) twitterElement.value = player.twitter;
            if (player.facebook) facebookElement.value = player.facebook;
            if (player.game1) game1Element.value = player.game1.id.toString();
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