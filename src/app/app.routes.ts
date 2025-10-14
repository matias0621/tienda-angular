import { Routes } from '@angular/router';
import { Productos } from './pages/productos/productos';
import { Details } from './pages/details/details';
import { Form } from './pages/form/form';

export const routes: Routes = [
    {path:'productos', component: Productos},
    {path:'productos/:id', component: Details},
    {path:'form-productos', component: Form},
    {path:'', redirectTo:'productos', pathMatch:'full' }
];
