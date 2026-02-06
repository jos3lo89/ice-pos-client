// create piso response
export interface CreateFloorRes {
  id: string;
  name: string;
  level: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// get pisos
export interface GetFloorsRes {
  data: {
    id: string;
    name: string;
    level: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    _count: {
      tables: number;
    };
  }[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

// get all pisos response
export interface GetAllFloorsRes {
  id: string;
  level: number;
}
