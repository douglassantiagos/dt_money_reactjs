import { CalendarBlank, PencilSimple, TagSimple, TrashSimple, Warning, WarningCircle, X } from 'phosphor-react';
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog';

import { Summary } from "../../components/Summary";
import { Header } from "../../components/Header";
import { Transaction, TransactionsContext } from "../../contexts/TransactionsContext";
import { SearchForm } from "./SearchForm";

import { BottomContentCard, ButtonIcon,  ButtonResetFilter,  FilterSelected,  LoadingContainer,  PriceHighlight, TopContentCard, TransactionsCard, TransactionsContainer, TransactionsDescription, TransactionsNotFound, TransactionsTable } from "./styles";
import { ConfirmQuestionModal } from '../../components/ConfirmQuestionModal';
import { useEffect, useState } from 'react';
import { UpdateTransactionModal } from '../../components/UpdateTransactionModal';
import { Loading } from '../../components/Loading';
import { LoadingPageMain } from '../../components/LoadingPageMain';

export function Transactions() {
  const [transactionDataToDelete, setTransactionDataToDelete] = useState({} as Transaction)
  const [createdAtTransaction, setCreatedAtTransaction] = useState('')
  const [updateTransactionData, setUpdateTransactionData] = useState({} as Transaction)

  const {
    transactions, 
    openConfirmQuestionModal, 
    closeConfirmQuestionModal,
    openUpdateTransactionModal,
    closeUpdateTransactionModal,
    isLoadingTransactions,
    filterSelected,
  }  = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )

  async function handleResetFilterTransactions() { 
    location.reload()
  }
  
  return (
    <div>
      <Header />
      <Summary />      

      <TransactionsContainer>
        <TransactionsDescription>
          <span>Transações</span>
          <p>{transactions.length} itens</p>
        </TransactionsDescription>
        
        <SearchForm />

        {
          filterSelected &&
          <>
            <FilterSelected>
              {filterSelected.map((data) => {
                return (
                  <div key={data.category}>
                    <strong>Filtros Selecionados: </strong>
                    {data.order && <span>Ordem: {data.order === 'desc' ? 'Decrescente' : 'Crescente'}</span> }
                    {data.category && <span>Categoria: {data.category}</span>}
                    {data.date && <span>Mês: {data.date}</span> }
                    {data.type && <span>Transações: {data.type === 'income' ? 'Entrada' : 'Saída'}</span> }

                    <ButtonResetFilter type='reset' onClick={handleResetFilterTransactions}>
                      <X weight='bold' size={14} />
                      Limpar filtros
                    </ButtonResetFilter>          
                  </div>
                )
              })}        
            </FilterSelected>

          </>          
        }        

        {isLoadingTransactions ? (
          <LoadingContainer>
            <LoadingPageMain />
            <span>Carregando transações...</span>
          </LoadingContainer>
        ) : (
          <div>
            {transactions.length === 0 ?  
              <TransactionsNotFound>            
                <Warning size={35} />
                <span>Nenhuma transação encontrada</span>            
              </TransactionsNotFound> 
            : transactions.map(transaction => {
              return (
                <TransactionsTable key={transaction.id}>
                  <tbody>
                    <tr>
                      <td width="35%">{transaction.description}</td>
                      <td>
                        <PriceHighlight variant={transaction.type}>
                          {transaction.type === 'outcome' && '- '}
                          {priceFormatter.format(transaction.price)}
                        </PriceHighlight>
                      </td>
                      <td>{transaction.category}</td>
                      <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                      <td>
                        <Dialog.Root open={openUpdateTransactionModal} onOpenChange={closeUpdateTransactionModal}>
                          <Dialog.Trigger asChild>
                            <ButtonIcon 
                              type='button' 
                              title='Editar'
                              variant='editar'
                              onClick={() => {
                                setUpdateTransactionData(transaction)
                              }}
                            >
                              <PencilSimple size={18} />
                            </ButtonIcon>
                          </Dialog.Trigger>

                          <UpdateTransactionModal updateTransactionData={updateTransactionData} />
                        </Dialog.Root>
                      </td>
                      <td>
                        <Dialog.Root open={openConfirmQuestionModal} onOpenChange={closeConfirmQuestionModal}>
                          <Dialog.Trigger asChild>
                            <ButtonIcon
                              type='button' 
                              title='Excluir'
                              variant='excluir' 
                              onClick={() => {
                                setTransactionDataToDelete(transaction), 
                                setCreatedAtTransaction(dateFormatter.format(new Date(transaction.createdAt)))
                              }}
                            >
                              <TrashSimple size={18} />
                            </ButtonIcon>
                          </Dialog.Trigger>

                          <ConfirmQuestionModal transactionDataToDelete={transactionDataToDelete} createdAtTransaction={createdAtTransaction} />
                        </Dialog.Root>
                      </td>
                    </tr>
                  </tbody>
                </TransactionsTable>
              )
            })}

            <TransactionsCard>
              {transactions.length === 0 ?
                <TransactionsNotFound>            
                  <Warning size={35} />
                  <span>Nenhuma transação encontrada</span>            
                </TransactionsNotFound> 
              : transactions.map(transaction => {
                return (
                  <div key={transaction.id}>
                    <TopContentCard>
                      <span>{transaction.description}</span>

                      <div>
                        <Dialog.Root open={openUpdateTransactionModal} onOpenChange={closeUpdateTransactionModal}>
                          <Dialog.Trigger asChild>
                            <ButtonIcon 
                              type='button' 
                              title='Editar'
                              variant='editar'
                              onClick={() => {
                                setUpdateTransactionData(transaction)
                              }}
                            >
                              <PencilSimple size={18} />
                            </ButtonIcon>
                          </Dialog.Trigger>

                          <UpdateTransactionModal updateTransactionData={updateTransactionData} />
                        </Dialog.Root>                  
                      
                        <Dialog.Root open={openConfirmQuestionModal} onOpenChange={closeConfirmQuestionModal}>
                          <Dialog.Trigger asChild>
                            <ButtonIcon
                              type='button' 
                              title='Excluir'
                              variant='excluir' 
                              onClick={() => {
                                setTransactionDataToDelete(transaction), 
                                setCreatedAtTransaction(dateFormatter.format(new Date(transaction.createdAt)))
                              }}
                            >
                              <TrashSimple size={18} />
                            </ButtonIcon>
                          </Dialog.Trigger>

                          <ConfirmQuestionModal transactionDataToDelete={transactionDataToDelete} createdAtTransaction={createdAtTransaction} />
                        </Dialog.Root>                
                      </div>
                      
                    </TopContentCard>

                    <strong>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </strong>

                    <BottomContentCard>
                      <span>
                        <TagSimple />
                        {transaction.category}
                      </span>
                      <span>
                        <CalendarBlank />
                        {dateFormatter.format(new Date(transaction.createdAt))}
                      </span>
                    </BottomContentCard>
                  </div>
                )
              })}
            </TransactionsCard>
          </div>
        )}

      </TransactionsContainer>
    </div>
  )
}