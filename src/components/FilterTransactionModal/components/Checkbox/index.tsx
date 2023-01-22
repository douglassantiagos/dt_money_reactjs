import { Check } from "phosphor-react";
import { CheckboxContainer, CheckboxIndicator, CheckboxRoot } from "./styled";
import { ReactNode } from "react";

interface CheckboxProps {
  id: string
  children: ReactNode
  onValueChange: ((value: string) => void) | undefined
  value: string
}

export function Checkbox({ id, children, onValueChange, value }: CheckboxProps) {
  return (
    <CheckboxContainer>
      <CheckboxRoot id={id} value={value}>
        <CheckboxIndicator>
          <Check size={18} weight='bold'/>
        </CheckboxIndicator>
      </CheckboxRoot>
      <label htmlFor={id}>
        {children}
      </label>
    </CheckboxContainer>
  )
}