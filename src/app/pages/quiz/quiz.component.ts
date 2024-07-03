import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  text: string;
  options: string[];
  correctIndex: number;
  selectedIndex?: number;
  answered?: boolean;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit, OnDestroy {
  userId: string | null = '';

  questions: Question[] = [
    { text: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"], correctIndex: 1 },
    { text: "Which data structure is used in breadth-first search (BFS)?", options: ["Stack", "Queue", "Tree", "Graph"], correctIndex: 1 },
    { text: "Which sorting algorithm is the fastest in the average case for large datasets?", options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"], correctIndex: 1 },
    { text: "Which of the following is not a programming language?", options: ["Python", "Java", "HTML", "C++"], correctIndex: 2 },
    { text: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correctIndex: 2 },
    { text: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "HyperText Transmission Protocol", "HyperText Transfer Program", "HyperText Transmission Program"], correctIndex: 0 },
    { text: "Which of the following is a client-side scripting language?", options: ["PHP", "Java", "Python", "JavaScript"], correctIndex: 3 },
    { text: "Which of the following is not an operating system?", options: ["Linux", "Windows", "Oracle", "MacOS"], correctIndex: 2 },
    { text: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], correctIndex: 1 },
    { text: "What is the default port number for HTTP?", options: ["21", "22", "80", "443"], correctIndex: 2 },
    { text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctIndex: 0 },
    { text: "What is the main component of a computer's central processing unit (CPU)?", options: ["RAM", "ROM", "Hard Drive", "ALU"], correctIndex: 3 },
    { text: "Which protocol is used to receive email?", options: ["HTTP", "FTP", "POP3", "SMTP"], correctIndex: 2 },
    { text: "Which type of memory is volatile?", options: ["RAM", "ROM", "Flash Memory", "Hard Disk"], correctIndex: 0 },
    { text: "What is the purpose of a DNS server?", options: ["To store websites", "To host email services", "To translate domain names to IP addresses", "To provide web hosting"], correctIndex: 2 },
    { text: "Which of the following is used to make a computer network secure?", options: ["Router", "Firewall", "Switch", "Modem"], correctIndex: 1 },
    { text: "Which of the following is a relational database management system (RDBMS)?", options: ["MongoDB", "Redis", "MySQL", "Cassandra"], correctIndex: 2 },
    { text: "What does GUI stand for?", options: ["Graphical User Interface", "General User Interface", "Graphical Uniform Interface", "Graphical User Internet"], correctIndex: 0 },
    { text: "Which of the following is a version control system?", options: ["Docker", "Git", "Jenkins", "Kubernetes"], correctIndex: 1 },
    { text: "Which of the following is not a web browser?", options: ["Chrome", "Firefox", "Opera", "Linux"], correctIndex: 3 }
  ];

  currentQuestionIndex: number = 0;
  showCorrectAnswer: boolean = false;
  timer: number = 60 * this.questions.length;
  timerInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.startTimer();
  }
  startQuiz(): void {
    this.startTimer();
  }


  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.clearTimer();
    // this.timer = 60;
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitQuiz() // Move to next question after 2 seconds
      }
    }, 1000);
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
isTimeRunningOut():boolean{
  return this.timer < 60;
}
  selectOption(optionIndex: number): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (currentQuestion.answered) return; // Prevent changing answer

    currentQuestion.selectedIndex = optionIndex;
    currentQuestion.answered = true;
    this.showCorrectAnswer = true;
    setTimeout(() => this.nextQuestion(), 2000); // Move to next question after 2 seconds
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.showCorrectAnswer = false;
      // this.startTimer();
    }
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  getOptionClass(optionIndex: number): string {
    if (!this.showCorrectAnswer) return 'option bg';
    if (optionIndex === this.currentQuestion.correctIndex) return 'option bg correct';
    if (optionIndex === this.currentQuestion.selectedIndex) return 'option bg incorrect';
    if (this.currentQuestion.answered) return 'option bg disabled';
    return 'option bg';
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.showCorrectAnswer = false;
      // this.startTimer();
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  submitQuiz(): void {
    const totalQuestions = this.questions.length;
    const attemptedQuestions = this.questions.filter(q => q.answered).length;
    const correctAnswers = this.questions.filter(q => q.selectedIndex === q.correctIndex).length;

    this.router.navigate(['/result'], {
      queryParams: {
        total: totalQuestions,
        attempted: attemptedQuestions,
        correct: correctAnswers
      }
    });
  }
}