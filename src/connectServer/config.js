import axios from 'axios';
import conf from '../conf/conf.js';

class ProductService {
    constructor() {
        this.api = axios.create({
            baseURL: `${conf.apiUrl}/api/v1/products`, // Set your backend API URL
            withCredentials: true, // To send cookies with requests if needed
        });
    }

    async createProduct(productData) {
        return this.sendRequest('/', 'post', productData);
    }

    async getAllProducts() {
        return this.sendRequest('/', 'get');
    }

    async getSingleProduct(productId) {
        return this.sendRequest(`/${productId}`, 'get');
    }

    async updateProduct(productId, updateData) {
        return this.sendRequest(`/${productId}`, 'put', updateData);
    }

    async deleteProduct(productId) {
        return this.sendRequest(`/${productId}`, 'delete');
    }

    // Centralized request handling
    async sendRequest(endpoint, method, data = null) {
        try {
            const response = await this.api({
                url: endpoint,
                method,
                data,
            });
            return response.data;
        } catch (error) {
            console.error(`ProductService :: ${method.toUpperCase()} ${endpoint} :: error`, error);
            throw error.response ? error.response.data : error;
        }
    }
}

const productService = new ProductService();
export default productService;
