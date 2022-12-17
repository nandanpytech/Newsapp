import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title,description,imageurl,newsurl,author,date} =this.props;
        return (
            <>
                <div className="card" >
                    <img src={imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-dark">Read more</a>
                        <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
                    </div>
                </div>
              
            </>
        )
    }
}
