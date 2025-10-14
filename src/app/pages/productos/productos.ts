import { Component } from '@angular/core';
import { ProductosList } from '../../components/productos-list/productos-list';

@Component({
  selector: 'app-productos',
  imports: [ProductosList],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
