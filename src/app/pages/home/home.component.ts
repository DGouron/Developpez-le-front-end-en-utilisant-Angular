import { Component, type OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { type Observable, of } from "rxjs";
import { Data } from "src/app/core/models/Data";
import { Olympic } from "src/app/core/models/Olympic";
import { Participation } from "src/app/core/models/Participation";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	public olympics$: Observable<Olympic[] | null> = of(null);

	numberOfCountries = 0;
	numberOfGames = 0;
	dataset: Data[] = [];

	constructor(
		private olympicService: OlympicService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.olympics$ = this.olympicService.getOlympics();
		this.olympics$.subscribe((olympics: Olympic[] | null) => {
			if (!olympics) {
				return;
			}
			this.numberOfGames = this.calculateNumberOfGames(olympics);
			this.numberOfCountries = this.calculateNumberOfCountries(olympics);
			this.dataset = olympics?.map((item: Olympic) => ({
				name: item.country,
				value: this.countMedalForCountry(item),
				extra: {
					id: item.id,
				},
			}));
		});
	}

	calculateNumberOfGames(olympics: Olympic[]): number {
		const years = olympics?.flatMap((olympic) =>
			olympic.participations.map((participation) => participation.year),
		);

		return new Set(years).size;
	}

	calculateNumberOfCountries(olympics: Olympic[]): number {
		return new Set(olympics?.map((olympic: Olympic) => olympic.country)).size;
	}

	onSelectedValue($event: {
		name: string;
		value: string;
		extra: { id: number };
	}): void {
		const id = $event.extra.id;
		if (id) {
			this.router.navigate([`/detail/${id}`]);
		}
	}

	countMedalForCountry(country: Olympic): number {
		const participations: Participation[] = country.participations;
		return participations.reduce((acc, participation) => {
			return acc + participation.medalsCount;
		}, 0);
	}
}
