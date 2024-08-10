import { Dispatch, SetStateAction } from "react";
import { Song } from "../typings/Songs.type";
import api from "./api";

export const fetchSongs = async (setSongs: Dispatch<SetStateAction<Song[]>>) => {
    try {
        const response = await api.get("songs", { withCredentials: true });
        setSongs(response.data);

    } catch (error) {
        console.error('Failed to fetch songs:', error);
    }
};