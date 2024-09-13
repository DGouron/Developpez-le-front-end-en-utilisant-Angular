import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { PiechartComponent } from "./ui/piechart/piechart.component";
import { StatItemComponent } from "./ui/stat-item/stat-item.component";
import { TitleItemComponent } from "./ui/title-item/title-item.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DetailComponent,
		NotFoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		PiechartComponent,
		StatItemComponent,
		TitleItemComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
