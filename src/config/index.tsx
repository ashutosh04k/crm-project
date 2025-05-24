import { USER_ROLE_OPTIONS } from "../helpers/constants/userRoles.constant";

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input" as const,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input" as const,
    required: true,
  },
]

export const CreateUserControl = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter User Name",
    type: "text",
    componentType: "input" as const,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter User email",
    type: "email",
    componentType: "input" as const,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input" as const,
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter your 10-digit phone number",
    componentType: "input" as const,
    type: "tel",
    required: true,
  },
  {
    name: "role",
    label: "Select Role",
    placeholder: "Select the role",
    componentType: "select" as const,
    valueField: "label",
    type: "text",
    options: USER_ROLE_OPTIONS,
    required: true,
  },
  {
    name: "TeamLead",
    managerId:"managerid",
    label: "Select Team Lead",
    placeholder: "Select The Team Lead For the Executive",
    componentType: "select" as const,
    type: "text",
    valueField: "id",
    options: [],
  },
  {
    name: "Admin",
    label: "Select Admin",
    placeholder: "Select Admin For the Team Lead",
    componentType: "select" as const,
    type: "text",
    valueField: "id",
    options: [],
  }
];

export const CreateLeadControl = [
  {
    name: "clientName",
    label: "Name",
    placeholder: "Enter Lead Name",
    type: "text",
    componentType: "input" as const,
    required: true,
  },
  {
    name: "clientPhone",
    label: "Phone Number",
    placeholder: "Enter Lead 10-digit phone number",
    componentType: "input" as const,
    type: "tel",
    required: true,
    rules: [
      {
        pattern: /^\d{10}$/,
        message: "Phone number must be exactly 10 digits and numeric",
      },
    ],
  },
  {
    name: "clientEmail",
    label: "Email",
    placeholder: "Enter Lead email (Optional)",
    type: "email",
    componentType: "input" as const,
  },
  {
    name: "projectInterested",
    label: "ProjectInterested",
    placeholder: "Project Interested In",
    type: "text",
    componentType: "input" as const,
    // required: true,
  },

]