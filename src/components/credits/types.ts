export interface ICredit {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
}

export interface ICreditDetails {
    credits: {
        cast: ICredit[],
        crew: ICredit[],
        id: number
    },
    isLoading: boolean
}