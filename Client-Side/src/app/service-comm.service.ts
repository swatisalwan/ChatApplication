import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCommService {

  private socket =io("http://localhost:3000");

  constructor() { }

  

  leftRoom(){

    return new Observable((observer)=>{
      this.socket.on('server_joine_left',(data)=>{
       
          observer.next(data);
        })
      })
    }

    leaveRoom(room,user){

      this.socket.emit('left_joine',{
        user:user,
        room: room
      });
    }

  joinRoom(room,user){

    this.socket.emit('new_joine',{
      user:user,
      room: room
    });

  }

  AnyoneJoinRoom(){

    return new Observable((observer)=>{
      this.socket.on('server_new_joine',(data)=>{
       
          observer.next(data);
        })
      })
    }

  serverNewMessage(){

      return new Observable((observer)=>{
        this.socket.on('server_new_message',(data)=>{
         
            observer.next(data);
          })
        })
      }
    
    sendMessageClient(user,message,room)
    {
      console.log("Inside service")
      this.socket.emit('client_new_msg',{
        user: user,
        message: message,
        room:room
      })
    }
}

