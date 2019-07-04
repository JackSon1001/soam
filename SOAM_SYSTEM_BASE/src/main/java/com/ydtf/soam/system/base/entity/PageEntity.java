package com.ydtf.soam.system.base.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.util.StringUtils;

/**
 * @author zhanglei
 * @date 2016-08-30
 * */
public class PageEntity<T> extends EntityBase {

	private static final long serialVersionUID = 1L;

	public Integer pageNumber;

	public Integer pageSize;

	public T queryParams;

	public List<PageSort> sort;

	public T getEntity() {
		return this.queryParams;
	}

	public PageRequest getPageRequest() {

		PageRequest pageRequest;

		//this.pageNumber = this.pageNumber - 1;

		if( this.sort == null || this.sort.size() < 1 ) {
			pageRequest = new PageRequest( this.pageNumber, this.pageSize );
		}
		else {
			List<org.springframework.data.domain.Sort.Order> orderList = new ArrayList<org.springframework.data.domain.Sort.Order>();

			for( PageSort pageSort : this.sort ) {
				if( StringUtils.isEmpty( pageSort.property ) ) continue;

				Direction direction;
				if( "desc".equals( pageSort.direction.toLowerCase() ) ) direction = Direction.DESC;
				else direction = Direction.ASC;

				orderList.add( new org.springframework.data.domain.Sort.Order( direction, pageSort.property ) );
			}

			if( orderList.size() > 0 ) {
				org.springframework.data.domain.Sort sort = new org.springframework.data.domain.Sort( orderList );
				pageRequest = new PageRequest( this.pageNumber, this.pageSize, sort );
			}
			else {
				pageRequest = new PageRequest( this.pageNumber, this.pageSize );
			}
		}

		return pageRequest;
	}
}
