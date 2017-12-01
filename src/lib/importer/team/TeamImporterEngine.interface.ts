namespace importer.team{
    export interface TeamImporterEngine{
        readonly id: string;
        import(url:string):Promise<Team>;
    }
}