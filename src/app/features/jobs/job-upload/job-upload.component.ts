import { Component } from '@angular/core';
import { CategoryService } from '../../categories/category.service';
import { ICategory } from 'src/app/core/interfaces/ICategory.interface';
import { ExperienceService } from '../../experiences/experience.service';
import { IExperience } from 'src/app/core/interfaces/IExperience.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { IJobUpload } from 'src/app/core/interfaces/IJobUpload.interfaces';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/core/auth/store/auth.selectors';

declare var tinymce: any;

@Component({
  selector: 'app-job-upload',
  templateUrl: './job-upload.component.html',
  styleUrls: ['./job-upload.component.css']
})
export class JobUploadComponent {
  addJobForm : FormGroup;
  categories : ICategory[] = [];
  experiences : IExperience[] = [];
  loggedInUser: any; 


  constructor(private categoryService : CategoryService,
              private experienceService : ExperienceService,
              private jobService : JobService,
              private store : Store){
                this.store.select(selectLoggedInUser).subscribe((user) => {
                  this.loggedInUser = user;
                  console.log(user)
                });
              }

  ngOnInit(): void {
    this.myEditor()
    this.loadCategories()
    this.loadExperiences()
    this.addJobForm = new FormGroup({
      'title' : new FormControl(null,[Validators.required]),
      'description' : new FormControl(null,[Validators.required]),
      'category': new FormControl(null, [Validators.required]),
      'experience': new FormControl(null, [Validators.required]),
      'employerId ' : new FormControl(null,[Validators.required])
    });
  }

  myEditor(){
    tinymce.init({
      selector: 'textarea#myTextArea',
      plugins: 'autoresize advlist autolink lists link image charmap print preview anchor',
      toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      autoresize_bottom_margin: 10,
      setup: (editor: { on: (arg0: string, arg1: () => void) => void; getContent: () => any; }) => {
        editor.on('change', () => {
          this.addJobForm.get('description').setValue(editor.getContent());
        });
      }
    });
  }

  loadCategories(){
    return this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data.data;
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('An error occurred while fetching categories:', error);
      }
    );
  }
  
  loadExperiences(){
    return this.experienceService.getAllExperiences().subscribe(
      (data) => {
        this.experiences = data;
      },
      (error) => {
        console.error('An error occurred while fetching experience:', error);
      }
    );
  }

  uploadJob(){
    const job : IJobUpload = {
      title: this.addJobForm.value.title,
      description: this.addJobForm.value.description,
      categoryId: +this.addJobForm.value.category,
      experienceId: +this.addJobForm.value.experience,
      employerId : +this.loggedInUser.UserId 
    }

    this.jobService.uploadJob(job).subscribe(
      response => {
        console.log('Posao je uspešno dodat.', response);
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );

  }
}
