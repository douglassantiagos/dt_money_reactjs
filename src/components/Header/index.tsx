import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from "../NewTransactionModal";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

export function Header() {
  const { openNewTransactionModal, closeNewTransactionModal } = useContextSelector(
    TransactionsContext, (context) => {
      return context
    }
  )
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={openNewTransactionModal} onOpenChange={closeNewTransactionModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}