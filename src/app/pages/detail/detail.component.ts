import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription, of } from "rxjs";
import { Series } from "src/app/core/models/Data";
import { Olympic } from "src/app/core/models/Olympic";
import { Participation } from "src/app/core/models/Participation";
import { OlympicService } from "src/app/core/services/olympic.service";

@Component({
	selector: "app-detail",
	templateUrl: "./detail.component.html",
	styleUrl: "./detail.component.scss",
})
export class DetailComponent implements OnInit {
	public olympics$: Observable<Olympic[] | null> = of(null);
	subscriptions: Subscription[] = [];
	countryName = "";
	numberOfEntries = 0;
	totalNumberMedals = 0;
	totalNumberOfAthletes = 0;

	dataAvailable = false;
	dataset: Series[] = [];

	constructor(
		private olympicService: OlympicService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get("id");
		this.loadDetails(id);
	}

	ngOnDestroy(): void {
		this.subscriptions.map((sub) => sub.unsubscribe());
	}

	loadDetails(id: string | null): void {
		if (id) {
			this.subscriptions.push(
				this.olympicService.getDetailsById(id).subscribe((details) => {
					if (!details) {
						this.router.navigate(["/"]);
						return;
					}
					this.countryName = details.country;
					this.numberOfEntries = this.getNumberOfEntries(details);
					this.totalNumberMedals = this.getTotalNumberMedals(details);
					this.totalNumberOfAthletes = this.getAthletesCount(details);
					this.dataAvailable = true;
					this.dataset = [
						{
							name: details.country,
							series: details.participations.map((participation) => ({
								name: participation.year.toString(),
								value: participation.medalsCount,
							})),
						},
					];
				}),
			);
		}
	}

	getNumberOfEntries(data: Olympic): number {
		return data.participations.length;
	}

	getTotalNumberMedals(data: Olympic): number {
		return data.participations.reduce(
			(acc, curr: Participation) => acc + curr.medalsCount,
			0,
		);
	}

	getAthletesCount(data: Olympic): number {
		return data.participations.reduce(
			(acc, curr: Participation) => acc + curr.athleteCount,
			0,
		);
	}

	goBack(): void {
		this.router.navigate(["/"]);
	}
}
