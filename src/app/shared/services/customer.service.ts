import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Customers } from '../interfaces/customers';
import { Transactions } from '../interfaces/Transactions';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) {
   
   }
   getCustomers():Observable<any>{//http://localhost:3000/customers
   return this.httpClient.get('https://my-json-server.typicode.com/HaidiGalal/RouteTechSummitTask/customers');
   }
   getCustomersTranscations():Observable<any>{//http://localhost:3000/transactions
    return this.httpClient.get('https://my-json-server.typicode.com/HaidiGalal/RouteTechSummitTask/transactions');
    }

    getCombinedData(): Observable<{ customer: Customers, transactions: Transactions[] }[]> {
      return forkJoin([this.getCustomers(), this.getCustomersTranscations()]).pipe(
        map(([customers, transactions]) => {
          return customers.map((customer:Customers) => ({
            customer,
            transactions: transactions.filter((transaction:Transactions )=> transaction.customer_id.toString() == customer.id)
          }));
        })
      );
    }
}
