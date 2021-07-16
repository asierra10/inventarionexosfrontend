import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../service/dataservice.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Producto } from '../../model/Producto';
import { Usuario } from '../../model/Usuario';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(public data: DataserviceService) { }

  updateProduct: Producto = {
    id_producto:0,
    nombre:"",
    cantidad:0
  }

  currentUser:string = "";
  busqueda: string = "";

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllUsers();
  }

  getAllProducts(){
    this.data.getAllProducts().subscribe(
      res => {
        this.data.productArray = res; 
        console.log(this.data.productArray);
      }
    ); 
  }

  getAllUsers(){
    this.data.getAllUsers().subscribe(
      res => {
        this.data.userArray = res;
      }
    );
  }

  getCurrentUser(form:NgForm){
    this.currentUser = form.value.usuarioActual;
    alert("¡El usuario puede ejecutar operaciones!");
  }

  addProduct(form:NgForm){
    const id = form.value._id;
    if(id){
      const res = confirm("¿Está seguro qué quiere editar el Producto?");
      if(res){
        this.updateProduct.nombre = form.value.nombre;
        this.updateProduct.cantidad = form.value.cantidad;
        this.data.editProduct(id,this.currentUser,this.updateProduct).subscribe(
          res => {
            this.getAllProducts();
            form.reset();
            alert("¡Producto editado exitosamente!");
          },err => {
            500
            alert("¡Debe seleccionar el usuario editor, la edición del producto no se realizará!");
          }
        );
        
      }
    }else{
      const res = confirm("¿Está seguro qué quiere guardar el Producto?");
      if(res){
        this.data.createProduct(form.value,this.currentUser).subscribe(
          res => {
            this.getAllProducts();
            form.reset();
            alert("¡Producto guardado exitosamente!");
          },err => {
            500
            alert("¡Debe seleccionar el usuario creador, la creación del producto no se realizará!");
          }
        );
      }
    }
  }

  editProduct(product:Producto){
    this.data.newProduct = product;
  }

  deleteProduct(product:Producto){
    const res = confirm("¿Está seguro?");
    if(res){
      this.data.deleteProduct(product.id_producto.toString(),this.currentUser).subscribe(
        res => {
          this.getAllProducts();
          alert("¡Producto eliminado exitosamente!");
        }, err => {
          500
          alert("¡El producto solo puede ser eliminado por el mismo usaurio que lo creo!");
        }
      );
    }
  }

  buscar(form:NgForm){
    this.busqueda = form.value.search;
    console.log("busqueda: "+this.busqueda);
    this.data.getAllProductsByName(this.busqueda).subscribe(
      res => {   
        if(res.length == 0){
          alert("¡No existen productos que concuerden con el parámetro de búsqueda!");
        }else{
          this.data.productArray = res; 
        }
      }
    );
  }

  clean(){
    this.getAllProducts();
  }

}
