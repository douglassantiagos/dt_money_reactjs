import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod'

import { CloseButton, Content, Overlay, Separator } from './styles'

import { Loading } from '../Loading';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { SelectCategory } from './components/SelectCategory';
import { SelectDate } from './components/SelectDate';
import { RadioButton } from './components/RadioButton';
import { SelectType } from './components/SelectType';

const FilterTransactionsFormSchema = zod.object({
  order: zod.enum(['asc', 'desc']),
  category: zod.string(),
  date: zod.string(),
  type: zod.string(),
})

type FilterTransactionsFormInputs = zod.infer<typeof FilterTransactionsFormSchema>

export function FilterTransactionModal() {
  const { fetchFilterTransactions, closeFilterModal } = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FilterTransactionsFormInputs>({
    resolver: zodResolver(FilterTransactionsFormSchema),
    defaultValues: {
      order: 'desc',
      category: '',
      date: '',
      type: '',
    }
  })

  async function handleFilterTransaction(data: FilterTransactionsFormInputs) {
    const { order, category, date, type } = data;    

    await fetchFilterTransactions({
      order,
      category,
      date,
      type
    })

    closeFilterModal(false)
  }

  async function handleResetFilterTransactions() { 
    location.reload()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Filtrar Transações</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleFilterTransaction)}>          
          <strong>Ordenar por</strong>

          <div>
            <p>Ordem:</p>
            <Controller
              control={control}
              name="order"
              render={({ field }) => {
                return (
                  <div>
                    <RadioButton 
                      onValueChange={field.onChange} 
                      value={field.value}
                    />
                  </div>
                )
              }}
            />
          </div>        

          <Separator></Separator>

          <strong>Exibir apenas</strong>

          <div>
            <p>Categoria:</p>
            <Controller
              control={control}
              name="category"
              render={({ field }) => {
                return (
                  <SelectCategory
                    onValueChange={field.onChange} 
                    value={field.value}
                  />
                )
              }}
            />                      
          </div>

          <div>
            <p>Data (Mês):</p> 
            <Controller
              control={control}
              name="date"
              render={({ field }) => {
                return (
                  <SelectDate
                    onValueChange={field.onChange} 
                    value={field.value}
                  />
                )
              }}
            />
          </div>

          <div>
            <p>Transações:</p>

            <div>
              <Controller
                control={control}
                name="type"
                render={({ field }) => {
                  return (                    
                    <SelectType
                      onValueChange={field.onChange} 
                      value={field.value}
                    />                  
                  )
                }}
              />
            </div>
          </div>           

          <button type='submit' disabled={isSubmitting}>
            { isSubmitting ? <Loading /> : 'Filtrar'}
          </button>

          <button type='reset' onClick={handleResetFilterTransactions} disabled={isSubmitting}>
            Limpar filtros
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}