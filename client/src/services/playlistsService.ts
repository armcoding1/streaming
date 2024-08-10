import { Dispatch, SetStateAction } from "react";
import api from "./api";
import { IPlaylist } from "../typings/Playlists.type";

export const findPlaylists = async (setPlaylists: Dispatch<SetStateAction<IPlaylist[] | undefined>>) => {
    try {
        const response = await api.get("playlists/find", { withCredentials: true });
        
        setPlaylists(response.data);

    } catch (error: unknown) {
        console.error("Error fetching playlists", error);
        setPlaylists([]);
    }
}