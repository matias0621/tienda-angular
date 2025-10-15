import { ChangeDetectorRef, Component } from '@angular/core';
import IProductos from '../../models/Productos';
import { Productos } from '../../services/productos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-details',
  imports: [],
  templateUrl: './productos-details.html',
  styleUrl: './productos-details.css'
})
export class ProductosDetails {

  producto: IProductos;

  constructor(public productoService: Productos, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.producto = { id: '', nombre: '', precio: 0, descripcion: '', imagen: '' };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productoService.getProducto(id).subscribe({
      next: (res) => {
        this.producto = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert('Error al cargar el producto');
      }
    })
  }



}
