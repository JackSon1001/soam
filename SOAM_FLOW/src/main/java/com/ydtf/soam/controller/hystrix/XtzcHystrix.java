package com.ydtf.soam.controller.hystrix;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;

import com.ydtf.soam.controller.client.XtzcClient;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.TreeNote;


@Component
public class XtzcHystrix implements XtzcClient {

	@Override
	public Result<List<?>> queryYwyTree( @RequestBody ModelMap inData ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<List<TreeNote>> queryOrgTree( Integer zt ) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result<List<?>> queryYwy( ModelMap modelMap ) {
		return null;
	}
}
