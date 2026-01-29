export interface GetAllCategoriesRes {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count: {
    products: number;
  };
}
