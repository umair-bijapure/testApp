import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface CommonButtonProps {
  hidden?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
  form?: string;
  text?: string;
}

export const CommonButton: React.FC<CommonButtonProps> = ({
  hidden = false,
  loading = false,
  className = "",
  id,
  type = "button",
  onClick,
  disabled = false,
  title,
  form,
  text,
}) => {
  if (hidden) {
    return null;
  }

  return loading ? (
    <button
      disabled
      className="flex min-w-20 items-center justify-center rounded-md border bg-blue-400 py-2 px-4 text-xl font-semibold text-white"
    >
      <FontAwesomeIcon icon={faSpinner} className="fa-spin px-6" fixedWidth />
    </button>
  ) : (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`flex min-w-20 items-center justify-center rounded-md border bg-opacity-100 py-2 px-2 text-sm font-semibold disabled:cursor-default disabled:bg-opacity-50 lg:min-w-28 lg:px-4 ${className}`}
      disabled={disabled}
      title={title}
      form={form}
    >
      {text}
    </button>
  );
};

export const CommonButtonSolidBlue: React.FC<CommonButtonProps> = ({
  hidden,
  loading,
  id,
  type,
  onClick,
  disabled,
  title,
  form,
  text,
}) => {
  return (
    <CommonButton
      id={id}
      type={type}
      className="border-transparent bg-[color:var(--mainTitleColor)] text-white shadow hover:bg-[color:var(--primaryColor)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primaryColor)] focus:ring-offset-1 disabled:bg-[color:var(--primaryColor)]"
      text={text}
      onClick={onClick}
      disabled={disabled}
      hidden={hidden}
      loading={loading}
      form={form}
      title={title}
    />
  );
};
