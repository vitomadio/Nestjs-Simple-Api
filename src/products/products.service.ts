import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Product } from "./product.model";
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({title, description: desc, price});
        const result = await newProduct.save();
        console.log(result);
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(prodId: string) {
        const product = this.findProduct(prodId);
        return { ...product };
    }

    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const product = this.findProduct(prodId);
        const fields = [title, desc, price];
        fields.forEach(field => {
            if (field != null) {
                product[`${field}`] = field
            }
        });
        return product;
    }

    private findProduct(prodId: string) {
        const product = this.products.find((prod) => prod.id === prodId);
        if (!product) throw new NotFoundException('Product not found'); 
        return product;
    }
}