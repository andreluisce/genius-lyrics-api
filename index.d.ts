declare module 'genius-lyrics-api' {
  type Options = {
    title: string;
    artist: string;
    apiKey: string;
    optimizeQuery?: boolean;
    authHeader?: boolean;
  };

  type Song = {
    id: number;
    title: string;
    artist: string;
    url: string;
    lyrics: string;
    albumArt: string;
  };

  type SearchResult = {
    id: number;
    url: string;
    title: string;
    artist: string;
    albumArt: string;
  };

  export function getLyrics(options: Options): Promise<string>;
  export function getSong(options: Options): Promise<Song>;
  export function searchSong(options: Options): Promise<SearchResult[]>;
}
