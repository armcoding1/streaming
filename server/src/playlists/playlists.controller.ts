import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { PlaylistsService } from "./playlists.service";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("playlists")
export class PlaylistsController {
    constructor(
        private readonly playlistsService: PlaylistsService
    ) { }

    @Post("create")
    @UseGuards(AuthGuard)
    async createPlaylist(
        @Body() playlistName: any,
        @Req() req: any
    ) {
        return await this.playlistsService.createPlaylist(req.user!.sub, playlistName.playlistName.playlistName);
    }

    @Get("find")
    @UseGuards(AuthGuard)
    async findPlaylists(
        @Req() req: any
    ) {
        return await this.playlistsService.findPlaylists(req.user.sub);
    }

    @Post("update")
    async updatePlaylist() {
        return this.playlistsService.updatePlaylist()
    }
}
