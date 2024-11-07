export interface EventDTO {
    id: number,
    date: Date,
    active: boolean
}

export interface CreateEventDTO {
    date: Date
    active: boolean
}