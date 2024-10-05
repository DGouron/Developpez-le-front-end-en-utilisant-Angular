import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Olympic } from "../models/Olympic";

@Injectable({
	providedIn: "root",
})
export class OlympicService {
	private olympicUrl = "./assets/mock/olympic.json";
	public olympics$ = new BehaviorSubject<Olympic[] | null>(null);

	constructor(private http: HttpClient) {}

	/**
	 *  @description Load the olympics data
	 *  @returns {Observable<Olympic[]>} - The olympics data
	 */
	loadInitialData() {
		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.olympics$.next(value)),
			catchError((error, caught) => {
				console.error(error);
				// can be useful to end loading state and let the user know something went wrong
				this.olympics$.next([]);
				return caught;
			}),
		);
	}

	/**
	 *  @description Get the olympics data
	 *  @returns {Observable<Olympic[] | null>} - The olympics data
	 */
	getOlympics(): Observable<Olympic[] | null> {
		return this.olympics$.asObservable();
	}

	/**
	 *  @description Get the details of the olympic by id
	 *  @param {string} id - The id of the olympic to load
	 *  @returns {Observable<Olympic>} - The olympic data
	 */
	getDetailsById(id: string): Observable<Olympic> {
		return this.olympics$.pipe(
			map((olympics) => {
				if (!olympics) {
					throw new Error("No data available");
				}

				const foundOlympicData = olympics.find(
					(olympic: Olympic) => olympic.id.toString() === id,
				);
				if (!foundOlympicData) {
					throw new Error("No data available");
				}
				return foundOlympicData;
			}),
			catchError((error) => {
				throw new Error(error);
			}),
		);
	}
}
