import { Exclude } from "class-transformer";
import { Playlists } from "src/playlists/entities/playlists.entity";
import { Songs } from "src/songs/entities/songs.entity";
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    public id!: number;

    @Column({ unique: true })
    @Index()
    public username!: string;

    @Exclude()
    @Column()
    public password!: string;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @OneToMany(() => Playlists, playlists => playlists.user)
    playlists: Playlists[];
};