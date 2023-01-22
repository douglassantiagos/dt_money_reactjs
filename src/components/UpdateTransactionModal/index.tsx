import { useContextSelector } from 'use-context-selector'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod'

import { Transaction, TransactionsContext } from '../../contexts/TransactionsContext';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { Loading } from '../Loading';

const UpdateTransactionsFormSchema = zod.object({
  id: zod.number(),
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
  createdAt: zod.string(),
})

type UpdateTransactionsFormInputs = zod.infer<typeof UpdateTransactionsFormSchema>

interface UpdateTransactionsModalProps {
  updateTransactionData?: Transaction
}

export function UpdateTransactionModal({ updateTransactionData }: UpdateTransactionsModalProps) {
  const { updateTransaction, closeUpdateTransactionModal } = useContextSelector(
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
  } = useForm<UpdateTransactionsFormInputs>({
    resolver: zodResolver(UpdateTransactionsFormSchema),
    defaultValues: {
      id: 0,
      category: '',
      description: '',
      price: 0,
      type: undefined,
      createdAt: ''
    }
  })

  setValue('id', updateTransactionData?.id || 0)
  setValue('description', `${updateTransactionData?.description}`)
  setValue('category', `${updateTransactionData?.category}`)
  setValue('type', updateTransactionData?.type || 'income' || 'outcome')
  setValue('price', updateTransactionData?.price || 0)
  setValue('createdAt', `${updateTransactionData?.createdAt}`)

  async function handleUpdateTransaction(data: UpdateTransactionsFormInputs) {     
    const { id, category, description, price, type, createdAt } = data;   

    await updateTransaction({
      id,
      description,
      price,
      category,
      type,
      createdAt,
    })

    reset()
    closeUpdateTransactionModal(false)    
  }
  
  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Atualizar Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleUpdateTransaction)} action='/transaction/'>
          <input 
            type="text" 
            placeholder='Descrição'            
            {...register('description')}   
            required
          />          

          <input 
            type="number" 
            placeholder='Preço' 
            {...register('price', { valueAsNumber: true})} 
            required
          />

          <input 
            type="text" 
            placeholder='Categoria' 
            {...register('category')}   
            required
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
            { isSubmitting ? <Loading /> : 'Atualizar'}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}