import { Transactions } from "./Transactions"
import { Customers } from "./customers"

export interface Combination {
    customer: Customers
    transactions: Transactions[]

}
