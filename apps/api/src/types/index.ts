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
  