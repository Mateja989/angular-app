import { Component } from '@angular/core';
import { ICandidate } from 'src/app/core/interfaces/ICandidate.interface';
import { IPaginationData } from 'src/app/core/interfaces/IPaginationData.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent {
  candidates : IPaginationData<any>

  constructor(private userService : UserService){}

  ngOnInit(){
    this.loadCandidates()
  }

  loadCandidates(){
    this.userService.getCandidates().subscribe(
      response => {
          this.candidates = response
          console.log(response)
      },
      error => {
        console.error('Došlo je do greške prilikom dodavanja posla:', error);
      }
    );
  }
}
