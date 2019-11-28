import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { IOrder } from "src/app/models/order";
import { IProduct } from "src/app/models/product";
import { Router } from "@angular/router";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  private userOrders: any[] = [];
  private errorMessage: string;
  private orderProducts: IProduct[];
  private showLoaddingIndicator: boolean = false;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.showLoaddingIndicator = true;
    this.orderService.getAllUserOrders().subscribe(
      response => {
        this.userOrders = response;
        for (let i in this.userOrders) {
          this.userOrders[i].orderProducts = JSON.parse(
            this.userOrders[i].orderProducts
          );
        }

        // this.userOrders = [];
        console.log(this.userOrders);
        this.showLoaddingIndicator = false;
      },
      error => {
        this.errorMessage = error.message;
        this.showLoaddingIndicator = false;
      }
    );
  }

  updatePaymentStatus(orderId: string): void {
    this.showLoaddingIndicator = true;
    this.orderService.checkOrderPaymentStatus(orderId).subscribe(
      response => {
        console.log(response);
        this.ngOnInit();
        this.showLoaddingIndicator = false;
      },
      error => {
        this.errorMessage = error.message;
        this.showLoaddingIndicator = false;
      }
    );
  }
}
