import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import { Paper } from "@mui/material";
import IconButton from"@mui/material/IconButton";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { format } from 'date-fns'
import axios from "axios";
import { Component } from "react";


export default class Discussion extends Component {
    
    constructor(props) {
      super(props);
      this.state = { content_id: props.content_id, comment: "", comments: props.comments};
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {
        this.getComments();
    }

    componentDidUpdate() {
        this.getComments();
    }

    async getComments() {
        const baseURL = `http://3.89.218.253:8000/app/discussion-list/?content_id=${this.state.content_id}`;
        const res = await axios.get(baseURL, { headers: {"Authorization" : `token ${localStorage.getItem("token")}`} })
        this.setState({ comments: res.data.data })
    }

    handleChange(changeObject) {
      this.setState(changeObject);
    }
  
    handleSubmit(event) {
            
            if(this.props.content_id !=null){
                if(this.state.comment!= ""){
                        console.log(this.props.content_id);
                        axios.post(`http://3.89.218.253:8000/app/discussion/`, {
                            content: this.props.content_id,
                            body: this.state.comment
                          },{headers: {
                            'Authorization': `token ${localStorage.getItem("token")}`
                          }})
                          .then((response) => {
                            console.log(response.data.data);
                            this.setState({comment: this.state.comments.p})
        
        
                          }, (error) => {
                            console.log(error);
                          });
                    
                    }
                }
                event.preventDefault();
            };
   
        render(){
            return(
                <Grid sx={{mt:5}}>
                    <Paper>
                    <Typography variant="h6">Discussion</Typography>
                    
                    {this.state.comments.map((comment) => (
                        <Card variant="outlined">
                        <Stack direction="row" spacing={2}>
                        
                        <Typography variant="subtitle2">{comment.owner.username}</Typography>
                        <Typography variant="overline" >{format(new Date(comment.created_on), 'd MMMM, yyyy')}</Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="body" textAlign="left" sx={{ml: 3}}>{comment.body}</Typography>
                      </Stack>
                      </Card>
                    ))}
                    <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a comment."
                    onChange={(e) => this.handleChange({  comment: e.target.value })}
                  />
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
                    
                    </Paper>
                </Grid>
            );
        }
        
      
      
}




