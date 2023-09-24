import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import raviranjan from "../utils/customFetch";
import StatItem from "../components/StatItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

export const loader = async () => {
  try {
    const { data } = await raviranjan("auth/admin/applicationStats");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        title='total users'
        count={users}
        color='#E9B949'
        bcg='#FCEFC7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='total jobs'
        count={jobs}
        color='#647ACB'
        bcg='#E0E8F9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
