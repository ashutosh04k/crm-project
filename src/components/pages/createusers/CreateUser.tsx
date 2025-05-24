import { useState } from "react";
import { Col, Row, message } from "antd";
import CommonForm from "../../../helpers/utils/CommonForm";
import { CreateCRMUser } from "../../../services/Api_Service";
import { CreateUserControl } from "../../../config";
import { useTeamLeads } from "../../hooks/useTeamLead";
import { useAdmins } from "../../hooks/useAdmin";

const initialCreateuserFormData = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "",
  teamLead: "",
  admin: "",
  managerId:"",
};

const CreateUser = () => {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(initialCreateuserFormData);
  const [loading, setLoading] = useState(false);
  const teamLeads = useTeamLeads();
  const Admins = useAdmins();


  const handleuserCreated = async (formData: any) => {
  setLoading(true);
  try {
    if (!/^\d{10}$/.test(formData.phone as string)) {
      message.error("Phone number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    // Set managerId based on role
    let managerId = "";
    if (formData.role === "Executive") {
      managerId = formData.teamLead; // This should be the selected teamLead's id
    } else if (formData.role === "TeamLead") {
      managerId = formData.admin; // This should be the selected admin's id
    }

    const submitData = { ...formData, managerId };

    const response = await CreateCRMUser(submitData);
    message.success("User created successfully!");
    setFormData(initialCreateuserFormData);
  } catch (err) {
    message.error("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  const getDynamicFormControls = () => {
  return CreateUserControl.map((control) => {

    if (control.name === "Admin") {
      return {
        ...control,
        options: Admins,
        hidden: formData.role !== "TeamLead",
        // required: formData.role === "TeamLead",
      };
    }
    if (control.name === "TeamLead") {
      return {
        ...control,
        options: teamLeads,
        hidden: formData.role !== "Executive",
        // required: formData.role === "Executive",
      };
    }

    return control;
  });
};


  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: '0 auto', maxWidth: '100%', overflowX: 'hidden' }}>
        <Col span={24} style={{ overflowX: 'auto' }}>
          <CommonForm
            formControls={getDynamicFormControls()}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleuserCreated}
            buttonText={loading ? "User Creating..." : "Create User"}
            isBtnDisabled={loading}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateUser;