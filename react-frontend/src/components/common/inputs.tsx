import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface CommonTextInputProps {
  id?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  tabIndex?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export const CommonTextInput: React.FC<CommonTextInputProps> = ({
  id,
  required = false,
  value = "",
  placeholder = "",
  disabled = false,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  name
}) => {
  return (
    <input
      id={id}
      name={id}
      defaultValue={value}
      placeholder={placeholder}
      type="text"
      disabled={disabled}
      required={required}
      className="mt-1 block w-full rounded-md border border-[color:var(--lightBackgroundColor)] py-2 px-3 shadow-sm focus:border-[color:var(--primaryColor)] focus:outline-none focus:ring-[color:var(--primaryColor)] disabled:bg-gray-100 sm:text-sm"
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
      tabIndex={tabIndex}
    />
  );
};

interface CommonFormTextInputProps extends CommonTextInputProps {
  title: string;
  tooltip?: string;
  labelSide?: boolean;
  name: string;
}


export const CommonFormTextInput: React.FC<CommonFormTextInputProps> = ({
  id,
  title,
  required = false,
  tooltip,
  value,
  placeholder,
  disabled = false,
  maxLength,
  autoComplete,
  tabIndex,
  onChange,
  labelSide = false,
  name,
}) => {
  return (
    <div className={`flex flex-1 ${labelSide ? "flex-row items-center space-x-2" : "flex-col"}`}>
      <CommonLabel id={id || ''} title={title} required={required} tooltip={tooltip} />
      <CommonTextInput
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        tabIndex={tabIndex}
        name={name}
      />
    </div>
  );
};

interface CommonLabelProps {
  id: string;
  title: string;
  required?: boolean;
  tooltip?: string;
}

export const CommonLabel: React.FC<CommonLabelProps> = ({ id, title, required = false, tooltip }) => {
  return (
    <label htmlFor={id} className="flex text-sm font-semibold text-gray-700">
      {title}
      {required && <div className="text-red-500">*</div>}
      {tooltip && (
        <div className="px-2 text-blue-600">
          <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
        </div>
      )}
    </label>
  );
};
