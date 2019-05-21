import { NgModule } from '@angular/core';

import { 
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule
    
} from '@angular/material';

@NgModule({
    imports:[
        MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule
    ]
})


export class MaterialModule {}