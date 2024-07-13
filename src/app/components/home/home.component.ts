import { AmountSearchPipe } from './../../shared/pipes/amount-search.pipe';
import { SearchPipe } from './../../shared/pipes/search.pipe';
import { Customers } from './../../shared/interfaces/customers';
import { CustomerService } from './../../shared/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transactions } from 'src/app/shared/interfaces/Transactions';
import { TableModule } from 'primeng/table';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Button, ButtonModule } from 'primeng/button';
import { Combination } from 'src/app/shared/interfaces/combination';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    SearchPipe,
    AmountSearchPipe,
    ChartModule
    
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  combination:Combination[]=[];
  searchInput:string="";
  transactions:Transactions[]=[];
   data:any;
   options:any;
   flag:boolean=false;

  // customer1!:Customers;
  constructor(private customer:CustomerService){

  }
  ngOnInit(): void {
    // this.getCustomersData();
    this.getCombinedData();

  }
  getTransactionsData(){
  this.customer.getCustomersTranscations().subscribe({
    next:(response)=>{
    this.transactions=response;
    }
  })
 }
  getCombinedData(){
    this.customer.getCombinedData().subscribe(
      {
        next:(response)=>{
          this.combination=response;
          console.log(this.combination);
         this.getTransactionsData();
        }
      }
    )
  }

  getUserGraph(c:Combination){
   this.flag=true;
    let labels:any[];
    let dataSets:any[];
    labels=c.transactions.map((date)=>date.date);
    dataSets=c.transactions.map((amount)=>amount.amount);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: labels,
      datasets: [
          {
              label: 'Date',
              data: labels,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--blue-500'),
              tension: 0.4
          },
          {
              label: 'Amount',
              data: dataSets,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--pink-500'),
              tension: 0.4
          }
      ]
  };


  this.options = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
    }
};

    

  }
  
}














