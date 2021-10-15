import React from "react"
import './youtube.css';


const YT_PLAYLIST = "https://www.googleapis.com/youtube/v3/playlistItems"
const YT_STATS = "https://www.googleapis.com/youtube/v3/videos"
const YT_KEY = "AIzaSyAU3ALVRvWxo0WSJtSxfWO0KnZPgVuS3vc"

var selected = false
var viewsCompare = []


export default class FetchRandomVideo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
              videoCount: 0,
              title: [],
              thumbnail: [],
              views: [],
              imageClicked: false
              }
        
        this.compareViewsRight = this.compareViewsRight.bind(this);
        this.compareViewsLeft = this.compareViewsLeft.bind(this);
      }
      
    

    loading = true


    async videoDataCall(item)
    {
        const {id, snippet = {} } = item
        const {title, resourceId = {}, thumbnails = {}} = snippet
        const {medium = {}} = thumbnails
        const {url} = medium
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
            this.setState({title: [...this.state.title, title], thumbnail: [...this.state.thumbnail, url], views: [...this.state.views, viewCount], videoCount: this.state.videoCount+1})
        }   
    }


    async componentDidMount() {
        const playlistId = "PLI91To4Vshg05fgH9G_dfpg5G0GHJzebV"
        const res = await fetch(`${YT_PLAYLIST}?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YT_KEY}`)
        const dataYT = await res.json()

        console.log(dataYT)
        console.log(dataYT.items.length)

        
  
        var item1 = Math.floor(Math.random() * dataYT.items.length);
        var item2 = 0

        while(true)
        {
            item2 = Math.floor(Math.random() * dataYT.items.length)
            if (item1 != item2)
            {
                break
            }
        }


        this.videoDataCall(dataYT.items[item1])
        this.videoDataCall(dataYT.items[item2])

    



    
        this.loading = false

        
        

    }

    changeBackground(video)
      {
          if ((video == "video1" && this.state.views[0] >= this.state.views[1]) || (video == "video2" && this.state.views[1] >= this.state.views[0])) {
            document.body.style.backgroundColor = 'green';
          } 
          else
          {
            document.body.style.backgroundColor = 'red';
          }
      
      }

          
     compareViewsLeft() {
        console.log("WOWWW1")
        console.log(selected)
        if (selected == false)
        {
            
            console.log("Left")
            console.log(viewsCompare)
          selected = true
          if (parseInt(viewsCompare[0]) >= parseInt(viewsCompare[1]))
          {
              console.log("correct!!!")
          document.body.style.backgroundColor = 'green';
          }
          else{
            document.body.style.backgroundColor = 'red';
          }
          this.setState({imageClicked: true})
        }
      }
      
       compareViewsRight() {
        console.log("WOWWW2")
        console.log(selected)
        if (selected == false)
        {
            console.log("Right")
            console.log(viewsCompare)
            selected = true
            if (parseInt(viewsCompare[1]) >= parseInt(viewsCompare[0]))
            {
                document.body.style.backgroundColor = 'green';
            }
            else{
                document.body.style.backgroundColor = 'red';
            }
            this.setState({imageClicked: true})
        }
      }
      
     assignVariable(state)
      {
          viewsCompare = state
          return ""
      }
      

    render() {
        return(
            <div>
                {this.loading ? (
                <div>loading...</div> 
                ) : ( 
                <div>
<div className = "App">
    <div className="header">
        <h1>Guess which video has more views!</h1>
        <h2>Click on the image</h2>
    </div>
</div>

<div> {this.assignVariable(this.state.views)} </div>

<div style={{display: 'flex', flexDirection: 'row'}}>
    <div style={{display: 'flex', flexDirection: 'column', width: "50%"}}>
        <div className="title1" >{this.state.title[0]} </div>
        <h3><img className="video1" src={this.state.thumbnail[0]} onClick={this.compareViewsLeft} /> </h3>
        {this.state.imageClicked && (<div className="title1">Views: {this.state.views[0]} </div>)}
    </div>
    <div style={{display: 'flex', flexDirection: 'column', width: "50%"}}>
        <div className="title2">{this.state.title[1]} </div>
        <h3> <img className="video2" src={this.state.thumbnail[1]} onClick={this.compareViewsRight} /> </h3>
        {this.state.imageClicked && (<div className="title2">Views: {this.state.views[1]} </div>)}
    </div>
</div>
                   
                    
                </div>
                )}
            </div>
        ) 
    }
}