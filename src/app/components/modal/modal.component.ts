import { Component, OnInit, Input } from '@angular/core';
import { BeachService } from 'src/app/services/beaches.service'; 
import { EventsService } from 'src/app/services/events.service'; 
import { AccommodationsService } from 'src/app/services/accommodations.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { StoresService } from 'src/app/services/stores.service';
import { TourGuidesService } from 'src/app/services/tour-guides.service';
import { TransferService } from 'src/app/services/transfers.service'; 
import { ToursService } from 'src/app/services/tours.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, of, Subject, switchMap, firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular'; 
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() type!: string;

  items: any[] = [];
  searchTerm$: Subject<string> = new Subject<string>();
  loading: boolean = false;
  page: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(
    private modalCtrl: ModalController,
    private beachService: BeachService,
    private eventService: EventsService,
    private accommodationsService: AccommodationsService,
    private restaurantsService: RestaurantsService,
    private storesService: StoresService,
    private tourGuidesService: TourGuidesService,
    private transfersService: TransferService,
    private toursService: ToursService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log(''+ this.type);
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.getData(this.type, term))
    ).subscribe(data => {
      this.items = data.items;
      this.totalItems = data.total;
    });

    this.loadData();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.searchTerm, 'confirm');
  }

  async loadData(event?: any) {
    this.loading = true;
    const data = await this.getData(this.type, this.searchTerm, this.page, this.pageSize);
    this.items = [...this.items, ...data.items];
    this.totalItems = data.total;
    this.page++;
    this.loading = false;

    if (event) {
      event.target.complete();
    }
  }

  private async getData(type: string, term: string, page: number = 0, pageSize: number = 10): Promise<any> {
    let result: any;
    console.log(result);
    switch (type) {
      case 'beach':
        result = await firstValueFrom(this.beachService.getBeaches(term, page, pageSize));
        break;
      case 'event':
        result = await firstValueFrom(this.eventService.getEvents(term, page, pageSize));
        break;
      case 'accommodation':
        result = await firstValueFrom(this.accommodationsService.getAccommodations(term, page, pageSize));
        // console.log(result);
        break;
      case 'restaurant':
        result = await firstValueFrom(this.restaurantsService.getRestaurants(term, page, pageSize));
        break;
      case 'store':
        // result = await firstValueFrom(this.storesService.getStores(term, page, pageSize));
        break;
      case 'tourguide':
        // result = await firstValueFrom(this.tourGuidesService.getTourGuides(term, page, pageSize));
        break;
      case 'transfer':
        // result = await firstValueFrom(this.transfersService.getTransfers(term, page, pageSize));
        break;
      case 'tour':
        // result = await firstValueFrom(this.toursService.getTours(term, page, pageSize));
        break;
      default:
        result = { items: [], total: 0 };
        break;
    }
    return result;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.page = 0;
    this.items = [];
    this.searchTerm$.next(this.searchTerm);
  }

  goToPage(id: number) {
    let targetPage: string;
    this.modalCtrl.dismiss(null, 'cancel');
    switch (this.type) {
      case 'accommodation':
        targetPage = `/accommodation/${id}`;
        break;
      case 'restaurant':
        targetPage = `/restaurant/${id}`;
        break;
      case 'store':
        targetPage = `/store/${id}`;
        break;
      case 'tour':
        targetPage = `/tour/${id}`;
        break;
      case 'beach':
        targetPage = `/beach/${id}`;
        break;
      case 'event':
        targetPage = `/event/${id}`;
        break;
      default:
        targetPage = '/';
    }
    this.navCtrl.navigateForward(targetPage);
  }
}
