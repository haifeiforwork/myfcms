 package com.htsoft.test.admin;
 
 import com.htsoft.oa.dao.admin.CartRepairDao;
 import com.htsoft.oa.model.admin.CartRepair;
 import com.htsoft.test.BaseTestCase;
 import javax.annotation.Resource;
 import org.junit.Test;
 import org.springframework.test.annotation.Rollback;
 
 public class CartRepairDaoTestCase extends BaseTestCase
 {
 
   @Resource
   private CartRepairDao cartRepairDao;
 
   @Test
   @Rollback(false)
   public void add()
   {
     CartRepair cartRepair = new CartRepair();
 
     this.cartRepairDao.save(cartRepair);
   }
 }

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.admin.CartRepairDaoTestCase
 * JD-Core Version:    0.5.4
 */