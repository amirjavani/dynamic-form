// FieldRenderer.tsx

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

// Define the shape of a single field configuration (based on your JSON)
export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: { min?: number, max?: number };
}

// Props for the FieldRenderer component
interface FieldRendererProps {
  field: FieldConfig;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, register, errors }) => {
  const errorMessage = errors[field.name]?.message as string;
  const isError = !!errorMessage;

  // Create RHF validation rules based on the JSON config
  const validationRules = {
    required: field.required ? `${field.label} is required` : undefined,
    min: field.validation?.min ? {
      value: field.validation.min,
      message: `${field.label} must be at least ${field.validation.min}`
    } : undefined,
    max: field.validation?.max ? {
      value: field.validation.max,
      message: `${field.label} must be less than ${field.validation.max}`
    } : undefined
    // Add other rules like pattern, max, etc., here
  };

  const commonProps = {
    id: field.name,
    ...register(field.name, validationRules),
    placeholder: field.placeholder,
    className: `${isError ? 'input-error' : ''} w-full `,
  };

  let InputComponent;

  const [select, setSelect] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  switch (field.type) {
    case 'select':
      InputComponent = (

        <FormControl fullWidth {...commonProps}>
          <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select}
            label={field.label}
            onChange={handleChange}
          >
            {field.options?.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}

          </Select>
        </FormControl>
      );
      break;

    case 'date':
      InputComponent = <MobileDatePicker defaultValue={dayjs()} label={field.name}  {...commonProps} />;
      break;

    case 'number':
    case 'text':
    default:
      InputComponent = <TextField label={field.name} variant="outlined" type={field.type} {...commonProps} />
      // <input type={field.type} {...commonProps} />;
      break;
  }

  return (
    <div className="w-full ">
      {/* <label htmlFor={field.name}>{field.label}{field.required ? ' *' : ''}</label> */}
      {InputComponent}
      {isError && <p className="text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default FieldRenderer;
