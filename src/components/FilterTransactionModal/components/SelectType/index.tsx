import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { CaretDown, Check } from 'phosphor-react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';

import './styles.css';
import { SelectContent, SelectIcon, SelectItemIndicator, SelectScrollDownButton, SelectTrigger, SelectViewport } from './styled';

interface SelectItemProps {
  children?: ReactNode
  className?: any
  value: any
}

interface SelectTypeProps {
  value?: string | undefined
  onValueChange: ((value: string) => void) | undefined
}

export function SelectType({ value, onValueChange }: SelectTypeProps) {  
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <SelectTrigger className='SelectTrigger' aria-label="Food">
        <Select.Value placeholder="Selecione um tipo de transação" />
        <SelectIcon>
          <CaretDown />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>          
          <SelectViewport>
            <Select.Group> 
              <SelectItem value=''>
                Todas
              </SelectItem>
              <SelectItem value='income'>
                Entrada
              </SelectItem>
              <SelectItem value='outcome'>
                Saída
              </SelectItem>      
            </Select.Group>
          </SelectViewport>

          <SelectScrollDownButton>
            <CaretDown/>
          </SelectScrollDownButton>
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value, ...props }, forwardedRef) => {
    return (
      <Select.Item value={value} className={classnames('SelectItem', className)} ref={forwardedRef}  {...props}>
        <Select.ItemText>{children}</Select.ItemText>
        <SelectItemIndicator>
          <Check />
        </SelectItemIndicator>
      </Select.Item>
    );
  }
);