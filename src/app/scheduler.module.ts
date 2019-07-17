import { NgModule } from '@angular/core';

import { 
    ScheduleModule, 
    AgendaService, 
    DayService, 
    WeekService, 
    WorkWeekService,  
    MonthService
   
} from '@syncfusion/ej2-angular-schedule';

@NgModule({
    imports:[
        ScheduleModule
        
    ],
    exports:[
        ScheduleModule
    ],
    providers : [
        AgendaService, 
        DayService, 
        WeekService, 
        WorkWeekService, 
        MonthService
    ]
})


export class SchedulerModule {}