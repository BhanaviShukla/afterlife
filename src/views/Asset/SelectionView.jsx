import { Button, Icon, Typography } from '@/components'
import { useRouter } from 'next/navigation';
import { BackSubmitBtn } from '@/components/ui/Button/BackSubmitBtn';


export const SelectionView = ({ primaryCta, buttons, secondaryCta, backLink, title  }) => {
    const router = useRouter();

    const handleOnAssetAddClick = (nextLink) =>  () => router.push(nextLink)
    
    return (
        <section>
            <Typography variant="title-small" className={'my-10'}>{title}</Typography>
            <div className='flex gap-6'>
                {buttons.map(({ label, icon, nextLink })=>  
                    <Button
                        key={label}
                        variant="outlined"
                        className="self-start"
                        rightIcon={<Icon name={icon} />}
                        onClick={handleOnAssetAddClick(nextLink)}
                    >
                    {label}
                </Button>
            )}
            </div>
            <BackSubmitBtn {...{
                backLink,
                secondaryCta,
                primaryCta,
                nextLink: ''
            }}/>
        </section>
  )
}
