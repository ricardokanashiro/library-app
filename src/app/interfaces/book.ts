export interface Book {
    id: string
    title: string
    author_id: string
    author_name: string
    rented: boolean
    rented_date: string | null
    image_path: string,
    sinopse: string,
    rented_by: string | null
    avg_rate: number
}
