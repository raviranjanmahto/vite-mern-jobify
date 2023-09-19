import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/LoginAndRegisterPage";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import raviranjan from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await raviranjan.post("auth/signup", data);
    toast.success("Registration successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow
          name='fName'
          type='text'
          labelText='first name'
          autoFocus='autoFocus'
        />
        <FormRow name='lName' type='text' labelText='last name' />
        <FormRow name='email' type='email' />
        <FormRow name='location' type='text' />
        <FormRow name='password' type='password' />

        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
