import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LoginAndRegisterPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";

const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow name='name' type='text' autoFocus='autoFocus' />
        <FormRow name='lastName' type='text' labelText='last name' />
        <FormRow name='email' type='email' />
        <FormRow name='location' type='text' />
        <FormRow name='password' type='password' />

        <button type='submit' className='btn btn-block'>
          Submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
