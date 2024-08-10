import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Albums } from "src/albums/entities/albums.entity";
import { Artists } from "src/artists/entities/artists.entity";
import { Playlists } from "src/playlists/entities/playlists.entity";
import { Songs } from "src/songs/entities/songs.entity";
import { User } from "src/users/entities/user.entity";
import { sqlVariables } from "src/variables/sql.variables";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async () => ({
            type: "postgres",
            host: sqlVariables.SQL_HOST,
            port: +sqlVariables.SQL_PORT,
            username: sqlVariables.SQL_USER,
            password: sqlVariables.SQL_PASS,
            database: sqlVariables.SQL_NAME,
            entities: [User, Artists, Albums, Playlists, Songs],
            synchronize: true
        })
    })]
})
export class SqlModule { }