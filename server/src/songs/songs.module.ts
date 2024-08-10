import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './entities/songs.entity';
import { Artists } from 'src/artists/entities/artists.entity';
import { Albums } from 'src/albums/entities/albums.entity';
import { User } from 'src/users/entities/user.entity';
import { Playlists } from 'src/playlists/entities/playlists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Songs, Artists, Albums, User, Playlists])],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService]
})
export class SongsModule {}
