//
// #Slider default settings
// #Set slider settings
// #Change slider html
// #Set slider events
// #Slide functionality
//

// $('#slideshow').on('removeElem', function(){
// 	console.log('test');
// });
var interval = null;
function HSlider(sliderObject = null, sliderSettings = null) {
	//******************************
	// #Slider default settings
	//******************************
	this.settings = ['itemHeight','showCount','frontLoop', 'margin','backLoop','autoSlide','autoSlideTime','buttonsSvg'],
		this.itemHeight = 250,
		this.showCount = 2,
		this.frontLoop = true,
		this.backLoop = false,
		this.autoSlide = true,
		this.margin = 10,
		this.autoSlideTime = 2000,
		this.buttonsSvg = ['<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="241.367,64.458 0,245.001 241.367,425.542 176.545,267.963 490,267.963 490,222.026 176.55,222.026 "/></svg>','<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490;" xml:space="preserve"> <polygon points="313.447,222.026 0,222.026 0,267.964 313.451,267.964 248.629,425.546 490,245 248.629,64.454 "/></svg>'];
	//******************************
	// #Set slider settings
	//******************************
	if(sliderSettings != null) {
		if(typeof sliderSettings === 'object' && !Array.isArray(sliderSettings)) {
			for(let i = 0; i < settings.length; i++) {
				if(sliderSettings.hasOwnProperty(settings[i])) {
					if(settings[i] == 'buttonsSvg') {
						if(eval(`${settings[i]}.length == 2`)) {
							let icons = JSON.stringify(sliderSettings[settings[i]]);
							eval(`this.${settings[i]} = ${icons}`);
						}
					} else {
						eval(`this.${settings[i]} = ${sliderSettings[settings[i]]}`);
					}
				}
			}
		} else {
			console.log('Slider settings must be object');
		}
	}
	this.mouseDownId = -1;
	this.currentState = showCount
	this.SlideshowStartWidth = $('#slideshow').width();

	//******************************
	// #Change slider html
	//******************************
	sliderObject.style.setProperty('display', 'none');
	if(sliderObject != null) {
		this.SlideItems = sliderObject.children;
		this.imageCount = this.SlideItems.length;
		if(SlideItems.length > 0) {
			for(let i = 0; i < SlideItems.length; i++) {
				let item = SlideItems[i];
				item.setAttribute('slide-item', i+1);
				if(i < showCount) {
					item.classList.add('active');
				}
			}
		}
		this.html = sliderObject.innerHTML;
		let buttonsHtml = `<div class="nav-buttons">`;
		if(this.buttonsSvg.length == 2) {
			buttonsHtml += `<button id="slidePrev">${this.buttonsSvg[0]}</button>
			<button id="slideNext">${this.buttonsSvg[1]}</button>`;
		} else {
			buttonsHtml += `<button id="slidePrev"><</button>
			<button id="slideNext">></button>`;
		}

		buttonsHtml += `</div>`;

		sliderObject.innerHTML = `
			${buttonsHtml}
			<div class='slider-inner'>
				<div id='slides'>
					${html}
				</div>
			</div>
		`;

		this.slideshowBlock = document.getElementById('slideshow');
		this.slideshow = document.getElementById('slides');
		this.slideshowInner = document.getElementsByClassName('slider-inner')[0];
		this.nextBtn = document.getElementById('slideNext');
		this.prevBtn = document.getElementById('slidePrev');
		this.marginChange = ((this.margin * (this.showCount-1)) / this.showCount);
		this.itemWidth = (this.SlideshowStartWidth / this.showCount) - marginChange;
		if(slideshow != undefined) {
			this.slideshowItems = slideshow.getElementsByClassName("slideshowItem");
			for(let i = 0; i<slideshowItems.length; i++) {
				let item = slideshowItems[i];
				item.style.float = 'left';
				item.style.width = `${this.itemWidth}px`;
				item.style.height = `${this.itemHeight}px`;
				if(i != (slideshowItems.length - 1)) {
					item.style.setProperty('margin-right', `${this.margin}px`);
				}
			}
			this.SlideShowWidth = slideshowItems.length * (this.itemWidth + this.margin);
			this.slideshow.style.width = `${this.SlideShowWidth}px`;
			this.slideshowBlock.style.width = `${this.SlideshowStartWidth}px`;
		}

		this.onSlide = function(event) {
		}

		this.slideStart = function(event) {
			if(this.mouseDownId == -1) {
				this.mouseDownId = setInterval(() => this.onSlide(event), 50);
			}
		}
		this.slideEnd = function(){
			this.slideshowBlock.removeEventListener('mousemove', () => this.slideStart(event))
			this.slideshowBlock.addEventListener('mousemove', null)
			clearInterval(this.mouseDownId);
			this.mouseDownId = -1;
		}
		//******************************
		// #Slide functionality
		//******************************
		this.changeSlide = function(itemwidth, slideshow, next = false) {
			let can = false;
			let newPosition = 0;
			let OldState = this.currentState;
			if(next) {
				if(this.currentState < this.imageCount) {
					can = true;
					this.currentState++;
					newPosition = (this.currentState - this.showCount);
				} else if(frontLoop) {
					can = true;
					this.currentState = this.showCount;
					newPosition = (this.showCount - this.showCount);
				}
			} else {
				if(this.currentState > this.showCount) {
					can = true;
					this.currentState--;
					newPosition = (this.currentState - this.showCount);
				} else if(backLoop){
					can = true;
					this.currentState = this.imageCount;
					newPosition = (this.imageCount - this.showCount);
				}
			}
			if(can) {
				newPosition = newPosition * this.itemWidth;
				newPosition += (this.margin * (this.currentState - this.showCount))

				slideshow.style.setProperty('transform', `translate3d(-${newPosition}px, 0, 0)`);
			}
		}

		//******************************
		// #Set slider events
		//******************************
		nextBtn.addEventListener('click', () => this.changeSlide(this.itemWidth, this.slideshow, true));
		prevBtn.addEventListener('click', () => this.changeSlide(this.itemWidth, this.slideshow, false));

		if(this.autoSlide) {
			interval = setInterval(()=>this.changeSlide(this.itemWidth, this.slideshow, true), autoSlideTime);
		}
		this.slideshowBlock.addEventListener('mousedown', () => {
			this.slideshowBlock.addEventListener('mousemove', () => this.slideStart(event))
		});
		this.slideshowBlock.addEventListener('mouseup', () => {
			this.slideEnd(event)
		});
		// this.slideshowBlock.addEventListener('mouseleave', () => this.slideEnd(event));
		sliderObject.style.setProperty('display', 'block');

	} else {
		console.log('Need Slider Object');
	}
}

function endInterval() {
	clearInterval(interval);
}


