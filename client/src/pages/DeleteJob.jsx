import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import raviranjan from "../utils/customFetch";

export const action = async ({ params }) => {
  try {
    await raviranjan.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully");
    return redirect("..");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("../all-jobs");
  }
};
