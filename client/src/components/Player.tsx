import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import api from "../services/api";
import _ from "lodash";
import { Box, Button, Flex, Image, Progress, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { Song } from "../typings/Songs.type";

const Player: FC<any> = ({ selected, setSelected, playlist = "all" }) => {
    const [songs, setSongs] = useState<Array<Song>>([]);
    const [buttonText, setButtonText] = useState(<Image src="/assets/img/play.png" cursor="pointer" onClick={handlePausePlay} />);
    const [progressWidth, setProgressWidth] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const audio = useRef<HTMLAudioElement>(null);
    const [volumeLevel, setVolumeLevel] = useState(1);

    useEffect(() => {
        const fetchSongs = async () => {
            let response;
            if (playlist === "all") {
                response = await api.get("/songs");
            } else {
                response = await api.get(`/songs/playlist/${playlist}`)
            }
            setSongs(response!.data);
        };
        fetchSongs();
    }, [])

    useEffect(() => {
        const updateProgress = () => {
            const currentTime = audio.current?.currentTime;
            const duration = audio.current?.duration;
            const progress = currentTime! * 100 / duration!;

            setProgressWidth(progress)
        }

        audio.current?.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.current?.removeEventListener("timeupdate", updateProgress);
        };

    }, []);

    const handleNext = () => {
        const currentIndex = songs.findIndex((song) => selected.name === song.name);
        let nextIndex = currentIndex + 1;
        if (nextIndex >= songs.length) {
            nextIndex = 0;
        }

        setSelected({
            name: songs[nextIndex].name,
            image: songs[nextIndex].image,
            artist: songs[nextIndex].artist.name,
        });
    }

    const handlePrevious = () => {
        const currentIndex = songs.findIndex((song) => selected.name === song.name);
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = songs.length - 1;
        }

        setSelected({
            name: songs[prevIndex].name,
            image: songs[prevIndex].image,
            artist: songs[prevIndex].artist.name,
        });
        console.log(selected);
    }

    function handlePausePlay() {
        if (!audio.current?.paused) {
            audio.current?.pause()
        } else {
            audio.current?.play()
        }
    }

    const handleShuffle = () => {
        setSongs(_.shuffle(songs));
    }

    const handleLoop = () => {
        setIsLoop(!isLoop)
    }

    const handleVolumeChange = (value: number) => {
        if (audio.current) {
            audio.current.volume = value;
            setVolumeLevel(value);
        }
    }

    return (
        <Box>
            {selected && (
                <Box position="fixed" bottom="0" bg="#fff" w="100%" px="30px" py="20px" >
                    <Flex alignItems="end" justifyContent="space-between">
                        <Flex gap="10px">
                            <Image src={`/assets/img/${selected.image}.jpg`} h="50px" />
                            <Flex flexDirection="column">
                                <Text>{selected.name}</Text>
                                {/* <Text>{selected.artist.name}</Text> */}
                                <Text>{selected.artist ? selected.artist.name : 'Unknown Artist'}</Text>
                            </Flex>
                        </Flex>
                        <audio src={`/songs/${selected.name}.mp3`} hidden autoPlay controls ref={audio} loop={isLoop} onEnded={handleNext}></audio>
                        <Flex flexDirection="column" gap="20px" w="50%" justifyContent="center" alignItems="center">
                            <Flex alignItems="center" gap="30px">
                                <Image src="/assets/img/Shuffle.png" cursor="pointer" onClick={handleShuffle} />
                                <Image src="/assets/img/SkipBack.png" cursor="pointer" onClick={handlePrevious} />
                                {buttonText}
                                <Image src="/assets/img/SkipNext.png" cursor="pointer" onClick={handleNext} />
                                <Image src="/assets/img/Repeat.png" cursor="pointer" onClick={handleLoop} />
                            </Flex>
                            <Slider w="100%" aria-label='slider-ex-1' defaultValue={0} value={progressWidth} colorScheme="orange">
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                            </Slider>
                        </Flex>
                        <Slider aria-label='volume-slider' w="100px" defaultValue={1} min={0} max={1} step={0.01} value={volumeLevel} onChange={handleVolumeChange} colorScheme="orange">
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default Player;
