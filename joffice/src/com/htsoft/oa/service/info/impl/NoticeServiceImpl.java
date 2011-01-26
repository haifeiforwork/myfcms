 package com.htsoft.oa.service.info.impl;
 
 import com.htsoft.core.service.impl.BaseServiceImpl;
 import com.htsoft.core.web.paging.PagingBean;
 import com.htsoft.oa.dao.info.NoticeDao;
 import com.htsoft.oa.model.info.Notice;
 import com.htsoft.oa.service.info.NoticeService;
 import java.util.Date;
 import java.util.List;
 
 public class NoticeServiceImpl extends BaseServiceImpl<Notice>
   implements NoticeService
 {
   private NoticeDao noticeDao;
 
   public NoticeServiceImpl(NoticeDao noticeDao)
   {
     super(noticeDao);
     this.noticeDao = noticeDao;
   }
 
   public List<Notice> findByNoticeId(Long noticeId, PagingBean pb)
   {
     return this.noticeDao.findByNoticeId(noticeId, pb);
   }
 
   public List<Notice> findBySearch(Notice notice, Date from, Date to, PagingBean pb)
   {
     return this.noticeDao.findBySearch(notice, from, to, pb);
   }
 
   public List<Notice> findBySearch(String searchContent, PagingBean pb)
   {
     return this.noticeDao.findBySearch(searchContent, pb);
   }
 }

/* Location:           E:\JOffice1.3安装试用版10人\joffice131Tomcat6\tomcat6-joffice\webapps\joffice1.3.1\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.info.impl.NoticeServiceImpl
 * JD-Core Version:    0.5.4
 */