package com.htsoft.oa.dao.admin;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.DepreRecord;
import java.util.Date;

public abstract interface DepreRecordDao extends BaseDao<DepreRecord>
{
  public abstract Date findMaxDate(Long paramLong);
}

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.admin.DepreRecordDao
 * JD-Core Version:    0.5.4
 */