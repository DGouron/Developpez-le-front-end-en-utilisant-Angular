import { Component } from "@angular/core";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
	selector: "app-piechart",
	standalone: true,
	imports: [NgxChartsModule],
	templateUrl: "./piechart.component.html",
	styleUrl: "./piechart.component.scss",
})
export class PiechartComponent {
	title = "barchartApp";
	dataset = [
		{
			name: "Germany",
			value: 40632,
			extra: {
				code: "de",
			},
		},
		{
			name: "United States",
			value: 50000,
			extra: {
				code: "us",
			},
		},
		{
			name: "France",
			value: 36745,
			extra: {
				code: "fr",
			},
		},
		{
			name: "United Kingdom",
			value: 36240,
			extra: {
				code: "uk",
			},
		},
		{
			name: "Spain",
			value: 33000,
			extra: {
				code: "es",
			},
		},
		{
			name: "Italy",
			value: 35800,
			extra: {
				code: "it",
			},
		},
	];
}
