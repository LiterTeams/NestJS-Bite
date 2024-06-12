interface PaginationOptionsIF {
    query: string;
    page: number;
    limit: number;
    route?: string;
}

interface PaginationLinksIF {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
}

export type {
    PaginationOptionsIF,
    PaginationLinksIF,
}