import { Component } from '@angular/core';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-productos-list',
  imports: [],
  templateUrl: './productos-list.html',
  styleUrl: './productos-list.css'
})
export class ProductosList {
  
  constructor(public productosService:Productos) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.productosService.getAllProductos().subscribe({
      next: (res) => {
        this.productosService.productosList = res;
        console.log(res);
      },
      error: (err) => console.log(err)
    })
  }

}
