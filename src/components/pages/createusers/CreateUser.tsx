import  { useState } from "react";
import { Col, Row, message } from "antd";
import CommonForm from "../../../helpers/utils/CommonForm";
import { CreateCRMUser} from "../../../services/Api_Service";
import { CreateUserControl } from "../../../config";

const initialCreateuserFormData = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "",
  teamLead: "",
  admin: "",
};
const CreateUser = () => {

  const [formData, setFormData] = useState<Record<string, string | boolean>>(initialCreateuserFormData);
  const [loading, setLoading] = useState(false);

  const handleuserCreated = async (formData:any) => {
    setLoading(true);
    try {
      if (!/^\d{10}$/.test(formData.phone as string)) {
        message.error("Phone number must be exactly 10 digits.");
        setLoading(false);
        return;
      }
      const response = await CreateCRMUser(formData);
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
    // Show "Team Lead" only if role is Executive
    if (control.name === "teamLead") {
      return {
        ...control,
        hidden: formData.role !== "Executive",
        required: formData.role === "Executive",
      };
    }

    // Show "Admin" only if role is TeamLead
    if (control.name === "admin") {
      return {
        ...control,
        hidden: formData.role !== "TeamLead",
        required: formData.role === "TeamLead",
      };
    }

    return control;
  });
};

  return (
    <>
    <Row gutter={[14, 14]}>
      <Col span={20}>
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
