package com.ydtf.soam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ydtf.soam.entity.db.chart_service;

public interface ChartServiceRepository extends JpaRepository<chart_service, Long> {
	/**
	 * 根据时间统计当天服务请求数量
	 * @param date 日期 年月日
	 * @return
	 */
	@Query("select date_format(call_start,'%Y-%m-%d')  as producer,count(producer) as consumer from chart_service"
			+ " where date_format(call_start,'%Y-%m-%d')" + " between ?1 and ?2"
			+ " group by date_format(call_start,'%Y-%m-%d')")
	List<Object> getCount4Day( String startDate, String endDate );

	/**
	 * 实时统计当天服务请求数量
	 * @param date 
	 * @return
	 */
	@Query("select count(id) as id from chart_service"
			+ " where date_format(call_start,'%Y-%m-%d %H:%i') = ?1")
	Object[] getCount4Constantly( String data);

	/**
	 * 获取服务请求成功总数
	 * 
	 * @return
	 */
	@Query("select consumer, count(consumer) as producer,'1' as success" + " from chart_service where success = '1'"
			+ " group by consumer")
	List<Object[]> getSuccessCount();

	/**
	 * 获取服务请求失败总数
	 * 
	 * @return
	 */
	@Query("select consumer, count(consumer) as producer,'1' as success" + " from chart_service where success = '0'"
			+ " group by consumer")
	List<Object[]> getFailureCount();

	/**
	 * 获取服务请求总数
	 * 
	 * @return
	 */
	@Query("select consumer, count(consumer) as producer,'1' as success" + " from chart_service  group by consumer")
	List<Object[]> getServiceCount();

	/**
	 * 错误分类统计
	 * @return
	 */
	@Query("select count(error_code) as producer,  error_code "
			+ "from chart_service where success = '0' group by error_code")

	List<Object[]> statisticsErrorType();

	/**
	 * 各大系统错误统计
	 * @return
	 */
	@Query("select count(error_code) as producer, consumer "
			+ "from chart_service where success = '0' group by consumer")

	List<Object[]> statisticsErrorSystem();

}
