class ReadmoreDatabaseImport{
    private currentSite: CurrentSite;

    private searchEngines: search.SearchEngine[];
    private search: search.Search;

    private playerImporterEngines: importer.player.PlayerImporterEngine[];
    private playerImporter: importer.player.PlayerImporter;

    private teamImporterEngines: importer.team.TeamImporterEngine[];
    private teamImporter: importer.team.TeamImporter;

    constructor(){
        this.currentSite = {
            searchPlayer: window.location.href.match(/(edb\/players$)|(edb\/players\/\?)/) != null,
            searchTeam:   window.location.href.match(/(edb\/teams$)|(edb\/teams\/\?)/) != null,
            addPlayer:    window.location.href.match(/(edb\/players\/add)/) != null,
            addTeam:      window.location.href.match(/(edb\/teams\/add)/) != null
        };

        this.searchEngines = [
            new search.overgg.SearchEngineOvergg(this.currentSite)
        ];

        this.playerImporterEngines = [
            new importer.player.overgg.PlayerImporterEngineOvergg()
        ];

        this.teamImporterEngines = [
            new importer.team.overgg.TeamImporterEngineOvergg()
        ];
    }

    public run():void{
        this.checkSearch();
        this.checkPlayerImporter();
        this.checkTeamImporter();
    }

    private checkSearch(): void{
        if (this.currentSite.searchPlayer || this.currentSite.searchTeam){
            this.search = new search.Search(this.currentSite, this.searchEngines);
            this.search.displayControls();
        }
    }

    private checkTeamImporter(): void{
        if (this.currentSite.addTeam){
            this.teamImporter = new importer.team.TeamImporter(this.teamImporterEngines);
            this.teamImporter.import();
        }
    }

    private checkPlayerImporter(): void{
        if (this.currentSite.addPlayer){
            this.playerImporter = new importer.player.PlayerImporter(this.playerImporterEngines);
            this.playerImporter.import();
        }
    }
}