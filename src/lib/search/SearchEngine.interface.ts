namespace search {
    export interface SearchEngine {
        readonly id: string;
        readonly name: string;
        readonly game: Game;

        search(query: string): Promise<SearchResult[]>;
        setCurrentSite(currentSite: CurrentSite): void;
    }
}