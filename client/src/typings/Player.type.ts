import { Song } from "./Songs.type";

export interface PlayerProps {
    selected: Song;
    setSelected: {name:string, image: string, artist: string};
    playlist?: string;
}