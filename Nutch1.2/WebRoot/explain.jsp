<%--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at
  
  http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
--%>
<%@ page 
  session="false"
  contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8" 

  import="java.io.*"
  import="java.util.*"
  import="org.apache.nutch.searcher.*"
  import="org.apache.hadoop.conf.Configuration"
  import="org.apache.nutch.util.NutchConfiguration"
%><%
  Configuration nutchConf = NutchConfiguration.get(application);
  NutchBean bean = NutchBean.get(application, nutchConf);
  // set the character encoding to use when interpreting request values 
  request.setCharacterEncoding("UTF-8");
  bean.LOG.info("explain request from " + request.getRemoteAddr());
  Hit hit = new Hit(Integer.parseInt(request.getParameter("idx")),
                    request.getParameter("id"));
  HitDetails details = bean.getDetails(hit);
  // get the lang from request
  String queryLang = request.getParameter("lang");
  if (queryLang == null) { queryLang = ""; }
  Query query = Query.parse(request.getParameter("query"), queryLang, nutchConf);
  String language ="zh";
  String requestURI = HttpUtils.getRequestURL(request).toString();
  String base = requestURI.substring(0, requestURI.lastIndexOf('/'));
%><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%
  // To prevent the character encoding declared with 'contentType' page
  // directive from being overriden by JSTL (apache i18n), we freeze it
  // by flushing the output buffer. 
  // see http://java.sun.com/developer/technicalArticles/Intl/MultilingualJSP/
  out.flush();
%>
<html lang="<%= language %>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<head>
<title>Nutch: </title>
<jsp:include page="/include/style.html"/>
<base href="<%= base  + "/" + language %>/">
</head>

<body>

<jsp:include page="<%= language + \"/include/header.html\"%>"/>

<h3>page</h3>

<%=bean.getDetails(hit).toHtml()%>

<h3>scoreForQuery
  <%=query%>
</h3>

<%=bean.getExplanation(query, hit)%>

<jsp:include page="/include/footer.html"/>

</body>     
</html>
