import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from 'src/app/model/model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy{
public questions: Question[] = [];
public currentQuestionIndex: number = 0;
public userAnswers: { [key: number]: number } = {};
public isAnswerSelected: boolean = false;
public isAnswerSubmitted: boolean = false;
public score: number = 0;
public scoreVisible: boolean = false;
public resultAnswer: string = '';
public bgCorrect: boolean = false;

  constructor(
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(
      questions => {
        console.log(questions);
        this.questions = questions;
      }
      
    );
  }
  nextQuestion(): void {
    this.isAnswerSelected = false;
    this.bgCorrect = false;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onAnswerSelect(): void {
    this.isAnswerSelected = true;
  }


  submitAnswers(): void {
    console.log('Réponses de l\'utilisateur :', this.userAnswers);
    // Implémentez la logique pour vérifier les réponses ici
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const userAnswerIndex = this.userAnswers[this.currentQuestionIndex];
    const lastQuestionIndex = this.questions.length - 1;
    this.isAnswerSubmitted = true;
    this.isAnswerSelected = false;
    if (userAnswerIndex !== undefined) {
      const selectedAnswer = currentQuestion.answers[userAnswerIndex];
      if (selectedAnswer.isCorrect) {
        console.log('Bonne réponse !', selectedAnswer);
        this.resultAnswer = 'Bonne réponse !';
          this.bgCorrect = true;
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
    }
  }

  ngOnDestroy(): void {
    console.log('Questionnaire détruit.');
  }

}
