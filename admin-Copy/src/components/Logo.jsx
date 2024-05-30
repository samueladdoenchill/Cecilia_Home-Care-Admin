import { Link } from "react-router-dom";

const Logo = ({ type }) => {
  return (
    <div className=''>
      <Link
        to='/'
        className={`text-3xl font-semibold dark:text-white ${
          type && "text-white  text-5xl"
        }`}
      >
        Cecilia Homecare
        <span
          className={`text-2xl text-rose-500 ${type && " text-4xl font-bold"}`}
        >
          LLC
        </span>
      </Link>
    </div>
  );
};

export default Logo;
