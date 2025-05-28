import { useEffect, useState } from "react";
import { FetchAllTeamLead } from "../../services/Api_Service";

export const useTeamLeads = () => {
  const [teamLeadOptions, setTeamLeadOptions] = useState([]);

  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await FetchAllTeamLead();
        const options = response.map((data: any) => ({
          label: data.name,
          value: data.id,
          role : data.role,
        }));
        setTeamLeadOptions(options);
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };

    fetchTeamLeads();
  }, []);

  return teamLeadOptions;
};
