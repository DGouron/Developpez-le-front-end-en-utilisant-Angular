import { Component, type OnInit } from "@angular/core";
import { type Observable, of } from "rxjs";
import { Olympic } from "src/app/core/models/Olympic";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	public olympics$: Observable<any> = of(null);
	numberOfCountries = 0;
	numberOfGames = 0;

	constructor(private olympicService: OlympicService) {}

	ngOnInit(): void {
		this.olympics$ = this.olympicService.getOlympics();
		this.olympics$.subscribe((olympics: Olympic[]) => {
			this.calculateNumberOfGames(olympics);
			this.calculateNumberOfCountries(olympics);
		});
	}

	calculateNumberOfGames(olympics: Olympic[]): void {
		const years = olympics.flatMap((olympic) =>
			olympic.participations.map((participation) => participation.year),
		);
		const uniqueYears = new Set(years);
		this.numberOfGames = uniqueYears.size;
	}

	calculateNumberOfCountries(olympics: Olympic[]): void {
		this.numberOfCountries = new Set(
			olympics.map((olympic: Olympic) => olympic.country),
		).size;
	}
}
