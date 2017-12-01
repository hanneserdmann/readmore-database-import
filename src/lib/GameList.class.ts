class GameList{
    static readonly gameList: Game[] = [
        <Game>{id: 55, name: 'Age of Empires II', shortName: 'aoe2'},
        <Game>{id: 47, name: 'Battlefield 3', shortName: 'bf3'},
        <Game>{id: 31, name: 'Call of Duty', shortName: 'cod'},
        <Game>{id: 1,  name: 'Counter-Strike', shortName: 'cs'},
        <Game>{id: 22, name: 'CS: Source', shortName: 'css'},
        <Game>{id: 48, name: 'CS:GO', shortName: 'csgo'},
        <Game>{id: 41, name: 'Defense of the Ancients', shortName: 'dota'},
        <Game>{id: 46, name: 'Diablo 3', shortName: 'd3'},
        <Game>{id: 45, name: 'Defense of the Ancients 2', shortName: 'dota2'},
        <Game>{id: 4,  name: 'FIFA', shortName: 'fifa'},
        <Game>{id: 57, name: 'Fighting Games', shortName: 'fg'},
        <Game>{id: 50, name: 'Fußball', shortName: 'soccer'},
        <Game>{id: 51, name: 'Hearthstone', shortName: 'hs'},
        <Game>{id: 40, name: 'Heroes of Newerth', shortName: 'hon'},
        <Game>{id: 53, name: 'Heroes of the Storm', shortName: 'hots'},
        <Game>{id: 42, name: 'League of Legends', shortName: 'lol'},
        <Game>{id: 60, name: 'Overwatch', shortName: 'ow'},
        <Game>{id: 2,  name: 'Painkiller', shortName: 'pk'},
        <Game>{id: 70, name: 'Playerunknown\'s Battlegrounds', shortName: 'pubg'},
        <Game>{id: 9,  name: 'Quake 4', shortName: 'q4'},
        <Game>{id: 64, name: 'Quake Champions', shortName: 'qc'},
        <Game>{id: 11, name: 'Quake Live', shortName: 'ql'},
        <Game>{id: 58, name: 'Rocket Beans', shortName: 'beans'},
        <Game>{id: 54, name: 'Smite', shortName: 'smite'},
        <Game>{id: 21, name: 'Sonstiges', shortName: 'else'},
        <Game>{id: 25, name: 'StarCraft', shortName: 'sc'},
        <Game>{id: 35, name: 'StarCraft II', shortName: 'sc2'},
        <Game>{id: 3,  name: 'WarCraft 3', shortName: 'wc3'},
        <Game>{id: 27, name: 'World of Warcraft', shortName: 'wow'}
    ];

    static getGameById(id: number): Game{
        let returnValue: Game;

        this.gameList.forEach(function(game){
            if (id == game.id){
                returnValue = game;
                return;
            }
        }.bind(this));

        return returnValue;
    }

    static getGameByShortName(shortName: string): Game{
        let returnValue: Game;

        this.gameList.forEach(function(game){
            if (shortName == game.shortName){
                returnValue = game;
                return;
            }
        }.bind(this));

        return returnValue;
    }
}