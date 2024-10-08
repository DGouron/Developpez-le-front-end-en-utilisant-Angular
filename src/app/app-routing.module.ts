import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { DetailComponent } from "./pages/detail/detail.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "details/:id",
		component: DetailComponent,
	},
	{
		path: "**", // wildcard
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
