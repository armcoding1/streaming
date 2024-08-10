import { Artists } from "src/artists/entities/artists.entity";
import { Songs } from "src/songs/entities/songs.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "albums" })
export class Albums {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    name: string;
    
    @ManyToOne(() => Artists, artists => artists.albums)
    artist: Artists;

    @OneToMany(() => Songs, songs => songs.album)
    songs: Songs[];
}