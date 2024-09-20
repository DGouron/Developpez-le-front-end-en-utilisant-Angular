import { Component, Input } from "@angular/core";

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Series } from "src/app/core/models/Data";

@Component({
	selector: "app-linechart",
	standalone: true,
	imports: [NgxChartsModule],
	templateUrl: "./linechart.component.html",
	styleUrl: "./linechart.component.scss",
})
export class LineChartComponent {
	title = "linechart";
	xAxisLabel = "Dates";
	@Input() dataset: Series[] = [];
}
