import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/services/feedback.service';

interface Rating {
  value: string;
  viewValue: number;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;

  snackBarDuration: number = 2000;
  ratingArr: number[] = [];

  constructor(
    private fb: FormBuilder,
    private feedbackservice: FeedbackService,
    private snackBar: MatSnackBar
  ) {
    this.feedbackForm = this.fb.group({
      orderId: ['', Validators.required],
      rating: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  types: Rating[] = [
    {value: '1', viewValue: 1},
    {value: '2', viewValue: 2},
    {value: '3', viewValue: 3},
    {value: '4', viewValue: 4},
    {value: '5', viewValue: 5}
  ];


  ngOnInit(): void {  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const feedbackData = this.feedbackForm.value;
      console.log('Feedback Data:', feedbackData);
      this.feedbackservice.submitFeedback(feedbackData).subscribe(
        response => {
          console.log('Feedback submitted successfully:', response);
          this.snackBar.open('Feedback submitted successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Failed to submit feedback:', error);
          // Handle error appropriately
        }
      )
    } else {
      console.log('Form is invalid', this.feedbackForm);
    }
  }

}


