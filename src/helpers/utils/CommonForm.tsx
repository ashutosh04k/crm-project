import React from "react";
import { Form, Input, Select, Button, Checkbox } from "antd";

const { TextArea } = Input;

type ComponentType = "input" | "select" | "textarea" | "checkbox";

interface OptionItem {
  id: string;
  label: string;
}

interface FormControl {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  componentType: ComponentType;
  options?: OptionItem[];
  required?: boolean;
  hidden?: boolean;
}

interface CommonFormProps {
  formControls: FormControl[];
  formData: Record<string, string | boolean>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string | boolean>>>;
  onSubmit: (event: any) => void;
  buttonText?: string;
  isBtnDisabled?: boolean;
}

const CommonForm: React.FC<CommonFormProps> = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled = false,
}) => {
  const renderInputsByComponentType = (control: FormControl) => {
    const value = formData[control.name] || "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            type={control.type}
            required={control.required}
            value={value as string}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            onKeyPress={
              control.name === "phone"
                ? (e) => {
                    if (!/[\d]/.test(e.key)) e.preventDefault();
                  }
                : undefined
            }
            maxLength={control.name === "phone" ? 10 : undefined}
          />
        );

      case "select":
        return (
          <Select
            value={value as string}
            placeholder={control.placeholder || control.label}
            onChange={(val) => setFormData({ ...formData, [control.name]: val })}
          >
            {control.options?.map((option) => (
              <Select.Option key={option.id} value={option.label}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );

      case "textarea":
        return (
          <TextArea
            name={control.name}
            placeholder={control.placeholder}
            required={control.required}
            value={value as string}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
            rows={4}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            checked={Boolean(value)}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.checked })
            }
          >
            {control.label}
          </Checkbox>
        );

      default:
        return null;
    }
  };

  return (
    <Form
      layout="vertical"
      className="w-80 mx-auto"
      onFinish={onSubmit}
    >
      {formControls
  .filter(control => !control.hidden)  // skip hidden controls
  .map((control) => (
    <Form.Item
      key={control.name}
      label={control.componentType !== "checkbox" ? control.label : ""}
      required={control.required}
      name={control.name}
      rules={
        control.name === "phone"
          ? [
              { required: true, message: "Phone number is required" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            ]
          : control.required
          ? [{ required: true, message: `${control.label} is required` }]
          : []
      }
    >
      {renderInputsByComponentType(control)}
    </Form.Item>
  ))}


      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={isBtnDisabled}
          block
        >
          {buttonText || "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
