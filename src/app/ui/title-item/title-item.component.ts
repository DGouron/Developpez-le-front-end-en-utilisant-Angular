import { Component, Input } from "@angular/core";

@Component({
	selector: "app-title-item",
	standalone: true,
	imports: [],
	templateUrl: "./title-item.component.html",
	styleUrl: "./title-item.component.scss",
})
export class TitleItemComponent {
	@Input() titleToShow!: string;
}
