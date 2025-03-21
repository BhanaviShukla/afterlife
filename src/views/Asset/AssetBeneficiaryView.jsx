import { Typography } from "@/components"
import { BackSubmitBtn } from "@/components/ui/Button/BackSubmitBtn"
import { useParams } from "next/navigation"

const replaceWith = (url, to)=> url.replace('{{asset}}', to)

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
  console.log('first', 
    backLink,
    secondaryCta,
    primaryCta,
    nextLink,
    title,
    assets,)
  return (
        <section>
           <Typography variant="title-small" className={'my-10'}>{replaceWith(assets?.title, assetName)}</Typography>
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
