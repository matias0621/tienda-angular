import { Injectable } from '@angular/core';
import IProductos from '../models/Productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Productos {
  
  productosList: IProductos[]
  readonly URL_API = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { 
    this.productosList = []
  }

  getAllProductos(){
    return this.http.get<IProductos[]>(this.URL_API);
  }

  getProducto(id: string){
    return this.http.get<IProductos>(`${this.URL_API}/${id}`);
  }

  createProducto(producto: IProductos){
    return this.http.post(this.URL_API, producto);
  }

  updateProducto(producto: IProductos){
    return this.http.put(`${this.URL_API}/${producto.id}`, producto);
  }
  
  deleteProducto(id: string){
    return this.http.delete(`${this.URL_API}/${id}`);
  }

}
