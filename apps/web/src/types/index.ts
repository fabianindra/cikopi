import { IconType } from 'react-icons';

export interface User {
    username: string;
    role: string;
  }

  export interface HeaderProps {
    loggedIn: boolean;
    user: User | null;
  }

  export interface UserMenuProps {
    loggedIn: boolean;
    user: User | null;
    onOpenLoginModal?: () => void;
    handleLogout: () => void;
  }

  export interface DecodedToken {
    username: string;
    role: string;
  }

  export interface NavHoverBoxProps {
    title: string;
    icon: IconType;
    description: string;
  }

  export interface NavItemProps {
    icon: IconType;
    title: string;
    description?: string;
    active?: boolean;
    navSize: 'small' | 'large';
    onClick?: () => void; 
  }

  export interface Product {
    id: number;
    product_name: string;
    price: number;
    image: string;
    category: string;
}

export interface FetchProductsParams {
  page: number;
  pageSize: number;
  search?: string;
  category?: string;
}

export interface ProductWithQuantity extends Product {
  quantity?: number;
}

export interface TransactionFormProps {
  transaction: ProductWithQuantity[];
  onQuantityChange: (productId: number, quantity: number) => void;
  onDelete: (productId: number) => void;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  paymentType: string;
  setPaymentType: (type: string) => void;
  cashAmount: number | '';
  setCashAmount: (amount: number | '') => void;
  transaction: ProductWithQuantity[];
}