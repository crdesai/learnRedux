/**
 * Created by chintan.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class ShowPost extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }

    onDelete(){
        this.props.deletePost(this.props.params.id)
            .then(() => {
                // blog post has been created. navigate the user to the index page
                // We navigate by calling router.push with the new route to navigate to
                this.context.router.push("/");
            });
    }

    render() {
        const {post} = this.props;
        if(!post){
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to posts</Link>
                <button
                    type="button"
                    className="pull-right btn btn-danger"
                    onClick={this.onDelete.bind(this)}
                >Delete</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchPost, deletePost})(ShowPost);