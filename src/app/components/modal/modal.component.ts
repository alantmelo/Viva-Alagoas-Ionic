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
import { ServicesService } from 'src/app/services/services.service';
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
  name!: string;
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
    private servicesService: ServicesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log('entrou')
    this.name = this.type.toUpperCase();
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
    let cityId : string = localStorage.getItem('cityId')!;
    // const cityId = localStorage.getItem('cityId');
    switch (type) {
      case 'Beaches':
        result = await firstValueFrom(this.beachService.getBeaches(term, page, pageSize, cityId!));
        break;
      case 'Events':
        result = await firstValueFrom(this.eventService.getEvents(term, page, pageSize, cityId!));
        break;
      case 'Hotels':
        result = await firstValueFrom(this.accommodationsService.getAccommodations(term, page, pageSize, cityId!));
        // console.log(result);
        break;
      case 'Restaurant':
        result = await firstValueFrom(this.restaurantsService.getRestaurants(term, page, pageSize, cityId!));
        break;
      case 'Stores':
        result = await firstValueFrom(this.storesService.getStores(term, page, pageSize, cityId!));
        break;
      case 'Guides':
        result = await firstValueFrom(this.tourGuidesService.getTourGuides(term, page, pageSize, cityId!));
        break;
      case 'Services':
        result = await firstValueFrom(this.servicesService.getServices(term, page, pageSize, cityId!));
        break;
      case 'Transfers':
        result = await firstValueFrom(this.transfersService.getTransfers(term, page, pageSize, cityId!));
        break;
      case 'Tours':
        result = await firstValueFrom(this.toursService.getTours(term, page, pageSize, cityId!));
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
      case 'Hotels':
        targetPage = `/accommodation/${id}`;
        break;
      case 'Restaurant':
        targetPage = `/restaurant/${id}`;
        break;
      case 'Stores':
        targetPage = `/store/${id}`;
        break;
      case 'Tours':
        targetPage = `/tour/${id}`;
        break;
      case 'Guides':
        targetPage = `/tour-guide/${id}`;
        break;
      case 'Beaches':
        targetPage = `/beach/${id}`;
        break;
      case 'Events':
        targetPage = `/event/${id}`;
        break;
      case 'Services':
        targetPage = `/service/${id}`;
        break;
      case 'Transfers':
        targetPage = `/transfer/${id}`;
        break;
      default:
        targetPage = '/';
    }
    this.navCtrl.navigateForward(targetPage);
  }
  getImageUrl(photo: string): string {
    const baseUrl = 'http://localhost:3000/storage/photos/';
    const defaultUrl = 'https://ionicframework.com/docs/img/demos/card-media.png';
    if(this.type == 'Beaches' ){
      return  'http://localhost:3000/storage/photos/praia.jpg';
    }
    return photo ? `${baseUrl}${photo}` : defaultUrl;
  }
}
