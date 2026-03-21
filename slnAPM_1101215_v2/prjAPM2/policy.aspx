<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="policy.aspx.cs" Inherits="prjAPM.policy" %>

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
            <div class="aboutcompany col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="grideline col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12">
                    <div class="page_title">
                        <h2>資訊安全政策宣告</h2>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <!-- page_title -->
                    <div class="item">
                        <p class="MsoNormal" style="text-align: center;" align="center"><span style="font-size: 16.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">資訊安全政策宣告</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 13.45pt; text-align: justify; text-justify: inter-ideograph; text-indent: -13.45pt; mso-char-indent-count: -.96; margin: 0cm -7.7pt .0001pt 13.45pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">1.</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">政策目的：千機科技股份有限公司（以下簡稱本公司）為推動資訊安全管理系統，建立安全及可信賴之資訊作業環境，確保資料、系統、設備及網路安全，特訂定</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">「</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">資訊安全政策</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">」</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">（以下簡稱本政策），以確保資訊安全及提升服務品質，並達永續經營之目標。</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 13.45pt; text-align: justify; text-justify: inter-ideograph; text-indent: -13.45pt; mso-char-indent-count: -.96; margin: 0cm -7.7pt .0001pt 13.45pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">2.</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">適用範圍：所有本公司之員工、合作夥伴或單位等，皆有責任遵循此一政策。</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 22.4pt; text-align: justify; text-justify: inter-ideograph; text-indent: -22.4pt; mso-char-indent-count: -1.6; margin: 0cm -7.7pt .0001pt 22.4pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">3.</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">宣導標語：「資通安全，人人有責」。</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 22.4pt; text-align: justify; text-justify: inter-ideograph; text-indent: -22.4pt; mso-char-indent-count: -1.6; margin: 0cm -7.7pt .0001pt 22.4pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">4.</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">資安政策：</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 1.13gd; text-align: justify; text-justify: inter-ideograph; text-indent: -22.4pt; mso-char-indent-count: -1.6; margin: 0cm -7.7pt .0001pt 35.95pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">4.1</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">本公司員工</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">，</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">均須簽署本公司「員工保密合約書」，外部各方參加本公司專案人員均須簽署「外部方保密切結書」</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">，</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">並遵守「國家機密保護法」</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">、</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">「營業秘密法」、「個人資料保護法」</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">、</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">「著作權法」</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">、</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">「刑法」</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">等國家相關法規之要求，且不得發生洩密或違法事件。</span></p>
                        <p class="MsoNormal" style="mso-para-margin-top: 0cm; mso-para-margin-right: -.64gd; mso-para-margin-bottom: .0001pt; mso-para-margin-left: 1.13gd; text-align: justify; text-justify: inter-ideograph; text-indent: -22.4pt; mso-char-indent-count: -1.6; margin: 0cm -7.7pt .0001pt 35.95pt;"><span lang="EN-US" style="font-size: 14.0pt; font-family: 'Arial','sans-serif'; mso-fareast-font-family: 標楷體; color: black; mso-themecolor: text1;">4.2</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">委製</span><span style="font-size: 14.0pt; font-family: '新細明體','serif'; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">、</span><span style="font-size: 14.0pt; font-family: 標楷體; mso-ascii-font-family: Arial; mso-hansi-font-family: Arial; mso-bidi-font-family: Arial; color: black; mso-themecolor: text1;">共同合作或專案資料之存取或異動，專案檔案均應設置存取權限，敏感（機密）資訊傳輸前必須先行加密。</span></p>


                    </div>
                </div>
            </div>
           
            <!-- contactus -->
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
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap3.3.7.js"></script>
        <script src="js/main.js"></script>
    </form>
</body>
</html>
