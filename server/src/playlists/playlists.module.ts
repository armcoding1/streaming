import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Songs } from 'src/songs/entities/songs.entity';
import { Albums } from 'src/albums/entities/albums.entity';
import { Artists } from 'src/artists/entities/artists.entity';
import { Playlists } from './entities/playlists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Songs, Albums, Artists, Playlists]),],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule {}
