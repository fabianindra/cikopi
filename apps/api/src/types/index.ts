export interface AddProductRequest {
    product_name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    userId: number;
    partner?: string;
    consignment_fee?: number;
  }
  
  export interface ServiceGetProductsRequest {
    params?: {
      category?: string;
    };
    query?: {
      search?: string;
      page?: string;
      pageSize?: string;
      sortBy?: string;
      sortDirection?: 'asc' | 'desc';
    };
  }

  export interface GetProductsParams {
    category?: string;
    search?: string;
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
  }

  export interface GetCashiersParams {
    search?: string;
    page?: string;
    pageSize?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
  }

  export interface SubTotalRequest {
    products: {
      product_id: number;
      quantity: number;
    }[];
    transactionData: {
      sub_total: number;
      tax: number;
      services: number;
      grand_total: number;
      payment_type: string;
      change: number;
      shift_id: number;
      discount_id?: number;
    };
  }
  
  