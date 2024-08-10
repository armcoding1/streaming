import React, { SetStateAction } from "react";

export interface ISetSelectedSong {
    setSelectedSong: React.Dispatch<SetStateAction<{ name: string, image: string, artist: string } | null>>;
    searchText?: string;
}

export interface Song {
    id: number;
    name: string;
    image: string;
    artist: {
        id: number;
        name: string;
    };
    album: {
        id: number;
        name: string;
    };
    createdAt: Date;
    duration: number;
    liked: boolean;
}
