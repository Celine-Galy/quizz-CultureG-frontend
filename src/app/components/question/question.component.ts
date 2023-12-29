import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from 'src/app/model/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
public questions: Question[] = [];
public currentQuestionIndex: number = 0;
public userAnswers: { [key: number]: number } = {};
public isAnswerSelected: boolean = false;
public isAnswerSubmitted: boolean = false;
public score: number = 0;
public scoreVisible: boolean = false;
public resultAnswer: string = '';
public answerTrue: boolean = false;
public answerFalse: boolean = false;
private messageSubscription: Subscription = new Subscription();

  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.messageSubscription = this.questionService.getQuestions().subscribe(
      questions => {
        console.log(questions);
        this.questions = questions;
        this.selectRandomQuestions(this.questions, 5);
      }
      
    );
  }

  selectRandomQuestions(allQuestions: Question[], count: number): void {
    this.questions = this.getRandomQuestions(allQuestions, count);
    console.log('Questions sélectionnées au hasard :', this.questions);
  }
  getRandomQuestions(allQuestions: Question[], count: number): Question[] {
    const shuffledQuestions = this.shuffleArray(allQuestions);
    return shuffledQuestions.slice(0, count);
  }
  shuffleArray(array: any[]): any[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  nextQuestion(): void {
    this.isAnswerSelected = false;
    this.isAnswerSubmitted = false;
    this.answerTrue = false;
    this.answerFalse = false;
    this.resultAnswer = '';
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      console.log('Question suivante :', this.currentQuestionIndex);
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onAnswerSelect(answerIndex: number): void {
    this.isAnswerSelected = true;
    console.log('Réponse sélectionnée :', answerIndex);
    this.userAnswers[this.currentQuestionIndex] = answerIndex;

  }

  trackByFn(index: number, item: any): number {
    console.log('trackByFn', index);
    return index;
  }

  submitAnswers(): void {
    console.log('Réponses de l\'utilisateur :', this.userAnswers);
if(this.questions[this.currentQuestionIndex].answers[this.userAnswers[this.currentQuestionIndex]].isCorrect === true){
  this.answerTrue = true;
} else {
  this.answerFalse = true;
}
    // Implémentez la logique pour vérifier les réponses ici
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const userAnswerIndex = this.userAnswers[this.currentQuestionIndex];
    console.log('Réponse de l\'utilisateur :', userAnswerIndex);
    const lastQuestionIndex = this.questions.length - 1;
    this.isAnswerSubmitted = true;
    this.isAnswerSelected = false;
    if (userAnswerIndex !== undefined) {
      const selectedAnswer = currentQuestion.answers[userAnswerIndex];
     // selectedAnswer.id = this.userAnswers[this.currentQuestionIndex];
      console.log('Réponse sélectionnée :', selectedAnswer);
      if (selectedAnswer.isCorrect === true) {
        console.log('Bonne réponse !', selectedAnswer);
        this.resultAnswer = 'Bonne réponse !';
        this.score++;
      } else {
        console.log('Mauvaise réponse.', selectedAnswer);
        this.resultAnswer = 'Mauvaise réponse.';
      }
    } else {
      console.log('Veuillez sélectionner une réponse.');
      // Gérer le cas où aucune réponse n'est sélectionnée
    }
    if (this.currentQuestionIndex === lastQuestionIndex) {
      setTimeout(() => { this.scoreVisible = true; }, 2000);
      console.log('Fin du questionnaire.');
      // Implémentez la logique pour afficher le score ici
      console.log('Score :', this.score);
      this.isAnswerSubmitted = true;
      this.resultAnswer = 'Fin du questionnaire.';
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    console.log('Questionnaire détruit.');
  }

}
