import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

import { v4 as uuidV4 } from 'uuid';
import * as moment from 'moment';

import { Rent } from '../interfaces/rent';

export interface RentData {
  modified_by_id: string
  modified_by_name: string
  operation: 'rent' | 'return'
  rate: number | null
  book_id: string
  reader: string
}

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private _key = 'rents'

  private _rentsSubject = new BehaviorSubject<Rent[]>([])
  private _rents$ = this._rentsSubject.asObservable()

  constructor(private storeService: StorageService) {}

  public async createRent(data: RentData) {

    const rentsData = await this.storeService.get(this._key)
    let rents: Rent[] = []

    if(rentsData) {
      rents = JSON.parse(rentsData)
    }

    const updatedRents = [ { ...data, id: uuidV4(), date: moment().format('L') }, ...rents ]

    await this.storeService.set(this._key, JSON.stringify(updatedRents))
    this._rentsSubject.next(updatedRents)
  }

  public async getRents() {

    const rentsData = await this.storeService.get(this._key)
    let rents: Rent[] = []

    if(rentsData) {
      rents = JSON.parse(rentsData) as Rent[]
    }

    this._rentsSubject.next(rents)

    return this._rents$
  }

  public async deleteRent(id: string) {

    const rentsData = await this.storeService.get(this._key)
    let rents: Rent[] = []

    if(rentsData) {
      rents = JSON.parse(rentsData)
    }

    const updatedRents = rents.filter(rent => rent.id !== id)

    await this.storeService.set(this._key, JSON.stringify(updatedRents))
    this._rentsSubject.next(updatedRents)
  }

  public async deleteRentByBookId(id: string) {

    const rentsData = await this.storeService.get(this._key)
    let rents: Rent[] = []

    if(rentsData) {
      rents = JSON.parse(rentsData)
    }

    const updatedRents = rents.filter(rent => rent.book_id !== id)

    await this.storeService.set(this._key, JSON.stringify(updatedRents))
    this._rentsSubject.next(updatedRents)
  }
}
