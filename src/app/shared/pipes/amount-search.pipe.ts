import { Transactions } from '../interfaces/Transactions';
import { Combination } from '../interfaces/combination';
import { Customers } from './../interfaces/customers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountSearch',
  standalone:true
})
export class AmountSearchPipe implements PipeTransform {

  transform( customers:Transactions[] ,amount:string): Transactions[] {
    
    return customers.filter(
      (customer)=>{
       return customer.amount.toString().includes(amount.toString());
       
      }
    )
  }

}
