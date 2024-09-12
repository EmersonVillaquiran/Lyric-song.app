import React, { useState, useEffect } from "react";
import "@/index.css";

import { PageTemplate } from "../../utils/PlayerCard/PageTemplate";
import { TagsTemplate } from "../../utils/PlayerCard/TagsTemplate";
import { TagItem } from "../../utils/PlayerCard/TagItem";
import { Search } from "../../utils/PlayerCard/Search";
import { PlayerTemplate } from "../../utils/PlayerCard/PlayerTemplate";
import { TitleAndTimeBox } from "../../utils/PlayerCard/TitleAndTimeBox";
import { Title } from "../../utils/PlayerCard/Title";
import { Time } from "../../utils/PlayerCard/Time";
import { Progress } from "../../utils/PlayerCard/Progress";
import { ButtonsAndVolumeBox } from "../../utils/PlayerCard/ButtonsAndVolumeBox";
import { ButtonsBox } from "../../utils/PlayerCard/ButtonsBox";
import { Loop } from "../../utils/PlayerCard/Loop";
import { Previous } from "../../utils/PlayerCard/Previous";
import { Play } from "../../utils/PlayerCard/Play";
import { Pause } from "../../utils/PlayerCard/Pause";
import { Next } from "../../utils/PlayerCard/Next";
import { Shuffle } from "../../utils/PlayerCard/Shuffle";
import { Volume } from "../../utils/PlayerCard/Volume";
import { PlaylistTemplate } from "../../utils/PlayerCard/PlaylistTemplate";
import { PlaylistItem } from "../../utils/PlayerCard/PlaylistItem";

import loopCurrentBtn from "@/utils/icons/loop_current.png";
import loopNoneBtn from "@/utils/icons/loop_none.png";
import previousBtn from "@/utils/icons/previous.png";
import playBtn from "@/utils/icons/play.png";
import pauseBtn from "@/utils/icons/pause.png";
import nextBtn from "@/utils/icons//next.png";
import shuffleAllBtn from "@/utils/icons/shuffle_all.png";
import shuffleNoneBtn from "@/utils/icons/shuffle_none.png";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? hours.toString() + ":" : "";
  const formattedMinutes =
    minutes < 10 && hours > 0
      ? "0" + minutes.toString() + ":"
      : minutes.toString() + ":";
  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds.toString()
      : remainingSeconds.toString();

  return formattedHours + formattedMinutes + formattedSeconds;
};

const Player = ({
  includeTags = true,
  includeSearch = true,
  showPlaylist = true,
  sortTracks = true,
  autoPlayNextTrack = true,
  customColorScheme = {},
  setCurrentSong,
  song,
  users,
  user
}) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [title, setTitle] = useState("");
  const [length, setLength] = useState(0);
  const [time, setTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [buffer, setBuffer] = useState(0);
  const [drag, setDrag] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffled, setShuffled] = useState(false);
  const [looped, setLooped] = useState(false);


  const userLogged = user?.id

  const trackList = Array.isArray(users?.results)
    ? users.results.find(user => user.id === userLogged)?.songs?.map((track, index) => ({
        url: track?.url,
        title: `${track?.artist} - ${track?.name}`,
        tags: track?.tags || ["Rock"],
      })) || []
    : [];

  useEffect(() => {
    setCurrentSong(title);
  }, [title, song]);

  let playlist = [];
  const [filter, setFilter] = useState([]);
  let [curTrack, setCurTrack] = useState(0);
  const [query, updateQuery] = useState("");

  const tags = [];
  trackList.forEach((track) => {
    track.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  useEffect(() => {
    if (!trackList || trackList.length === 0 || curTrack >= trackList.length) {
        console.warn("TrackList is empty or curTrack is out of bounds.");
        return;
    }

    const audio = new Audio(trackList[curTrack].url);
    audio.load();

    const setAudioData = () => {
        setLength(audio.duration);
        setTime(audio.currentTime);
    };

    const setAudioTime = () => {
        const curTime = audio.currentTime;
        setTime(curTime);
        setSlider(curTime ? ((curTime * 100) / audio.duration).toFixed(1) : 0);
    };

    const setAudioProgress = () => {
        const bufferedPercentage = (audio.buffered.end(0) / audio.duration) * 100;
        setBuffer(bufferedPercentage.toFixed(2));
    };

    const setAudioVolume = () => setVolume(audio.volume);
    const setAudioEnd = () => setHasEnded(!hasEnded);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("progress", setAudioProgress);
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ended", setAudioEnd);

    setAudio(audio);
    setTitle(trackList[curTrack].title);

    for (const [variable, value] of Object.entries(customColorScheme)) {
        document.documentElement.style.setProperty(`--${variable}`, value);
    }

    return () => {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
        audio.removeEventListener("progress", setAudioProgress);
        audio.removeEventListener("volumechange", setAudioVolume);
        audio.removeEventListener("ended", setAudioEnd);
        audio.pause();
        audio.src = "";
    };
}, []); 

  useEffect(() => {
    if (audio) {
      audio.src = trackList[curTrack].url;
      audio.load();

      audio.oncanplay = () => {
        setTitle(trackList[curTrack].title);
        play();
      };

      const setAudioEnd = () => {
        setHasEnded(!hasEnded);
      };
      audio.addEventListener("ended", setAudioEnd);

      return () => {
        audio.removeEventListener("ended", setAudioEnd);
      };
    }
  }, [curTrack]);

  useEffect(() => {
    if (audio) {
      if (shuffled) {
        playlist = shufflePlaylist(playlist);
      }
      if (looped) {
        play();
      } else if (autoPlayNextTrack && !looped) {
        next();
      } else {
        setIsPlaying(false);
      }
    }
  }, [hasEnded]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audio) {
      pause();
      const val = Math.round((drag * audio.duration) / 100);
      const bufferedRanges = audio.buffered;

      let isInBufferedRange = false;
      for (let i = 0; i < bufferedRanges.length; i++) {
        if (val >= bufferedRanges.start(i) && val <= bufferedRanges.end(i)) {
          isInBufferedRange = true;
          break;
        }
      }

      if (isInBufferedRange) {
        audio.currentTime = val;
      } else {
        const waitingHandler = () => {
          if (audio.readyState === 4) {
            audio.removeEventListener("waiting", waitingHandler);
            // console.log("waiting for data");
          }
        };
        audio.addEventListener("waiting", waitingHandler);
      }
    }
  }, [drag]);

  useEffect(() => {
    if (audio) {
      let setAudioEnd;

      if (looped) {
        setAudioEnd = () => {
          audio.currentTime = 0;
          play();
        };
      } else {
        setAudioEnd = () => {
          setHasEnded(!hasEnded);
        };
      }

      audio.addEventListener("ended", setAudioEnd);

      return () => {
        audio.removeEventListener("ended", setAudioEnd);
      };
    }
  }, [looped]);

  useEffect(() => {
    if (!playlist.includes(curTrack)) {
      setCurTrack((curTrack = playlist[0]));
    }
  }, [filter]);

  //  Handle functions

  const loop = () => {
    setLooped(!looped);
  };

  const previous = () => {
    const index = playlist.indexOf(curTrack);
    index !== 0
      ? setCurTrack((curTrack = playlist[index - 1]))
      : setCurTrack((curTrack = playlist[playlist.length - 1]));
  };

  const play = () => {
    setIsPlaying(true);
    audio.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const next = () => {
    const index = playlist.indexOf(curTrack);
    index !== playlist.length - 1
      ? setCurTrack((curTrack = playlist[index + 1]))
      : setCurTrack((curTrack = playlist[0]));
  };

  const shuffle = () => {
    setShuffled(!shuffled);
  };

  const shufflePlaylist = (arr) => {
    if (arr.length === 1) return arr;
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...shufflePlaylist(arr.filter((_, i) => i !== rand))];
  };

  const sortCompare = (a, b) =>
    !sortTracks ? null : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;

  const tagClickHandler = (e) => {
    const tag = e.currentTarget.innerHTML;
    if (!filter.includes(tag)) {
      setFilter([...filter, tag]);
    } else {
      const filteredArray = filter.filter((item) => item !== tag);
      setFilter([...filteredArray]);
    }
  };

  const playlistItemClickHandler = (e) => {
    const num = Number(e.currentTarget.getAttribute("data-key"));
    const index = playlist.indexOf(num);
    setCurTrack((curTrack = playlist[index]));
    play();
  };

  return (
    <PageTemplate>
      {includeTags && (
        <TagsTemplate>
          {tags.map((tag, index) => {
            return (
              <TagItem
                key={index}
                status={
                  filter.length !== 0 && filter.includes(tag) ? "active" : ""
                }
                tag={tag}
                onClick={tagClickHandler}
              />
            );
          })}
        </TagsTemplate>
      )}
      {includeSearch && (
        <Search
          value={query}
          onChange={(e) => updateQuery(e.target.value.toLowerCase())}
          placeholder={`Search ${trackList.length} tracks...`}
        />
      )}
      <PlayerTemplate>
        <TitleAndTimeBox>
          <Title title={title} />
          <Time
            time={`${!time ? "0:00" : formatTime(time)}/${
              !length ? "0:00" : formatTime(length)
            }`}
          />
        </TitleAndTimeBox>
        <Progress
          value={slider}
          progress={buffer}
          onChange={(e) => {
            setSlider(e.target.value);
            setDrag(e.target.value);
          }}
          onMouseUp={play}
          onTouchEnd={play}
        />
        <ButtonsAndVolumeBox>
          <ButtonsBox>
            <Loop src={looped ? loopCurrentBtn : loopNoneBtn} onClick={loop} />
            <Previous src={previousBtn} onClick={previous} />
            {isPlaying ? (
              <Pause src={pauseBtn} onClick={pause} />
            ) : (
              <Play src={playBtn} onClick={play} />
            )}
            <Next src={nextBtn} onClick={next} />
            <Shuffle
              src={shuffled ? shuffleAllBtn : shuffleNoneBtn}
              onClick={shuffle}
            />
          </ButtonsBox>
          <Volume
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value / 100);
            }}
          />
        </ButtonsAndVolumeBox>
      </PlayerTemplate>
      <PlaylistTemplate visibility={showPlaylist}>
        {trackList.sort(sortCompare).map((el, index) => {
          if (
            filter.length === 0 ||
            filter.some((filter) => el.tags.includes(filter))
          ) {
            if (el.title.toLowerCase().includes(query.toLowerCase())) {
              playlist.push(index);
              return (
                <PlaylistItem
                  status={curTrack === index ? "active" : ""}
                  key={index}
                  data_key={index}
                  title={el.title}
                  src={el.url}
                  onClick={playlistItemClickHandler}
                />
              );
            }
          }
        })}
      </PlaylistTemplate>
    </PageTemplate>
  );
};

export default Player;
