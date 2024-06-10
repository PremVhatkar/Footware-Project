import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { LandingComponent } from './landing/landing.component';
import { adminroleGuard } from '../shared/adminrole.guard';

const routes: Routes = [
    {path:"", component:LandingComponent, children:[
    {path:"dashboard", component:DashboardComponent},
    {path:"products", canActivate:[adminroleGuard], component:ProductsComponent},
    {path:"product", canActivate:[adminroleGuard], component:ProductComponent},
    {path:"product/:id", canActivate:[adminroleGuard], component:ProductComponent},
    {path:"orders", component:OrdersComponent},
    {path:"**", component:DashboardComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
