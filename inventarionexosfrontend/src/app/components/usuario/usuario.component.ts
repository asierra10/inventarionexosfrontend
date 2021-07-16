import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../../service/dataservice.service';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../model/Usuario';
import { Cargo } from '../../model/Cargo';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(public data: DataserviceService) { }

  cargoActual:string = "";

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllPositions();
  }

  getAllUsers(){
    this.data.getAllUsers().subscribe(
      res => {
        this.data.userArray = res;
        console.log(this.data.userArray);
      }
    );
  }

  getAllPositions(){
    this.data.getAllPositions().subscribe(
      res => {
        this.data.positionArray = res;
      }
    );
  }

  addUser(form:NgForm){
    this.cargoActual = form.value.cargoActual;
    const res = confirm("¿Está seguro qué quiere guardar el Usuario?");
    if(res){
      this.data.createUser(form.value,this.cargoActual).subscribe(
        res => {
          this.getAllUsers();
          alert("¡Usuario creado exitosamente!");
        },error =>{
          500
          alert("¡Todos los parámetros deben ser seleccionados, el usuario no se creará!");
        }
      );
    }
  }

  addPosition(form:NgForm){
    if(form.value.cargo != ""){
      const res = confirm("¿Está seguro qué quiere guardar el Cargo?");
      if(res){
        this.data.createPosition(form.value).subscribe(
          res => {
            this.getAllPositions();
            alert("¡Cargo creado exitosamente!");
          }
        );
      }
    }else{
      alert("¡Todos los parámetros deben ser seleccionados, el cargo no se creará!");
    }
  }

  deleteUser(us:Usuario){
    const res = confirm("¿Está seguro?");
    if(res){
      const id = us.id_usuario;
      this.data.deleteUser(id?.toString()).subscribe(
        res => {
          this.getAllUsers();
          alert("¡Usuario eliminado exitosamente!");
        }
      );
    }
  }

  deletePosition(id:number){
    const res = confirm("¿Está seguro?");
    if(res){
      this.data.deletePosition(id.toString()).subscribe(
        res => {
          this.getAllPositions();
          alert("Cargo eliminado exitosamente!");
        }
      );
    }
  }

}
