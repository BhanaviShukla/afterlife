import { Fragment, useMemo } from "react";
import { EditableSelectInput, TextInput, Typography } from "@/components";
import InfoIcon from "@/components/ui/Icons/Informational/info-empty.svg";
import countryList from "react-select-country-list";
import { BackSubmitBtn } from "@/components/ui/Button/BackSubmitBtn";


export const PropertyView = ({ 
    title, 
    formData,  
    backLink,
    secondaryCta,
    primaryCta,
    nextLink 
}) => {
  const countryOptions = useMemo(() => countryList().getData(), []);

  return (
    <section>
        <Typography variant="title-small" className={'my-10'}>{title}</Typography>
        <div className="md:w-full sm:w-full lg:w-7/12 xl:w-7/12 2xl:w-7/12">
            {Object.keys(formData).map((key)=> {
                const form = formData[key]
                return (
                    <Fragment key={form.label}>
                        {form?.type === 'input' &&  <TextInput id={form.id} placeholder={form.label}/> }
                        {form?.id === 'country' &&  <EditableSelectInput
                                                        key={form.id}
                                                        {...form}
                                                        options={countryOptions}
                                                    />}
                        {typeof form === 'string' &&   
                            <div className="flex items-center mt-8">
                                <InfoIcon width={24} height={25} className="mr-1 min-w-8" />
                                <Typography variant="caption">{form}</Typography>
                            </div> }
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

export default PropertyView;
