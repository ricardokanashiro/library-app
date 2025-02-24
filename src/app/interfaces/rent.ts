export interface Rent {
    id: string
    date: string
    modified_by_id: string
    modified_by_name: string
    rate: number | null
    operation: 'rent' | 'return'
    book_id: string
    reader: string
}
