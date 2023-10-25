export interface IJobAdUpload{
    salaryMin : number,
    salaryMax : number,
    jobTypeId : number,
    salaryTypeId : number,
    jobId : number,
    endAt: string,
    jobSkillIds: Array<number>
}