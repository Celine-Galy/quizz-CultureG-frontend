import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { FormArray, FormBuilder, FormGroup, } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  form!: FormGroup

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      questions => {
        console.log(questions);
      }
    );
    this.form = this.formBuilder.group({
      id: [],
      question: [''],
      category: [''],
      difficulty: [''],
      answers: this.formBuilder.array([])
    });
  }

  get answersArray(): FormArray {
    return this.form.get('answers') as FormArray;
  }
  pushAnswers(): void {
    this.answersArray.push(this.formBuilder.group({
      // définir les propriétés de l'objet ici
      id: [],
      answer: [''],
      isCorrect: [''],
      question: ['']
    }));
  }

  
  onSubmit() {
    this.form.value.category = 4
    this.form.value.difficulty = 2
    this.form.value.answers = this.form.value.answers.filter((answer: any) => answer.answer !== '');
    this.form.value.answers.forEach((answer: any) => {
      answer.isCorrect = answer.isCorrect;
      answer.answer = answer.answer.trim();
    }
    );
    console.log('form', this.form);
    //this.form.value.answers = this.form.value.answers.filter((answer: any) => answer.answer !== '');
    console.log('form', this.form);
      if(this.form.valid) {
        this.questionService.createQuestion(this.form.value).subscribe(
          question => {
            console.log('question', question);
          }
        );
      }
      this.form.reset();
  }

}
