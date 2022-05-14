import { Component, OnInit } from '@angular/core';
import {CarOwnersService} from "../web-api/car-owners.service";
import {OwnerEntity} from "../web-api/models/owner-entity.model";
import {CdkTableDataSourceInput} from "@angular/cdk/table";
import {take} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  dataSource!: CdkTableDataSourceInput<OwnerEntity>;
  displayedColumns = ['id', 'aFirstName', 'aLastName', 'aMiddleName', 'actions'];

  constructor(
    private carOwnerService: CarOwnersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.carOwnerService.getOwners()
      .pipe(take(1))
      .subscribe((result: OwnerEntity[]) => {
      this.dataSource = result;
      console.log(result);
    })
  }

  public deleteOwner(id: number) {
    this.carOwnerService.deleteOwner(id)
      .pipe(take(1))
      .subscribe((result: OwnerEntity[]) => {
      this.dataSource = result;
    })
  }

  public editOwner(owner: OwnerEntity) {
    this.router.navigate([`new/${owner.id}/edit`]);
  }

  public viewOwner(owner: OwnerEntity) {
    this.router.navigate([`new/${owner.id}/view`]);
  }
}
