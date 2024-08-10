import { Albums } from "src/albums/entities/albums.entity";
import { Songs } from "src/songs/entities/songs.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "artists" })
export class Artists {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Songs, songs => songs.artist)
    songs: Songs[];

    @OneToMany(() => Albums, albums => albums.artist)
    albums: Albums[];
}