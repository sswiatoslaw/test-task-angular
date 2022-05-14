import { Component } from '@angular/core';
import {
  AbstractControl, AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {CarOwnersService} from "../web-api/car-owners.service";
import {Observable, take} from "rxjs";
import {OwnerEntity} from "../web-api/models/owner-entity.model";
import {CarEntity} from "../web-api/models/car-entity.model";

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.css']
})
export class NewOwnerComponent {
  formGroup: FormGroup;
  paramsId = this.route.snapshot.paramMap.get('id');
  componentType = this.route.snapshot.paramMap.get('type');
  constructor(
    private carOwnerService: CarOwnersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({})
    this.formGroup.valueChanges.subscribe(res => console.log(res))
    if(this.paramsId) {
        this.carOwnerService.getOwnerById(this.paramsId)
          .subscribe((owner: OwnerEntity) => {
            this.createFormGroup(owner);
            console.log(this.formGroup)
            owner.aCars.forEach((car: CarEntity) => {
              this.aCars.push(this.createCarGroup(car));
            })
        })
      } else {
        this.createFormGroup();
      }
  }

  public get aCars(): FormArray {
    return this.formGroup.controls['aCars'] as FormArray;
  }

  public createFormGroup(owner?: OwnerEntity): void {
    console.log(owner)
    this.formGroup = new FormGroup({
      id: new FormControl(owner ? owner.id : null),
      aFirstName: new FormControl(owner ? owner.aFirstName : '', [Validators.required]),
      aLastName: new FormControl(owner ? owner.aLastName : '', [Validators.required]),
      aMiddleName: new FormControl(owner ? owner.aMiddleName : '', [Validators.required]),
      aCars: new FormArray([])
    })
  }

  public createCarGroup(car?: CarEntity): FormGroup {
    return new FormGroup({
      aNumber: new FormControl(car ? car.aNumber : '', [
        Validators.required,
        Validators.pattern("^[A-Z]{2}[0-9]{4}[A-Z]{2}$")],
        [
          this.existNumberValidator()
        ]),
      aMake: new FormControl(car ? car.aMake : '', [Validators.required]),
      aModel: new FormControl(car ? car.aModel : '', [Validators.required]),
      aYear: new FormControl(car ? car.aYear : '',
        [Validators.required,
          Validators.maxLength(4),
          Validators.max(new Date().getFullYear()),
          Validators.min(1990)]),
    })
  }

  private existNumberValidator(): AsyncValidatorFn {
    console.log(this.aCars)
    return (control:AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.carOwnerService.checkExistCar(control.value);
    }
  }

  public getControl(form: FormGroup, name: string): FormControl {
    return form.get(name) as FormControl;
  }

  public getValidity(i: number, name: string, error: string) {
    return this.aCars.controls[i].get(name)?.hasError(error)
  }

  public addVehicle(): void {
    this.aCars.push(this.createCarGroup())
  }

  public deleteVehicle(i: number): void {
      this.aCars.removeAt(i);
  }

  private createOwnerSubmit(formValue: OwnerEntity): void {
    console.log(formValue)
    this.carOwnerService.createOwner(formValue)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/'], {skipLocationChange: true});
      });
  }

  private editOwnerSubmit(formValue: OwnerEntity): void {
    this.carOwnerService.editOwner(formValue)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/'], {skipLocationChange: true});
      });
  }

  public submitForm(): void {
    if(this.formGroup.valid) {
      this.paramsId ? this.editOwnerSubmit(this.formGroup.value)
        : this.createOwnerSubmit(this.formGroup.value);
    }
  }
}
