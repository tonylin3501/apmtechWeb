using System.Text;
using ApmWeb.Models.Content;
using Microsoft.AspNetCore.Mvc;

namespace ApmWeb.Controllers;

public class HomeController : Controller
{
    private static readonly string[] SitemapPaths =
    {
        "/", "/project", "/success", "/cosaty", "/cosaty/endpoint", "/cosaty/manager", "/cosaty/action",
        "/cosaty/usb", "/cosaty/process", "/about", "/news", "/contact", "/sitemap", "/policy",
    };

    [Route("")]
    public IActionResult Index() => View();

    [Route("about")]
    public IActionResult About() => View();

    [Route("news")]
    public IActionResult News() => View();

    [Route("project")]
    public IActionResult Project() => View();

    [Route("success")]
    public IActionResult Success() => View(CaseStudies.All);

    [Route("sitemap")]
    public IActionResult Sitemap() => View();

    [Route("policy")]
    public IActionResult Policy() => View();

    [Route("sitemap.xml")]
    public IActionResult SitemapXml()
    {
        var baseUrl = SiteInfo.BaseUrl(HttpContext);
        var sb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        foreach (var p in SitemapPaths)
        {
            sb.Append("  <url><loc>").Append(baseUrl).Append(p == "/" ? "/" : p).Append("</loc></url>\n");
        }
        sb.Append("</urlset>");
        return Content(sb.ToString(), "application/xml", Encoding.UTF8);
    }

    [Route("robots.txt")]
    public IActionResult Robots() =>
        Content($"User-agent: *\nAllow: /\nSitemap: {SiteInfo.BaseUrl(HttpContext)}/sitemap.xml\n", "text/plain", Encoding.UTF8);

    [Route("error/{code:int}")]
    public IActionResult Error(int code)
    {
        Response.StatusCode = code;
        ViewData["Code"] = code;
        return View();
    }
}
