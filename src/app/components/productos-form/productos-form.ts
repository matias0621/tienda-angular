import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productos } from '../../services/productos';
import { Router, ActivatedRoute } from '@angular/router';
import IProductos from '../../models/Productos';

@Component({
  selector: 'app-productos-form',
  imports: [ReactiveFormsModule],
  templateUrl: './productos-form.html',
  styleUrl: './productos-form.css'
})
export class ProductosForm {


  productoForm:FormGroup;
  hayId:string|undefined;

  constructor(private fb: FormBuilder, public productoService:Productos, private route: ActivatedRoute) { 
    this.productoForm = new FormGroup({});
    this.hayId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.min(0), Validators.max(500000)]],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    })

    if(this.hayId){
      this.productoService.getProducto(this.hayId).subscribe({
        next: (res) => {
          this.productoForm.patchValue({
            nombre: res.nombre,
            precio: res.precio,
            descripcion: res.descripcion,
            imagen: res.imagen
          })
        },
        error: (err) => {
          console.log(err);
          alert('Error al cargar el producto');
        }
      })
    }
  }

  enviarProducto(){
    this.productoService.createProducto(this.productoForm.value).subscribe({
      next: (res) => {
        console.log(res);
        alert('Producto creado correctamente');
        this.productoForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Error al crear el producto');
      }
    })
  }

  actualizarProducto(){
   const producto: IProductos = {
      id: this.hayId!,
      nombre: this.productoForm.value.nombre,
      precio: this.productoForm.value.precio,
      descripcion: this.productoForm.value.descripcion,
      imagen: this.productoForm.value.imagen
    }

    this.productoService.updateProducto(producto).subscribe({
      next: (res) => {
        console.log(res);
        alert('Producto actualizado correctamente');
        this.productoForm.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Error al actualizar el producto');
      }
    })
  }

}
