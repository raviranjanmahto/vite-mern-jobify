import { Form, redirect, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";
import raviranjan from "../utils/customFetch";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await raviranjan.post("/jobs", data);
    toast.success("Job added successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText='job status'
            name='jobStatus'
            list={["pending", "interview", "declined"]}
          />
          <FormRowSelect
            labelText='job type'
            name='jobTypes'
            list={["full-time", "part-time", "internship"]}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
