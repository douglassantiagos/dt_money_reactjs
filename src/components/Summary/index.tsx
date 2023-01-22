import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'

import { useSummary } from '../../hooks/useSummary';
import { longDateFormatter, priceFormatter } from '../../utils/formatter';

import { SummaryCard, SummaryContainer } from "./styles";
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export function Summary() {
  const summary = useSummary()

  const { transactions, isLoadingTransactions } = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )

  const transactionsIncome = transactions.filter((transaction) => {
    return transaction.type === 'income'
  }) 
  const lastCreatedAtIncome = transactionsIncome.map(
    transaction => longDateFormatter.format(new Date(transaction.createdAt))
  ) 

  const transactionsOutcome = transactions.filter((transaction) => {
    return transaction.type === 'outcome'
  })
  const lastCreatedAtOutcome = transactionsOutcome.map(
    transaction => longDateFormatter.format(new Date(transaction.createdAt))
  )

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
        {isLoadingTransactions ? (
          <p>Carregando dados...</p>
        ): (
          <p>
            {
              lastCreatedAtIncome[0] === undefined 
              ? ''
              : `Última entrada em ${lastCreatedAtIncome[0]}`
            }
          </p>
        )}
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
        {isLoadingTransactions ? (
          <p>Carregando dados...</p>
        ): (
          <p>
            {
              lastCreatedAtOutcome[0] === undefined 
              ? ''
              : `Última saída em ${lastCreatedAtOutcome[0]}`
            }
          </p>
        )}
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
