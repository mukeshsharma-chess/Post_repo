import React, { Component } from 'react'
import { FaCocktail, FaRegThumbsUp } from 'react-icons/fa';
import { FaRegCommentDots, FaRegLaughSquint } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { FiEdit2 } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import './social.css'

class index extends Component {

    postData;

    state = {
        social : [
            {
                id: 1,
                title: "By Mukesh Sharma",
                img:"/image/car.png",
                discription: "This car was best car of my life. I bought it myself",
                reaction:{ liked: 0, celebrate: 0, love: 0 },
                comments: [],
            },
            {
                id: 2,
                title: "By Hariom Tiwari",
                img:"/image/dog.jpg",
                discription: "This cute dog is my life.",
                reaction:{ liked: 0, celebrate: 0, love: 0 },
                comments: [],
            }
        ],
        newComment:'',
        active: 0,
        activeId: false,
        showReact: false,
        showText: false,
        threeDot: false,
        edit: false
    }


    componentDidMount(){
        this.postData = JSON.parse(localStorage.getItem('post'))

        
        if(localStorage.getItem('post')){
        console.log("if condition Local storage data ", this.postData)

            this.setState({
                social : this.postData.social
            })
        }else{
            this.setState({
                social : [...this.state.social]
            })
        }
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('post', JSON.stringify(nextState))
    }

    handleComment = (id) => {
        this.setState({ activeId: id, showText: !this.state.showText })
    }

    handleReaction = (id) => {
        this.setState({ activeId: id, showReact : !this.state.showReact})
    }

    handleThreeDot = (id,index) =>{
        this.setState({ activeId: id, active: index, threeDot: !this.state.threeDot })
    }

    handleEdit = (comment, id, index) =>{
        this.setState({ edit : !this.state.edit,threeDot: !this.state.threeDot, 
            active: index, activeId: id, newComment:comment
        })
    }

    handleChange = (e) => {
        this.setState({ 
            newComment: e.target.value,
        })
    }
    
    handleRemove = (id, index) =>{
        const { social } = this.state
        this.setState({ activeId: id })
        social.forEach((key) => {
            if(key.id === id){
                let newComment = [...key.comments]
                newComment.splice(index , 1)
                key.comments = newComment
            }
            let newSocial = [...social]
            this.setState({social: newSocial, threeDot: !this.state.threeDot })
        })
    }

    

    hahandleUpdate = (e) => {
        const { activeId,social, active } = this.state
        e.preventDefault();
        social.forEach(key => {
            if(key.id === activeId && key.comments[active] ){
                let newComment = [...key.comments];
                newComment[active] = (this.state.newComment);
                key.comments = newComment 
            }
            let newSocial= [...social]
            this.setState({social: newSocial, 
                edit: !this.state.edit})
        });
    }

    hahandleSubmit = (e) =>{
        const { activeId,social } = this.state
        e.preventDefault();
        social.forEach(key => {
            if(key.id === activeId ){
                let newComment = [...key.comments]
                newComment.push(this.state.newComment);
                key.comments = newComment 
            }
            let newSocial= [...social]
            this.setState({social: newSocial, showText: !this.state.showText, newComment: ""})
        });
    }

    handleLikeButton = (value) => {
        const { activeId,social } = this.state
        social.forEach(key => {
            if(key.id === activeId ){
                let newReaction = {...key.reaction}
                for(let newkey of Object.keys(key.reaction)){
                    if(newkey === value){
                        newReaction[value] = parseInt(newReaction[value]) + 1
                    }
                }
                key.reaction = newReaction
            }
            this.setState({ social, showReact : !this.state.showReact })
        });
    }

    render() {
        const { social, newComment, activeId, showText,
                edit, showReact, threeDot, active } = this.state
        console.log("State from the localstorage",social)
        return (
            <div className="container">
                <p>Social Media page..</p>
                <div className="row">
                    {
                        Array.isArray(social) && social.map((item,i) => {
                        return <div className="col-md-6 col-sm-12" key={i}>
                                <div className="card">
                                    <p className="p-2">{item.title}</p>
                                    <img className="card-img-top" src={item.img} alt={item.title} />
                                    <div className="card-body">
                                        <p className="card-text"><strong>Discription:</strong>{item.discription}</p>
                                        <div className="react_group"><div>
                                            <div>
                                                <strong className="mx-2 text-primary">
                                                    {item.reaction.liked !== 0 ? `${item.reaction.liked} Liked`: ''} 
                                                </strong>
                                                <strong className="mx-2 text-danger">
                                                    {item.reaction.love !== 0 ? `${item.reaction.love} Loved`: ''} 
                                                </strong>
                                                <strong className="mx-2 text-success">
                                                    {item.reaction.celebrate !== 0 ? `${item.reaction.celebrate} Celebrate`: ''} 
                                                </strong></div>
                                            {
                                                activeId === item.id && showReact ? 
                                                <div className="reaction">
                                                    <div className="d-flex icon-section">
                                                        <FaRegThumbsUp className="mx-2 icon" onClick={() => this.handleLikeButton('liked')} />
                                                        <FcLike className="mx-2 icon" onClick={() => this.handleLikeButton('love')} />
                                                        <FaRegLaughSquint className="mx-2 icon" onClick={() => this.handleLikeButton('celebrate')} />
                                                    </div>
                                                </div> : ''
                                            }</div>
                                            
                                            <div className="my-2 react_button" >
                                                <FaRegThumbsUp onClick={() => this.handleReaction(item.id)} className="mr-3" />
                                                <FaRegCommentDots onClick={() => this.handleComment(item.id)} />
                                            </div>
                                        </div>
                                    </div>
                                    <footer>
                                    
                                    {
                                        activeId === item.id && showText ?
                                        <div className="row">
                                            <div className='col-md-8 col-sm-8'> 
                                                <input type="text"
                                                    name={newComment} 
                                                    value={newComment}
                                                    onChange={this.handleChange}
                                                    placeholder="Enter your comment" />
                                            </div>
                                            <div className='col-md-4 col-sm-4'><button onClick={this.hahandleSubmit}>Comment</button></div></div>
                                            : ""
                                        }
                                        <div>{ item.comments.map((itm,i) =>{
                                            let id = item.id
                                            return <div key={i}>
                                                <span className='d-block commet-text'>
                                                { 
                                                activeId === item.id && active === i && edit ?
                                                <div className="row"> 
                                                <div className='col-md-8 col-sm-8'>
                                                    <input type="text"
                                                        name={newComment} 
                                                        value={newComment}
                                                        onChange={this.handleChange}
                                                        placeholder="Enter your comment" />  
                                                </div>
                                                    <div className='col-md-4 col-sm-4'><button onClick={this.hahandleUpdate}>Update</button></div></div>
                                                    : itm
                                                }
                                                { !edit ? <div className="three_dot"><BsThreeDots onClick={() => this.handleThreeDot(id, i)} className="mx-5"/></div>  : "" }</span>
                                                {
                                                    activeId === id && active === i && threeDot ? <ul className="unorder-list">
                                                    <li className="list-group-item edit-item"><FiEdit2 onClick={() => this.handleEdit( itm,id,i)}/></li>
                                                    <li className="list-group-item edit-item"><MdDeleteForever onClick={() => this.handleRemove(id,i)}/></li></ul> : ""
                                                }
                                            </div>
                                        })}</div>
                                        
                                    </footer>
                                </div>
                            </div> 
                        })
                    }
                </div>
            </div>
        )
    }
}

export default index
