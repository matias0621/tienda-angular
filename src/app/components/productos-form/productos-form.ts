import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-productos-form',
  imports: [ReactiveFormsModule],
  templateUrl: './productos-form.html',
  styleUrl: './productos-form.css'
})
export class ProductosForm {


  productoForm:FormGroup;

  constructor(private fb: FormBuilder, public productoService:Productos) { 
    this.productoForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.min(0), Validators.max(500000)]],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    })
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
}
