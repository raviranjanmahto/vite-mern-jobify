import logo from "../assets/images/logo.svg";

const Logo = () => {
  return (
    <nav>
      <img src={logo} alt='jobify' className='logo' />
    </nav>
  );
};

export default Logo;
