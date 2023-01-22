import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

export interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome' 
}

interface UpdateTransactionInput {
  id: number
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt: string
}

interface FetchFilterTransactionsProps {  
  type?: string
  order?: 'asc' | 'desc'
  category?: string
  date?: string
}

interface TransactionContextType {
  transactions: Transaction[]
  filterSelected: FetchFilterTransactionsProps[]
  openNewTransactionModal: boolean
  openUpdateTransactionModal: boolean
  openFilterModal: boolean
  openConfirmQuestionModal: boolean
  isLoadingTransactions: boolean
  closeNewTransactionModal: (state: boolean) => void;
  closeUpdateTransactionModal: (state: boolean) => void;
  closeFilterModal: (state: boolean) => void;
  closeConfirmQuestionModal: (state: boolean) => void;
  fetchTransactions: (query?: string) => Promise<void>
  fetchFilterTransactions: (data: FetchFilterTransactionsProps) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (idSelected: number) => Promise<void>
  updateTransaction: (data: UpdateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

const convertMonthsToNumber = {
  Janeiro: '01-',
  Fevereiro: '02-',
  Março: '03-',
  Abril: '04-',
  Maio: '05-',
  Junho: '06-',
  Julho: '07-',
  Agosto: '08-',
  Setembro: '09-',
  Outubro: '10-',
  Novembro: '11-',
  Dezembro: '12-',
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children } : TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [openNewTransactionModal, setOpenNewTransactionModal] = useState(false)
  const [openUpdateTransactionModal, setOpenUpdateTransactionModal] = useState(false)
  const [openFilterModal, setOpenFilterModal] = useState(false)
  const [openConfirmQuestionModal, setOpenConfirmQuestionModal] = useState(false)
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)
  const [filterSelected, setFilterSelected] = useState<FetchFilterTransactionsProps[]>([])

  function closeNewTransactionModal(state: boolean) {
    setOpenNewTransactionModal(state)
  }

  function closeUpdateTransactionModal(state: boolean) {
    setOpenUpdateTransactionModal(state)
  }

  function closeFilterModal(state: boolean) {
    setOpenFilterModal(state)
  }

  function closeConfirmQuestionModal(state: boolean) {
    setOpenConfirmQuestionModal(state)
  }

  const fetchTransactions = useCallback(
    async (query?: string) => {
      setIsLoadingTransactions(true)

      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })
  
      setTransactions(response.data)
      setIsLoadingTransactions(false)
    }, []
  )  
  
  const fetchFilterTransactions = useCallback(
    async (data: FetchFilterTransactionsProps) => {
      const { category, date, order, type } = data;      
      
      const numberMonths = convertMonthsToNumber[date]

      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: order,
          q: numberMonths,
          category: category || undefined,
          type: type || undefined,
        }
      })
      setTransactions(response.data)

      const filterSeletedArray = [];
      filterSeletedArray.push({ category, date, order, type })
      setFilterSelected(filterSeletedArray)
    }, []
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data;
  
      const response = await api.post('transactions', {
        description,
        category,
        price,
        type,
        createdAt: new Date(),
      })
  
      setTransactions(state => [response.data, ...state])
    }, []
  )  

  const updateTransaction = useCallback(
    async (data: UpdateTransactionInput) => {
      const { id, category, description, price, type, createdAt } = data;
  
      const response = await api.put(`transactions/${id}`, {
        id,
        description,
        category,
        price,
        type,
        createdAt,
      })
  
      setTransactions(transactions.map(transaction => (
        transaction.id === id ? response.data : transaction
      )))
      location.reload()
    }, []
  )

  const deleteTransaction = useCallback(
    async (idSelected: number) => {
      const response = await api.delete(`transactions/${idSelected}`)    
      setTransactions(transactions.map(transaction => (
        transaction.id === idSelected ? response.data : transaction
      )))
      location.reload()
    }, []
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
      openNewTransactionModal,
      openUpdateTransactionModal,
      openFilterModal,
      openConfirmQuestionModal,
      closeNewTransactionModal,
      closeUpdateTransactionModal,
      closeFilterModal,
      closeConfirmQuestionModal,
      fetchFilterTransactions,
      deleteTransaction,
      updateTransaction,
      isLoadingTransactions,
      filterSelected
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}