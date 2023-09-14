import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            Jobify is the Job tracking application for the Student or working
            professional who want to track his/her job status. Once the Job
            status is change you can able to change status of your application
            by updating Job status.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn register-link'>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='main' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
