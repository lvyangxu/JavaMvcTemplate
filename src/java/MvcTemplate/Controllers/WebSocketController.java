/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Global.Global;
import MyJavaLibrary.DoWebSocket;
import java.util.Map;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author anshifafeng
 */
@ServerEndpoint("/WebSocket")
public class WebSocketController {
    
    DoWebSocket DoWebSocket1 = new DoWebSocket();
    
  @OnMessage
  public void onMessage(String websocketMessage,Session session){  
      Global.businessLogger.info("收到用户"+session.getId()+"消息:"+websocketMessage);
        try {
            
            String type = DoWebSocket1.myMessageDecode(websocketMessage, "type");
            String message = DoWebSocket1.myMessageDecode(websocketMessage, "message");
            String username = DoWebSocket1.myMessageDecode(websocketMessage, "username");
            String password = DoWebSocket1.myMessageDecode(websocketMessage, "password");
            //todo 是否需要验证用户名和密码  
            
            String sessionId = session.getId();
            if (Global.websocketMap.containsKey(sessionId)) {                
                Session webSocketSession = Global.websocketMap.get(sessionId).getWebSocketSession();
                if(!webSocketSession.equals(session)){
                    //相同的用户登录，断开正连接的这个用户，并接受新登录的用户
                    webSocketSession.close();
                    Global.websocketMap.remove(sessionId);
                }                                        
            } else {
                //新用户则推入hashmap
                DoWebSocket.myWebSocketClass myWebSocketClass1 = new DoWebSocket.myWebSocketClass(session, username);
                Global.websocketMap.put(sessionId, myWebSocketClass1);
            }
            


            StringBuilder test = new StringBuilder();

            session.getBasicRemote().sendText("服务器已接收消息：" + message);
                //entry.getValue().getBasicRemote().sendText("服务器已接收消息：" + message);
         

         //   entry.getValue().getBasicRemote().sendText("服务器解析消息格式时出错" + websocketMessage);

            //收到消息后的业务逻辑 
            for (Map.Entry<String, DoWebSocket.myWebSocketClass> entry : Global.websocketMap.entrySet()) {


            }
            
        } catch (Exception e) {
            Global.errorLogger.info("回复客户端消息时发生异常"+e.getMessage());
        }
    }
   
    @OnOpen
    public void onOpen(Session session) {
        Global.businessLogger.info("新的websocket客户端已连接：" + session.toString());
    }

    @OnClose
    public void onClose(Session session, CloseReason CloseReason1) {
        Global.businessLogger.info("websocket连接已关闭" + CloseReason1.toString());
        
        Global.websocketMap.remove(session.getId());
        
    }

    @OnError
    public void OnError(Throwable Throwable1, Session session) {
        Global.errorLogger.info("websocket连接出现异常");
        Global.websocketMap.remove(session.getId());

        
    }

  
}
