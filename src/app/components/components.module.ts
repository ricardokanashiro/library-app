import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookListComponent } from "./book-list/book-list.component";
import { BookCardComponent } from "./book-card/book-card.component";
import { CreateBookModalComponent } from "./create-book-modal/create-book-modal.component";
import { BookModalComponent } from "./book-modal/book-modal.component";
import { AuthorModalComponent } from "./author-modal/author-modal.component";
import { CreateAuthorModalComponent } from "./create-author-modal/create-author-modal.component";
import { RateModalComponent } from "./rate-modal/rate-modal.component";

@NgModule({
    declarations: [
        BookListComponent, 
        BookCardComponent, 
        CreateBookModalComponent,
        BookModalComponent,
        AuthorModalComponent,
        CreateAuthorModalComponent,
        RateModalComponent
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
        BookModalComponent,
        AuthorModalComponent,
        CreateAuthorModalComponent,
        RateModalComponent
    ]
})
export class ComponentsModule {}