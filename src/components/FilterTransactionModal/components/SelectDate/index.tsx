import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { CaretDown, Check } from 'phosphor-react';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';

import './styles.css';
import { SelectContent, SelectIcon, SelectItemIndicator, SelectScrollDownButton, SelectTrigger, SelectViewport } from './styled';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

interface SelectItemProps {
  children?: any
  className?: any
  value: any
}

interface SelectDateProps {
  value?: string | undefined
  onValueChange: ((value: string) => void) | undefined
}

export function SelectDate({ value, onValueChange }: SelectDateProps) {
  const [months, setMonths] = useState({})

  const transactions = useContextSelector(
    TransactionsContext, (context) => {
      return context.transactions
    }
  )
  
  useEffect(() => {
    function convertMonthTransactions() {
      const allDate = transactions.map(transaction => transaction.createdAt)
      const monthsDescription = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]; 
      const toArray = []
      
      for (let index = 0; index < allDate.length; index++) {
        toArray.push({
          date: new Date(allDate[index]),
        })
      }

      const existingMonths = toArray.map((month) => {
        return ((monthsDescription[( + " " + month.date.getMonth())]))        
      })

      const newExistingMonths = [...new Set(existingMonths)]
      const newExistingMonthsSort= newExistingMonths.sort((a, b) => monthsDescription.indexOf(a) - monthsDescription.indexOf(b))
      setMonths(newExistingMonthsSort)
    }
    
    convertMonthTransactions()
  }, [])
  
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <SelectTrigger className='SelectTrigger' aria-label="Food">
        <Select.Value placeholder="Selecione um mês" />
        <SelectIcon>
          <CaretDown />
        </SelectIcon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>          
          <SelectViewport>
            <Select.Group> 
              <SelectItem value=''>
                Todos
              </SelectItem>            
              {Object.entries(months).map(([key, value]) => {
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