import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getTransactions().subscribe({
      next: (response) => {
        this.transactions = response;
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      },
      complete: () => {
        console.log('Transaction data fetching completed.');
      }
    });

  }
}
