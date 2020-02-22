import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pet } from '../interfaces/pet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/Operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private db: AngularFirestore,
    private snacbar: MatSnackBar,
    private router: Router
  ) { }

  createPet(pet: Pet) {
    const id = this.db.createId();
    return this.db.doc(`pets/${id}`).set(pet).then(()=>{
      this.snacbar.open('ペット作成完了',null,{
        duration: 3000
      })
      this.router.navigateByUrl('/')
    });
  }

  getPet(trainerId: string): Observable<Pet> {
    return this.db.collection<Pet>('pets', ref => ref.where('trainerId', '==', trainerId)).valueChanges().pipe(
      map(pets => {
        if (pets.length) {
          return pets[0];
        }else {
          return null;
        }
      })
    )
  }
}
