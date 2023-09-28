import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Switch } from "antd";

import "./lable-with-options.css";
import { LabelProps } from "../../types/types";

const LabelWithOptions = ({
  label,
  internal,
  show,
  value,
  sub,
  showOptions = false,
  data,
  setData,
  profile = false,
}: LabelProps) => {
  const checkBoxChange = (e: CheckboxChangeEvent) => {
    if (value && data?.data?.attributes?.personalInformation) {
      setData({
        data: {
          ...data?.data,
          attributes: {
            ...data?.data?.attributes,
            personalInformation: {
              ...data?.data?.attributes?.personalInformation,
              [value]: {
                ...data?.data?.attributes?.personalInformation?.[value],
                internalUse: e.target.checked,
              },
            },
          },
        },
      });
    }
  };

  const switchChange = (checked: boolean) => {
    if (value) {
      if (profile) {
        setData({
          data: {
            ...data?.data,
            attributes: {
              ...data?.data?.attributes,
              profile: {
                ...data?.data?.attributes?.profile,
                [value]: {
                  ...data?.data?.attributes?.profile?.[value],
                  show: !checked,
                },
              },
            },
          },
        });
      } else {
        setData({
          data: {
            ...data?.data,
            attributes: {
              ...data?.data?.attributes,
              personalInformation: {
                ...data?.data?.attributes?.personalInformation,
                [value]: {
                  ...data?.data?.attributes?.personalInformation?.[value],
                  show: !checked,
                },
              },
            },
          },
        });
      }
    }
  };
  const onMandatoryChange = (e: CheckboxChangeEvent) => {
    if (value && data?.data?.attributes?.profile) {
      setData({
        data: {
          ...data?.data,
          attributes: {
            ...data?.data?.attributes,
            profile: {
              ...data?.data?.attributes?.profile,
              [value]: {
                ...data?.data?.attributes?.profile?.[value],
                mandatory: e.target.checked,
              },
            },
          },
        },
      });
    }
  };
  return (
    <div className="labelContainer">
      <h5 className="w-50">
        {label}
        {sub && <span>{sub}</span>}
      </h5>
      {showOptions && (
        <>
          {profile ? (
            <Checkbox checked={internal} onChange={onMandatoryChange}>
              Mandatory
            </Checkbox>
          ) : (
            <Checkbox checked={internal} onChange={checkBoxChange}>
              Internal
            </Checkbox>
          )}
          <div>
            <Switch defaultChecked={!show} onChange={switchChange} />
            <span className="hide">{show ? "Hide" : "Show"}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default LabelWithOptions;
