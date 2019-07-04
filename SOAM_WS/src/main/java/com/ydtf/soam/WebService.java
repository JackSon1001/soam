package com.ydtf.soam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ydtf.soam.system.base.contants.Constants;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.ResultEnum;
import com.ydtf.soam.system.base.entity.Transmit;

import io.swagger.annotations.ApiOperation;

@RestController
public class WebService {
	private Logger logger = LoggerFactory.getLogger( this.getClass() );

	private final String queueName = Constants.RABBITMQ.QUEUE.FLOW_TRANSMIT;

	@Autowired
	private AmqpTemplate rabbitTemplate;

	@ApiOperation(value = "添加工作流消息", notes = "接收客户端发送流程流转消息添加到消息队列")
	@RequestMapping(value = "/workflow", method = RequestMethod.POST)
	public Result<?> senderMQ( @RequestBody Transmit data ) {
		try {
			if( StringUtils.isEmpty( data.getFlowId() ) ) throw new Exception( "流程ID不可为空" );
			if( StringUtils.isEmpty( data.getInstanceId() ) ) throw new Exception( "流程ID不可为空" );

			rabbitTemplate.convertAndSend( queueName, data.toJSONString() );
			logger.info( "WSData Send MessageQueue Success : " + data.toJSONString() );

		}
		catch( Exception e ) {
			logger.error( "WSData Send MessageQueue failure : " + data.toJSONString(), e );
			e.printStackTrace();
			return new Result<>( ResultEnum.ERROR.getCode(), e.getMessage() );
		}

		return new Result<>( ResultEnum.OK );
	}

}
