import { useEffect, useState } from "react";
import { FetchSuperAdmin } from "../../services/Api_Service";

export const useSuperAdmins = () => {
  const [SuperAdminOptions, setSuperAdminOptions] = useState([]);

  useEffect(() => {
    const fetchSuperAdmins = async () => {
      try {
        const response = await FetchSuperAdmin();
        const options = response.map((data: any) => ({
          label: data.name,
          value: data.id,
          role:data.role,
        }));
        setSuperAdminOptions(options);
      } catch (error) {
        console.error("Error fetching team leads:", error);
      }
    };

    fetchSuperAdmins();
  }, []);

  return SuperAdminOptions;
};
