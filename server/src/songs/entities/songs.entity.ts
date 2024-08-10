import { Albums } from "src/albums/entities/albums.entity";
import { Artists } from "src/artists/entities/artists.entity";
import { Playlists } from "src/playlists/entities/playlists.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "songs" })
export class Songs {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    @Index()
    name: string;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    duration: number;

    @Column()
    year: number;

    @Column({ default: false })
    liked: boolean;

    @ManyToOne(() => Artists, artists => artists.songs)
    artist: Artists;

    @ManyToOne(() => Albums, albums => albums.songs)
    album: Albums;

    // @ManyToMany(() => Playlists, playlists => playlists.songs)
    // playlists: Playlists[];

    @ManyToOne(() => Playlists, playlists => playlists.songs)
    playlist: Playlists | null;
}