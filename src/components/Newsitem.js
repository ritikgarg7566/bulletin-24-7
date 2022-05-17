import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title,description,imageurl,newsUrl,author,date,source}=this.props;
        return (
            <div>
                <div className="card my-3" >
                    <img src={!imageurl?"https://static.news.bitcoin.com/wp-content/uploads/2022/05/cuban-musk-doge.jpg":imageurl} className="card-img-top" style={{height:"200px"}} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}{!title.length<40?"...":""}<span  className="position-absolute top-0  badge rounded-pill bg-danger" style={{zIndex:'1' ,left:'4%',transform: 'translate(0%,-50%)'}}>{source}
  </span></h5>
                        <p className="card-text">{description}{!description.length<88?"...":""}</p>
                        <p className="card-text"><small className="text-muted">By {author? author: "Unknown"} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target="_blank"rel="noreferrer" className="btn btm-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
