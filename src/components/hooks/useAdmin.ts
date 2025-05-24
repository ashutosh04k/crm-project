import { useEffect, useState } from "react";
import { FetchAllAdmin } from "../../services/Api_Service";

export const useAdmins = () => {
  const [AdminOptions, setAdminOptions] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await FetchAllAdmin();
        const options = response.map((lead: any) => ({
          label: lead.name,
          value: lead.id,
        }));
        setAdminOptions(options);
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };

    fetchAdmins();
  }, []);

  return AdminOptions;
};
