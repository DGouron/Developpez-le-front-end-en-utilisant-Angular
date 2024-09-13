import { Component, EventEmitter, Input, Output } from "@angular/core";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Data } from "src/app/core/models/Data";

@Component({
	selector: "app-piechart",
	standalone: true,
	imports: [NgxChartsModule],
	templateUrl: "./piechart.component.html",
	styleUrl: "./piechart.component.scss",
})
export class PiechartComponent {
	title = "piechart";

	@Input() dataset: Data[] = [];
	@Output() selectedValue = new EventEmitter<any>();

	onSelect(event: {
		name: string;
		value: string;
		extra: any;
	}): void {
		this.selectedValue.emit(event);
	}
}
