import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../model/Producto';
import { Usuario } from '../model/Usuario';
import { Cargo } from '../model/Cargo';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  server: string = "http://localhost:8080/api";
  productArray = new Array<Producto>();
  userArray = new Array<Usuario>();
  newProduct: Producto = {
    id_producto:0,
    nombre:"",
    cantidad:0
  };
  newUser: Usuario = {
    nombre_usuario:"",
    edad:0
  };
  
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.server+'/AllProducts');
  }

  getOneProduct(id:string){
    return this.http.get(this.server+'/getOneProduct/?id='+id);
  }

  getAllProductsByName(name:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.server+'/getAllProductsByName?name='+name);
  }

  getOneProductByName(name:string){
    return this.http.get(this.server+'/getProductByName?name='+name);
  }

  createProduct(product: Producto, creador:string){
    return this.http.post(this.server+'/saveProduct?creador='+creador, product);
  }

  editProduct(id:string,editor:string,product: Producto){
    return this.http.put(this.server+'/updateProduct?id='+id+'&editor='+editor,product);
  }

  deleteProduct(id:string,creador:string){
    return this.http.delete(this.server+'/deleteProduct?id='+id+'&creator='+creador);
  }

  getAllUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.server+'/AllUsers');
  }

  createUser(user: Usuario, cargo:string){
    return this.http.post(this.server+'/saveUser?cargo='+cargo, user);18
  }

  deleteUser(id:string){
    return this.http.delete(this.server+'/deleteUser?id='+id);
  }

  getAllPositions():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.server+'/AllPositions');
  }

  createPosition(position: Cargo){
    return this.http.post(this.server+'/savePosition',position)
  }

  deletePosition(id:string){
    return this.http.delete(this.server+'/deletePosition?id='+id);
  }

}
