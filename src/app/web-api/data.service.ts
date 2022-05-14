import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

export class DataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    return {
      carOwners: [
        {
          id: 0,
          aFirstName: 'John',
          aLastName: 'Doe',
          aMiddleName: 'Jonson',
          aCars: [
            {
              aNumber: 'AA1111AA',
              aMake: 'BMW',
              aModel: '530D',
              aYear: 2017
            }
          ]
        },
      ]
    }
  }
}
