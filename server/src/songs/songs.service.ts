import { Injectable, NotFoundException } from '@nestjs/common';
import { SongMetadata } from './typings/songMetadata.type';
import * as NodeID3 from 'node-id3';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';
import { Songs } from './entities/songs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artists } from 'src/artists/entities/artists.entity';
import { Albums } from 'src/albums/entities/albums.entity';
import * as fs from 'fs-extra';
import { Playlists } from 'src/playlists/entities/playlists.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Songs)
        private songsRepository: Repository<Songs>,
        @InjectRepository(Artists)
        private artistsRepository: Repository<Artists>,
        @InjectRepository(Albums)
        private albumsRepository: Repository<Albums>,
        @InjectRepository(Playlists)
        private playlistsRepository: Repository<Playlists>,
    ) { }

    async getSongMetadata(filePath: string): Promise<SongMetadata | null> {
        try {
            const tags: SongMetadata = NodeID3.read(filePath) as SongMetadata;

            if (tags.image && tags.image.imageBuffer) {
                const imageSharp = sharp(tags.image.imageBuffer);

                await imageSharp.toFile(`./static/img/${tags.title}.jpg`);
            }

            return tags;
        } catch (error: unknown) {
            console.error("Error reading metadata:", error);
            return null;
        }
    }

    async createSong(): Promise<void> {
        const files = await fs.readdir("./static/songs");

        for (const file of files) {
            const songsMetadata = await this.getSongMetadata(`./static/songs/${file}`);
            if (!songsMetadata) {
                continue;
            }

            let artist: Artists | null = await this.artistsRepository.findOne({ where: { name: songsMetadata.artist } });

            if (!artist) {
                artist = await this.artistsRepository.save({ name: songsMetadata.artist });
            }

            let album: Albums | null = await this.albumsRepository.findOne({ where: { name: songsMetadata.album } });

            if (!album) {
                album = await this.albumsRepository.save({ name: songsMetadata.album, artist: { id: artist.id } });
            }

            const songsData = {
                name: songsMetadata.title,
                artist: artist,
                album: album,
                image: songsMetadata.title,
                duration: parseInt(songsMetadata.length, 10),
                year: parseInt(songsMetadata.year, 10)
            } as Songs;

            await this.songsRepository.save(songsData);
        }
    }

    async findSongs(): Promise<Songs[]> {
        return this.songsRepository.find({
            relations: ['artist', 'album'],
        });
    }

    async likeSong(songId: number): Promise<Songs> {
        const song: Songs | null = await this.songsRepository.findOne({ where: { id: songId } });

        if (!song) {
            throw new Error(`Song with id ${songId} not found`);
        }

        song.liked = !song.liked;

        await this.songsRepository.save(song);

        return song;
    }

    async addSongToPlaylist(songId: number, playlistId: number): Promise<Songs | null> {
        const song = await this.songsRepository.findOne({ where: { id: songId } });

        if (!song) {
            throw new NotFoundException("Song with this id not found");
        }

        const playlist = await this.playlistsRepository.findOne({ where: { id: playlistId } });

        if (!playlist) {
            throw new NotFoundException("Playlist with this id not found");
        }

        song.playlist = playlist;
        await this.songsRepository.save(song);

        return song;
    }

    async findPlaylistSongs(playlistId: number): Promise<Songs[] | null> {
        const playlistSongs = await this.songsRepository.find({ where: { playlist: { id: playlistId } }, relations: ['artist', 'album'] });
        return playlistSongs
    }

    async deleteFromPlaylist(songId: number): Promise<Songs | null> {
        const song = await this.songsRepository.findOne({ where: { id: songId } });

        if (!song) {
            throw new NotFoundException("Song with this id not found");
        }

        song.playlist = null;
        await this.songsRepository.save(song);

        return song
    }

    async getFavouriteSongs(): Promise<Songs[]> {
        const favouriteSongs: Songs[] = await this.songsRepository.find({ where: { liked: true } });
        return favouriteSongs;
    }
}
