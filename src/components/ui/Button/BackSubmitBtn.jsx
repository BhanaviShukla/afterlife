import { useRouter } from 'next/navigation'
import ArrowLeftIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-left.svg";
import ArrowRightIcon from "@/components/ui/Icons/Controls/Buttons/nav-arrow-right.svg";
import { Button } from '@/components';


export const BackSubmitBtn = ({ nextLink, backLink, secondaryCta, primaryCta }) => {
    const router = useRouter()
    const handleButtonClick = (link) =>  () => link ? router.push(link) : 0;
    return (
        <div className="flex mt-14 gap-4">
            <Button
                variant="outlined"
                className="self-start"
                leftIcon={<ArrowLeftIcon />}
                onClick={handleButtonClick(backLink)}
                title={`${backLink}`}
            >
                {secondaryCta}
            </Button>
            <Button
                variant="filled"
                className="self-start"
                rightIcon={<ArrowRightIcon />}
                type="button"
                value="button"
                id={`next-button`}
                onClick={handleButtonClick(nextLink)}
            >
                {primaryCta}
            </Button>
        </div>
    )
}
