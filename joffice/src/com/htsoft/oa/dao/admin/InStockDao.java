package com.htsoft.oa.dao.admin;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.InStock;

public abstract interface InStockDao extends BaseDao<InStock>
{
  public abstract Integer findInCountByBuyId(Long paramLong);
}

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.admin.InStockDao
 * JD-Core Version:    0.5.4
 */