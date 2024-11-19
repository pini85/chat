export const inputFields: Array<{
  type: string;
  placeholder: string;
  name: string;
  value: string;
  required: boolean;
  minLength: number;
}> = [
  {
    type: "text",
    placeholder: "Username",
    name: "username",
    value: "",
    required: true,
    minLength: 4,
  },
  {
    type: "password",
    placeholder: "Password",
    name: "password",
    value: "",
    required: true,
    minLength: 5,
  },
];
