import { Component, OnInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../services/productos';
import IProductos from '../../models/Productos';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './productos-list.html',
  styleUrls: ['./productos-list.css'],
})
export class ProductosList implements OnInit {
  productosList: IProductos[] = [];
  nombreFiltro: string = '';


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
        this.productosList = [...res];
        console.log('Products loaded:', res);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error loading products:', err);
      },
    });
  }

  filtrarPorNombre() {
    if (this.productosList.length == 0) {
      alert('No hay productos para filtrar');
    }
    
    this.productosList = this.productosList.filter(p => p.nombre.includes(this.nombreFiltro));
    if (this.productosList.length == 0) {
      alert('No se encontraron productos con ese nombre');
      this.getProductos();
    }
  
  }

  ordenarPorNombre(ascendente: boolean) {
    if (ascendente) {
      this.productosList.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    else {
      this.productosList.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
  }

  ordenarPorPrecio(ascendente: boolean) {
    if (ascendente) {
      this.productosList.sort((a, b) => a.precio - b.precio);
    }
    else {
      this.productosList.sort((a, b) => b.precio - a.precio);
    }
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
