import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqlModule } from './config/sql.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { Songs } from './songs/entities/songs.entity';
import { Albums } from './albums/entities/albums.entity';
import { Artists } from './artists/entities/artists.entity';
import { Playlists } from './playlists/entities/playlists.entity';
import { SongsService } from './songs/songs.service';

@Module({
  imports: [
    SqlModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Songs, Albums, Artists, Playlists]),
    SongsModule,
    ArtistsModule,
    AlbumsModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService, SongsService],
})
export class AppModule {}
