import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController  }  from '@ionic/angular';
import { Product } from '../products/product.model';
import { AddProductPage } from '../add-product/add-product.page';
import { ProductsService } from '../services/products.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() product: Product;

  constructor(
    private modalCtrl : ModalController,
    private productsService : ProductsService,
    private loadingCtrl : LoadingController,
   ) { }

  ngOnInit() {}

  closeModal( role = 'edit'){
     this.modalCtrl.dismiss(this.product, role);
  }

  async openEditModal() {
     const modal = await this.modalCtrl.create({
        component : AddProductPage,
        componentProps : { product : this.product },
     });

     await modal.present();

     const { data : updateProduct } = await modal.onDidDismiss();

     if( updateProduct ) {
         this.product =  updateProduct;
     }
  }

  async onDeleteProduct() {
    const loading = await this.loadingCtrl.create({ message : 'Deleting...'});
    loading.present();

    this.productsService
       .deleteProduct(this.product.id)
       .pipe(take(1))
       .subscribe(() => { 
          loading.dismiss();
          this.closeModal('delete') 
       });
  }

}
