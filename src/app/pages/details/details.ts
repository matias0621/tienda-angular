import { Component } from '@angular/core';
import { ProductosDetails } from '../../components/productos-details/productos-details';

@Component({
  selector: 'app-details',
  imports: [ProductosDetails],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {

}
