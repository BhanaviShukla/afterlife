import React, { useState } from 'react'
import style from './asset.module.css'
import { SELECT_BENEFICIARY } from "./constant"
import PersonSelector from '@/components/AddPersonForm/PersonSelector'
import { TextInput } from '@/components'
import { useWill } from '@/appState/WillState'


export const Beneficiary = () => {
  const { will: { people } } = useWill();
  const [allocation, setAllocation] = useState(0)

  return (
    <main className={style.beneficiaryForm}>
                 <PersonSelector {...{
                     id: SELECT_BENEFICIARY.ID,
                     people,
                     placeholder: SELECT_BENEFICIARY.PLACEHOLDER,
                     isEditable: true,
                     addAnotherLabel: SELECT_BENEFICIARY.ADD_ANOTHER,
                     editTitle:  SELECT_BENEFICIARY.EDIT_TITLE,
                     addTitle: SELECT_BENEFICIARY.ADD_TITLE,
                     onFormSave: () => 1,
                 }}/>
                 <TextInput
                     {...{
                       id: "allocation",
                       type: "text",
                       required: true,
                       placeholder: "Allocation",
                       value:(String(allocation).replace('%', '') || 0) + '%',
                       onChange: (e)=> {
                         const value = e.target.value.replace('%', '');
                         const isNumber = /^[0-9]*$/.test(value) 
                         if(!isNumber) return;
                         setAllocation(+value > 100 ? 100 : +value)
                       }
                     }}
                 />
         </main>
  )
}
