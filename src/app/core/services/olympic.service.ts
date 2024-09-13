import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Olympic } from "../models/Olympic";

@Injectable({
	providedIn: "root",
})
export class OlympicService {
	private olympicUrl = "./assets/mock/olympic.json";
	public olympics$ = new BehaviorSubject<Olympic[] | null>(null);

	constructor(private http: HttpClient) {}

	loadInitialData() {
		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.olympics$.next(value)),
			catchError((error, caught) => {
				// TODO: improve error handling
				console.error(error);
				// can be useful to end loading state and let the user know something went wrong
				this.olympics$.next([]);
				return caught;
			}),
		);
	}

	getOlympics(): Observable<Olympic[] | null> {
		return this.olympics$.asObservable();
	}

	getDetailsById(id: string): Observable<Olympic | null> {
		return this.olympics$.pipe(
			map((olympics) => {
				if (!olympics) {
					return null;
				}

				const foundOlympicData = olympics.find(
					(olympic: Olympic) => olympic.id.toString() === id,
				);
				return foundOlympicData || null;
			}),
			catchError((error) => {
				console.error(error);
				return of(null);
			}),
		);
	}
}
