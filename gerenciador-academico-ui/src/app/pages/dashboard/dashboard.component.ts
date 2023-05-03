import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  message: string = '';

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.getMessageDashboard();
  }

  getMessageDashboard(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message;
      },
      error: (e) => {
        console.log("erro")
        console.log(e);
      }
    });
  }

}
