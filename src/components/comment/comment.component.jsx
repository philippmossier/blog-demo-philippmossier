import React from 'react';
import "./comment.styles.scss";
// received props { id, title, content }

/* Description/ Functionality:
    Comment comp has 2 instances/states: 
    1. Show folded content and a button to unfold/collapse
    2. After details button gets clicked API from individual comment(id) gets requested. 
        --> video player opens */

/* Improvements i would do: 
    - Render new site when detail button gets clicked instead of wrapping all content together.
      Mabye use onRouteChange funtion/logic here or react router.
    - Seems like requesting the detailed data from api just when the clickevent happens is to slow. 
      Maybe preload the data before, not sure how to do that properly.
    - Autoplay from Video is missing. Never implemented a video before in React. Just figured out this simple
      solution with buttons.
    - I am not happy with the css architecture, the unfold/details feature messes everything up here. With 
      a seperate page for detailed comments it would be easier to style.
    */

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            detail: []
        }
    }

    handleClickDetails(id) {
        fetch(`https://blog-demo-create.herokuapp.com/comments/${id}`)
            .then(response => response.json())
            .then(details => this.setState({ detail: details, collapsed: true }))
            .catch(error => console.log(error));
    }

    playVideo = () => {
        this.refs.vidRef.play();
    }

    pauseVideo = () => {
        this.refs.vidRef.pause();
    }

    handleBack = () => {
        this.setState({ collapsed: false })
    }

    render() {

        const { title, content, id } = this.props;
        const { collapsed } = this.state;

        return (
            collapsed ?
                <div className="single-comment">
                    <h1>{title}</h1>
                    <p>{this.state.detail.content}</p>
                    <video ref="vidRef" src="https://clips.vorwaerts-gmbh.de/VfE_html5.mp4" type="video/mp4"></video>
                    <div className="collapsed-buttons">
                        <button onClick={this.playVideo}>Play</button>
                        <button onClick={this.pauseVideo}>Pause</button>
                        <button onClick={this.handleBack}>back</button>
                    </div>
                </div>
                :
                <div className="single-comment">
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <button onClick={() => this.handleClickDetails(id)}>Details</button>
                </div>
        )

    }
}

export default Comment;






