import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import raviranjan from "../utils/customFetch";
import SearchContainer from "../components/SearchContainer";
import JobsContainer from "../components/JobsContainer";
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const { data } = await raviranjan("/jobs");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AllJobsContext = createContext();

const AllJobs = () => {
  const { jobs } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ jobs }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
