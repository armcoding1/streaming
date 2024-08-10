import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { Playlists } from 'src/playlists/entities/playlists.entity';
import { Artists } from './entities/artists.entity';
import { Albums } from 'src/albums/entities/albums.entity';
import { Songs } from 'src/songs/entities/songs.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Songs, Albums, Artists, Playlists]),],
  controllers: [ArtistsController],
  providers: [ArtistsService]
})
export class ArtistsModule {}
