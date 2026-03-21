<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="dm.aspx.cs" Inherits="prjAPM.dm" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>千機科技股份有限公司</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <link rel="stylesheet" href="css/bootstrap3.3.7.css" />
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/main.css" />
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KTJBSVL2ND">
</script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-KTJBSVL2ND');
</script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container-fluid">
            <nav class="navbar-default" id="na01">
                <div class="container-fluid col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">
                            <img src="img/logo-08.png " alt="logo" />千機科技
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right navbar-select">
                            <!-- <li class="dropdown">
                            <a href="#" id="hoverkey" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">產品服務<span class="caret"></span></a>
                            <ul class="dropdown-menu" id="showmenu">
                                <li><a href="#">專案開發</a></li>
                                <li><a href="#">資安監控</a></li>
                                <li><a href="#">網頁防置換</a></li>
                                <li><a href="#">SSL憑證服務</a></li>
                            </ul>
                        </li> -->
                            <li><a href="dm2.aspx">Cosaty 資安_主機或網站安全</a></li>
                       <li><a href="dm.aspx">Cosaty 端點資安防護系統</a></li>
                            <li><a href="project.aspx">專案開發</a></li>
                            <li><a href="about.aspx">公司簡介</a></li>
                            <li><a href="success.aspx">成功案例</a></li>
                            <li><a href="contact.aspx">聯絡我們</a></li>
                            <li><a href="map.aspx">網站導覽</a></li>
                        </ul>
                    </div>
                    <!-- /.navbar-collapse -->
                </div>
                <!-- /.container-fluid -->
            </nav>
            <div class="success_case_page col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="grideline col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="page_title">
                        <h2>產品服務</h2>
                    </div>
                    <!-- page_title -->
                    <div class="itembox">
                        <div class="item">
                            <div class="department">Cosaty</div>
                            <div class="firstpart">
                                
                            </div>
                            <div class="secondpart">
                                <%--<div class="casedescription">專案說明:</div>--%>
                                <ul>
                                    
                                    <li><a href="files/DM1_Server專業版.pdf">Cosaty 端點資安防護系統Server專業版(50U)一年授權<br />
                                        <%--數量級距：1-10 價格：1,455,000元(含稅)--%>
                                    </a></li>
                                    <li><a href="files/DM1_告警模組.pdf">Cosaty 端點資安防護系統告警模組一年使用授權<br />
                                        <%--數量級距：1-10 價格：255,000元(含稅)--%>
                                    </a></li>
                                    <li><a href="files/DM1_用戶端軟體.pdf">Cosaty 端點資安防護系統用戶端軟體一年使用授權<br />
                                        <%--數量級距：1-100 價格：8,550元(含稅)--%>
                                    </a></li>
                                    <li><a href="files/DM1_Server基本版.pdf">Cosaty 端點資安防護系統Server基本版(20U)一年使用授權<br />
                                        <%--數量級距：1-10 價格：785,000元(含稅)--%>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- grideline -->
            </div>


            <!-- contactus -->
            <div class="bottomfooter col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="fat-footer col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12">
                    <ul>
                        <li>
                            <a href="#">產品服務</a>
                            <ul>
                                <li><a href="project.aspx">專案開發</a></li>
                                <li><a href="#">資安監控</a></li>
                                <li><a href="#">網頁防置換 </a></li>
                                <li><a href="#">SSL憑證服務</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">公司簡介</a>
                            <ul></ul>
                        </li>
                        <li>
                            <a href="#">成功案例</a>
                            <ul></ul>
                        </li>
                        <li>
                            <a href="#">聯絡我們</a>
                            <ul></ul>
                        </li>
                        <li>
                            <a href="#">網站導覽</a>
                            <ul></ul>
                        </li>
                    </ul>
                </div>
                <!-- fat-footer -->
                <footer class="col-lg-10 col-lg-offset-1 col-sm-12 col-xs-12">
                    <div class="fontbox">
                        <div class="companyname">千機科技股份有限公司</div>
                        <ul class="company_info">
                            <li>台北市中正區100忠孝東路一段85號12樓之4</li>
                            <li>Tel:(886) 02-7726-7688</li>
                            <li>Fax:(886) 02-7726-7689</li>
                        </ul>
                    </div>
                </footer>
            </div>

        </div>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap3.3.7.js"></script>
        <script src="js/main.js"></script>
    </form>
</body>
</html>

