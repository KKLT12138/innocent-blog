export class Pagination {
  constructor (
    public pageLength: number = 7,
    public currentPage: number = 1,
    public totalItems: number = 0,
    public pageItems: number = 10,
    public changePage: () => void
  ) { }
}
