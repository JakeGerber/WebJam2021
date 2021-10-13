import React from "react"


const YT_PLAYLIST = "https://www.googleapis.com/youtube/v3/playlistItems"
const YT_STATS = "https://www.googleapis.com/youtube/v3/videos"
const YT_KEY = "AIzaSyAbYkC02b933pbdKzEmsFdVaoxhW8njUDA"

export default class FetchRandomVideo extends React.Component {
    
    state = {
        loading: true,
        videoCount: 0,
        title: [],
        thumbnail: [],
        views: []
    }


    async componentDidMount() {
        const playlistId = "PLUNigHjL4wlGV1CaxdCLPJCQiUXLfpG9y"
        const res = await fetch(`${YT_PLAYLIST}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YT_KEY}`)
        const dataYT = await res.json()


        dataYT.items.map(async (item) => {
            console.log(item)

        

        const {id, snippet = {} } = item
        const {title, resourceId = {}, thumbnails = {}} = snippet
        const {medium = {}} = thumbnails
        const {videoId} = resourceId
        console.log("Id: " + videoId)
        if (medium.url != null)
        {
            const resVideo = await fetch(`${YT_STATS}?part=statistics&id=${videoId}&key=${YT_KEY}`)
            const dataVideo = await resVideo.json()


            const {items = {}} = dataVideo
            const {statistics = items} = items[0]
            const {viewCount} = statistics
            console.log(viewCount)
            this.setState({title: [...this.state.title, title], thumbnail: [...this.state.thumbnail, medium], views: [...this.state.views, viewCount], videoCount: this.state.videoCount+1})
        }    
    })
        

        const urlE = "https://api.randomuser.me/"
        const response = await fetch(urlE)
        this.setState({loading: false})
        

    }

    render() {
        return(
            <div>
                {this.state.loading ? (
                <div>loading...</div> 
                ) : ( 
                <div>
                    <div>{this.state.title[0]} </div>
                    <img src={this.state.thumbnail[0].url} />
                    <div>Views: {this.state.views[0]} </div>
                    <div>Video Count In Playlist: {this.state.videoCount} </div>
                   
                    
                </div>
                )}
            </div>
        ) 
    }
}