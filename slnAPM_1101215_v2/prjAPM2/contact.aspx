<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contact.aspx.cs" Inherits="prjAPM.contact" %>

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
                        <a class="navbar-brand" href="index.aspx">
                            <img src="img/logo-08.png " alt="logo" />千機科技
                        </a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav navbar-right navbar-select">
                            <!-- <li class="dropdown">
                            <a href="#" id="hoverkey" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">產品服務<span class="caret"></span></a>
                            <ul class="dropdown-menu" id="showmenu">
                                <li><a href="project_development.html">專案開發</a></li>
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
            <!-- nav -->
            <div class="contact_us col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="grideline col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="page_title">
                        <h2>聯絡我們</h2>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <!-- page_title -->
                    <div class="adwords">
                        <p>您對商品與服務的意見及建議，將會是我們進步最大的動力，請留言或撥我們的客服專線，我們將會儘快與您聯繫。</p>
                        <p>歡迎您的任何諮詢、意見及建議，並期待將您的指教作為進步的動力，為顧客提供更優質的服務。請填妥以下表格，我們將儘速回覆並 Email 到您的信箱中。</p>
                    </div>
                    <div class="letterinfo">
                        <div class="form01">
                            <ul class="inputul">
                                <li>
                                    <input type="text" required="required" />
                                </li>
                                <li>
                                    <input type="email" id="email" required="required" />
                                </li>
                                <li>
                                    <input type="text" required="required" />
                                </li>
                                <li>
                                    <textarea placeholder="內容..." required="required"></textarea>
                                </li>
                                <li>
                                    <button class="submit" type="submit" value="submit">送出</button>
                                    <button class="reset" type="reset" value="reset">清除</button>

                                </li>
                            </ul>
                        </div>
                        <div class="businesscard">
                            <div class="clipbg"></div>
                            <ul class="fontbox">
                                <li>業務窗口：TONY 林先生</li>
                                <li>Mail：tony@apmtech.com.tw</li>
                                <li>電話：(02)7726-7688 ; 傳真：(02)7726-7689</li>
                                <li>地址：台北市中正區忠孝東路一段85號12樓之4(凱撒世貿大樓)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <iframe class="col-lg-12 col-md-12 col-sm-12 col-xs-12" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14458.800719117977!2d121.526592!3d25.044247!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf7e5c6426542cbcb!2z5Y2D5qmf56eR5oqA6IKh5Lu95pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-TW!2stw!4v1561087869523!5m2!1szh-TW!2stw"
                    frameborder="0" style="border: 0; width: 100%; height: 450px;" allowfullscreen></iframe>
                <!-- /contact_us -->
                <div class="bottomfooter col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="fat-footer col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
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
                            <li>
                                <a href="policy.aspx">資安政策</a>
                                <ul></ul>
                            </li>
                        </ul>
                    </div>
                    <!-- fat-footer -->
                    <footer class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
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
        </div>

        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap3.3.7.js"></script>
        <script src="js/main.js"></script>
    </form>
</body>
</html>
