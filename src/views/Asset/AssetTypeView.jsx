import { Fragment, useMemo } from "react";
import { EditableSelectInput, Show, TextInput, Typography } from "@/components";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import countryList from "react-select-country-list";
import { BackSubmitBtn } from "@/components/ui/Button/BackSubmitBtn";
import { FORM_TYPE } from "@/appState/assetsData";

export const AssetTypeView = ({ 
    title, 
    formData,  
    backLink,
    secondaryCta,
    primaryCta,
    nextLink,
    startYear = 2000
}) => {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const years = useMemo(()=> {
        const currentYear = new Date().getFullYear() 
        return Array.from({ length: currentYear - startYear  + 1}, (_, index) => ({
            label: startYear + index,
            value: startYear + index,
          }))  
  }, [])

  const selectOptions = {
    country: countryOptions,
    year: years,
  }

  console.log(selectOptions)

  return (
    <section>
        <Typography variant="title-small" className={'my-10'}>{title}</Typography>
        <div className="w-100">
            {Object.keys(formData).map((key)=> {
                const form = formData[key]
                return (
                    <Fragment key={form.label + key}>
                        <Show when={form.type===FORM_TYPE.INPUT}>
                            <TextInput id={form.id} placeholder={form.label}/>
                        </Show>
                        <Show when={form.type===FORM_TYPE.SELECT}>
                            <EditableSelectInput
                                key={form.id}
                                {...form}
                                options={selectOptions[form.id] ?? []}
                            />
                        </Show>
                        <Show when={typeof form === 'string'}>
                            <div className="flex items-center mt-8">
                                <InfoIcon width={24} height={25} className="mr-1 min-w-8" />
                                <Typography variant="caption">{form}</Typography>
                            </div> 
                        </Show>
                    </Fragment>
                )
            })}
        </div>
        <BackSubmitBtn 
            {...{
                backLink,
                secondaryCta,
                primaryCta,
                nextLink
        }}/>
    </section>
  )
}

export default AssetTypeView;
