import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlists } from "./entities/playlists.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlists)
        private readonly playlistsRepository: Repository<Playlists>
    ) { }

    async createPlaylist(userId: number, playlistName: string): Promise<Playlists> {
        const newPlaylist: Playlists = await this.playlistsRepository.save({ name: playlistName, user: { id: userId } });
        return newPlaylist;
    }

    async findPlaylists(userId: number): Promise<Playlists[]> {
        const playlists: Playlists[] = await this.playlistsRepository.find({ where: { user: { id: userId } } });

        return playlists;
    }

    async updatePlaylist() {
        const updatedPlaylist = await this.playlistsRepository.save({
            name: "Test",
            song: { id: 9 }
        })
        return updatedPlaylist;
    }
}