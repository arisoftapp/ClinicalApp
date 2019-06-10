import { NgModule } from '@angular/core';

import { 
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule

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
        MatTabsModule,
        MatBadgeModule,
        MatMenuModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatBadgeModule,
        MatMenuModule,
        MatDividerModule,
        MatSnackBarModule,
        MatTableModule,
        MatTooltipModule,
        MatDialogModule
    ]
})


export class MaterialModule {}