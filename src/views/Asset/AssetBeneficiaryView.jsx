import { useState } from "react"
import { Button, Typography } from "@/components"
import AddChildIcon from "@/components/ui/Icons/Controls/add-user.svg";
import { BackSubmitBtn } from "@/components/ui/Button/BackSubmitBtn"
import { useParams } from "next/navigation"
import { Beneficiary } from "./Beneficiary";

const replaceWith = (url, to) => url.replace('{{asset}}', to)

export const AssetBeneficiaryView = ({  
  backLink,
  secondaryCta,
  primaryCta,
  nextLink,
  title,
  assets,
  ...rest 
  }) => {
  const { step } = useParams();
  const assetName = step.at(-2)

  const [beneficiaries, setBeneficiaries] = useState([{ id: Date.now(), allocation: 0 }])

  const onAddBeneficiary = () => {
    setBeneficiaries((prevChildren) => [
      ...prevChildren,
      {
        id: Date.now(),
        allocation: 0,
      },
    ]);
  };

  return (
        <section>
          <Typography variant="title-small" className={'my-10'}>{replaceWith(assets?.title, assetName)}</Typography>
          <form>
            {beneficiaries.map((beneficiary)=> (
                <Beneficiary key={beneficiary.id} {...beneficiary} />
            ))}
          </form>
            <Button
              variant="text"
              leftIcon={<AddChildIcon />}
              className="mt-12"
              onClick={onAddBeneficiary}
            >
              Add another beneficiary
            </Button>
          <BackSubmitBtn 
              {...{
                  secondaryCta,
                  primaryCta,
                  backLink: replaceWith(backLink, assetName),
                  nextLink: replaceWith(nextLink, assetName),
            }}/>
        </section>
  )
}
