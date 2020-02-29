import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movieDataIMDB;
  movieDataRotten;
  tempMovie: Movie;

  constructor(private service: DataServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getDataIMDB(){
    this.service.getDataIMDB().subscribe(
      data => {
        this.movieDataIMDB = data;
        console.log(this.movieDataIMDB);
      }
    );
    
  }

  getDataRotten(){
    this.service.getDataRotten().subscribe(
      data =>{
        this.movieDataRotten = data;
        console.log(this.movieDataRotten);
      }
    );
  }

  openMovie(movie) {
    const modalRef = this.modalService.open(NgbdModalContent);
    this.tempMovie = movie;
    modalRef.componentInstance.tempMovie = this.tempMovie;
    console.log(movie.id);

    this.service.getMovieDescription(this.tempMovie.id).subscribe(
      data => {
        this.tempMovie.description = data;
        console.log(this.tempMovie.description);
      }
    );
  }

}

export class Movie{
  id;
  title;
  year;
  rating;
  description;
}


@Component({
  selector: 'ngbd-modal-content', 
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{tempMovie.title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{tempMovie.year}}</p>
      <br>
      <p>{{tempMovie.description}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {


  @Input() tempMovie;
  
  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit(){
    console.log(this.tempMovie);
  }


}
