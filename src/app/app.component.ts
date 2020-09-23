import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DocCienciasSalud';
  onActivate(event) {
    window.scroll(0, 0);
    document.querySelector('body').scrollTo(0, 0);
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
