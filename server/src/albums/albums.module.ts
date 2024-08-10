import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Songs } from 'src/songs/entities/songs.entity';
import { Albums } from './entities/albums.entity';
import { Artists } from 'src/artists/entities/artists.entity';
import { Playlists } from 'src/playlists/entities/playlists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Songs, Albums, Artists, Playlists]),],
  controllers: [AlbumsController],
  providers: [AlbumsService]
})
export class AlbumsModule {}
