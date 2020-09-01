import React from 'react';
// import './App.css';
import './asset/css/header.scss';
import $ from "jquery";
// import $ from 'jquery';
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;



function App() {
  
  return (
    
    <div className="App">
      <header className="App-header">

        <section class="et-hero-tabs">
          <h1>STICKY SLIDER NAV</h1>
          <div class="et-hero-tabs-container">
            <a class="et-hero-tab" href="#tab-es6">INTRO</a>
            <a class="et-hero-tab" href="#tab-flexbox">SKILL</a>
            <a class="et-hero-tab" href="#tab-react">ABOUT</a>
            <a class="et-hero-tab" href="#tab-angular">PORTFOLIO</a>
            <a class="et-hero-tab" href="#tab-other">CONTACT</a>
            <span class="et-hero-tab-slider"></span>
          </div>
        </section>

        <main class="et-main">
          <section class="et-slide" id="tab-es6">

            <h1>INTRO</h1>
            <h3>something about es6</h3>
          </section>
          <section class="et-slide" id="tab-flexbox">
            <h1>SKILL</h1>
            <h3>something about flexbox</h3>
          </section>
          <section class="et-slide" id="tab-react">
            <h1>ABOUT</h1>
            <h3>something about react</h3>
          </section>
          <section class="et-slide" id="tab-angular">
            <h1>PORTFOLIO</h1>
            <h3>something about angular</h3>
          </section>
          <section class="et-slide" id="tab-other">
            <h1>CONTACT</h1>
            <h3>something about other</h3>
          </section>
        </main>
      </header>
    </div>
  );
  
}

class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick("click", $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId !== newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();

export default App;

