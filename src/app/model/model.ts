export interface Question {
    id: number;
    question: string;
    answers: Answer[];
    category: Category;
    difficulty: Difficulty;
    }

export interface Answer {
    id: number;
    answer: string;
    isCorrect: boolean;
}

export interface Category {
    id: number;
    category: string;
    questions: Question[];
}

export interface Difficulty {
    id: number;
    difficulty: string;
    value: number;
    questions: Question[];
}