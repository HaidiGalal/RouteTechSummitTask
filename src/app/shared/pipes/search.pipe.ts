import { Pipe, PipeTransform } from '@angular/core';
import { Customers } from '../interfaces/customers';
import { Combination } from '../interfaces/combination';

@Pipe({
  name: 'search',
  standalone: true,

})
export class SearchPipe implements PipeTransform {

  transform( customers:Combination[],name:string):Combination[] {
   
      return customers.filter(
        (customer)=>{
         return customer.customer.name.toLowerCase().includes(name.toLowerCase());
         
        }
      )
    
    
  }

}
