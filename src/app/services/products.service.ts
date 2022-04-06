import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
	providedIn : 'root',
})

export class ProductsService {
	
	apiUrl = 'http://localhost:8000/api';

	constructor(private http : HttpClient) {}
        
    getProducts(): Observable<Product[]> {
    	return this.http.get<Product[]>(`${this.apiUrl}/products`);
    }

    addProduct(product : Product ): Observable<Product>{
    	return this.http.post<Product>(`${this.apiUrl}/products`, product);
    }

    updateProduct(productId: number, product : Product ): Observable<Product>{
    	return this.http.put<Product>(`${this.apiUrl}/products/${productId}`, product);
    }

    deleteProduct(productId: number):  Observable<Product> {
        return this.http.delete<Product>(`${this.apiUrl}/products/${productId}`);
    }
}

