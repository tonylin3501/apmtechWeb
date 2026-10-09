using ApmWeb.Models.Cosaty;

namespace ApmWeb.Models.Content;

public static class CosatyCatalog
{
    public const string License = "訂閱制授權：12 個月";
    public const string Quantity = "數量級距 1–10，最低購買數／單套授權數 1 套";
    public const string OsRequirement = "Windows Server 2012 / 2016 / 2019 以上";
    public const string HwRequirement = "1 GHz 及以上處理器，8 GB RAM，500 GB 可用硬碟空間";
    public const string SubscriptionPdf = "訂閱制差異說明.pdf";

    private const string Closing = "提供完整的網站安全解決方案，採用先進技術提供全面的 Web 網站應用程式安全性，且不會造成系統效能問題";

    public static readonly IReadOnlyList<CosatyProduct> Products = new CosatyProduct[]
    {
        new("manager", "Cosaty 主機及網站安全管理平台", "599,500",
            "將網站所需的安全防護與管理機制結合在一起，提供企業完整的網站安全監控管理，包括網站應用程式監控、網站檔案新增、修改、刪除與異動紀錄，以及全天候即時監控告警，大幅提升網站服務品質與安全。",
            new[]
            {
                "監控網站連線與離線紀錄",
                "網站檔案的新增、刪除、修改等異動紀錄",
                "圖表化呈現",
                "提供異常告警機制",
                "權限管理機制",
                "監控路徑及訊息告知設定機制",
                "結合 Line 告警通知",
                Closing,
            },
            "Cosaty主機及網站安全管理平台.pdf"),
        new("action", "Cosaty 主機及網站行為監控管理平台", "199,500",
            "將網站所需的安全防護與管理機制結合在一起，提供企業完整的網站行為安全監控管理，包括主機網站瀏覽、行為紀錄、檔案開啟及複製紀錄等，大幅提升網站服務品質與安全。",
            new[]
            {
                "監控網站主機行為紀錄",
                "監控網站主機通訊行為紀錄",
                "監控網站主機網站瀏覽行為紀錄",
                "監控網站主機文字輸入行為紀錄",
                "監控網站主機通訊軟體開啟紀錄",
                "結合 Line 告警通知",
                Closing,
            },
            "Cosaty主機及網站行為監控管理平台.pdf"),
        new("usb", "Cosaty 主機及網站外接裝置監控管理平台", "9,500",
            "將網站所需的安全防護與管理機制結合在一起，提供企業完整的外接裝置行為安全監控管理，紀錄外接裝置檔案新增、刪除、修改及異動等行為，大幅提升網站服務品質與安全。",
            new[]
            {
                "監控網站主機外接裝置檔案新增紀錄",
                "監控網站主機外接裝置檔案刪除紀錄",
                "監控網站主機外接裝置檔案修改紀錄",
                "監控網站主機外接裝置檔案異動紀錄",
                "結合 Line 告警通知",
                Closing,
            },
            "Cosaty主機及網站外接裝置監控管理平台.pdf"),
        new("process", "Cosaty 主機及網站程式監控管理平台", "299,500",
            "將網站所需的安全防護與管理機制結合在一起，提供完整的主機及網站程式監控管理，包括主機網站程式行為紀錄等，大幅提升網站服務品質與安全。",
            new[]
            {
                "監控網站主機程式行為紀錄",
                "監控網站主機程式存取檔案行為紀錄",
                "監控網站主機網站檔案下載行為紀錄",
                "監控網站主機通訊軟體檔案下載行為紀錄",
                "監控網站主機通訊軟體檔案上載行為紀錄",
                "禁止網站主機通訊軟體檔案上載行為",
                "結合 Line 告警通知",
                Closing,
            },
            "Cosaty主機及網站程式監控管理平台.pdf"),
    };

    public static readonly IReadOnlyList<CosatyDownload> EndpointDownloads = new CosatyDownload[]
    {
        new("Cosaty 端點資安防護系統 Server 專業版 (50U)", "DM1_Server專業版.pdf", "一年授權"),
        new("Cosaty 端點資安防護系統 Server 基本版 (20U)", "DM1_Server基本版.pdf", "一年使用授權"),
        new("Cosaty 端點資安防護系統 告警模組", "DM1_告警模組.pdf", "一年使用授權"),
        new("Cosaty 端點資安防護系統 用戶端軟體", "DM1_用戶端軟體.pdf", "一年使用授權"),
    };

    public static CosatyProduct? Find(string slug) =>
        Products.FirstOrDefault(p => p.Slug.Equals(slug, StringComparison.OrdinalIgnoreCase));
}
