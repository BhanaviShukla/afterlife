import React from "react";
import { Typography } from "..";

const Checkbox = ({ label, checked, onChange, className }) => {
  return (
    <div className="form__group">
      <label
        className={["flex items-center gap-2 cursor-pointer", className].join(
          " "
        )}
      >
        {/* Custom Checkbox */}
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <div
          className={`flex items-center justify-center border rounded-md box-content py-[1px] px-[0.75px]
             ${
               checked
                 ? "bg-secondary border-secondary"
                 : "bg-white border-gray-400"
             }`}
          style={{ width: 13, height: 13 }}
        >
          {checked && (
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.14066 0.146447C8.33592 0.341709 8.33592 0.658291 8.14066 0.853553L3.14066 5.85355C2.9454 6.04882 2.62882 6.04882 2.43356 5.85355L0.433556 3.85355C0.238294 3.65829 0.238294 3.34171 0.433556 3.14645C0.628818 2.95118 0.945401 2.95118 1.14066 3.14645L2.78711 4.79289L7.43356 0.146447C7.62882 -0.0488155 7.9454 -0.0488155 8.14066 0.146447Z"
                fill="#EEEEEE"
              />
            </svg>
          )}
        </div>

        {/* Label */}
        <Typography variant="caption">{label}</Typography>
      </label>
    </div>
  );
};

export default Checkbox;
