import { forwardRef, ReactNode, useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { CaretDown, Check } from 'phosphor-react';

import './styles.css';
import { SelectContent, SelectIcon, SelectItemIndicator, SelectScrollDownButton, SelectTrigger, SelectViewport } from './styled';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

interface SelectItemProps {
  children?: any
  className?: any
  value: any
}

interface SelectCategoryProps {
  value?: string | undefined
  onValueChange: ((value: string) => void) | undefined
}

export function SelectCategory({ value, onValueChange }: SelectCategoryProps) {
  const [category, setCategory] = useState({})

  const transactions = useContextSelector(
    TransactionsContext, (context) => {
      return context.transactions
    }
  )

  useEffect(() => {
    function removeIgualValue() {
      const existingCategories = transactions.map(cat => cat.category)
      const newExistingCategory = [...new Set(existingCategories)]
      const newExistingCategorySort = newExistingCategory.sort()
      setCategory(newExistingCategorySort)
    }
    removeIgualValue ()
  }, [])

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <SelectTrigger className='SelectTrigger' aria-label="Food">
        <Select.Value placeholder="Selecione uma categoria" />
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
              {Object.entries(category).map(([key, value]) => {
                return (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                )
              })}
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