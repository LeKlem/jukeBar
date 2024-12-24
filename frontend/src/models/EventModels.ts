export interface EventDTO {
    id: number,
    date: Date,
    active: 'ACTIVE' | 'INACTIVE' | 'ENDED'
}

export interface CreateEventDTO {
    date: Date
    active: 'ACTIVE' | 'INACTIVE' | 'ENDED'
}

