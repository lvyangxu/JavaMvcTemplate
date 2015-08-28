/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package MvcTemplate.Controllers;

import MvcTemplate.Global.Global;
import java.util.Map;
import javax.servlet.http.HttpSession;
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
    
  @OnMessage
  public void onMessage(String message,Session session){  
        try {
            Global.businessLogger.info("收到用户"+session.getId()+"消息:"+message);
            
            //收到消息后的业务逻辑 
            for (Map.Entry<String, Session> entry : Global.websocketSessionMap.entrySet()) {
                entry.getValue().getBasicRemote().sendText("服务器已接收消息：" + message);
            }
            
        } catch (Exception e) {
            Global.errorLogger.info("回复客户端消息时发生异常"+e.getMessage());
        }
    }
   
    @OnOpen
    public void onOpen(Session session) {
        Global.businessLogger.info("新的websocket客户端已连接：" + session.toString());
        Global.websocketSessionMap.put(session.getId(), session);
    }

    @OnClose
    public void onClose(Session session, CloseReason CloseReason1) {
        Global.businessLogger.info("websocket连接已关闭" + CloseReason1.toString());
        Global.websocketSessionMap.remove(session.getId());
        
    }

    @OnError
    public void OnError(Throwable Throwable1, Session session) {
        Global.errorLogger.info("websocket连接出现异常");
        Global.websocketSessionMap.remove(session.getId());
    }

  
}
