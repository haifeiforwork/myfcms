package com.htsoft.oa.dao.system;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.UserSub;
import java.util.List;

public abstract interface UserSubDao extends BaseDao<UserSub>
{
  public abstract List<Long> upUser(Long paramLong);

  public abstract List<Long> subUsers(Long paramLong);
}

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.system.UserSubDao
 * JD-Core Version:    0.5.4
 */