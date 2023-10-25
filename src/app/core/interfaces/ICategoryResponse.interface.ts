import { ICategory } from "./ICategory.interface";

export interface ICategoryResponse {
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    pagesCount: number;
    data: ICategory[];
}