import { Component, type OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { type Observable, Subscription, of } from "rxjs";
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
	subscriptions: Subscription[] = [];
	numberOfCountries = 0;
	numberOfGames = 0;
	dataset: Data[] = [];

	constructor(
		private olympicService: OlympicService,
		private router: Router,
	) {}

	/**
	 *  @description Load the olympics data
	 */
	ngOnInit(): void {
		this.olympics$ = this.olympicService.getOlympics();
		this.subscriptions.push(
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
			}),
		);
	}

	ngOnDestroy(): void {
		this.subscriptions.map((sub) => sub.unsubscribe());
	}

	/**
	 *  @description Calculate the number of games
	 *  @param {Olympic[]} olympics - The olympics data
	 *  @returns {number} - The number of games
	 */
	calculateNumberOfGames(olympics: Olympic[]): number {
		const years = olympics?.flatMap((olympic) =>
			olympic.participations.map((participation) => participation.year),
		);

		return new Set(years).size;
	}

	/**
	 *  @description Calculate the number of countries
	 *  @param {Olympic[]} olympics - The olympics data
	 *  @returns {number} - The number of countries
	 */
	calculateNumberOfCountries(olympics: Olympic[]): number {
		return new Set(olympics?.map((olympic: Olympic) => olympic.country)).size;
	}

	/**
	 *  @description Navigate to the details page
	 *  @param {Data} event - The event data
	 */
	onSelectedValue(event: Data): void {
		const id = event?.extra?.id;
		if (id) {
			this.router.navigate([`/details/${id}`]);
		}
	}

	/**
	 *  @description Count the number of medals for a country
	 *  @param {Olympic} country - The country data
	 *  @returns {number} - The number of medals
	 */
	countMedalForCountry(country: Olympic): number {
		const participations: Participation[] = country.participations;
		return participations.reduce((acc, participation) => {
			return acc + participation.medalsCount;
		}, 0);
	}
}
