import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LoginAndRegisterPage";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow name='email' type='email' autoFocus='autoFocus' />
        <FormRow name='password' type='password' />
        <button type='submit' className='btn btn-block'>
          Submit
        </button>
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          New to Jobify?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
