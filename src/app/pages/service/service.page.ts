import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  service: Service | null = null;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServicesService
  ) {}

  ngOnInit() {
    const serviceId = +this.route.snapshot.paramMap.get('id')!;
    this.serviceService.getServiceById(serviceId).subscribe((serviceData) => {
      console.log(serviceData);
      this.service = serviceData;
    });
  }
}
