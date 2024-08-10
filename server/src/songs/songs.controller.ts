import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Songs } from './entities/songs.entity';

@Controller('songs')
export class SongsController {
    constructor(
        private readonly songsService: SongsService
    ) { }

    @Post("create")
    async createSong() {
        return this.songsService.createSong()
    }

    @Get()
    async findAllSongs(): Promise<Songs[]> {
        return this.songsService.findSongs();
    }

    @Patch("like")
    async likeSong(
        @Body("songId") songId: number
    ) {
        return this.songsService.likeSong(songId);
    }

    @Patch("update/:playlistId")
    async addSongToPlaylist(
        @Param("playlistId", ParseIntPipe) playlistId: number,
        @Body() updateSongDto: any
    ) {
        return this.songsService.addSongToPlaylist(updateSongDto.songId, playlistId);
    }

    @Get("playlist/:playlistId")
    async findPlaylistSongs(
        @Param("playlistId", ParseIntPipe) playlistId: number
    ) {
        console.log(playlistId);
        
        return this.songsService.findPlaylistSongs(playlistId);
    }

    @Patch("delete/:songId")
    async deleteFromPlaylist(
        @Param("songId", ParseIntPipe) songId: number,
    ) {
        return this.songsService.deleteFromPlaylist(songId);
    }

    @Get("favouriteSongs")
    async getFavouriteSongs() {
        return this.songsService.getFavouriteSongs();
    }
}