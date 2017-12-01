namespace importer.player{
    export interface PlayerImporterEngine{
        readonly id: string;
        import(url:string):Promise<Player>;
    }
}