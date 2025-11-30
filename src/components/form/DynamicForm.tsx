
// DynamicForm.tsx

import { useForm } from "react-hook-form";
import FieldRenderer, { FieldConfig } from "./FieldRenderer";

// Assuming you've fetched this configuration from an API
const dynamicFormConfig: FieldConfig[] = [
  {
    "name": "projectTitle",
    "type": "text",
    "label": "Project Title*",
    "placeholder": "e.g., Q3 Marketing Campaign",
    "required": true,
    
  },
  {
    "name": "startDate",
    "type": "date",
    "label": "Start Date",
    "required": true
  },
  {
    "name": "budget",
    "type": "number",
    "label": "Project Budget ",
    "validation": {
      "min": 1000
    }
  },
  {
    "name": "teamMembers",
    "type": "select",
    "label": "Select Team Lead",
    "options": [
      { "value": "alice", "label": "Alice" },
      { "value": "bob", "label": "Bob" }
    ],
    "required": true
  }
]

export function DynamicForm() {
  const { 
    control,
    handleSubmit, 
    register, 
    formState: { errors } 
  } = useForm({
    // You can still use Zod or Yup here to define validation on top 
    // of the JSON config's basic rules, or just rely on RHF's internal 
    // validation which is defined in the FieldRenderer
    mode: "onBlur"
  });

  const onSubmit = (data: any) => {
    console.log('Dynamic Form Data Submitted:', data);
    // Data will be correctly structured based on the field names in your JSON
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" py-10 px-20 border border-gray-500 rounded-2xl flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Dynamic Project Form</h2>
      
      {/* This is the KEY to the dynamic rendering:
        We map over the external configuration array.
      */}
      {dynamicFormConfig.map((fieldConfig) => (
        <FieldRenderer
          key={fieldConfig.name}
          field={fieldConfig}
          register={register}
          errors={errors}
          control={control}
        />
      ))}

      <button type="submit" className="submit-button">
        Submit Dynamic Form
      </button>
    </form>
  );
}