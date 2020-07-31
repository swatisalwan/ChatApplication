import { Component, OnInit } from '@angular/core';
import { ServiceCommService } from './service-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selectedRoom:string;
  user:string
  message:string
  msgList:any[]=[];
  constructor(private socketService: ServiceCommService){
  }

  ngOnInit(){
    this.socketService.serverNewMessage().subscribe(
      (res)=>{
        console.log("Response is"+ res)
        this.msgList.push(res)
  
      },
      (err)=>{
        console.log("Response is"+ err)
      })
    this.socketService.AnyoneJoinRoom().subscribe(
    (res)=>{
      console.log("Response is"+ res)
      this.msgList.push(res)

    },
    (err)=>{
      console.log("Response is"+ err)
    })

    this.socketService.leftRoom().subscribe(
      (res)=>{
        console.log("Response is"+ res)
        this.msgList.push(res)
  
      },
      (err)=>{
        console.log("Response is"+ err)
      })

  }

  leaving()
  {
    this.socketService.leaveRoom(this.selectedRoom,this.user)
  }
  sendMessage()
  {
    console.log("Inside ts")
    this.socketService.sendMessageClient(this.user,this.message,this.selectedRoom)
  }
  onSelect()
  {
    console.log("Hi! "+this.user+" selected "+this.selectedRoom);
    this.socketService.joinRoom(this.selectedRoom,this.user)

  }
 
  title = 'Client-Side';
}
