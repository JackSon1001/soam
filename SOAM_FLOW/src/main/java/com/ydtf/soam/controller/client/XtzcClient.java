package com.ydtf.soam.controller.client;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ydtf.soam.controller.hystrix.XtzcHystrix;
import com.ydtf.soam.system.base.entity.Result;
import com.ydtf.soam.system.base.entity.TreeNote;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@FeignClient(value = "SERVICE-XTZC", fallback = XtzcHystrix.class)
public interface XtzcClient {

	/**
	 * 查询业务域Tree结构数据
	 */
	@RequestMapping(value = "/xtzc/ywy/tree", method = RequestMethod.POST)
	public Result<List<?>> queryYwyTree( @RequestBody ModelMap modelMap );

	/**
	 * 根据条件查询业务域信息
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/xtzc/ywy/list", method = RequestMethod.POST)
	public Result<List<?>> queryYwy( @RequestBody ModelMap modelMap );

	/**
	 * 查询机构Tree结构数据
	 */
	@RequestMapping(value = "/xtzc/org/tree/{zt}", method = RequestMethod.GET)
	public Result<List<TreeNote>> queryOrgTree( @PathVariable("zt") Integer zt );

}