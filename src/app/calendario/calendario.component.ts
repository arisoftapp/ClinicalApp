import { L10n, isNullOrUndefined} from '@syncfusion/ej2-base';
import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, PopupOpenEventArgs, RecurrenceEditor, ScheduleComponent, CurrentAction } from '@syncfusion/ej2-angular-schedule';
import { CitasService } from '../services/citas.service';
import { MatSnackBar } from '@angular/material';
import { Cita } from '../models/CitaModel';
import { Router } from '@angular/router';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';


L10n.load({
  'en-US': {
      'schedule': {
          'saveButton': 'Guardar',
          'cancelButton': 'Cerrar',
          'deleteButton': '',
          'newEvent': 'Nueva Cita',
       
      },
  }
});

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  
  public selectedDate: Date;
  public eventSettings: EventSettingsModel;
  public scheduleObj: ScheduleComponent;
  citas : any [] = [];
  scheduleData: any[] = [];
  color: any;
  private success : boolean;
  prioridades: any[] = [];
  array_prioridades: any [] = [];
  cita : Cita;

  constructor(private router : Router, public citas_serv : CitasService, private _snackBar: MatSnackBar, ) {  
    registerLocaleData(localeMX); 
    this.getCitas();
    this.cargar();
    this.getPrioriadad();

    
  }

  ngOnInit() {
    

  }


  getPrioriadad(){ 
    this.citas_serv.getPrioridad().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (jey.success){
          this.prioridades = jey.data;
          this.prioridades.sort(function (a, b) {
            if (a.prioridad > b.prioridad) {
              return 1;
            }
            if (a.prioridad < b.prioridad) {
              return -1;
            }
            
            // a must be equal to b
            return 0;
          });
          for(let prio of this.prioridades){
            this.array_prioridades.push(prio.prioridad)
          }
         
        }
      error => {
        console.log(<any>error);
      }
      });
  }



  getCitas(){
    this.citas_serv.getCita().subscribe(
      (response : any)  => {
        var Resp = response;
        var texto = Resp._body;
        var jey = JSON.parse(texto); 
        if (!jey.success){
          this.success = jey.success; 
          this.SnackBarError(jey.message);
        }else {
          this.citas = jey.data;
        
          this.citas.sort(function (a, b) {
            if (a.hora > b.hora) {
              return 1;
            }
            if (a.hora < b.hora) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          this.cargar();
        }
      error => {
        console.log(<any>error);
      }
      });
  }

  cargar(){
    for (let cita of this.citas){
      let yy = +cita.fecha.substring(0,4);
      let mm = cita.fecha.substring(5,7);
      let dd = cita.fecha.substring(8,10);
      let hh = cita.hora.substring(0,2)
      let endhh: number;
      let mn = cita.hora.substring(3,5)
      let endmn: number;
      let color: any;
      if(hh < 10){
        hh = +(hh.substring(1));
      }else{
        hh = +(hh)
      }
      if(mn < 10){
        mn = +(mn.substring(1));
        endhh = hh
        endmn = mn +30
      }else{
        mn = +(mn)
        endmn = 0 
        endhh = hh + 1
      }
      if(mm < 10){
       mm = +(mm.substring(1))-1;
     }else{
       mm = +(mm)-1
     }
     if(dd < 10){
       dd = +(dd.substring(1));
     }else{
       dd = +(dd)
     }

      
      
    this.scheduleData.push(
       {
         Id: cita.id_cita,
         Title: "Cita",
         Subject: cita.paciente+" "+cita.ap_paciente,
         Location: 'México',
         StartTime: new Date(yy,mm,dd,hh, mn),
         EndTime: new Date(yy,mm,dd, endhh, endmn),
         Description: cita.sintomas,
         //CategoryColor: this.color
     })
    }
    this.selectedDate = new Date();
    this.eventSettings = { dataSource: <Object[]>extend([], this.scheduleData, null, true) };
  }

  openAddDialog(): void {
    this.router.navigate(['citas/registrarCita/']);
  }
  SnackBarError(message: string) {
    this._snackBar.open(message, "Aceptar", {
      duration: 5000,
    });
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    
    let currentAction: CurrentAction = 'Save';
    if (currentAction == "Save"){
      console.log("ckikeo");
    }
    if (args.type === 'Editor') {
      let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      if (!statusElement.classList.contains('e-dropdownlist')) {
          let dropDownListObject: DropDownList = new DropDownList({
              placeholder: 'Peioridad', value: statusElement.value,
              dataSource: this.array_prioridades
          });
          dropDownListObject.appendTo(statusElement);
          statusElement.setAttribute('prioridad', 'EventType');
      }


        /*let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
        if (!startElement.classList.contains('e-datetimepicker')) {
            new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
        }
        let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
        if (!endElement.classList.contains('e-datetimepicker')) {
            new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
        }
        let recurElement: HTMLElement = args.element.querySelector('#RecurrenceEditor');
        if (!recurElement.classList.contains('e-recurrenceeditor')) {
            let recurrObject: RecurrenceEditor = new RecurrenceEditor({
            });
            recurrObject.appendTo(recurElement);
            (this.scheduleObj.eventWindow as any).recurrenceEditor = recurrObject;
        }
        document.getElementById('RecurrenceEditor').style.display = (this.scheduleObj.currentAction == "EditOccurrence") ? 'none' : 'block';
     */ }
}


}
 