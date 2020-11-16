import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
  closeResult: string;
  @ViewChild('content') myModal: any;
  title = 'DocCienciasSalud';
  constructor(private modalService: NgbModal) {
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'sm', backdrop: 'static', windowClass: 'custom-moodal fade-in'});
  }

  onActivate(event) {
    window.scroll(0, 0);
    document.querySelector('body').scrollTo(0, 0);
  }
  ngAfterViewInit() {
    // this.openVerticallyCentered(this.myModal);
  }
  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('.ir-arriba').click(function() {
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });
      $(window).scroll(function() {
        if ( $(this).scrollTop() > 0 ) {
          $('.ir-arriba').slideDown(300);
        } else {
          $('.ir-arriba').slideUp(300);
        }
      });
    });
  }
}
