 package com.htsoft.test.document;
 
 import com.htsoft.oa.dao.document.DocFolderDao;
 import com.htsoft.oa.dao.system.AppUserDao;
 import com.htsoft.test.BaseTestCase;
 import java.io.PrintStream;
 import java.util.regex.Matcher;
 import java.util.regex.Pattern;
 import javax.annotation.Resource;
 import org.junit.Test;
 
 public class DocFolderDaoTestCase extends BaseTestCase
 {
 
   @Resource
   private DocFolderDao docFolderDao;
 
   @Resource
   private AppUserDao appUserDao;
 
   @Test
   public void move()
   {
     String st = "1.2.3.6.5.";
     boolean ss = Pattern.compile("1.3").matcher(st).find();
     System.out.println(ss);
   }
 }

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.document.DocFolderDaoTestCase
 * JD-Core Version:    0.5.4
 */