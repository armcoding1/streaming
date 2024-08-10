import { Injectable } from '@nestjs/common';
import * as nodeID3 from 'node-id3';
import * as sharp from 'sharp';

export interface MusicMetadata {
    title: string;
    mediaType: string;
    length: string;
    trackNumber: string;
    partOfSet: string;
    genre: string;
    album: string;
    performerInfo: string;
    year: string;
    artist: string;
    image?: {
        mime: string;
        type: {
            id: number;
            name?: string;
        };
        description: string;
        imageBuffer: Buffer;
    };
}

@Injectable()
export class AppService {}