import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={'/'}>
      <img
        src="/lyric-logo.png"
        alt="logo"
        className="w-[30em] h-[30em]" // Ajusta el tamaño según lo necesites
      />
    </Link>
  );
};

export default Logo;
