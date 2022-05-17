import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 12,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalresult: 0
        }
        document.title = `${this.props.category} - BulletIn 24*7`
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(60);
        this.setState({
            totalresult: parsedData.totalResults,
            articles: parsedData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }
    handlePrevClick = async () => {
        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1,
        })
        this.updateNews();
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            totalresult: parsedData.totalResults,
            articles: this.state.articles.concat(parsedData.articles)
        })
    };


    async componentDidMount() {
        this.updateNews();
    }


    render() {
        return (
            <>

                <h1 className='text-center ' style={{ margin: "35px 0px ", marginTop:"90px "}}>bulliten 24*7 - Top {this.props.category} Headlines </h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalresult}
                    loader={ <Spinner />}
                >
                    <div className='container my-3' style={{ maxWidth: "1100px" }}>
                        <div className="row">
                            {this.state.articles.map((ele) => {
                                return <div className="col-lg-4 col-md-6" key={ele.url}>
                                    <Newsitem title={!ele.title ? "" : ele.title.slice(0, 40)} description={!ele.description ? "" : ele.description.slice(0, 90)} imageurl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
                                </div>

                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/*<div className="container d-flex justify-content-between">
                    <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalresult / this.props.pagesize)} onClick={this.handleNextClick}>Next &rarr;</button>

                </div>*/}
            </>
        )
    }
}

export default News
