import {CarEntity} from "./car-entity.model";

export interface OwnerEntity {
  id: number;
  aFirstName: string;
  aLastName: string;
  aMiddleName: string;
  aCars: CarEntity[];
}

