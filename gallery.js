import React from 'react';

class Exclusive extends React.Component {
	constructor() {
		super();
		this.state = {
            fixLeftColumn: false,
			isLoading: false,
			images: [],
			typeView: ''
		}

		this.switchClick = this.switchClick.bind(this);
    }


    componentDidMount() {
	this.getImages();
    }



async getImages() {

	let {images} = await $.get('/free_daily_content/search');
	
    this.setState({
		typeView: true,
        isLoading: true,
        images: [...this.state.images, ...images]
    });
}

switchClick(event) {
	let { images, typeView }  = this.state;

	if (typeView ==  true) {
		this.setState({
			typeView: false
		});
		images.map((image, i) => {
			return (
				<React.Fragment>
					<div className="xsive_main">
						<div className="xsive_item__content">
							<img className="xsive_img" src = { image.preview_url } />
						</div>
					</div>
				</React.Fragment>
			)
		});
	} else {
		this.setState({
			typeView: true
		});
		images.map((image, i) => {
			return (
				<React.Fragment>
					<div className="xsive_main">
						<div className="xsive_thumb">
							<div className="xsive_thumb__img" style={{'backgroundImage': 'url('+image.preview_url+')'}}></div>
						</div>
					</div>
				</React.Fragment>
			)
		});
	}
}

    render(){
        return(
            <div className="xsive">
                <div className={'xsive_header' + (this.state.fixLeftColumn ? ' fixed' : '')}>
                    <div className="xsive_switch desktop">
						<button className="xsive_switch__item" onClick={this.switchClick} data-type="sample" id="sample">Sample</button>
						<button className="xsive_switch__item active" onClick={this.switchClick} data-type="grid" id="grid">Grid</button>
                    </div>
					<h1 className="xsive_title">Daily updated unique photo collection by Everypixel</h1>
					<p className="xsive_header__text">Feel free to do whatever you want both in commercial and personal projects. Only one thing we ask you to do. Please, use attribution.
                    <div class="xsive_header__helper helper desktop">
						<span className="helper__text">
							All photos in this collection are under CC0 license which means that you can remix, transform, and build upon the material for any purpose, even commercial. The only thing we ask you to do – please, use attribution.
						</span>
					</div>  
                    </p>

                    <div className="xsive_subscr_title">Subscribe for our free weekly photo pack.</div>
				<form className="subscr_form js_subscr_form xsive_form" action="/mail/subscribe">
					<input className="xsive_form__input" name="email" placeholder="Email" required="" type="text" />
					<div className="subscr_form__success">
						Thank you!
						<div className="subscr_form__heart"></div>
					</div>
					<input name="mailing_list" value="exclusive" type="hidden" />
					<button className="xsive_form__submit xsive_form__submit-arr btn-plain" type="submit"></button>
				</form>
				 </div>
                <Thumbs images={this.state.images} />
        </div>
        )
           
    }
}

class Thumbs extends React.Component {
	constructor() {
		super();
		this.state = {
			activeImageId: 0
		};
	}

	clickHandler(image) {
		let activeImageId = 0;

		if (image.basic_img_id !== this.state.activeImageId) {
			activeImageId = image.basic_img_id;
			console.log(activeImageId);
		}

		this.setState({
			activeImageId
		});
	}

	render() {
		let { images } = this.props;
		let { activeImageId } = this.state;
        return(
			<div className="xsive_main">
				{
					images.map((image, i) => {
						return(
							<React.Fragment key={i}>
								<Thumb image={image} onClick={()=>{this.clickHandler(image)}} />
							</React.Fragment>
						)
					})
				}
			</div>
		)
	}
}

class Thumb extends React.Component {
	render() {
		let  { image, onClick }  = this.props,
			url = image.preview_url;
		return(
			<div className="xsive_thumb" onClick={onClick}>
                <div className="xsive_thumb__img" style={{'backgroundImage': 'url('+url+')'}}></div>
			</div>
		)
	}
}

export default Exclusive;
