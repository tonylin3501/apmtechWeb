namespace ApmWeb.Models.Content;

public static class SiteInfo
{
    public const string Name = "千機科技股份有限公司";
    public const string ShortName = "千機科技";
    public const string EnglishName = "APM Technology Co., Ltd.";
    public const string Address = "台北市中正區忠孝東路一段85號12樓之4（凱撒世貿大樓）";
    public const string AddressEn = "12F.-4, No. 85, Sec. 1, Zhongxiao E. Rd., Zhongzheng Dist., Taipei City 100, Taiwan (R.O.C.)";
    public const string PostalCode = "100";
    public const string Tel = "(02) 7726-7688";
    public const string TelHref = "+886277267688";
    public const string Fax = "(02) 7726-7689";
    public const string Email = "tony@apmtech.com.tw";
    public const string Contact = "TONY 林先生";
    public const string DefaultBaseUrl = "https://www.apmtech.com.tw";

    public static string BaseUrl(HttpContext ctx) =>
        ctx.RequestServices.GetRequiredService<IConfiguration>()["Site:BaseUrl"]?.TrimEnd('/') ?? DefaultBaseUrl;
}

public record SectionHeading(string Eyebrow, string Title, string? Lead = null);
