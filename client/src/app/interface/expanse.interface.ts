export interface Expense {
    id: string;
    user: {
        id: string;
        email: string;
        password: string;
        name: string;
    };
    amount: number;
    category: string;
    description: string;
    date: string; // or Date if you want to store an actual Date
}
