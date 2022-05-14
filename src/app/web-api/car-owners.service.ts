import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICarOwnersService} from "./models/ICarOwnersSevice.interface";
import {OwnerEntity} from "./models/owner-entity.model";
import {Observable, switchMap, throwError} from "rxjs";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CarOwnersService implements ICarOwnersService {
  private apiUrl = 'api/carOwners';

  constructor(private http: HttpClient) { }

  public getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.apiUrl);
  }

  public getOwnerById(aId: number | string): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`${this.apiUrl}/${aId}`);
  }

  public createOwner(newOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.checkExistOwner(newOwner).pipe(
      switchMap((res: boolean): Observable<OwnerEntity> => {
        if(!res) {
          console.log(res);
          return this.http.post<OwnerEntity>(this.apiUrl, newOwner)
        } else {
          console.log(res)
          return throwError('Owner is existing');
        }
      })
    )
  }

  public editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(this.apiUrl, aOwner)
  }

  public deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete(`${this.apiUrl}/${aOwnerId}`)
      .pipe(
        switchMap(() => this.getOwners())
      )
  }

  private checkExistOwner(aOwner: OwnerEntity): Observable<boolean> {
    return this.getOwners()
      .pipe(
        switchMap((owners) => {
          return owners.map((owner: OwnerEntity): boolean => {
            return (
              aOwner.aLastName === owner.aLastName &&
              aOwner.aFirstName === owner.aFirstName &&
              aOwner.aMiddleName === owner.aMiddleName);
          })
        })
      )
  }

  public checkExistCar(aNumber: string): Observable<ValidationErrors | null> {
    return this.getOwners()
      .pipe(
        switchMap((owners: OwnerEntity[]) => {
            return owners.map((owner: OwnerEntity): ValidationErrors | null => {
              return owner.aCars.some(el => el.aNumber === aNumber) ? {existNumber: true} : null
            })
          })
      )
  }

}
