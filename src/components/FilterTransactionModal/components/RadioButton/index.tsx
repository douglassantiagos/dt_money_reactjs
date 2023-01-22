import { ReactNode } from "react";
import { Check, Radio } from "phosphor-react";
import * as RadioGroup from '@radix-ui/react-radio-group';

import { RadioContainer, RadioItem, RadioRoot, RadioIndicator } from "./styled";

interface RadioButtonProps {
  value?: string | undefined
  onValueChange: ((value: string) => void) | undefined
}

export function RadioButton({ value, onValueChange }: RadioButtonProps) {
  return (
    <RadioContainer>
      <RadioRoot value={value} onValueChange={onValueChange} defaultValue="desc" aria-label="View density">
        <div>
          <RadioItem value="asc" id="1">
            <RadioIndicator />
          </RadioItem>
          <label htmlFor="1">
            Primeira transação
          </label>
        </div>
        <div>
          <RadioItem value="desc" id="2">
            <RadioIndicator />
          </RadioItem>
          <label htmlFor="2">
            Última transação
          </label>
        </div>
      </RadioRoot>
    </RadioContainer>
  )
};


