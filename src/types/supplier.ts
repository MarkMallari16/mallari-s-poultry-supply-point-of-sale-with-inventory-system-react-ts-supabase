export type Supplier = {
    id: number;
    name: string;
    contact_person: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    notes: string | null;
    created_at: string;
};

export type CreateSupplierInput = Omit<Supplier, "id" | "created_at">;

export type UpdateSupplierInput = Partial<CreateSupplierInput>;
