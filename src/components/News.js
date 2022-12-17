import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    // articles= [
    //     {
    //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //       "author": null,
    //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //       "publishedAt": "2020-04-27T11:41:47Z",
    //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //       "author": null,
    //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //       "publishedAt": "2020-03-30T15:26:05Z",
    //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    //   ]                                                                                          //These executed first......
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general',

    }  
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }                                              
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
    }
    async Update(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=720dfbfcc280408a9e3f604950308776&page=${this.state.page}&pageSize=${this.props.page}`;
        this.setState({
            loading:true
        })
        let data= await fetch(url);
        let parsedData = await data.json()
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false})
    }
    async componentDidMount() {       
        this.Update()

    }
    fetchMoreData =async()=>{
        this.setState({
            page:this.state.page+1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=720dfbfcc280408a9e3f604950308776&page=${this.state.page}&pageSize=${this.props.page}`;
       
        let data= await fetch(url);
        let parsedData = await data.json()
        this.setState({articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            })

    }
    //  handleprev=async()=>{
    //     this.setState({
    //         page:this.state.page -1
    //     })
    //     this.Update()
    //     }
    
    // handlenext = async ()=>{
    //     this.setState({
    //         page:this.state.page +1
    //     })
    //     this.Update()
    // }
        
    
    render() {
        return (
            <>
                <h2>NewsMonkey - Top Headlines on {this.props.category}</h2>
                {this.state.loading &&<Spinner/>}
                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                >
                    <div className="container">

                    
                     <div className="row">
                            {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                                    <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,90):""} imageurl={element.urlToImage?element.urlToImage:"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/5a3b8cb7d8dc40572753797a5ca3dddb.jpg"} newsurl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
                                </div>
                            })}         
                     </div>
                     </div>
                </InfiniteScroll>     
                {/* <div className="container d-flex justify-content-between">
                <button onClick={this.handleprev} disabled={this.state.page<=1} type="button" className="btn btn-primary">&larr; Previous</button>
                <button disabled={ this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.page)} onClick={this.handlenext} type="button" className="btn btn-primary">Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
