import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { FormArray, FormBuilder, FormGroup, } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Answer, Category } from '../../model/model';
import { Difficulty } from '../../model/model';
import { DifficultyService } from '../../services/difficulty.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  form!: FormGroup
  public categories: Category[] = [];
  public levels: Difficulty[] = []
  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: '50%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'roboto', name: 'Roboto'},
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  sanitize: false,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]
  };

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService,
    private difficultyService: DifficultyService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
        console.log('categories', categories);
      }
    );
    this.difficultyService.getDifficulties().subscribe(
      levels => {
        this.levels = levels;
        console.log('levels', levels);
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
    this.form.value.answers = this.form.value.answers.filter((answer: Answer) => answer.answer !== '');
    this.form.value.answers.forEach((answer: any) => {
      answer.isCorrect = answer.isCorrect;

      answer.answer = answer.answer.trim();
      console.log('answer', answer);
    });
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
