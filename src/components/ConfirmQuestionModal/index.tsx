import * as Dialog from '@radix-ui/react-dialog';
import { ButtonAction, Content, Overlay, PriceHighlight, Title, TransactionsCard, TransactionsTable } from './styles';
import { Transaction, TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';
import { useState } from 'react';
import { Loading } from '../Loading';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { CalendarBlank, TagSimple } from 'phosphor-react';

interface ConfirmQuestionModalProps {
  transactionDataToDelete: Transaction
  createdAtTransaction: string
}

export function ConfirmQuestionModal({ transactionDataToDelete, createdAtTransaction }: ConfirmQuestionModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {deleteTransaction, closeConfirmQuestionModal} = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )
  
  function handleCatchIdToDelete(id: number) {
    setIsLoading(true)
    deleteTransaction(id)
    setIsLoading(true)
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Title>
          <span>Tem certeza que deseja excluir essa transação ?</span>
        </Title>
        <Dialog.Title>
          <TransactionsTable>
            <tbody>
              <tr>
                <td>{transactionDataToDelete.description}</td>
                <td>
                  <PriceHighlight variant={transactionDataToDelete.type}>
                    {transactionDataToDelete.type === 'outcome' && '- '}
                    {priceFormatter.format(transactionDataToDelete.price)}
                  </PriceHighlight>
                </td>
                <td>{transactionDataToDelete.category}</td>
                <td>{createdAtTransaction}</td>                  
              </tr>
            </tbody>
          </TransactionsTable>
        </Dialog.Title>

        <TransactionsCard>          
          <div key={transactionDataToDelete.id}>            
            <span>{transactionDataToDelete.description}</span>              

            <strong>
              <PriceHighlight variant={transactionDataToDelete.type}>
                {transactionDataToDelete.type === 'outcome' && '- '}
                {priceFormatter.format(transactionDataToDelete.price)}
              </PriceHighlight>
            </strong>

            <section>
              <span>
                <TagSimple />
                {transactionDataToDelete.category}
              </span>
              <span>
                <CalendarBlank />
                {createdAtTransaction}
              </span>
            </section>
          </div>
        </TransactionsCard>               

        <div>
          <ButtonAction variant='excluir' onClick={() => handleCatchIdToDelete(transactionDataToDelete.id)} disabled={isLoading}>
            {isLoading ? <Loading /> : 'Sim, excluir'}
          </ButtonAction>

          <ButtonAction variant='cancelar' onClick={() => closeConfirmQuestionModal(false)} disabled={isLoading}>
            Não, cancelar
          </ButtonAction>
        </div>
      </Content>
    </Dialog.Portal>
  )
}
