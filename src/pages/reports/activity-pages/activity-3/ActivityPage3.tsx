import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "../../../../hooks/useNavbar";
import styles from "./ActivityPage3.module.css";
import aarrowBack from "../../../../assets/svg/button-icon/ic_round-arrow-back.svg";
import Cards from "../../../../components/stat-cards/Cards";
import totalareaIcon from "../../../../assets/svg/cards-svg/location/Frame 115 (3).svg";
import GroupListTable from "../../../../components/tables/group-list-table/GroupListTable";
import apiClient from "../../../../utils/apiClient";
import lodingIcon from '../../../../assets/svg/table-icons/Dual Ball@1x-1.0s-200px-200px.svg'

interface Group {
  _id: string;
  name: string;
  noOfMembers: number;
  createdAt: string;
}

const ActivityPage3: React.FC = () => {
  const { setTitle } = useNavbar();
  const navigate = useNavigate();

  const [totalAreas, setTotalAreas] = useState(0);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle("All Groups Report");

    const fetchGroups = async () => {
      try {
        const response = await apiClient.get("/group");
        const { count, groups } = response.data.data;

        setTotalAreas(count);
        setGroups(groups);
        setLoading(false);
      } catch {
        setError("Failed to fetch group data.");
        setLoading(false);
      }
      
    };

    fetchGroups();
  }, [setTitle]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return   <div className={styles.anime}>
    <img src={lodingIcon} alt="Loading..." />
  </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const tableData = groups.map((group) => ({
    id: group._id,
    groupName: group.name,
    members: group.noOfMembers,
    dateCreated: new Date(group.createdAt).toLocaleDateString(),
  }));

  return (
    <div className={styles.section_header}>
      <div className={styles.arrowBackicon} onClick={handleBackClick}>
        <img src={aarrowBack} alt="Go Back" />
      </div>
      <h2>Overview</h2>
      <div className={styles.overview_cards}>
        <Cards icon={totalareaIcon} title="Total Areas" figure={totalAreas.toString()} />
      </div>
      <div className={styles.group_table}>
        <GroupListTable groups={tableData} />
      </div>
    </div>
  );
};

export default ActivityPage3;
