import {Observable} from "rxjs";
import {OwnerEntity} from "./owner-entity.model";

export abstract class ICarOwnersService {
  abstract getOwners(): Observable<OwnerEntity[]>;
  abstract getOwnerById(aId: number): Observable<OwnerEntity>;
  abstract createOwner(newOwner: OwnerEntity): Observable<OwnerEntity>;
  abstract editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  abstract deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

