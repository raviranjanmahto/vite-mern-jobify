import { FaWpforms } from "react-icons/fa";
import { MdQueryStats, MdAdminPanelSettings } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const links = [
  {
    text: "add job",
    path: ".",
    icon: <FaWpforms />,
  },
  {
    text: "all job",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
