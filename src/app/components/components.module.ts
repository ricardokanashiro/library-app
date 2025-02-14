import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { BookListComponent } from "./book-list/book-list.component";
import { BookCardComponent } from "./book-card/book-card.component";
import { CreateBookModalComponent } from "./create-book-modal/create-book-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookModalComponent } from "./book-modal/book-modal.component";

@NgModule({
    declarations: [
        BookListComponent, 
        BookCardComponent, 
        CreateBookModalComponent,
        BookModalComponent
    ],
    imports: [
        CommonModule, 
        IonicModule, 
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        BookListComponent, 
        BookCardComponent, 
        CreateBookModalComponent,
        BookModalComponent
    ]
})
export class ComponentsModule {}