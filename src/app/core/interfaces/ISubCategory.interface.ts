export interface ISubCategory {
    id: number;
    name: string;
    subCategories: ISubCategory[]; 
}