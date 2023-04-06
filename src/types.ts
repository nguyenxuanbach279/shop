export type Product = {
  id: number;
  nameProduct: string;
  image: string[];
  salePrice: number;
  price: number;
  quantity: number;
  description: string;
};

export type UserData = {
  id: number;
  username: string;
  password: string;
  name: string;
  phone: string;
  cart: Product[];
};

export type AccountData = {
  isLogin: Boolean;
  user: {
    id: number;
    username: string;
    password: string;
    name: string;
    phone: string;
    cart: Product[];
  };
};
