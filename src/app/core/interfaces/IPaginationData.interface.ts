export interface IPaginationData<T>{
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
    pagesCount: number;
    data: T[];
}