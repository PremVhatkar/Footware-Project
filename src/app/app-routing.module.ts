import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { authGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"products", component:ProductsComponent},
  {path:"about", component:AboutComponent},
  {path:"contact", component:ContactComponent},
  {path:"cart", component:CartComponent},
  {path:"login", component:LoginComponent},
  {path:"product/:id", component:ProductDetailsComponent},
  {path:"checkout", component:CheckoutComponent},
    {path:"admin", canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(
    m => m.AdminModule
  )},



  {path:"**", component:HomeComponent}


  // ----------- Lazy Loading for Admin ----------------

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
