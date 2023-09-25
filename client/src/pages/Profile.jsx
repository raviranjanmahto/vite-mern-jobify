import { Form, useNavigation, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import raviranjan from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 1) toast("Wait, Image is Resizing...");
  try {
    await raviranjan.patch("/auth/updateUser", formData);
    toast.success("Profile update successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { fName, lName, location, email } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='POST' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5MB)
            </label>
            <input
              type='file'
              id='avatar'
              name='avatar'
              className='form-input'
              accept='image/*'
            />
          </div>
          <FormRow
            type='text'
            labelText='first name'
            name='fName'
            defaultValue={fName}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lName'
            defaultValue={lName}
          />
          <FormRow type='text' name='email' defaultValue={email} />
          <FormRow type='text' name='location' defaultValue={location} />
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
