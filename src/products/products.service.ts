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
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        console.log(products);
        return products as Product[];
    }

    async getProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return {id: product.id, title: product.title, description: product.description, price: product.price};
    }

    async updateProduct(prodId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(prodId);
        if (title) {
            updatedProduct.title = title
        }
        if (desc) {
            updatedProduct.description = desc
        }
        if (price) {
            updatedProduct.price = price
        }
        updatedProduct.save();
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } 
        catch {
            throw new NotFoundException('Product not found');
        }
        if (!product) {
            throw new NotFoundException('Product not found'); 
        }
        return product;
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Product not found'); 
        }
    }
}