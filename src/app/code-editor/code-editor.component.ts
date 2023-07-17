import { Component } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {
  code = '';
  output = '';
  runCodeBtnVisible = true;
  nextQuestionBtnVisible = false;

  questions = [
    {
      question: "Question 1: Write a function to calculate the factorial of a number.",
      solution: function(num: number): number {
        const factorial = (n: number): number => {
          if (n === 0 || n === 1) {
            return 1;
          } else {
            return n * factorial(n - 1);
          }
        };
        
        if (num === 0 || num === 1) {
          return 1;
        } else {
          return num * factorial(num - 1);
        }
      }
    },
    // Add more questions here...
  ];

  currentQuestionIndex = 0;

  generateQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    this.code = question.question;
    this.output = '';
    this.nextQuestionBtnVisible = false;
    this.runCodeBtnVisible = true;
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      this.generateQuestion();
    } else {
      this.code = 'All questions completed!';
      this.output = '';
      this.nextQuestionBtnVisible = false;
    }
  }

  runCode() {
    try {
      this.output = '';
  
      // Redirect console.log to the output textarea
      const originalConsoleLog = console.log;
      console.log = (message: string) => {
        this.output += message + '\n';
      };
  
      eval(this.code);
  
      // Restore original console.log function
      console.log = originalConsoleLog;
  
      this.runCodeBtnVisible = false;
      this.nextQuestionBtnVisible = true;
    } catch (error: any) {
      this.output = 'Error: ' + error.message;
    }
  }
  
}
