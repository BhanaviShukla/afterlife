import { Button, Typography } from "@/components";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import { useRouter } from "next/navigation";
import { useWill } from "@/appState/WillState";
import { CaretakerForPet } from "./CaretakerForPet";

const CaretakerView = ({
  title,
  description,
  nextLink,
  backLink,
  primaryCta,
  secondaryCta,
}) => {
  console.log("pets -> GUARDIAN VIEW");
  const router = useRouter();

  const { will, patchWillEntry } = useWill();

  const count = will.pets.length;

  const handleNext = () => {
    router.push(`${nextLink}`);
  };
  const handleBack = () => {
    router.replace(`${backLink}${count}`);
  };

  const handleChangeCaretaker = (petId, caretakerObject) => {
    const updated = patchWillEntry("pets", petId, {
      caretaker: { ...caretakerObject },
    });
    if (!updated) {
      console.error("Couldn't update for ID", petId);
    }
  };

  const handleRemoveAPet = (petId) => {
    console.warn("Removing from will", petId);
    // if (will.pets.find((child) => child.id === id)) {

    //   removeFromWill("pets", id);
    // }
  };

  return (
    <div>
      <Typography variant="title-small">{title}</Typography>
      <Typography className="my-10 leading-8">{description}</Typography>
      <form id="pets-caretaker-form" action={handleNext}>
        {will.pets.map((pet, index) => (
          <CaretakerForPet
            key={`caretaker-for-child-forminputs-${pet.id}`}
            petId={pet.id}
            index={index}
            onChangeCaretaker={handleChangeCaretaker}
            onRemoveAPet={handleRemoveAPet}
            isFirst={index === 0} // since pets are sorted by eldest to youngest
          />
        ))}
        <div className="flex mt-14 gap-4">
          <Button
            variant="outlined"
            className="self-start"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
            title={`${backLink}${count}`}
          >
            {secondaryCta}
          </Button>
          <Button
            variant="filled"
            className="self-start"
            rightIcon={<ArrowRightIcon />}
            type="submit"
            value="submit"
            id={`pets-caretaker-submit-button`}
            title={`${nextLink}`}
          >
            {primaryCta}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CaretakerView;
