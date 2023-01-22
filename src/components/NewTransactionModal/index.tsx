import { useContextSelector } from 'use-context-selector'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod'

import { TransactionsContext } from '../../contexts/TransactionsContext';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Loading } from '../Loading';

const NewTransactionsFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionsFormInputs = zod.infer<typeof NewTransactionsFormSchema>

export function NewTransactionModal() {
  const { createTransaction, closeNewTransactionModal } = useContextSelector(
    TransactionsContext, (context) => {
      return context  
    }
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue
  } = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(NewTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionsFormInputs) {     
    const { category, description, price, type } = data;   

    await createTransaction({
      description,
      price,
      category,
      type
    })

    reset()
    closeNewTransactionModal(false)    
  }
  
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)} action='/transaction/'>
          <input 
            type="text" 
            placeholder='Descrição'
            required
            {...register('description')}     
          />          

          <input 
            type="number" 
            placeholder='Preço' 
            required
            {...register('price', { valueAsNumber: true})} 
          />

          <input 
            type="text" 
            placeholder='Categoria' 
            required
            {...register('category')} 
          />

          <Controller 
            control={control}
            name='type'
            render={({ field }) => {
              return (
                <TransactionType 
                  onValueChange={field.onChange} 
                  value={field.value}
                >
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type='submit' disabled={isSubmitting}>
            { isSubmitting ? <Loading /> : 'Cadastrar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}