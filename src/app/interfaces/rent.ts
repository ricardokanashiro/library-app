export interface Rent {
    id: string
    date: string
    modified_by: string
    rate: number | null
    operation: 'rent' | 'return'
}