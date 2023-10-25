import { ICandidate } from "./ICandidate.interface";

export interface IJobApplicationInfo {
    id: number;
    title: string;
    candidates: ICandidate[];
}