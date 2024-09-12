import { useEffect } from "react";
import FormattedLyric from "./FormattedLyric";
import OptionsCard from "./OptionsCard";


const LyricCard = ({
  currentSong,
  setSongEdit,
  setIsOpenForm,
  deleteSong,
  users,
  user,
}) => {
  const userLogged = user?.id;

  const userSongs = users.results?.find((user) => user.id === userLogged)?.songs; 
  const currentLyric = userSongs
    ? userSongs.find((ly) => `${ly.artist} - ${ly.name}` === currentSong)
    : null;

  useEffect(() => {
    users;
  }, [users]);

  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
      <div className=" p-4 md:p-6">
        {currentLyric ? (
          <div key={currentLyric.name}>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {currentLyric.artist} - {currentLyric.name}
            </h2>
            <div className="text-center">
              <div
                style={{ whiteSpace: "pre-wrap" }}
                className="prose text-muted-foreground overflow-auto max-h-[500px] text-center text-lg"
              >
                {/* {currentLyric.lyric.split("\n").map((line, index) => (
                  <p key={index} className="odd:text-slate-50">
                    {line}
                  </p>
                ))} */}
                <FormattedLyric lyric={currentLyric.lyric} />
              </div>
            </div>
          </div>
        ) : (
          <p>Canción no encontrada - Ingresa la letra</p>
        )}
        <div className="p-5">
          <OptionsCard
            setSongEdit={setSongEdit}
            setIsOpenForm={setIsOpenForm}
            currentLyric={currentLyric}
            deleteSong={deleteSong}
          />
        </div>
      </div>
    </div>
  );
};

export default LyricCard;
