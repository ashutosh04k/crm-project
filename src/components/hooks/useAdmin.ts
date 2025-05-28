import { useEffect, useState } from "react";
import { FetchAllAdmin } from "../../services/Api_Service";

export const useAdmins = () => {
  const [AdminOptions, setAdminOptions] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await FetchAllAdmin();
        const options = response.map((data: any) => ({
          label: data.name,
          value: data.id,
          role:data.role,
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
