 package com.htsoft.oa.dao.customer.impl;
 
 import com.htsoft.core.dao.impl.BaseDaoImpl;
 import com.htsoft.oa.dao.customer.ProductDao;
 import com.htsoft.oa.model.customer.Product;
 
 public class ProductDaoImpl extends BaseDaoImpl<Product>
   implements ProductDao
 {
   public ProductDaoImpl()
   {
     super(Product.class);
   }
 }

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.customer.impl.ProductDaoImpl
 * JD-Core Version:    0.5.4
 */