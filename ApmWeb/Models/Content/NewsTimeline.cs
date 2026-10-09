namespace ApmWeb.Models.Content;

public record NewsItem(string Title, string Body);

public record NewsYear(int Year, IReadOnlyList<NewsItem> Items);

public static class NewsTimeline
{
    private const string CancerSystem = "三軍總醫院癌症管理資訊系統建置：建立癌症管理資訊系統，透過時間軸整合查詢平台、提供癌症管理資訊系統及醫院內各系統資料庫整合查詢。";
    private const string Rwd = "依據行政院「政府網站改善計畫」政策推動，並參照政府網站版型相關規範，國防部全球資訊網網站改版為RWD響應式網頁設計。";
    private const string AodmMaint = "軍民網系統測試環境建置模擬，軍民網系統程式及資料庫分析，軍民網網站漏洞檢測及調整修改，軍民網網站測試，軍民網網站配合國防部網站漏洞檢測掃描修改修正。";
    private const string HospitalSite = "系統功能架構、版面設計、網頁資訊公告、公開瀏覽、檔案上傳及下載、報名系統、使用者資料輸入與匯出管理、會議行事曆管理、資訊安全檢測。";
    private const string CuSystem = "學員基本資料登錄作業、線上報名、線上選課作業、註冊作業、課程管理作業、成績管理報表作業、財務管理、繳費登錄作業。";

    /// <summary>由新到舊排列。</summary>
    public static readonly IReadOnlyList<NewsYear> All = new NewsYear[]
    {
        new(2026, new NewsItem[]
        {
            new("Cosaty 資安監控平台結合 AI 功能開發建置",
                "Cosaty 主機及網站安全管理平台將網站所需的安全防護與管理機制結合在一起，提供完整的網站安全監控管理，包括網站防置換、網站應用程式監控、網站檔案新增、修改、刪除等異動監控記錄，以及全天候即時監控告警，大幅提升網站服務品質與安全。"),
        }),
        new(2021, new NewsItem[]
        {
            new("ISO/CNS 27001 驗證", "公司推動實施資訊安全管理制度及 ISO/CNS 27001 驗證。"),
        }),
        new(2020, new NewsItem[]
        {
            new("網站監控防置換系統開發", "網站監控防置換系統開發上線。"),
        }),
        new(2019, new NewsItem[]
        {
            new("108年度國防醫學院全球資訊網站再造案", HospitalSite),
        }),
        new(2018, new NewsItem[]
        {
            new("107年度國防部全球資訊網站維護等4項", Rwd),
            new("107年度國防部全球資訊網站維護等3項案", Rwd),
            new("全民防衛動員資訊服務網系統維護", AodmMaint),
            new("中華大學「推廣教育學分班管理系統」系統開發維護", CuSystem),
        }),
        new(2017, new NewsItem[]
        {
            new("三軍總醫院內網網站系統開發", HospitalSite),
            new("106年度國防醫學院三軍總醫院「三軍總醫院癌症管理資訊系統建置」", CancerSystem),
        }),
        new(2016, new NewsItem[]
        {
            new("105年度國防部全球資訊網站維護等4項案", Rwd),
            new("105年度國防醫學院三軍總醫院「三軍總醫院癌症管理資訊系統建置」", CancerSystem),
            new("全民防衛動員資訊服務網系統維護", AodmMaint),
            new("三軍總醫院「人體試驗審議會(IRB)網站」系統開發維護", HospitalSite),
            new("中華大學「推廣教育學分班管理系統」系統開發維護", CuSystem),
            new("大同股份有限公司", "參與國防部IBM系統主機及週邊維護等32項專案資訊設備、系統之軟體或硬體維護服務。"),
        }),
        new(2015, new NewsItem[]
        {
            new("104年度國防醫學院三軍總醫院「三軍總醫院癌症管理資訊系統建置」", CancerSystem),
            new("大同股份有限公司", "國軍影像檔案借調閱系統維護等3項，ISMS及PIMS整合導入輔導服務。"),
            new("104年度三軍總醫院「人體試驗審議會(IRB)網站」系統開發維護", HospitalSite),
            new("104年度中華大學「推廣教育學分班管理系統」系統開發維護", CuSystem),
            new("蘇黎世產物保險股份有限公司客服系統-語音傳真回覆管理系統維護及功能擴充", "蘇黎世產物保險股份有限公司客服系統-語音傳真回覆管理系統包含Web查詢介面，語音導引，傳真接收，檔案搜尋，報表等系統維護及功能擴充。"),
            new("三軍總醫院能源事務室入口網站開發建置", "全院區版面功能設計、開發，同仁專區版面功能設計、開發，單位人員編輯管理，系統管理人員群組權限管理，網站視覺設計規劃，網站架構規劃、需求分析、設計，網站測試、佈署建置、配合資管室軟體開發規範。"),
            new("三軍總醫院達文西網站管理系統開發建置", "網站前後台系統開發：達文西手術系統簡介、手術團隊簡介（全科列表）、手術相關資訊、病友專區、新聞花絮、門診時刻表、權限功能設定、線上編輯器。"),
        }),
        new(2014, new NewsItem[]
        {
            new("臺北市政府動物保育處", "(102年度)動物保育雲端系統開發計畫系統規畫。"),
            new("103年度三軍總醫院「人體試驗審議會(IRB)網站」系統開發維護", HospitalSite),
            new("103年度中華大學「推廣教育學分班管理系統」系統開發維護", CuSystem),
        }),
    };
}
