import { Component, OnInit,  Input  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { ProductsService } from '../services/products.service';
import { LoadingController, ModalController }  from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Product } from '../products/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  //update 
  @Input() product: Product; 
  isEditMode = false;
  
  //save
  form : FormGroup;

  constructor(  
    private productsService : ProductsService,
    private loadingCtrl : LoadingController, 
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    
    this.initAddProductForm();
   
    //update
    if(this.product){
         this.isEditMode = true;
         this.setFormValues();
    }
  }
 
 //save
  initAddProductForm() {
    this.form = new FormGroup({
       name : new FormControl(null, [Validators.required]),
       price : new FormControl(null, [Validators.required]),
       category  : new FormControl(null, [Validators.required]),
       imageUrl : new FormControl(null, [Validators.required]),
       description : new FormControl(null),
    });
  }

  //update
  setFormValues() {
     this.form.setValue({
         name : this.product.name,
         price : this.product.price,
         category : this.product.category,
         imageUrl : this.product.imageUrl,
         description : this.product.description,
     });

     this.form.updateValueAndValidity();
  }
  
  //update 
  closeModal(data = null) {
    this.modalCtrl.dismiss(data);
  }
  
  //save and update
  async SubmitProduct(){
     // console.log(this.form.value)
     const loading = await this.loadingCtrl.create({ message : 'Loading...'});
     loading.present();

    
     let response : Observable<Product>;

     if(this.isEditMode) {
         //update
         response = this.productsService.updateProduct(this.product.id, this.form.value);
     }else{
      //save
       response = this.productsService.addProduct(this.form.value);
     }
       //save and update
       response.pipe(take(1)).subscribe((product) => {
       // console.log(product);
       this.form.reset();
       loading.dismiss();
 
       if (this.isEditMode) {
          this.closeModal(product);
       }

     })
  }

}
