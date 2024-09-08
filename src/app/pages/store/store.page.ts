import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/models/store';
import { ActivatedRoute } from '@angular/router';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {

  store: Store | null = null;

  constructor(
    private route: ActivatedRoute,
    private storesService: StoresService
  ) {}

  ngOnInit() {
    const storeId = 1;
    // const storeId = +this.route.snapshot.paramMap.get('id');
    this.storesService.getStoreById(storeId).subscribe((storeData) => {
      console.log(storeData);
      this.store = storeData;
    });
  }

}
