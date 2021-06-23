export class Problem {
    type: string;
    body: string;
    statement: string[];
    questions: string[];
    choices: string[] | string[][];
    limit: number;
    solution: string[]|number[]; 
    points:number[];
  
    constructor(data:{
      type:string,
      body:string,
      statement:string[],
      questions: string[],
      choices: string[],
      limit: number,
      solution: string[]|number[],
      points:number[]
    }
    )
    {
      this.type = data.type;
      this.body = data.body;
      this.statement = data.statement;
      this.questions = data.questions;
      this.choices = data.choices;
      this.limit = data.limit;
      this.solution = data.solution;
      this.points = data.points;
    }
  }

export const createTest = (data:any[])=>{
  console.log(data);
  const problems = data.map((d)=>{
    return new Problem(d);
  });
  return problems;
}

