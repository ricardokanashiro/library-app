export interface rent {
    id: string
    date: string;
    modified_by: string
    rate: number
    operation: 'rent' | 'return'
}