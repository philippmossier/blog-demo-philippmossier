import React from 'react';
import Comment from "../comment/comment.component";
import "./comment-list.styles.scss";

/* Description/ Functionality:
   CommentList component receives Data from Api and render a comment component for every single comment.
   Comment component receives props from commentList ( id, title, content )*/


class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: null
        }
    }


    componentDidMount() {
        this.setState({ isLoading: true });

        fetch(' https://blog-demo-create.herokuapp.com/comments')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('API request failed ' + response.status + " error");
                } // throw error cause HTTP 404 does not run into catch block automaticly
            })
            .then(data => this.setState({ data: data, isLoading: false }))
            .catch(error => this.setState({ error: error, isLoading: false }));

    }


    render() {
        const comments = this.state.data;
        const { error, isLoading } = this.state

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <p>Loading ...</p>;
        } return (
            <div className="comments-preview">
                {comments.map(comment =>
                    <Comment
                        key={`00${comment.id}`} // quick manual id, better use a key generator 
                        id={comment.id}
                        title={comment.title}
                        content={comment.content}
                    />)}
            </div>
        );
    }
}

export default CommentList;

