import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { LoadingController, ModalController }  from '@ionic/angular';
import { Product } from '../products/product.model';
import { tap } from 'rxjs/operators';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  
  products$ : Observable<Product[]>

  constructor(
    private productsService : ProductsService,
    private loadingCtrl : LoadingController,
    private modalCtrl : ModalController
  ) {}

  async ngOnInit() {
   
    const loading = await this.loadingCtrl.create({ message : 'Loading...'});
    loading.present();

    this.products$ = this.productsService.getProducts().pipe(
        tap((products)=> {
           loading.dismiss();
            return products;
        })
    );
  }

  async openDetailModal(product : Product ) {
    const modal = await this.modalCtrl.create({
      component : DetailComponent,
      componentProps : { product },
    });

    modal.present();
  }

}


