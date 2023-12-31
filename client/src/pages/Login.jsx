import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/LoginAndRegisterPage";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import raviranjan from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await raviranjan.post("auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "qwerty",
    };
    try {
      await raviranjan.post("auth/login", data);
      toast.success("Login successful");
      toast("This is demo user! Read only...");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow name='email' type='email' autoFocus='autoFocus' />
        <FormRow name='password' type='password' />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          New to Jobify?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
