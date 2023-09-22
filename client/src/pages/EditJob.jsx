import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import raviranjan from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import FormRow from "../components/FormRow";
import FormRowSelect from "../components/FormRowSelect";

export const loader = async ({ params }) => {
  try {
    const { data } = await raviranjan(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("../all-jobs");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await raviranjan.patch(`/jobs/${params.id}`, data);
    toast.success("Job edited successfully");
    return redirect("../all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' defaultValue={job.position} />
          <FormRow type='text' name='company' defaultValue={job.company} />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='job status'
            list={["pending", "interview", "declined"]}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            labelText='job type'
            name='jobTypes'
            list={["full-time", "part-time", "internship"]}
            defaultValue={job.jobTypes}
          />
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

export default EditJob;
