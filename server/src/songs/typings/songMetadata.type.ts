export interface SongMetadata {
    title: string;
    length: string;
    trackNumber: string;
    genre: string;
    album: string;
    year: string;
    artist: string;
    image?: {
        imageBuffer: Buffer;
    }
}