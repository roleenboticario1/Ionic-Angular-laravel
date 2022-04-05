import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ProductsService } from '../services/products.service';
import { LoadingController, ModalController }  from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  form : FormGroup;

  constructor(  
    private productsService : ProductsService,
    private loadingCtrl : LoadingController, 
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
       name : new FormControl(null, [Validators.required]),
       price : new FormControl(null, [Validators.required]),
       category  : new FormControl(null, [Validators.required]),
       imageUrl : new FormControl(null, [Validators.required]),
       description : new FormControl(null),
    });
  }

  async SubmitProduct(){
     // console.log(this.form.value)
     const loading = await this.loadingCtrl.create({ message : 'Loading...'});
     loading.present();
     
     this.productsService.addProduct(this.form.value).pipe(take(1)).subscribe((/*product*/) => {
       // console.log(product);
       this.form.reset();
       loading.dismiss();
     })
  }

}
