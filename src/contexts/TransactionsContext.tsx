

import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../utils/axios";
import { createContext } from "use-context-selector";
interface Transaction{
    id:number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category : string;
    createdAt: string;
}
interface TransactionContextType{
   transactions : Transaction[];
   createTransaction : (data:CreateTransactionInput)=> void
   fetchTransactions : (query?:string)=> Promise<void>
}
interface CreateTransactionInput{
    description:string;
    price:number;
    category:string;
    type:'income'| 'outcome'
}
export const TransactionsContext = createContext(
    {} as TransactionContextType
)
interface TransactionsProviderProps{
    children: ReactNode;
}
export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions,setTransactions] = useState<Transaction[]>([])
    const  fetchTransactions = useCallback(async(query?:string)=>{
              const response = await api.get('transactions',{
                params:{
                    _sort: 'createdAt',
                    _order:'desc',
                    q:query
                }
              })
              setTransactions(response.data);
    },[])
    const createTransaction = useCallback( async(data : CreateTransactionInput)=>{
        const { description,price,category,type} = data;
        const response = await api.post('transactions',{
         
           description, 
           category,
           price,
           type,
           createdAt : new Date()
        })
        setTransactions((state)=> [...state,response.data])
       },[]
      )
      useEffect(()=>{
        fetchTransactions()
      },[fetchTransactions])
    return(
        <TransactionsContext.Provider value={{transactions,createTransaction,fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}