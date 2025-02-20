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
import { RentCardComponent } from "../component/rent-card/rent-card.component";
import { RentsListComponent } from "./rents-list/rents-list.component";
import { RateCardComponent } from "./rate-card/rate-card.component";

@NgModule({
    declarations: [
        BookListComponent, 
        BookCardComponent, 
        CreateBookModalComponent,
        BookModalComponent,
        AuthorModalComponent,
        CreateAuthorModalComponent,
        RateModalComponent,
        RentCardComponent,
        RentsListComponent,
        RateCardComponent
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
        RateModalComponent,
        RentCardComponent,
        RentsListComponent,
        RateCardComponent
    ]
})
export class ComponentsModule {}