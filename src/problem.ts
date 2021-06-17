export class Problem {
    type: string;
    body: string;
    statement: string[];
    questions: string[];
    choices: string[] | string[][];
    limit: number;
    solution: string[]|number[]; 
    points:number[];
  
    constructor(
      type:string,
      body:string,
      statement:string[],
      questions: string[],
      choices: string[],
      limit: number,
      solution: string[]|number[],
      points:number[]
    )
    {
      this.type = type;
      this.body = body;
      this.statement = statement;
      this.questions = questions;
      this.choices = choices;
      this.limit = limit;
      this.solution = solution;
      this.points = points;
    }
  }
