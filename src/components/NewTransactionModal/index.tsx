import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function NewTransactionModal(){
    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
              <Dialog.Title>Nova Transação</Dialog.Title>

              <CloseButton>
                <X />
              </CloseButton>

              <form action="">
                 <input type="text" placeholder="Descrição"required />
                 <input type="number" placeholder="Preço" required />
                 <input type="text" placeholder="Categoria" required />
                 <TransactionType>
                    <TransactionTypeButton variant="income" value="income">Entrada <ArrowCircleUp/></TransactionTypeButton>
                    <TransactionTypeButton variant="outcome"value="outcome">Saída <ArrowCircleDown/></TransactionTypeButton>
                 </TransactionType>
                 <button type="submit">Cadastrar</button>
              </form>
             
            </Content>
        </Dialog.Portal>
    )
}