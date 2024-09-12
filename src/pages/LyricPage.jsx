import "../App.css";
import "@madzadev/audio-player/dist/index.css";
import PlayerCard from "../components/LyricPage/Player";
import LyricCard from "../components/LyricPage/LyricCard";
import lyrics from "../utils/lyrics.json";
import { useEffect, useState } from "react";
import Loading from "../components/LyricPage/Loading";
import FormAddSong from "../components/LyricPage/FormAddSong";
import useCrud from "../hooks/useCrud";
import UserLogged from "@/components/LoginPage/UserLogged";
import TittleOfPage from "@/components/LyricPage/TittleOfPage";

const LyricPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [songEdit, setSongEdit] = useState();
  const [lyric, setLyric] = useState(lyrics);
  const [currentSong, setCurrentSong] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const BASEURL = import.meta.env.VITE_API_URL;

  const [songs, getSongs, createSongs, updateSong, deleteSong, loading, error] =
    useCrud(BASEURL);

  const [users, getUsers, , , , ,] = useCrud(BASEURL);

  useEffect(() => {
    getSongs("/songs");
  }, []);

  useEffect(() => {
    getUsers("/users");
  }, [user, songs]);

  return (
    <div className="h-screen dark">
      <div className="shadow-slate-500 shadow-xl mb-5 flex justify-between h-[150px] p-5">
        <TittleOfPage/>
        <UserLogged />
      </div>
      <FormAddSong
        createSongs={createSongs}
        updateSong={updateSong}
        songEdit={songEdit}
        setSongEdit={setSongEdit}
        isOpenForm={isOpenForm}
        setIsOpenForm={setIsOpenForm}
        users={users}
        user={user}
      />
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 md:p-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>Canción no encontrada</div>
        ) : (
          <LyricCard
            lyric={lyric}
            currentSong={currentSong}
            song={songs}
            songEdit={songEdit}
            setSongEdit={setSongEdit}
            setIsOpenForm={setIsOpenForm}
            deleteSong={deleteSong}
            users={users}
            user={user}
          />
        )}
        {loading ? (
          <Loading />
        ) : error ? (
          <div>Canción no encontrada</div>
        ) : (
          <PlayerCard
            setLyric={setLyric}
            setCurrentSong={setCurrentSong}
            song={songs}
            users={users}
            user={user}
          />
        )}
      </div>
    </div>
  );
};

export default LyricPage;
