import { Component, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../services/productos';
import IProductos from '../../models/Productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [],
  templateUrl: './productos-list.html',
  styleUrls: ['./productos-list.css'],
})
export class ProductosList implements OnInit {
  productosList: IProductos[] = [];

  constructor(
    public productosService: Productos,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productosService.getAllProductos().subscribe({
      next: (res) => {
        this.productosList = res;
        console.log('Products loaded:', res);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error loading products:', err);
      },
    });
  }

  editarProducto(id: string) {
    this.router.navigate(['/form-productos', id]);
  }

  eliminarProducto(id: string) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmar) {
      this.productosService.deleteProducto(id).subscribe({
        next: (res) => {
          alert('Producto eliminado correctamente');
          this.getProductos(); // Refrescar la lista después de eliminar
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          alert('Error al eliminar el producto');
        },
      });
    }
  }
}
