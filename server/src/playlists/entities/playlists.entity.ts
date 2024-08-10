import { Songs } from "src/songs/entities/songs.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToMany, ManyToOne, Column, PrimaryGeneratedColumn, Index, OneToMany } from "typeorm";

@Entity({ name: "playlists" })
export class Playlists {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    @Index()
    name: string;

    // @ManyToMany(() => Songs, songs => songs.playlists)
    // songs: Songs[];

    @OneToMany(() => Songs, songs => songs.playlist)
    songs: Songs[];

    @ManyToOne(() => User, user => user.playlists)
    user: User;
}