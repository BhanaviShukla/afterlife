import { useWill } from "@/appState/WillState";
import { Button, SelectInput, TextInput, Typography } from "@/components";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";

const PersonModalView = ({
  form: { id, title, subtitle, infoText },
  titleFragment,
  onSave,
  onBack,
}) => {
  const { will } = useWill();
  const isPersonSelectable = will.people.length;
  const { addPersonForm } = data;

  return (
    <>
      <Typography variant="title-small">
        {title} {titleFragment}
      </Typography>
      {subtitle && <Typography>{subtitle}</Typography>}
      {isPersonSelectable ? (
        <form id={`${id}-select-person`} action={onSave}></form>
      ) : (
        <form id={`${id}-add-person`} action={onSave}>
          {addPersonForm.textInputs.length &&
            addPersonForm.textInputs.map((input) => (
              <TextInput key={input.id} {...input} />
            ))}
          <SelectInput {...addPersonForm.selectInput} />
          {infoText && (
            <div className="flex align-middle gap-2 mt-8">
              <InfoIcon width={40} />
              <Typography variant="caption">{infoText}</Typography>
            </div>
          )}
          <div className="flex  gap-4 mt-8">
            <Button type="submit" value="submit" id={`${id}-submit-button`}>
              {addPersonForm.primaryCta}
            </Button>
            <Button variant="outlined" onClick={onBack}>
              {addPersonForm.secondaryCta}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};
export default PersonModalView;

const TODAY = new Date().toISOString().split("T")[0];
const data = {
  addPersonForm: {
    textInputs: [
      {
        id: "person-name",
        placeholder: "Full name of person (as per passport)",
        type: "text",
        required: true,
      },
      {
        id: "person-dob",
        placeholder: "Birthday",
        // placeholderDay: "Day",
        // placeholderMonth: "Month",
        // placeholderYear: "Year",
        type: "date",
        max: TODAY,
        required: true,
      },
    ],
    selectInput: {
      id: "person-relationship-child",
      placeholder: "Relationship",
      options: [
        { label: "GodMother", value: "god-mother" },
        { label: "GodFather", value: "god-father" },
      ],
    },
    primaryCta: "Save",
    secondaryCta: "Back",
  },
};
