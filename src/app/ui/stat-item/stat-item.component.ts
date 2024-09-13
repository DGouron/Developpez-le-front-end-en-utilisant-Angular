import { Component, Input } from "@angular/core";

@Component({
	selector: "app-stat-item",
	standalone: true,
	imports: [],
	templateUrl: "./stat-item.component.html",
	styleUrl: "./stat-item.component.scss",
})
export class StatItemComponent {
	@Input() label!: string;
	@Input() value!: number;
}
