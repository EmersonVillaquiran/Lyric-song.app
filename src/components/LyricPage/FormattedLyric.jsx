import React from "react";

const FormattedLyric = ({ lyric }) => {
  // Procesar la letra en pares de líneas (español e inglés)
  const processLyric = (lyric) => {
    // Dividir la letra en líneas
    const lines = lyric.split("\n").filter(line => line.trim() !== "");

    // Combinar líneas en pares de español e inglés
    const pairs = [];
    for (let i = 0; i < lines.length; i += 2) {
      pairs.push([lines[i], lines[i + 1]]);
    }

    return pairs;
  };

  const getSpanishStyle = () => "text-slate-500 font-bold"; // estilo para las líneas en español
  const getEnglishStyle = () => "text-slate-50 italic";   // estilo para las líneas en inglés

  return (
    <div className="prose">
      {processLyric(lyric).map(([spanish, english], index) => (
        <div key={index} className="my-2">
          <p className={getSpanishStyle()}>{spanish}</p>
          <p className={getEnglishStyle()}>{english}</p>
        </div>
      ))}
    </div>
  );
};

export default FormattedLyric;