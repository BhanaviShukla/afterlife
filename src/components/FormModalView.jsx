import { Button, TextInput, Typography } from "@/components";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const FormModalView = ({ form, dataObject, onSave, onCancel }) => {
  console.log({ form });
  return (
    <>
      <Typography variant="title-small">{form.title}</Typography>
      <ErrorBoundary fallback={<>...</>}>
        <form id={form.id} action={onSave}>
          {form.textInputs.length &&
            form.textInputs.map((input) => (
              <TextInput
                key={input.id}
                {...input}
                defaultValue={dataObject ? dataObject[input.id] : undefined}
              />
            ))}
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              value="submit"
              id={`${form.id}-submit-button`}
            >
              {form.primaryCta || "Save"}
            </Button>
            <Button variant="outlined" onClick={onCancel}>
              {form.secondaryCta || "Cancel"}
            </Button>
          </div>
        </form>
      </ErrorBoundary>
    </>
  );
};
export default FormModalView;
