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
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatRadioModule

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
        MatDialogModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatRadioModule
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
        MatDialogModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatCardModule,
        MatRadioModule
    ]
})


export class MaterialModule {}