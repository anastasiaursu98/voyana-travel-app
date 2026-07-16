import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { useState } from "react";

import { AppOptionDropdown } from "../../../../../shared/ui";
import type { AppOptionDropdownOption } from "../../../../../shared/ui";
import { formLabelClassName, formLabelStyle } from "../../../../../shared/ui";

type AddOfferSelectFieldProps<TValue extends string = string> = {
  className?: string;
  defaultValue: TValue;
  label: string;
  options: readonly AppOptionDropdownOption<TValue>[];
  required?: boolean;
};

export function AddOfferSelectField<TValue extends string = string>({
  className = "",
  defaultValue,
  label,
  options,
  required = false,
}: AddOfferSelectFieldProps<TValue>) {
  const [value, setValue] = useState<TValue>(defaultValue);

  return (
    <div className={`${formLabelClassName} ${className}`} style={formLabelStyle}>
      <span>
        {label}{" "}
        {required ? <span className="text-(--voyana-color-danger)">*</span> : null}
      </span>
      <div className="mt-2">
        <AppOptionDropdown
          icon={<TuneRoundedIcon fontSize="small" />}
          label={label}
          minHeight={48}
          onChange={setValue}
          options={options}
          placeholder={`Select ${label.toLowerCase()}`}
          showLabel={false}
          value={value}
        />
      </div>
    </div>
  );
}
