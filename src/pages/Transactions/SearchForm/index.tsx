import { useContextSelector } from 'use-context-selector'
import { MagnifyingGlass, Sliders } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import * as Dialog from '@radix-ui/react-dialog';

import { SearchFormContainer } from './styles'
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { FilterTransactionModal } from '../../../components/FilterTransactionModal';

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const { openFilterModal, closeFilterModal, isLoadingTransactions } = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )

  const fetchTransactions = useContextSelector(
    TransactionsContext, (context) => {
      return context.fetchTransactions
    }
  )

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting || isLoadingTransactions}>        
        <MagnifyingGlass size={20} />
        <span>Buscar</span>
      </button>

      <Dialog.Root open={openFilterModal} onOpenChange={closeFilterModal}>
        <Dialog.Trigger asChild>
          <button disabled={isSubmitting || isLoadingTransactions}>        
            <Sliders size={20} />
            <span>Filtrar</span>
          </button>
        </Dialog.Trigger>

        <FilterTransactionModal />
      </Dialog.Root>
    </SearchFormContainer>
  )
}