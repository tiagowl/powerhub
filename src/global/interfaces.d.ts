export interface Registration{
    id: number;
    gym: number;
    name: string;
    notes: string;
    ocupation: string;
    type: number;
    created_at: Date;
    age: string;
    weight: number;
    height: string;
    email: string;
}

export interface Exercicie{
    id: number;
    description: string;
}

export interface Gym{
    id: number;
    name: string;
}

export interface Workout{
    id: number;
    exercicie: string;
    load: number;
    repetitions: number;
    series: number;
    user: number;
}