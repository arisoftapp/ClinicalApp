import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/PacienteModel';
import { CitasService } from 'src/app/services/citas.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-historial-med',
  templateUrl: './historial-med.component.html',
  styleUrls: ['./historial-med.component.css']
})
export class HistorialMedComponent implements OnInit {
  paciente: any;
  paciente_historia: any;
  success: any;
  displayedColumns: string[] = ['fecha', 'doctor', 'status', 'consulta'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paciente_data: any;


  constructor(private activatedRouter: ActivatedRoute, private citas_serv: CitasService,
  private _snackBar: MatSnackBar, private pac_service : PacienteService) { }


  ngOnInit() {
    this.paciente = this.activatedRouter.snapshot.paramMap.get('clavePaciente');
    console.log(this.paciente);
    this.getCitas()
  }

  getCitas(){
    this.citas_serv.getCitasPaciente(this.paciente).subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
          this.paciente_data = new Paciente();
        }else {
          this.paciente_data = jey.data;
          this.paciente_historia = this.paciente_data[0].paciente+" "+this.paciente_data[0].ap_paciente
          for(let item  of this.paciente_data){
            if(item.status == 1){
              item.estado = "Pendiente"
            } else if (item.status == 2){
              item.estado = "Cancelada"
            } else{
              item.estado = "Concluida"
            }
            
          }
          console.log(jey.data);
          this.dataSource = new MatTableDataSource<any>(this.paciente_data);
          this.dataSource.paginator = this.paginator;
        }
      error => {
        console.log(<any>error);
      }
    });
  }
  

  OpenDetalles(id: any){
    console.log(id);
    
  }
  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }
  
}
